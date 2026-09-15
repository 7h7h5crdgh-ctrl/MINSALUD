// ==========================================
// PANEL DE SEGUIMIENTO DE DOCUMENTOS - CONTROLDOC
// Consulta ficha, flujo de trabajo, estado y documentos asociados
// por IDC o Radicado. Incluye accesos directos a PDF, Adjuntos y Asociados.
//
// USO: pegar completo en la consola de DevTools (F12) estando logueado
// en ControlDoc. Aparece un panel flotante arriba a la derecha.
// ==========================================

const CD_CONFIG = {
  urlBuscar:        'https://controldoc.minsalud.gov.co/ControlDoc/Documentos/DocumentosBuscar',
  urlInfoGeneral:   'https://controldoc.minsalud.gov.co/ControlDoc/Documentos/INFORMACIONGENERALDOCUMENTO',
  urlWorkFlow:      'https://controldoc.minsalud.gov.co/Controldoc//Gestion/ModalWorkFlow',
  urlDocsAsociados: 'https://controldoc.minsalud.gov.co/ControlDoc/Documentos/ListarDocumentosAsociados',
  urlImagenB64:     'https://controldoc.minsalud.gov.co/Controldoc//Documentos/IMAGENB64byIDDOCUMENTO/',
  urlGuardarZip:    'https://controldoc.minsalud.gov.co/Controldoc//Gestion/GuardarAdjuntosZIP',
};

// Campos por defecto del formulario de búsqueda (DocumentosBuscar).
// NOTA: reconstruidos a partir de una captura de Network parcial.
// Si la búsqueda falla o devuelve vacío, captura el payload COMPLETO
// de una búsqueda real (Network -> DocumentosBuscar -> Payload -> View source)
// y ajusta este objeto con los nombres/valores exactos que falten.
const CD_BUSQUEDA_DEFAULTS = {
  IDUNIDADADMINISTRATIVA: '', IDOFICINAPRODUCTORA: '', IDSERIE: '', IDSUBSERIE: '',
  IDTIPOLOGIA: '', IDFUNCIONARIO: '', STRIDSERIES: '', STRIDSUBSERIES: '',
  DESCRIPCION: '', IDCLASE: '', MEDIORECEPCION: '', EMPRESAMENSAJERA: '0',
  DOCUMENTOID: '', NROGUIA: '', CHKFECHAS: 'false', FECHAI: '', NTIPOLOGIA: '',
  TIPOFUNCIONARIO: '', NFUNCIONARIO: '', CHKSOLOMIAS: 'false',
  LstFunc: '', LstEntidext: '', LstFuncFir: '', LstEntidextFir: '',
  LstFuncDest: '', LstEntidextDest: '', CLASEFIRDES: '', FechasActivas: 'false',
};

// ---------- Helpers HTTP ----------
async function cdFetchPost(url, paramsObj) {
  const body = new URLSearchParams(paramsObj);
  return fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'X-Requested-With': 'XMLHttpRequest',
    },
    body: body.toString(),
  });
}

async function cdFetchGet(url) {
  return fetch(url, {
    method: 'GET',
    credentials: 'same-origin',
    headers: { 'X-Requested-With': 'XMLHttpRequest' },
  });
}

// ---------- Helpers de formato ----------
function cdParseAspDate(str) {
  if (!str) return '';
  const m = /\/Date\((-?\d+)\)\//.exec(str);
  if (!m) return str;
  const ms = parseInt(m[1], 10);
  if (ms < 0) return ''; // fechas "vacías" (ej: -62135578800000, -2208970800000)
  return new Date(ms).toLocaleString('es-CO', { dateStyle: 'medium', timeStyle: 'short' });
}

function cdLimpiarHTML(str) {
  if (!str) return '';
  return str
    .replace(/<br\s*\/?>/gi, ' — ')
    .replace(/<[^>]+>/g, '')
    .trim();
}

function cdFormatearPersona(str) {
  const limpio = cdLimpiarHTML(str);
  const partes = limpio.split(' — ');
  const nombre = partes[0] || '—';
  const resto = partes.slice(1).join(' · ');
  return `<span style="font-weight:bold; color:#1e3a8a;">${nombre}</span>` +
    (resto ? `<br><span style="color:#6b7280; font-size:11px;">${resto}</span>` : '');
}

function cdDetectarTipo(valor) {
  return valor.toString().trim().length >= 12 ? 'RADICADO' : 'IDDOCUMENTO';
}

// ---------- 1. Búsqueda del documento ----------
async function cdBuscarDocumento(valor) {
  const tipo = cdDetectarTipo(valor);
  const params = {
    ...CD_BUSQUEDA_DEFAULTS,
    IDDOCUMENTO: tipo === 'IDDOCUMENTO' ? valor : '',
    RADICADO: tipo === 'RADICADO' ? valor : '',
  };
  const resp = await cdFetchPost(CD_CONFIG.urlBuscar, params);
  const data = await resp.json();
  if (!data || data.RESPUESTA !== true || !data.OBJETOS || !data.OBJETOS.length) {
    throw new Error('No se encontró ningún documento con ese IDC/Radicado.');
  }
  return data.OBJETOS[0];
}

// ---------- 2. Ficha (Información General) ----------
async function cdObtenerFicha(idDocumento) {
  const url = `${CD_CONFIG.urlInfoGeneral}?IDDOCUMENTO=${idDocumento}`;
  const resp = await cdFetchGet(url);
  const arr = await resp.json();
  const mapa = {};
  (arr || []).forEach(item => { mapa[item.CAMPO] = item.INFORMACION; });
  return mapa;
}

// ---------- 3. Flujo de trabajo ----------
// El endpoint devuelve HTML con un <script> que arma un kendoGrid.
// Dentro va un array "Data": [...] con el historial completo en JSON válido.
// Se extrae con balanceo de corchetes (igual que se extraía el base64 del PDF).
function cdExtraerArrayBalanceado(texto, marcador) {
  const idxClave = texto.indexOf(marcador);
  if (idxClave === -1) return null;
  const idxInicio = texto.indexOf('[', idxClave);
  if (idxInicio === -1) return null;
  let profundidad = 0;
  for (let i = idxInicio; i < texto.length; i++) {
    if (texto[i] === '[') profundidad++;
    else if (texto[i] === ']') {
      profundidad--;
      if (profundidad === 0) return texto.substring(idxInicio, i + 1);
    }
  }
  return null;
}

async function cdObtenerFlujo(idDocumento, radicado) {
  const resp = await cdFetchPost(CD_CONFIG.urlWorkFlow, { IDDOCUMENTO: idDocumento, RADICADO: radicado });
  const html = await resp.text();
  const arrayTexto = cdExtraerArrayBalanceado(html, '"Data":');
  if (!arrayTexto) return [];
  let datos;
  try {
    datos = JSON.parse(arrayTexto);
  } catch (e) {
    console.log('❌ No se pudo parsear el flujo de trabajo:', e.message);
    return [];
  }
  datos.sort((a, b) => (b.ORDEN || 0) - (a.ORDEN || 0));
  return datos;
}

// ---------- 4. Documentos asociados ----------
async function cdObtenerAsociados(idDocumento) {
  const url = `${CD_CONFIG.urlDocsAsociados}?IDDOCUMENTO=${idDocumento}`;
  const resp = await cdFetchGet(url);
  const arr = await resp.json();
  return arr || [];
}

// ---------- 5. Estado global ----------
// ESTADOFLUJO del último paso (ORDEN más alto) ya trae el estado real,
// así que se usa directo en vez de inferirlo. Se mapean los valores
// conocidos a un texto/color; cualquier valor nuevo se muestra tal cual.
function cdEstadoGlobal(pasoReciente, strEstadoDocumento) {
  const estadoFlujo = (pasoReciente?.ESTADOFLUJO || '').toUpperCase().trim();
  if (estadoFlujo.includes('EXITOSA')) {
    return { texto: 'Gestión exitosa', color: '#16a34a', fondo: '#dcfce7' };
  }
  if (estadoFlujo === 'TRANSITO') {
    return { texto: 'En tránsito', color: '#2563eb', fondo: '#dbeafe' };
  }
  if (estadoFlujo === 'SIN INICIAR TRAMITE' || !estadoFlujo) {
    return { texto: strEstadoDocumento || 'Sin tramitar', color: '#6b7280', fondo: '#f3f4f6' };
  }
  // Estado no contemplado (ej. DEVUELTO, ARCHIVADO): se muestra tal cual llega.
  return { texto: estadoFlujo, color: '#92400e', fondo: '#fef3c7' };
}

// ---------- 6. Previsualización / descarga de PDF ----------
function cdBase64APdfBlob(base64) {
  const binario = atob(base64);
  const bytes = new Uint8Array(binario.length);
  for (let i = 0; i < binario.length; i++) bytes[i] = binario.charCodeAt(i);
  return new Blob([bytes], { type: 'application/pdf' });
}

async function cdObtenerPdfBlobUrl(idDocumento) {
  const resp = await cdFetchPost(CD_CONFIG.urlImagenB64, { IDDOCUMENTO: idDocumento });
  const texto = await resp.text();
  const coincidencia = texto.match(/[A-Za-z0-9+/=]{200,}/);
  const base64 = coincidencia ? coincidencia[0] : null;
  if (!base64 || !base64.startsWith('JVBERi0')) return null;
  return URL.createObjectURL(cdBase64APdfBlob(base64));
}

async function cdPrevisualizarPdf(idDocumento) {
  const url = await cdObtenerPdfBlobUrl(idDocumento);
  if (!url) return alert('No se encontró un PDF válido para este documento.');
  window.open(url, '_blank');
}

async function cdDescargarPdf(idDocumento) {
  const url = await cdObtenerPdfBlobUrl(idDocumento);
  if (!url) return alert('No se encontró un PDF válido para este documento.');
  const a = document.createElement('a');
  a.href = url;
  a.download = `Documento_${idDocumento}.pdf`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

// ---------- 7. Descarga de adjuntos (ZIP) ----------
// Nota: solo se implementa descarga directa del ZIP (endpoint ya validado).
// Para una "previsualización" con listado de archivos individuales haría falta
// el endpoint ADJUNTOSbyIDDOCUMENTO (visto en Network) con un ejemplo de su
// respuesta — se puede añadir después si se necesita.
async function cdDescargarAdjuntos(idDocumento) {
  const resp = await cdFetchPost(CD_CONFIG.urlGuardarZip, { IDDOCUMENTO: idDocumento, DILIGENCIADOS: 'NO' });
  const data = await resp.json();
  if (data && data.RESPUESTA === true && data.VALORESPUESTA) {
    const a = document.createElement('a');
    a.href = data.VALORESPUESTA;
    a.download = data.OBJETOS || `AdjuntosDoc_${idDocumento}.zip`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    return true;
  }
  alert(data?.MENSAJE || 'Este documento no tiene adjuntos disponibles.');
  return false;
}

// ==========================================
// UI
// ==========================================
function cdCrearPanel() {
  const existente = document.querySelector('#PanelSeguimientoDoc');
  if (existente) existente.remove();

  const cont = document.createElement('div');
  cont.id = 'PanelSeguimientoDoc';
  cont.style.cssText = 'position:fixed; top:20px; right:20px; z-index:99999; background:#fff; border:1px solid #ccc; border-radius:10px; padding:14px; box-shadow:0 4px 18px rgba(0,0,0,0.25); width:460px; max-height:88vh; overflow-y:auto; font-family:sans-serif; font-size:13px;';

  cont.innerHTML = `
    <div id="PSD_Encabezado" style="display:flex; justify-content:space-between; align-items:center; font-weight:bold; margin-bottom:10px; cursor:grab; user-select:none;">
      <span>🔎 Seguimiento de Documento — ControlDoc</span>
      <button id="PSD_Cerrar" style="background:none; border:none; color:#666; font-size:16px; font-weight:bold; cursor:pointer;">✕</button>
    </div>
    <div style="display:flex; gap:6px; margin-bottom:10px;">
      <input id="PSD_Input" type="text" placeholder="IDC (2306470) o Radicado (2026424003560532)" style="flex:1; padding:6px; border:1px solid #ccc; border-radius:6px;">
      <button id="PSD_Buscar" style="padding:6px 12px; background:#2563eb; color:#fff; border:none; border-radius:6px; cursor:pointer; font-weight:bold;">Buscar</button>
    </div>
    <div id="PSD_Contenido"></div>
  `;
  document.body.appendChild(cont);
  cdHabilitarArrastre(cont, document.querySelector('#PSD_Encabezado'));

  document.querySelector('#PSD_Cerrar').onclick = (e) => { e.stopPropagation(); cont.remove(); };
  document.querySelector('#PSD_Cerrar').addEventListener('mousedown', (e) => e.stopPropagation());

  document.querySelector('#PSD_Buscar').onclick = () => cdEjecutarBusqueda();
  document.querySelector('#PSD_Input').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') cdEjecutarBusqueda();
  });
}

function cdHabilitarArrastre(contenedor, agarre) {
  let arrastrando = false, offsetX = 0, offsetY = 0;
  agarre.addEventListener('mousedown', (e) => {
    arrastrando = true;
    const rect = contenedor.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;
    contenedor.style.right = 'auto';
    contenedor.style.left = rect.left + 'px';
    contenedor.style.top = rect.top + 'px';
  });
  document.addEventListener('mousemove', (e) => {
    if (!arrastrando) return;
    contenedor.style.left = (e.clientX - offsetX) + 'px';
    contenedor.style.top = (e.clientY - offsetY) + 'px';
  });
  document.addEventListener('mouseup', () => { arrastrando = false; });
}

async function cdEjecutarBusqueda() {
  const valor = document.querySelector('#PSD_Input').value.trim();
  const contenido = document.querySelector('#PSD_Contenido');
  if (!valor) return;
  contenido.innerHTML = '<div style="padding:10px; color:#666;">⏳ Consultando...</div>';

  let doc;
  try {
    doc = await cdBuscarDocumento(valor);
  } catch (err) {
    contenido.innerHTML = `<div style="padding:10px; color:#ea580c;">❌ ${err.message}</div>`;
    return;
  }

  const idDocumento = doc.IDDOCUMENTO;
  const radicado = doc.RADICADO;

  contenido.innerHTML = cdPlantillaBase(doc);

  // Ficha (independiente: si falla, no bloquea el resto)
  cdObtenerFicha(idDocumento).then(ficha => {
    document.querySelector('#PSD_Ficha').innerHTML = cdPlantillaFicha(ficha);
  }).catch(() => {
    document.querySelector('#PSD_Ficha').innerHTML = '<div style="color:#ea580c;">No se pudo cargar la ficha.</div>';
  });

  // Flujo (independiente)
  cdObtenerFlujo(idDocumento, radicado).then(pasos => {
    document.querySelector('#PSD_Flujo').innerHTML = cdPlantillaFlujo(pasos);
    const badge = document.querySelector('#PSD_Badge');
    if (badge) {
      const estado = cdEstadoGlobal(pasos[0], doc.STRESTADODOCUMENTO);
      badge.textContent = estado.texto;
      badge.style.color = estado.color;
      badge.style.background = estado.fondo;
    }
  }).catch(() => {
    document.querySelector('#PSD_Flujo').innerHTML = '<div style="color:#ea580c;">No se pudo cargar el flujo de trabajo.</div>';
  });

  // Botones de acción
  document.querySelector('#PSD_BtnPreviewPdf').onclick = () => cdPrevisualizarPdf(idDocumento);
  document.querySelector('#PSD_BtnDescargarPdf').onclick = () => cdDescargarPdf(idDocumento);
  document.querySelector('#PSD_BtnAdjuntos').onclick = () => cdDescargarAdjuntos(idDocumento);
  document.querySelector('#PSD_BtnAsociados').onclick = () => cdMostrarAsociados(idDocumento);
}

function cdPlantillaBase(doc) {
  return `
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
      <div>
        <span style="color:#6b7280; font-size:11px;">IDC</span>
        <span style="font-weight:bold; font-size:15px; color:#111827;"> ${doc.IDDOCUMENTO}</span>
        &nbsp;&nbsp;
        <span style="color:#6b7280; font-size:11px;">Radicado</span>
        <span style="font-weight:bold; font-size:13px; color:#111827;"> ${doc.RADICADO}</span>
      </div>
      <span id="PSD_Badge" style="padding:3px 10px; border-radius:12px; font-size:11px; font-weight:bold;">Cargando...</span>
    </div>
    <div id="PSD_Ficha" style="margin-bottom:10px; padding:8px; background:#f9fafb; border-radius:6px;">⏳ Cargando ficha...</div>
    <div id="PSD_Flujo" style="margin-bottom:10px; padding:8px; background:#f9fafb; border-radius:6px;">⏳ Cargando flujo...</div>
    <div style="display:flex; flex-wrap:wrap; gap:6px;">
      <button id="PSD_BtnPreviewPdf" style="flex:1; padding:6px; background:#e5e7eb; border:none; border-radius:6px; cursor:pointer;">👁 Previsualizar PDF</button>
      <button id="PSD_BtnDescargarPdf" style="flex:1; padding:6px; background:#2563eb; color:#fff; border:none; border-radius:6px; cursor:pointer;">📄 Descargar PDF</button>
      <button id="PSD_BtnAdjuntos" style="flex:1; padding:6px; background:#2563eb; color:#fff; border:none; border-radius:6px; cursor:pointer;">📎 Descargar Adjuntos</button>
      <button id="PSD_BtnAsociados" style="flex:1; padding:6px; background:#e5e7eb; border:none; border-radius:6px; cursor:pointer;">🔗 Docs. Asociados</button>
    </div>
  `;
}

function cdPlantillaFicha(ficha) {
  const campo = (nombre) => ficha[nombre] || '—';
  return `
    <div style="background:#fef9c3; border-left:3px solid #ca8a04; padding:6px 8px; border-radius:4px; margin-bottom:6px; font-weight:600; color:#111827;">
      ${campo('DETALLE')}
    </div>
    <div style="display:grid; grid-template-columns:auto 1fr; gap:2px 8px;">
      <span style="color:#6b7280;">Fecha Radicación:</span><span>${campo('FECHA RADICACIÓN')}</span>
      <span style="color:#6b7280;">Trámite:</span><span>${campo('TIPOLOGÍA DOCUMENTAL')}</span>
      <span style="color:#6b7280;">Serie / Subserie:</span><span>${campo('SERIE')} / ${campo('SUBSERIE')}</span>
      <span style="color:#6b7280;">Firmante:</span><span style="font-weight:bold; color:#1e3a8a;">${campo('FIRMANTE')}</span>
      <span style="color:#6b7280;">Destinatario(s):</span><span style="font-weight:bold; color:#1e3a8a;">${campo('DESTINATARIO(S)')}</span>
      <span style="color:#6b7280;">Fecha Vencimiento:</span><span>${campo('FECHA VENCIMIENTO')}</span>
    </div>
  `;
}

function cdPlantillaFlujo(pasos) {
  if (!pasos.length) return '<i>Sin información de flujo.</i>';
  const p = pasos[0];
  return `
    <div style="display:flex; gap:10px; margin-bottom:6px;">
      <div style="flex:1;">
        <div style="color:#6b7280; font-size:11px;">ENVIADO POR</div>
        ${cdFormatearPersona(p.USUARIOASIGNO)}
        <div style="color:#6b7280; font-size:11px; margin-top:2px;">${cdParseAspDate(p.FECHAASIGNO)}</div>
      </div>
      <div style="align-self:center; color:#9ca3af; font-size:18px;">→</div>
      <div style="flex:1;">
        <div style="color:#6b7280; font-size:11px;">RECIBIDO POR</div>
        ${cdFormatearPersona(p.GESTORNOMBRESAPELLIDOS)}
      </div>
    </div>
    <div style="display:grid; grid-template-columns:auto 1fr; gap:2px 8px; margin-top:4px;">
      <span style="color:#6b7280;">Estado del flujo:</span><span style="font-weight:bold;">${p.ESTADOFLUJO || '—'}</span>
      <span style="color:#6b7280;">Acción/indicación:</span><span>${p.ACCION || '—'}</span>
    </div>
    <div style="background:#eff6ff; border-left:3px solid #2563eb; padding:6px 8px; border-radius:4px; margin-top:6px;">
      ${p.COMENTARIO || '—'}
    </div>
    <details style="margin-top:8px;"><summary style="cursor:pointer; color:#2563eb; font-weight:bold;">Ver historial completo (${pasos.length})</summary>
      ${pasos.map(x => `
        <div style="border-top:1px solid #e5e7eb; padding:6px 0; font-size:12px;">
          <div><span style="color:#9ca3af;">#${x.ORDEN}</span> ${cdFormatearPersona(x.USUARIOASIGNO)} → ${cdFormatearPersona(x.GESTORNOMBRESAPELLIDOS)}</div>
          <div style="margin-top:2px;"><span style="font-weight:bold;">${x.ESTADOFLUJO || ''}</span> — ${x.ACCION || ''}</div>
          <div style="color:#4b5563;"><i>${x.COMENTARIO || ''}</i></div>
        </div>
      `).join('')}
    </details>
  `;
}

async function cdMostrarAsociados(idDocumento) {
  let asociados = [];
  try {
    asociados = await cdObtenerAsociados(idDocumento);
  } catch (e) {
    return alert('No se pudo consultar documentos asociados.');
  }
  const existente = document.querySelector('#PSD_ModalAsociados');
  if (existente) existente.remove();

  const modal = document.createElement('div');
  modal.id = 'PSD_ModalAsociados';
  modal.style.cssText = 'position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.4); z-index:100000; display:flex; align-items:center; justify-content:center;';

  // NOTA: sin un ejemplo de respuesta con datos, se muestra clave/valor genérico.
  // Ajustar columnas específicas cuando se confirme la estructura real con adjuntos.
  let contenidoHtml;
  if (!asociados.length) {
    contenidoHtml = '<p>Este documento no tiene documentos asociados.</p>';
  } else {
    contenidoHtml = '<table style="width:100%; border-collapse:collapse; font-size:12px;">' +
      asociados.map((item, i) => `
        <tr style="border-bottom:1px solid #e5e7eb;">
          <td style="padding:4px; vertical-align:top;"><b>${i + 1}</b></td>
          <td style="padding:4px;">${Object.entries(item).map(([k, v]) => `<b>${k}:</b> ${v}`).join('<br>')}</td>
        </tr>
      `).join('') + '</table>';
  }

  modal.innerHTML = `
    <div style="background:#fff; border-radius:8px; padding:16px; width:420px; max-height:80vh; overflow-y:auto;">
      <div style="display:flex; justify-content:space-between; margin-bottom:10px;">
        <b>Documentos asociados</b>
        <button id="PSD_CerrarAsociados" style="background:none; border:none; font-size:16px; cursor:pointer;">✕</button>
      </div>
      ${contenidoHtml}
    </div>
  `;
  document.body.appendChild(modal);
  document.querySelector('#PSD_CerrarAsociados').onclick = () => modal.remove();
}

cdCrearPanel();
