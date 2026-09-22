// ==========================================
// PANEL DE SEGUIMIENTO DE TAREAS - CONTROLDOC (TareasDoc)
// Consulta flujo de trabajo completo, sesión activa vs remitente real,
// descarga por versión (cada paso del flujo), última versión vigente,
// destinatarios/copias, contador y descarga de adjuntos, panel minimizable.
// USO: pegar en consola (F12) estando logueado en ControlDoc.
// ==========================================

const TD_CONFIG = {
  urlValidar:        'https://controldoc.minsalud.gov.co/Controldoc//TareasDoc/ValidarTraladosRadicados/',
  urlCrearDoc:       'https://controldoc.minsalud.gov.co/Controldoc//TareasDoc/CrearDoc',
  urlPdfB64:         'https://controldoc.minsalud.gov.co/Controldoc//TareasDoc/Base64DocumentoPdf',
  urlRutaRepo:       'https://controldoc.minsalud.gov.co/Controldoc///Home/ObtenerValorLlave?key=RUTAREPOSITORIO',
  urlDest:           'https://controldoc.minsalud.gov.co/Controldoc//TareasDoc/ObtenerDestEntidades',
  urlAdjuntos:       'https://controldoc.minsalud.gov.co/Controldoc//TareasDoc/AdjuntosByIdTareaDoc',
  urlCopiasFun:      'https://controldoc.minsalud.gov.co/Controldoc//TareasDoc/ObtenerCopiasFuncionarios',
  urlCopiasEnt:      'https://controldoc.minsalud.gov.co/Controldoc//TareasDoc/ObtenerCopiasEntidades',
  urlBase64Doc:      'https://controldoc.minsalud.gov.co/Controldoc//Adjuntos/Base64Documento',
  urlServirAdjunto:  'https://controldoc.minsalud.gov.co/Controldoc/Adjuntos/ServirAdjunto',
};

async function tdFetchPost(url, paramsObj) {
  return fetch(url, {
    method: 'POST', credentials: 'same-origin',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
    body: new URLSearchParams(paramsObj).toString(),
  });
}
async function tdFetchGet(url) {
  return fetch(url, { method: 'GET', credentials: 'same-origin' });
}

function tdParseAspDate(str) {
  const m = /\/Date\((-?\d+)\)\//.exec(str || '');
  if (!m) return str || '—';
  const ms = parseInt(m[1], 10);
  if (ms < 0) return '—';
  return new Date(ms).toLocaleString('es-CO', { dateStyle: 'medium', timeStyle: 'short' });
}

function tdExtraerVar(html, nombre) {
  const m = new RegExp(`${nombre}\\s*=\\s*(?:parseInt\\()?'([^']*)'`).exec(html);
  return m ? m[1] : '';
}

function tdExtraerSesion(html) {
  return {
    usuarioSesion: tdExtraerVar(html, 'REMITENTENAME'),
    oficinaSesion: tdExtraerVar(html, 'REMITENTEOFICE'),
    medioEnvio: tdExtraerVar(html, 'TDOCA_MEDIOENVIO'),
  };
}

function tdExtraerFlujoJSON(html) {
  const marcador = '"data":{"Data":[';
  const idxClave = html.indexOf(marcador);
  if (idxClave === -1) return [];
  const idxInicio = html.indexOf('[', idxClave);
  let profundidad = 0, idxFin = -1;
  for (let i = idxInicio; i < html.length; i++) {
    if (html[i] === '[') profundidad++;
    else if (html[i] === ']') { profundidad--; if (profundidad === 0) { idxFin = i; break; } }
  }
  if (idxFin === -1) return [];
  try {
    return JSON.parse(html.substring(idxInicio, idxFin + 1));
  } catch (e) {
    console.error('No se pudo parsear el flujo:', e.message);
    return [];
  }
}

// Resuelve el "VALORESPUESTA" ya sea que venga como URL directa o como base64
async function tdResolverBlobDesdeRespuesta(data) {
  const valor = data.VALORESPUESTA;
  if (!valor) return null;

  if (typeof valor === 'string' && valor.startsWith('http')) {
    const resp = await fetch(valor, { credentials: 'same-origin' });
    if (!resp.ok) { console.warn('[TD] Fallo al descargar desde la URL, status:', resp.status); return null; }
    return URL.createObjectURL(await resp.blob());
  }

  try {
    const binario = atob(valor);
    const bytes = new Uint8Array(binario.length);
    for (let i = 0; i < binario.length; i++) bytes[i] = binario.charCodeAt(i);
    return URL.createObjectURL(new Blob([bytes]));
  } catch (e) {
    console.warn('[TD] VALORESPUESTA no es URL ni base64 válido:', valor);
    return null;
  }
}

// ---- previsualización/descarga de la versión de PDF diligenciado ----
async function tdObtenerPdfBlobUrl(nombreArchivo) {
  if (!nombreArchivo) { console.warn('[TD] NOMBREARCHIVO vacío'); return null; }

  const rutaRepoResp = await tdFetchGet(TD_CONFIG.urlRutaRepo).then(r => r.json());
  const rutaRepo = rutaRepoResp.value ?? rutaRepoResp.VALOR ?? '';

  const archivo = nombreArchivo.toLowerCase().endsWith('.pdf') ? nombreArchivo : `${nombreArchivo}.pdf`;

  const resp = await tdFetchPost(TD_CONFIG.urlPdfB64, {
    Ruta: rutaRepo + 'PDF\\DOC_DILIGENCIADO\\',
    ArchivoNombre: archivo,
    RutaFria: 'NOPDF\\DOC_DILIGENCIADO\\',
  });
  const data = await resp.json();
  return tdResolverBlobDesdeRespuesta(data);
}

// ---- descarga de adjuntos ----
async function tdObtenerAdjuntoBlobUrl(adjunto) {
  console.log('[TD] Objeto adjunto crudo:', adjunto);

  const rutaRepoResp = await tdFetchGet(TD_CONFIG.urlRutaRepo).then(r => r.json());
  const rutaRepo = rutaRepoResp.value ?? rutaRepoResp.VALOR ?? '';

  const archivo = adjunto.ARCHIVONOMBRE || adjunto.ARCHIVO || adjunto.NOMBREARCHIVO;
  if (!archivo) {
    console.warn('[TD] No se encontró ARCHIVONOMBRE en el objeto de arriba.');
    return null;
  }

  const matchAnio = archivo.match(/_(\d{4})\d{10}/);
  const anioActual = new Date().getFullYear();
  const aniosCandidatos = [
    ...(matchAnio ? [parseInt(matchAnio[1], 10)] : []),
    anioActual, anioActual - 1,
  ].filter((v, i, arr) => arr.indexOf(v) === i);

  for (const anio of aniosCandidatos) {
    const ruta = `${rutaRepo}ADJUNTOS\\${anio}\\`;
    const resp = await tdFetchPost(TD_CONFIG.urlBase64Doc, {
      Ruta: ruta,
      ArchivoNombre: archivo,
      RutaFria: `NOADJUNTOS\\${anio}\\`,
    });
    const data = await resp.json();
    console.log(`[TD] Respuesta Base64Documento (año ${anio}):`, data);

    if (data.RESPUESTA === false) continue;

    const url = await tdResolverBlobDesdeRespuesta(data);
    if (url) return url;
  }

  console.warn('[TD] No se encontró el archivo en ninguno de los años probados.');
  return null;
}

async function tdConsultarTarea(idTarea) {
  await tdFetchPost(TD_CONFIG.urlValidar, { IDTAREADOC: idTarea });
  const html = await tdFetchPost(TD_CONFIG.urlCrearDoc, {
    TipoDocumento: 'D', IdTareaInicial: idTarea, IdTareaActual: idTarea,
    Editar: 'NO', INSTRUCCIONES: 'REVISAR', IDRAD: 0,
  }).then(r => r.text());
  return { sesion: tdExtraerSesion(html), flujo: tdExtraerFlujoJSON(html) };
}

function tdEstadoGlobal(ultimoPaso) {
  if (!ultimoPaso) return { texto: '—', color: '#6b7280', fondo: '#f3f4f6' };
  const instruccion = (ultimoPaso.INSTRUCCION || '').toUpperCase().trim();
  const estadoFirma = (ultimoPaso.ESTADOFIRMA || '').toUpperCase().trim();
  if (instruccion === 'FIRMAR' && estadoFirma.includes('FIRMADO')) {
    return { texto: 'ENVÍO EXITOSO', color: '#16a34a', fondo: '#dcfce7' };
  }
  return {
    texto: `${ultimoPaso.ESTADOTAREA || '—'} / ${ultimoPaso.INSTRUCCION || '—'}`,
    color: '#2563eb', fondo: '#dbeafe',
  };
}

let tdAdjuntosCache = [];

function tdCrearPanel() {
  document.querySelector('#PanelSeguimientoTarea')?.remove();
  const cont = document.createElement('div');
  cont.id = 'PanelSeguimientoTarea';
  cont.style.cssText = 'position:fixed; top:20px; right:20px; z-index:99999; background:#fff; border:1px solid #ccc; border-radius:10px; padding:14px; box-shadow:0 4px 18px rgba(0,0,0,0.25); width:620px; max-height:88vh; overflow-y:auto; font-family:sans-serif; font-size:13px;';
  cont.innerHTML = `
    <div id="TD_Encabezado" style="display:flex; justify-content:space-between; align-items:center; font-weight:bold; margin-bottom:10px; cursor:grab; user-select:none;">
      <span>📋 Flujo de Tarea — Controldoc</span>
      <span>
        <button id="TD_Minimizar" style="background:none; border:none; color:#666; font-size:16px; font-weight:bold; cursor:pointer; margin-right:6px;" title="Minimizar">–</button>
        <button id="TD_Cerrar" style="background:none; border:none; color:#666; font-size:16px; font-weight:bold; cursor:pointer;">✕</button>
      </span>
    </div>
    <div id="TD_Cuerpo">
      <div style="display:flex; gap:6px; margin-bottom:10px;">
        <input id="TD_Input" type="text" placeholder="IDTAREADOC (ej: 466393)" style="flex:1; padding:6px; border:1px solid #ccc; border-radius:6px;">
        <button id="TD_Buscar" style="padding:6px 12px; background:#2563eb; color:#fff; border:none; border-radius:6px; cursor:pointer; font-weight:bold;">Buscar</button>
      </div>
      <div id="TD_Contenido"></div>
    </div>
  `;
  document.body.appendChild(cont);
  tdHabilitarArrastre(cont, cont.querySelector('#TD_Encabezado'));

  const btnMin = cont.querySelector('#TD_Minimizar');
  const cuerpo = cont.querySelector('#TD_Cuerpo');
  let minimizado = false;
  btnMin.addEventListener('mousedown', e => e.stopPropagation());
  btnMin.onclick = e => {
    e.stopPropagation();
    minimizado = !minimizado;
    cuerpo.style.display = minimizado ? 'none' : 'block';
    cont.style.width = minimizado ? 'auto' : '620px';
    btnMin.textContent = minimizado ? '▢' : '–';
    btnMin.title = minimizado ? 'Restaurar' : 'Minimizar';
  };

  cont.querySelector('#TD_Cerrar').addEventListener('mousedown', e => e.stopPropagation());
  cont.querySelector('#TD_Cerrar').onclick = e => { e.stopPropagation(); cont.remove(); };
  cont.querySelector('#TD_Buscar').onclick = tdEjecutarBusqueda;
  cont.querySelector('#TD_Input').addEventListener('keydown', e => { if (e.key === 'Enter') tdEjecutarBusqueda(); });
}

function tdHabilitarArrastre(contenedor, agarre) {
  let arrastrando = false, offX = 0, offY = 0;
  agarre.addEventListener('mousedown', e => {
    arrastrando = true;
    const r = contenedor.getBoundingClientRect();
    offX = e.clientX - r.left; offY = e.clientY - r.top;
    contenedor.style.right = 'auto'; contenedor.style.left = r.left + 'px'; contenedor.style.top = r.top + 'px';
  });
  document.addEventListener('mousemove', e => {
    if (!arrastrando) return;
    contenedor.style.left = (e.clientX - offX) + 'px';
    contenedor.style.top = (e.clientY - offY) + 'px';
  });
  document.addEventListener('mouseup', () => arrastrando = false);
}

async function tdEjecutarBusqueda() {
  const idTarea = document.querySelector('#TD_Input').value.trim();
  const contenido = document.querySelector('#TD_Contenido');
  if (!idTarea) return;
  contenido.innerHTML = '<div style="padding:10px; color:#666;">⏳ Consultando...</div>';

  let resultado, adjuntos = [];
  try {
    [resultado, adjuntos] = await Promise.all([
      tdConsultarTarea(idTarea),
      tdFetchGet(`${TD_CONFIG.urlAdjuntos}?IDTAREADOC=${idTarea}`).then(r => r.json()).catch(() => []),
    ]);
  } catch (err) {
    contenido.innerHTML = `<div style="padding:10px; color:#ea580c;">❌ ${err.message}</div>`;
    return;
  }

  tdAdjuntosCache = adjuntos || [];
  const { sesion, flujo } = resultado;
  const ultimoPaso = flujo[flujo.length - 1];
  const remitenteReal = flujo[0]?.FUNCIONARIOCREO || '—';
  const estado = tdEstadoGlobal(ultimoPaso);

  contenido.innerHTML = `
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
      <div>
        <span style="color:#6b7280; font-size:11px;">IDTAREADOC</span>
        <span style="font-weight:bold; font-size:15px; color:#111827;"> ${idTarea}</span>
      </div>
      <span style="padding:3px 10px; border-radius:12px; font-size:11px; font-weight:bold; background:${estado.fondo}; color:${estado.color};">${estado.texto}</span>
    </div>
    <div style="margin-bottom:10px; padding:8px; background:#f9fafb; border-radius:6px; display:grid; grid-template-columns:auto 1fr; gap:2px 8px;">
      <span style="color:#6b7280;">Remitente real (paso 1):</span><span style="font-weight:bold; color:#1e3a8a;">${remitenteReal}</span>
      <span style="color:#6b7280;">Asunto:</span><span>${ultimoPaso?.ASUNTO || '—'}</span>
      <span style="color:#6b7280;">Serie / Subserie:</span><span>${ultimoPaso?.SERIE || '—'} / ${ultimoPaso?.SUBSERIE || '—'}</span>
      <span style="color:#6b7280;">Medio de envío:</span><span>${sesion.medioEnvio || '—'}</span>
      <hr style="grid-column:1/-1; border:none; border-top:1px dashed #e5e7eb; margin:2px 0;">
      <span style="color:#9ca3af; font-size:11px;">Sesión activa:</span><span style="color:#9ca3af; font-size:11px;">${sesion.usuarioSesion} — ${sesion.oficinaSesion}</span>
    </div>
    <div style="margin-bottom:10px;">
      <table style="width:100%; border-collapse:collapse; font-size:12px;">
        <thead><tr style="background:#f3f4f6;">
          ${['#','Enviado por','Enviado a','Acción','Instrucción','F.Firma','Fecha','PDF'].map(h => `<th style="text-align:left; padding:4px; border-bottom:1px solid #e5e7eb;">${h}</th>`).join('')}
        </tr></thead>
        <tbody>
          ${flujo.map(f => `
            <tr style="border-bottom:1px solid #f3f4f6;">
              <td style="padding:4px;">${f.ORDEN}</td>
              <td style="padding:4px;">${f.FUNCIONARIOCREO || '—'}</td>
              <td style="padding:4px;">${f.FUNCIONARIOTAREA || '—'}</td>
              <td style="padding:4px;">${f.ESTADOTAREA || '—'}</td>
              <td style="padding:4px;">${f.INSTRUCCION || '—'}</td>
              <td style="padding:4px;">${f.ESTADOFIRMA || '—'}</td>
              <td style="padding:4px; white-space:nowrap;">${tdParseAspDate(f.FECHA)}</td>
              <td style="padding:4px; text-align:center;">
                ${f.NOMBREARCHIVO ? `<button class="td-btn-pdf-fila" data-archivo="${f.NOMBREARCHIVO}" style="border:none; background:none; cursor:pointer; font-size:15px;" title="Descargar versión de este paso">📄</button>` : '—'}
              </td>
            </tr>`).join('')}
        </tbody>
      </table>
    </div>
    <div style="display:flex; flex-wrap:wrap; gap:6px;">
      <button id="TD_BtnPreviewPdf" style="flex:1; padding:6px; background:#e5e7eb; border:none; border-radius:6px; cursor:pointer;">👁 Previsualizar última versión</button>
      <button id="TD_BtnDescargarPdf" style="flex:1; padding:6px; background:#2563eb; color:#fff; border:none; border-radius:6px; cursor:pointer;">📄 Descargar última versión</button>
      <button id="TD_BtnDestinatarios" style="flex:1; padding:6px; background:#e5e7eb; border:none; border-radius:6px; cursor:pointer;">👥 Destinatarios/Copias/Adjuntos (${tdAdjuntosCache.length})</button>
    </div>
  `;

  contenido.querySelectorAll('.td-btn-pdf-fila').forEach(btn => {
    btn.onclick = async () => {
      const url = await tdObtenerPdfBlobUrl(btn.dataset.archivo);
      if (!url) return alert('Esta versión no tiene PDF asociado.');
      window.open(url, '_blank');
    };
  });

  const abrirUltimaVersion = async (descargar) => {
    const url = await tdObtenerPdfBlobUrl(ultimoPaso?.NOMBREARCHIVO);
    if (!url) return alert('No se encontró un PDF válido para la última versión de esta tarea.');
    if (descargar) {
      const a = document.createElement('a');
      a.href = url; a.download = `Tarea_${idTarea}_v${ultimoPaso.ORDEN}.pdf`;
      document.body.appendChild(a); a.click(); a.remove();
    } else {
      window.open(url, '_blank');
    }
  };
  contenido.querySelector('#TD_BtnPreviewPdf').onclick = () => abrirUltimaVersion(false);
  contenido.querySelector('#TD_BtnDescargarPdf').onclick = () => abrirUltimaVersion(true);
  contenido.querySelector('#TD_BtnDestinatarios').onclick = () => tdMostrarDestinatarios(idTarea);
}

async function tdMostrarDestinatarios(idTarea) {
  const [dest, copiasFunc, copiasEnt] = await Promise.all([
    tdFetchGet(`${TD_CONFIG.urlDest}?idtareadoc=${idTarea}`).then(r => r.json()),
    tdFetchGet(`${TD_CONFIG.urlCopiasFun}?idtareadoc=${idTarea}`).then(r => r.json()),
    tdFetchGet(`${TD_CONFIG.urlCopiasEnt}?idtareadoc=${idTarea}`).then(r => r.json()),
  ]);
  const adjuntos = tdAdjuntosCache; // ya lo tenemos del conteo inicial, sin refetch

  document.querySelector('#TD_ModalDest')?.remove();
  const modal = document.createElement('div');
  modal.id = 'TD_ModalDest';
  modal.style.cssText = 'position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.4); z-index:100000; display:flex; align-items:center; justify-content:center;';

  const lista = (titulo, arr) => `
    <b>${titulo} (${arr.length})</b>
    ${arr.length === 0 ? '<p style="color:#6b7280;"><i>Sin registros</i></p>' :
      arr.map(x => `<div style="padding:4px 0; border-bottom:1px solid #f3f4f6;">${x.NOMBRESAPELLIDOS || x.NOMBREARCHIVO || '—'} ${x.CORREO ? `— ${x.CORREO}` : ''}</div>`).join('')}
  `;

  const listaAdjuntos = (arr) => `
    <b>Adjuntos (${arr.length})</b>
    ${arr.length === 0 ? '<p style="color:#6b7280;"><i>Sin registros</i></p>' :
      arr.map((x, i) => `
        <div style="display:flex; justify-content:space-between; align-items:center; padding:4px 0; border-bottom:1px solid #f3f4f6;">
          <span>${x.ARCHIVONOMBRE || x.ARCHIVO || x.NOMBREARCHIVO || '(sin nombre)'}</span>
          <button class="td-adj-download" data-i="${i}" style="border:none; background:none; cursor:pointer;" title="Descargar">📥</button>
        </div>`).join('')}
  `;

  modal.innerHTML = `
    <div style="background:#fff; border-radius:8px; padding:16px; width:420px; max-height:80vh; overflow-y:auto;">
      <div style="display:flex; justify-content:space-between; margin-bottom:10px;">
        <b>Destinatarios y copias — Tarea ${idTarea}</b>
        <button id="TD_CerrarDest" style="background:none; border:none; font-size:16px; cursor:pointer;">✕</button>
      </div>
      ${lista('Destinatarios', dest)}
      ${listaAdjuntos(adjuntos)}
      ${lista('Copias a funcionarios', copiasFunc)}
      ${lista('Copias a entidades', copiasEnt)}
    </div>
  `;
  document.body.appendChild(modal);
  modal.querySelector('#TD_CerrarDest').onclick = () => modal.remove();

  modal.querySelectorAll('.td-adj-download').forEach(btn => {
    btn.onclick = async () => {
      const adj = adjuntos[parseInt(btn.dataset.i, 10)];
      const url = await tdObtenerAdjuntoBlobUrl(adj);
      if (!url) return alert('No se pudo obtener el adjunto. Revisa la consola (F12) para ver por qué.');
      const a = document.createElement('a');
      a.href = url; a.download = adj.ARCHIVONOMBRE || adj.ARCHIVO || 'adjunto';
      document.body.appendChild(a); a.click(); a.remove();
    };
  });
}

tdCrearPanel();
