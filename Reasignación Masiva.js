// ════════════════════════════════════════════════════════════════
// ═══ SCRIPT 1 DE 2: PANEL DE SEGUIMIENTO DE DOCUMENTOS ═══
// ════════════════════════════════════════════════════════════════

const CD_CONFIG = {
  urlBuscar:        'https://controldoc.minsalud.gov.co/ControlDoc/Documentos/DocumentosBuscar',
  urlInfoGeneral:   'https://controldoc.minsalud.gov.co/ControlDoc/Documentos/INFORMACIONGENERALDOCUMENTO',
  urlWorkFlow:      'https://controldoc.minsalud.gov.co/Controldoc//Gestion/ModalWorkFlow',
  urlDocsAsociados: 'https://controldoc.minsalud.gov.co/ControlDoc/Documentos/ListarDocumentosAsociados',
  urlImagenB64:     'https://controldoc.minsalud.gov.co/Controldoc//Documentos/IMAGENB64byIDDOCUMENTO/',
  urlGuardarZip:    'https://controldoc.minsalud.gov.co/Controldoc//Gestion/GuardarAdjuntosZIP',
};

const CD_BUSQUEDA_DEFAULTS = {
  IDUNIDADADMINISTRATIVA: '', IDOFICINAPRODUCTORA: '', IDSERIE: '', IDSUBSERIE: '',
  IDTIPOLOGIA: '', IDFUNCIONARIO: '', STRIDSERIES: '', STRIDSUBSERIES: '',
  DESCRIPCION: '', IDCLASE: '', MEDIORECEPCION: '', EMPRESAMENSAJERA: '0',
  DOCUMENTOID: '', NROGUIA: '', CHKFECHAS: 'false', FECHAI: '', NTIPOLOGIA: '',
  TIPOFUNCIONARIO: '', NFUNCIONARIO: '', CHKSOLOMIAS: 'false',
  LstFunc: '', LstEntidext: '', LstFuncFir: '', LstEntidextFir: '',
  LstFuncDest: '', LstEntidextDest: '', CLASEFIRDES: '', FechasActivas: 'false',
};

async function cdFetchPost(url, paramsObj) {
  const body = new URLSearchParams(paramsObj);
  return fetch(url, {
    method: 'POST', credentials: 'same-origin',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8', 'X-Requested-With': 'XMLHttpRequest' },
    body: body.toString(),
  });
}

async function cdFetchGet(url) {
  return fetch(url, { method: 'GET', credentials: 'same-origin', headers: { 'X-Requested-With': 'XMLHttpRequest' } });
}

function cdParseAspDate(str) {
  if (!str) return '';
  const m = /\/Date\((-?\d+)\)\//.exec(str);
  if (!m) return str;
  const ms = parseInt(m[1], 10);
  if (ms < 0) return '';
  return new Date(ms).toLocaleString('es-CO', { dateStyle: 'medium', timeStyle: 'short' });
}

function cdLimpiarHTML(str) {
  if (!str) return '';
  return str.replace(/<br\s*\/?>/gi, ' — ').replace(/<[^>]+>/g, '').trim();
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

async function cdBuscarDocumento(valor) {
  const tipo = cdDetectarTipo(valor);
  const params = { ...CD_BUSQUEDA_DEFAULTS, IDDOCUMENTO: tipo === 'IDDOCUMENTO' ? valor : '', RADICADO: tipo === 'RADICADO' ? valor : '' };
  const resp = await cdFetchPost(CD_CONFIG.urlBuscar, params);
  const data = await resp.json();
  if (!data || data.RESPUESTA !== true || !data.OBJETOS || !data.OBJETOS.length) {
    throw new Error('No se encontró ningún documento con ese IDC/Radicado.');
  }
  return data.OBJETOS[0];
}

async function cdObtenerFicha(idDocumento) {
  const url = `${CD_CONFIG.urlInfoGeneral}?IDDOCUMENTO=${idDocumento}`;
  const resp = await cdFetchGet(url);
  const arr = await resp.json();
  const mapa = {};
  (arr || []).forEach(item => { mapa[item.CAMPO] = item.INFORMACION; });
  return mapa;
}

function cdExtraerArrayBalanceado(texto, marcador) {
  const idxClave = texto.indexOf(marcador);
  if (idxClave === -1) return null;
  const idxInicio = texto.indexOf('[', idxClave);
  if (idxInicio === -1) return null;
  let profundidad = 0;
  for (let i = idxInicio; i < texto.length; i++) {
    if (texto[i] === '[') profundidad++;
    else if (texto[i] === ']') { profundidad--; if (profundidad === 0) return texto.substring(idxInicio, i + 1); }
  }
  return null;
}

async function cdObtenerFlujo(idDocumento, radicado) {
  const resp = await cdFetchPost(CD_CONFIG.urlWorkFlow, { IDDOCUMENTO: idDocumento, RADICADO: radicado });
  const html = await resp.text();
  const arrayTexto = cdExtraerArrayBalanceado(html, '"Data":');
  if (!arrayTexto) return [];
  let datos;
  try { datos = JSON.parse(arrayTexto); } catch (e) { console.log('❌ No se pudo parsear el flujo:', e.message); return []; }
  datos.sort((a, b) => (b.ORDEN || 0) - (a.ORDEN || 0));
  return datos;
}

async function cdObtenerAsociados(idDocumento) {
  const url = `${CD_CONFIG.urlDocsAsociados}?IDDOCUMENTO=${idDocumento}`;
  const resp = await cdFetchGet(url);
  const arr = await resp.json();
  return arr || [];
}

function cdEstadoGlobal(pasoReciente, strEstadoDocumento) {
  const estadoFlujo = (pasoReciente?.ESTADOFLUJO || '').toUpperCase().trim();
  if (estadoFlujo.includes('EXITOSA')) return { texto: 'Gestión exitosa', color: '#16a34a', fondo: '#dcfce7' };
  if (estadoFlujo === 'TRANSITO') return { texto: 'En tránsito', color: '#2563eb', fondo: '#dbeafe' };
  if (estadoFlujo === 'SIN INICIAR TRAMITE' || !estadoFlujo) return { texto: strEstadoDocumento || 'Sin tramitar', color: '#6b7280', fondo: '#f3f4f6' };
  return { texto: estadoFlujo, color: '#92400e', fondo: '#fef3c7' };
}

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
  a.href = url; a.download = `Documento_${idDocumento}.pdf`;
  document.body.appendChild(a); a.click(); a.remove();
  URL.revokeObjectURL(url);
}

async function cdDescargarAdjuntos(idDocumento) {
  const resp = await cdFetchPost(CD_CONFIG.urlGuardarZip, { IDDOCUMENTO: idDocumento, DILIGENCIADOS: 'NO' });
  const data = await resp.json();
  if (data && data.RESPUESTA === true && data.VALORESPUESTA) {
    const a = document.createElement('a');
    a.href = data.VALORESPUESTA; a.download = data.OBJETOS || `AdjuntosDoc_${idDocumento}.zip`;
    document.body.appendChild(a); a.click(); a.remove();
    return true;
  }
  alert(data?.MENSAJE || 'Este documento no tiene adjuntos disponibles.');
  return false;
}

function cdCrearPanel() {
  const existente = document.querySelector('#PanelSeguimientoDoc');
  if (existente) existente.remove();
  const cont = document.createElement('div');
  cont.id = 'PanelSeguimientoDoc';
  cont.style.cssText = 'position:fixed; top:20px; right:20px; z-index:99999; background:#fff; border:1px solid #ccc; border-radius:10px; padding:14px; box-shadow:0 4px 18px rgba(0,0,0,0.25); width:460px; max-height:88vh; overflow-y:auto; font-family:sans-serif; font-size:13px;';
  cont.innerHTML = `
    <div id="PSD_Encabezado" style="display:flex; justify-content:space-between; align-items:center; font-weight:bold; margin-bottom:10px; cursor:grab; user-select:none;">
      <span>🔎 Seguimiento de Documento — ControlDoc</span>
      <div style="display:flex; gap:4px;">
        <button id="PSD_Minimizar" title="Minimizar" style="background:none; border:none; font-size:16px; cursor:pointer; padding:2px 6px;">➖</button>
        <button id="PSD_Cerrar" title="Cerrar" style="background:none; border:none; color:#666; font-size:16px; font-weight:bold; cursor:pointer; padding:2px 6px;">✕</button>
      </div>
    </div>
    <div id="PSD_Cuerpo">
      <div style="display:flex; gap:6px; margin-bottom:10px;">
        <input id="PSD_Input" type="text" placeholder="IDC (2306470) o Radicado" style="flex:1; padding:6px; border:1px solid #ccc; border-radius:6px;">
        <button id="PSD_Buscar" style="padding:6px 12px; background:#2563eb; color:#fff; border:none; border-radius:6px; cursor:pointer; font-weight:bold;">Buscar</button>
      </div>
      <div id="PSD_Contenido"></div>
    </div>
  `;
  document.body.appendChild(cont);
  cdHabilitarArrastre(cont, document.querySelector('#PSD_Encabezado'));
  document.querySelector('#PSD_Cerrar').onclick = (e) => { e.stopPropagation(); cont.remove(); };
  document.querySelector('#PSD_Cerrar').addEventListener('mousedown', (e) => e.stopPropagation());

  let minimizado = false;
  const btnMin = document.querySelector('#PSD_Minimizar');
  const cuerpo = document.querySelector('#PSD_Cuerpo');
  btnMin.addEventListener('mousedown', (e) => e.stopPropagation());
  btnMin.onclick = () => {
    minimizado = !minimizado;
    cuerpo.style.display = minimizado ? 'none' : 'block';
    cont.style.width = minimizado ? '280px' : '460px';
    btnMin.textContent = minimizado ? '🔼' : '➖';
    btnMin.title = minimizado ? 'Expandir' : 'Minimizar';
  };

  document.querySelector('#PSD_Buscar').onclick = () => cdEjecutarBusqueda();
  document.querySelector('#PSD_Input').addEventListener('keydown', (e) => { if (e.key === 'Enter') cdEjecutarBusqueda(); });
}

function cdHabilitarArrastre(contenedor, agarre) {
  let arrastrando = false, offsetX = 0, offsetY = 0;
  agarre.addEventListener('mousedown', (e) => {
    arrastrando = true;
    const rect = contenedor.getBoundingClientRect();
    offsetX = e.clientX - rect.left; offsetY = e.clientY - rect.top;
    contenedor.style.right = 'auto'; contenedor.style.left = rect.left + 'px'; contenedor.style.top = rect.top + 'px';
  });
  document.addEventListener('mousemove', (e) => { if (!arrastrando) return; contenedor.style.left = (e.clientX - offsetX) + 'px'; contenedor.style.top = (e.clientY - offsetY) + 'px'; });
  document.addEventListener('mouseup', () => { arrastrando = false; });
}

async function cdEjecutarBusqueda() {
  const valor = document.querySelector('#PSD_Input').value.trim();
  const contenido = document.querySelector('#PSD_Contenido');
  if (!valor) return;
  contenido.innerHTML = '<div style="padding:10px; color:#666;">⏳ Consultando...</div>';
  let doc;
  try { doc = await cdBuscarDocumento(valor); } catch (err) {
    contenido.innerHTML = `<div style="padding:10px; color:#ea580c;">❌ ${err.message}</div>`;
    return;
  }
  const idDocumento = doc.IDDOCUMENTO, radicado = doc.RADICADO;
  contenido.innerHTML = cdPlantillaBase(doc);
  cdObtenerFicha(idDocumento).then(ficha => {
    document.querySelector('#PSD_Ficha').innerHTML = cdPlantillaFicha(ficha);
  }).catch(() => { document.querySelector('#PSD_Ficha').innerHTML = '<div style="color:#ea580c;">No se pudo cargar la ficha.</div>'; });
  cdObtenerFlujo(idDocumento, radicado).then(pasos => {
    document.querySelector('#PSD_Flujo').innerHTML = cdPlantillaFlujo(pasos);
    const badge = document.querySelector('#PSD_Badge');
    if (badge) {
      const estado = cdEstadoGlobal(pasos[0], doc.STRESTADODOCUMENTO);
      badge.textContent = estado.texto; badge.style.color = estado.color; badge.style.background = estado.fondo;
    }
  }).catch(() => { document.querySelector('#PSD_Flujo').innerHTML = '<div style="color:#ea580c;">No se pudo cargar el flujo.</div>'; });
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
        &nbsp;&nbsp;<span style="color:#6b7280; font-size:11px;">Radicado</span>
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
    <div style="background:#fef9c3; border-left:3px solid #ca8a04; padding:6px 8px; border-radius:4px; margin-bottom:6px; font-weight:600; color:#111827;">${campo('DETALLE')}</div>
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
      <div style="flex:1;"><div style="color:#6b7280; font-size:11px;">ENVIADO POR</div>${cdFormatearPersona(p.USUARIOASIGNO)}
        <div style="color:#6b7280; font-size:11px; margin-top:2px;">${cdParseAspDate(p.FECHAASIGNO)}</div></div>
      <div style="align-self:center; color:#9ca3af; font-size:18px;">→</div>
      <div style="flex:1;"><div style="color:#6b7280; font-size:11px;">RECIBIDO POR</div>${cdFormatearPersona(p.GESTORNOMBRESAPELLIDOS)}</div>
    </div>
    <div style="display:grid; grid-template-columns:auto 1fr; gap:2px 8px; margin-top:4px;">
      <span style="color:#6b7280;">Estado del flujo:</span><span style="font-weight:bold;">${p.ESTADOFLUJO || '—'}</span>
      <span style="color:#6b7280;">Acción/indicación:</span><span>${p.ACCION || '—'}</span>
    </div>
    <div style="background:#eff6ff; border-left:3px solid #2563eb; padding:6px 8px; border-radius:4px; margin-top:6px;">${p.COMENTARIO || '—'}</div>
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
  try { asociados = await cdObtenerAsociados(idDocumento); } catch (e) { return alert('No se pudo consultar documentos asociados.'); }
  const existente = document.querySelector('#PSD_ModalAsociados');
  if (existente) existente.remove();
  const modal = document.createElement('div');
  modal.id = 'PSD_ModalAsociados';
  modal.style.cssText = 'position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.4); z-index:100000; display:flex; align-items:center; justify-content:center;';
  let contenidoHtml;
  if (!asociados.length) { contenidoHtml = '<p>Este documento no tiene documentos asociados.</p>'; }
  else {
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
      <div style="display:flex; justify-content:space-between; margin-bottom:10px;"><b>Documentos asociados</b>
      <button id="PSD_CerrarAsociados" style="background:none; border:none; font-size:16px; cursor:pointer;">✕</button></div>
      ${contenidoHtml}
    </div>
  `;
  document.body.appendChild(modal);
  document.querySelector('#PSD_CerrarAsociados').onclick = () => modal.remove();
}

cdCrearPanel();

// ════════════════════════════════════════════════════════════════
// ═══ MOTOR DE REASIGNACIÓN (sin UI propia — usado solo por el Clasificador) ═══
// ════════════════════════════════════════════════════════════════

const CD2_CONFIG = {
  urlBandeja:     'https://controldoc.minsalud.gov.co/ControlDoc/Documentos/DOCUMENTOSGESTIONObtenerbyESTADOFLUJOeIDUSUARIOASIGNO',
  urlFuncionarios: 'https://controldoc.minsalud.gov.co/ControlDoc/Usuarios/FuncionariosObtenerByCriterios',
  urlTramitar:    'https://controldoc.minsalud.gov.co/Controldoc//Gestion/TRAMITARENUNSOLOMETODO',
};

const CD2_SUBDIRECCIONES = {
  transmisibles:     { nombre: 'Enfermedades Transmisibles',         idOficina: 41,  color: '#dc2626', emoji: '🦠' },
  noTransmisibles:   { nombre: 'Enfermedades No Transmisibles',      idOficina: 45,  color: '#7c3aed', emoji: '❤️' },
  saludAmbiental:    { nombre: 'Salud Ambiental y Cambio Climático', idOficina: 49,  color: '#059669', emoji: '🌱' },
  nutricion:         { nombre: 'Nutrición, Alimentación y Soberanía', idOficina: 53, color: '#d97706', emoji: '🍎' },
  promocion:         { nombre: 'Promoción de la Salud',               idOficina: 130, color: '#0891b2', emoji: '💙' },
};
const CD2_IDUNIDAD = 2;

async function cd2Post(url, paramsObj) {
  const body = new URLSearchParams(paramsObj);
  const resp = await fetch(url, {
    method: 'POST', credentials: 'same-origin',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8', 'X-Requested-With': 'XMLHttpRequest' },
    body: body.toString(),
  });
  return resp.json();
}

function cd2Serializar(obj, prefijo, params) {
  params = params || new URLSearchParams();
  if (Array.isArray(obj)) { obj.forEach((v, i) => cd2Serializar(v, `${prefijo}[${i}]`, params)); }
  else if (obj !== null && typeof obj === 'object') {
    Object.entries(obj).forEach(([k, v]) => { cd2Serializar(v, prefijo ? `${prefijo}[${k}]` : k, params); });
  } else { params.append(prefijo, obj === null || obj === undefined ? '' : String(obj)); }
  return params;
}

async function cd2BuscarEnBandeja(idDocumento) {
  const params = {
    sort: '', group: '', filter: '', ESTADOFLUJO: 'SIN INICIAR TRAMITE', TRAMITADO: 'NO',
    ANIO: '', MES: '', DIA: '', IDTIPOLOGIADOCUMENTAL: 0, PRIORIDAD: '', IDCLASE: 0,
    IDCONTROL: idDocumento, RADICADO: '', TIPOPROCESO: '', IDMODALIDADCONTRATACION: 0,
    IDREGIONAL: 0, IDCENTRO: 0, NUMPROCESO: '', CHCKFECHVENC: 'false', IDFUNCIONARIO_VBG: 0,
    DESCRIPCION: '', ASUNTO: '', FILTROPQR: 'NO',
  };
  const data = await cd2Post(CD2_CONFIG.urlBandeja, params);
  if (!data || !data.Data || !data.Data.length) {
    throw new Error(`No se encontró el documento ${idDocumento} pendiente en la bandeja (¿ya fue tramitado o no está asignado a ti?)`);
  }
  return data.Data[0];
}

const cd2CacheJefes = {};
async function cd2ObtenerJefe(idOficina) {
  if (cd2CacheJefes[idOficina]) return cd2CacheJefes[idOficina];
  const params = {
    IDUNIDADADMINISTRATIVA: CD2_IDUNIDAD, IDOFICINAPRODUCTORA: idOficina, IDCARGO: 2,
    NOMBRES: '', APELLIDOS: '', ListFuncSel: '[]', ListFuncCop: '[]',
    IDGRUPOTRABAJO: 0, PROCESOSENA: '', PROCEDENCIA: '', BUSCARINACTIVO: 'NO', API: '',
  };
  const url = `${CD2_CONFIG.urlFuncionarios}?${new URLSearchParams(params).toString()}`;
  const resp = await fetch(url, { credentials: 'same-origin', headers: { 'X-Requested-With': 'XMLHttpRequest' } });
  const data = await resp.json();
  if (!data || !data.length) throw new Error(`No se encontró jefe para la oficina ${idOficina}`);
  cd2CacheJefes[idOficina] = data[0];
  return data[0];
}

async function cd2ReasignarDocumento(idDocumento, claveSubdireccion, comentario) {
  const sub = CD2_SUBDIRECCIONES[claveSubdireccion];
  if (!sub) throw new Error('Subdirección no reconocida: ' + claveSubdireccion);
  const registro = await cd2BuscarEnBandeja(idDocumento);
  const jefe = await cd2ObtenerJefe(sub.idOficina);
  const ahoraISO = new Date().toISOString();
  const fechaVieja = 'Sun Dec 17 1995 00:00:00 GMT-0500 (hora estándar de Colombia)';

  const documentoGestion = {
    IDDOCUMENTO: registro.IDDOCUMENTO, FECHAASIGNO: ahoraISO,
    IDUNIDADADMINISTRATIVA: registro.IDUNIDADADMINISTRATIVA, IDOFICINAPRODUCTORA: registro.IDOFICINAPRODUCTORA,
    IDACCION: 3, IDINSTRUCCION: 0, DIAS: 0, COMENTARIO: comentario, HORAS: 0,
    ESTADOFLUJO: registro.ESTADOFLUJO, IDDOCUMENTOCONTROL: 0, ORDEN: 1, IDEXPEDIENTE: 0,
    IDTIPODOCUMENTAL: registro.IDTIPODOCUMENTAL, TRAMITADO: 'NO', FECHATRAMITO: fechaVieja,
    VERSIONFLUJONUMERICO: 0, IDDOCGESCONTROL: registro.IDDOCUMENTOGESTION, ESTADO: 'SI',
    SUBIDDOCUMENTOGESTION: 0, IDENTIDADEXT: 0, LEIDO: 'NO', FECHAQUEASIGNO: ahoraISO,
    IDREMPLAZO: 0, DOCGESGENERO: '', ORIGEN: registro.ORIGEN, IDCLASE: registro.IDCLASE,
    BPM: 'NO', IDBMPPROCESOITEM: 0, IDBMPPROCESOEXE: 0, IDBMPPROCESOITEM_SIGUIENTE: 0,
    BPMDECISIONES: '', IDBMPPROCESOITEM_DEVOLVER: 0,
    IDTIPOLOGIADOCUMENTAL_TRDC: registro.IDTIPOLOGIADOCUMENTAL_TRDC, RADICADO: registro.RADICADO,
  };

  const funcionario = { ...jefe, IDINSTRUCCION: 8, DIAS: false, COMENTARIO: comentario, SELECCIONADO: true };

  const params = cd2Serializar({ tramite: { DOCUMENTOREQUISITOS: [0], DOCUMENTOGESTION: documentoGestion, lstFUNCIONARIOS: [funcionario] } });
  params.append('ESTADOFLUJO', 'TRANSITO');
  params.append('IDDOCUMENTOGESTION', registro.IDDOCUMENTOGESTION);
  params.append('COMENTARIO', comentario);

  const resp = await fetch(CD2_CONFIG.urlTramitar, {
    method: 'POST', credentials: 'same-origin',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8', 'X-Requested-With': 'XMLHttpRequest' },
    body: params.toString(),
  });
  const data = await resp.json();
  return { idDocumento, subdireccion: sub.nombre, jefe: jefe.NOMBRESAPELLIDOS, resultado: data };
}

async function cd2ReasignarLote(listaIds, claveSubdireccion, comentario) {
  const resultados = { exitosos: [], fallidos: [] };
  for (const id of listaIds) {
    try {
      const r = await cd2ReasignarDocumento(id.trim(), claveSubdireccion, comentario);
      const ok = r.resultado && r.resultado.RESPUESTA !== false;
      console.log(ok ? '✅' : '⚠️', id, '→', r.subdireccion, '(', r.jefe, ')', r.resultado);
      if (ok) resultados.exitosos.push(id); else resultados.fallidos.push({ id, error: r.resultado });
    } catch (e) { console.log('❌', id, e.message); resultados.fallidos.push({ id, error: e.message }); }
    await new Promise(res => setTimeout(res, 1200));
  }
  console.log(`\n🏁 Lote completo. ✅ ${resultados.exitosos.length} — ❌ ${resultados.fallidos.length}`);
  return resultados;
}

// ════════════════════════════════════════════════════════════════
// ═══ SCRIPT 2 DE 2: CLASIFICADOR DE DOCUMENTOS POR COMPETENCIA ═══
// - Predicción por PALABRA COMPLETA con umbral por longitud
// - Gana la PRIMERA coincidencia en el texto
// - Filtro "🏛️ Solo Priorizaciones y Control Político" (independiente)
// - Reasignación manual embebida (única UI de reasignación)
// - Indicador de carga con botón deshabilitado al clasificar
// ════════════════════════════════════════════════════════════════

const CD3_CONFIG = { urlBandeja: 'https://controldoc.minsalud.gov.co/ControlDoc/Documentos/DOCUMENTOSGESTIONObtenerbyESTADOFLUJOeIDUSUARIOASIGNO' };

const CD3_SUBDIRECCIONES = {
  transmisibles:   { nombre: 'Enfermedades Transmisibles',          color: '#dc2626', emoji: '🦠',
    palabras: 'FIEBRE AMARILLA, LEPRA, ZOONOSIS, ETV, ENFERMEDADES TRANSMITIDAS POR VECTORES, VECTORES, VECTOR, COLVOL, HANSEN, TUBERCULOSIS, MALARIA, DENGUE, VACUNACION, VACUNACIÓN, VACUNA, VACUNAS, PAI, ZIKA, PAIWEB, RED DE FRIO, RED DE FRÍO, CHAGAS, CUIDADOCHAGAS, CUIDADO CHAGAS, BIOLOGICOS, BIOLÓGICOS, LEY DE MODERNIZACIÓN, LEY DE MODERNIZACION, LEY 2406, ENFERMEDADES TROPICALES, TROPICALES, TRACOMA, SARAMPIÓN, SARAMPION, TOLDILLOS, LEISHMANIASIS, HEPATITIS A, HEPATITIS B, COVID, T-080, T 080'},

  noTransmisibles: { nombre: 'Enfermedades No Transmisibles',       color: '#7c3aed', emoji: '❤️',
    palabras: 'CANCER, CÁNCER, DIABETES, HIPERTENSION, HIPERTENSIÓN, OBESIDAD, TABACO, NICOTINA, VAPEADORES, VAPEADOR, ENFERMEDADES CRONICAS, ENFERMEDADES CRÓNICAS, ENFERMEDADES HUERFANAS, ENFERMEDADES HUÉRFANAS, ENFERMEDADES RARAS, ETIQUETADO, EMPAQUETADO, CIGARRILOS, CIGARRILLO, BUCAL, SALUD BUCAL, SALUD VISUAL, ASMA, CIGARRILLO ELECTRICO, CIGARRILLO ELÉCTRICO, ALIMENTACIÓN SALUDABLE, ALIMENTACION SALUDABLE' },

  saludAmbiental:  { nombre: 'Salud Ambiental y Cambio Climático',  color: '#059669', emoji: '🌱',
    palabras: 'CAMBIO CLIMATICO, CAMBIO CLIMÁTICO, CALIDAD DEL AIRE, RESIDUOS, AGUA POTABLE, SANEAMIENTO, AGUA PARA EL CONSUMO HUMANO, PISCINAS, PISCINA, CADAVER, CADÁVER, PESTISIDAS, MINERIA ILEGAL, MINERÍA ILEGAL, T-236, T 236, GLIFOSATO, TANATOPRAXIA, INCINERACIÓN, INCINERACION, CREMACIÓN, CREMACION, RESIDUOS, PISA, POLÍTICA INTEGRAL DE SALUD AMBIENTAL, POLITICA INTEGRAL DE SALUD AMBIENTAL, SUISA, SISTEMA UNIFICADO DE INFORMACIÓN DE SALUD AMBIENTAL, SISTEMA UNIFICADO DE INFORMACION DE SALUD AMBIENTAL, SANEAMIENTO BASICO, SANEAMIENTO BÁSICO, PIGCCS, PLAN INTEGRAL DE GESTIÓN DEL CAMBIO CLIMATICO DEL SECTOR SALUD, PLAN INTEGRAL DE GESTION DEL CAMBIO CLIMATICO DEL SECTOR SALUD, RUIDO, COSMETICOS, COSMÉTICOS, GETSA, GESTIÓN TERRITORIAL EN SALUD AMBIENTAL, GESTION TERRITORIAL EN SALUD AMBIENTAL, VACUNA ANTIRRABICA, VACUNA ANTIRRÁBICA, PERRO, PERROS, GATO, GATOS, COTSA, CONSEJOS TERRITORIALES DE SALUD AMBIENTAL CONASA, SEGURIDAD VIAL, RESOLUCIÓN 0234 DE 2026, RESOLUCION 0234 DE 2026, RESOLUCIÓN 0929 DE 2026, RESOLUCION 0929 DE 2026, PNEET, CALIDAD DEL AIRE EN EL INTERIOR, SENTENCIA T614, T-614, T 614, PTACCA, PLANES TERRITORIALES EN ADAPTACIÓN AL CAMBIO CLIMATICO DESDE SALUD AMBIENTAL, PLANES TERRITORIALES EN ADAPTACION AL CAMBIO CLIMATICO DESDE SALUD AMBIENTAL, PLAGISIDAS, PESTISIDAS, RESIDUOS, AGUAS RESIDUALES, CEMENTERIOS, ENTORNOS SALUDABLES, DECRETO 1085 DE 2021, EISA, ESTRATEGIA INTEGRADORA DE SALUD AMBIENTAL, MERCURIO, METALES, T-622 DE 2016, T 622, IPIAC, '},

  nutricion:       { nombre: 'Nutrición, Alimentación y Soberanía', color: '#d97706', emoji: '🍎',
    palabras: 'ALIMENTACION ESCOLAR, ALIMENTACIÓN ESCOLAR, DESNUTRICION, DESNUTRICIÓN, LACTANCIA, SOBERANIA ALIMENTARIA, SOBERANÍA ALIMENTARIA' },

  promocion:       { nombre: 'Promoción de la Salud',               color: '#0891b2', emoji: '💙',
    palabras: 'VIH, PEP, PREP, PROFILAXIS, SEXUALIDAD, DERECHOS SEXUALES, DERECHOS REPRODUCTIVOS, ANTICONCEPCION, ANTICONCEPCIÓN, INFERTILIDAD, AUTONOMIA REPRODUCTIVA, AUTONOMÍA REPRODUCTIVA, INTERRUPCION VOLUNTARIA DEL EMBARAZO, INTERRUPCIÓN VOLUNTARIA DEL EMBARAZO, IVE, SALUD MENSTRUAL, CUIDADO MENSTRUAL, ENDOMETRIOSIS, SALUD SEXUAL, SALUD REPRODUCTIVA, NINAS NINOS Y ADOLESCENTES, NIÑAS NIÑOS Y ADOLESCENTES, SALUD TRANS, VIOLENCIAS BASADAS EN GENERO, VIOLENCIAS BASADAS EN GÉNERO, VIDA LIBRE DE VIOLENCIAS, ATENCION A VICTIMAS, ATENCIÓN A VÍCTIMAS, SIVIGE, ABORDAJE DEL VIH, INFECCION POR VIH, INFECCIÓN POR VIH, HEPATITIS, ETMI PLUS, ASPECTOS BIOETICOS, ASPECTOS BIOÉTICOS, MUERTE DIGNA, SUBROGACION UTERINA, SUBROGACIÓN UTERINA, TRIAGE ETICO, TRIAGE ÉTICO, POLITICA NACIONAL DE SEXUALIDAD, POLÍTICA NACIONAL DE SEXUALIDAD' },
};

let CD3_PALABRAS_PRIORIZACION = 'HONORABLE SENADOR, HONORABLE SENADORA, HONORABLE REPRESENTANTE, SENADOR DE LA REPUBLICA, SENADOR DE LA REPÚBLICA, SENADORA DE LA REPUBLICA, SENADORA DE LA REPÚBLICA, SENADO DE LA REPUBLICA, SENADO DE LA REPÚBLICA, SENADO, SENADOR, SENADORA, CONGRESISTA, REPRESENTANTE A LA CAMARA, REPRESENTANTE A LA CÁMARA, CAMARA DE REPRESENTANTES, CÁMARA DE REPRESENTANTES, PROPOSICION, PROPOSICIÓN, DEBATE DE CONTROL POLITICO, DEBATE DE CONTROL POLÍTICO, CITACION, CITACIÓN, CONGRESO DE LA REPUBLICA, CONGRESO DE LA REPÚBLICA, CONCEJO MUNICIPAL, CONCEJO DISTRITAL, CONCEJAL, CONCEJALA, ASAMBLEA DEPARTAMENTAL, DIPUTADO, DIPUTADA, CONTRALORIA, CONTRALORÍA, CONTRALORIA GENERAL, CONTRALORÍA GENERAL, CONTRALOR, CONTRALORA, PROCURADURIA, PROCURADURÍA, PROCURADURIA GENERAL, PROCURADURÍA GENERAL, PROCURADOR, PROCURADORA, DEFENSORIA DEL PUEBLO, DEFENSORÍA DEL PUEBLO, DEFENSOR DEL PUEBLO, DEFENSORA DEL PUEBLO, PERSONERIA, PERSONERÍA, PERSONERO, PERSONERA, VEEDURIA, VEEDURÍA, VEEDOR, VEEDORA';

let CD3_DOCUMENTOS = [];
let CD3_FILTRO_ACTUAL = 'todos';

function cd3EscaparRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

const CD3_LETRAS = 'A-ZÁÉÍÓÚÑÜ0-9';

function cd3BuscarPrimeraOcurrencia(texto, palabra) {
  const escapada = cd3EscaparRegex(palabra);
  const requiereLimiteDerecho = palabra.length <= 4;
  const patron = requiereLimiteDerecho
    ? `(?<![${CD3_LETRAS}])${escapada}(?![${CD3_LETRAS}])`
    : `(?<![${CD3_LETRAS}])${escapada}`;
  const regex = new RegExp(patron);
  const match = texto.match(regex);
  return match ? match.index : -1;
}

function cd3ClasificarDocumento(doc) {
  const texto = `${doc.DESCRIPCION || ''} ${doc.RADICADO || ''}`.toUpperCase();

  let mejorClave = null;
  let mejorPosicion = Infinity;

  for (const [clave, sub] of Object.entries(CD3_SUBDIRECCIONES)) {
    const palabras = sub.palabras.split(',').map(p => p.trim().toUpperCase()).filter(Boolean);
    for (const palabra of palabras) {
      const posicion = cd3BuscarPrimeraOcurrencia(texto, palabra);
      if (posicion !== -1 && posicion < mejorPosicion) {
        mejorPosicion = posicion;
        mejorClave = clave;
      }
    }
  }

  const palabrasPriorizacion = CD3_PALABRAS_PRIORIZACION.split(',').map(p => p.trim().toUpperCase()).filter(Boolean);
  const esPriorizacion = palabrasPriorizacion.some(p => cd3BuscarPrimeraOcurrencia(texto, p) !== -1);

  return { prediccion: mejorClave, esPriorizacion };
}

async function cd3ObtenerPendientes() {
  const params = {
    sort: '', group: '', filter: '', ESTADOFLUJO: 'SIN INICIAR TRAMITE', TRAMITADO: 'NO',
    ANIO: '', MES: '', DIA: '', IDTIPOLOGIADOCUMENTAL: 0, PRIORIDAD: '', IDCLASE: 0,
    IDCONTROL: 0, RADICADO: '', TIPOPROCESO: '', IDMODALIDADCONTRATACION: 0,
    IDREGIONAL: 0, IDCENTRO: 0, NUMPROCESO: '', CHCKFECHVENC: 'false', IDFUNCIONARIO_VBG: 0,
    DESCRIPCION: '', ASUNTO: '', FILTROPQR: 'NO',
  };
  const body = new URLSearchParams(params);
  const resp = await fetch(CD3_CONFIG.urlBandeja, {
    method: 'POST', credentials: 'same-origin',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8', 'X-Requested-With': 'XMLHttpRequest' },
    body: body.toString(),
  });
  const data = await resp.json();
  return (data && data.Data) ? data.Data : [];
}

async function cd3EjecutarClasificacion() {
  const btn = document.querySelector('#PCD_Clasificar');
  const estado = document.querySelector('#PCD_Estado');

  // Indicador de carga: deshabilita el botón y cambia su texto mientras dura la consulta
  const textoOriginal = btn.textContent;
  btn.disabled = true;
  btn.style.opacity = '0.6';
  btn.style.cursor = 'not-allowed';
  btn.textContent = '⏳ Cargando documentos...';
  estado.textContent = '⏳ Consultando documentos pendientes...';

  let pendientes;
  try {
    pendientes = await cd3ObtenerPendientes();
  } catch (e) {
    estado.textContent = '❌ Error al consultar la bandeja: ' + e.message;
    btn.disabled = false;
    btn.style.opacity = '1';
    btn.style.cursor = 'pointer';
    btn.textContent = textoOriginal;
    return;
  }

  if (!pendientes.length) {
    estado.textContent = 'No hay documentos pendientes en este momento.';
    CD3_DOCUMENTOS = [];
    cd3RenderizarResultados();
  } else {
    CD3_DOCUMENTOS = pendientes.map(doc => {
      const { prediccion, esPriorizacion } = cd3ClasificarDocumento(doc);
      return { idc: doc.IDDOCUMENTO, radicado: doc.RADICADO, asunto: doc.DESCRIPCION || '(sin descripción)', prediccion, esPriorizacion, manual: prediccion, estadoEnvio: null };
    });
    estado.textContent = `✅ ${CD3_DOCUMENTOS.length} documento(s) clasificado(s).`;
    cd3RenderizarResultados();
  }

  btn.disabled = false;
  btn.style.opacity = '1';
  btn.style.cursor = 'pointer';
  btn.textContent = textoOriginal;
}

function cd3RenderizarResultados() {
  const cont = document.querySelector('#PCD_TablaResultados');
  const contador = document.querySelector('#PCD_ContadorResultados');
  if (!CD3_DOCUMENTOS.length) {
    cont.innerHTML = '<div style="color:#9ca3af; font-size:12px; padding:10px 0;">Aún no hay documentos clasificados.</div>';
    contador.textContent = '';
    return;
  }

  let documentosFiltrados = CD3_DOCUMENTOS;
  if (CD3_FILTRO_ACTUAL === 'con-prediccion') documentosFiltrados = CD3_DOCUMENTOS.filter(d => !!d.manual);
  else if (CD3_FILTRO_ACTUAL === 'sin-prediccion') documentosFiltrados = CD3_DOCUMENTOS.filter(d => !d.manual);
  else if (CD3_FILTRO_ACTUAL === 'priorizacion') documentosFiltrados = CD3_DOCUMENTOS.filter(d => d.esPriorizacion);
  else if (CD3_SUBDIRECCIONES[CD3_FILTRO_ACTUAL]) documentosFiltrados = CD3_DOCUMENTOS.filter(d => d.manual === CD3_FILTRO_ACTUAL);

  contador.textContent = `(${documentosFiltrados.length} de ${CD3_DOCUMENTOS.length})`;

  const opcionesSelect = Object.entries(CD3_SUBDIRECCIONES).map(([clave, sub]) => `<option value="${clave}">${sub.emoji} ${sub.nombre}</option>`).join('');

  if (!documentosFiltrados.length) {
    cont.innerHTML = '<div style="color:#9ca3af; font-size:12px; padding:10px 0;">Ningún documento coincide con el filtro seleccionado.</div>';
    return;
  }

  const filas = documentosFiltrados.map((d) => {
    const i = CD3_DOCUMENTOS.indexOf(d);
    const iconoEstado = d.estadoEnvio === 'ok' ? '✅' : d.estadoEnvio === 'error' ? '❌' : d.estadoEnvio === 'enviando' ? '⏳' : '';
    return `
    <tr style="border-bottom:1px solid #e5e7eb;">
      <td style="padding:5px; font-weight:bold;">${d.idc}</td>
      <td style="padding:5px; max-width:110px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;" title="${d.asunto}">${d.asunto}</td>
      <td style="padding:5px;">
        <select data-idx="${i}" class="cd3-select-sub" style="width:100%; font-size:11px; padding:2px;">
          <option value="">— Sin predicción —</option>${opcionesSelect}
        </select>
      </td>
      <td style="padding:5px; text-align:center;" title="Priorizaciones y Control Político">${d.esPriorizacion ? '🏛️' : ''}</td>
      <td style="padding:5px; text-align:center; white-space:nowrap;">
        <button data-idx="${i}" class="cd3-btn-preview" title="Previsualizar PDF" style="padding:3px 5px; background:#e5e7eb; border:none; border-radius:4px; cursor:pointer; font-size:11px;">👁</button>
        <button data-idx="${i}" class="cd3-btn-adjuntos" title="Descargar Adjuntos" style="padding:3px 5px; background:#e5e7eb; border:none; border-radius:4px; cursor:pointer; font-size:11px;">📎</button>
        <button data-idx="${i}" class="cd3-btn-reasignar" title="Reasignar" style="padding:3px 5px; background:#111827; color:#fff; border:none; border-radius:4px; cursor:pointer; font-size:11px;" ${!d.manual ? 'disabled' : ''}>🚀</button>
        <span style="margin-left:2px;">${iconoEstado}</span>
      </td>
    </tr>`;
  }).join('');

  cont.innerHTML = `
    <table style="width:100%; border-collapse:collapse; font-size:12px;">
      <thead><tr style="background:#f3f4f6; text-align:left;">
        <th style="padding:5px;">IDC</th><th style="padding:5px;">Asunto</th><th style="padding:5px;">Predicción</th><th style="padding:5px;" title="Priorizaciones y Control Político">🏛️</th><th style="padding:5px;">Acciones</th>
      </tr></thead>
      <tbody>${filas}</tbody>
    </table>
  `;

  cont.querySelectorAll('.cd3-select-sub').forEach(sel => {
    const idx = Number(sel.dataset.idx);
    sel.value = CD3_DOCUMENTOS[idx].prediccion || '';
    sel.onchange = () => { CD3_DOCUMENTOS[idx].manual = sel.value || null; cd3RenderizarResultados(); };
  });

  cont.querySelectorAll('.cd3-btn-preview').forEach(btn => {
    btn.onclick = () => {
      const doc = CD3_DOCUMENTOS[Number(btn.dataset.idx)];
      if (typeof cdPrevisualizarPdf === 'function') cdPrevisualizarPdf(doc.idc);
      else alert('Falta cargar el Panel de Seguimiento de Documentos (Script 1).');
    };
  });

  cont.querySelectorAll('.cd3-btn-adjuntos').forEach(btn => {
    btn.onclick = () => {
      const doc = CD3_DOCUMENTOS[Number(btn.dataset.idx)];
      if (typeof cdDescargarAdjuntos === 'function') cdDescargarAdjuntos(doc.idc);
      else alert('Falta cargar el Panel de Seguimiento de Documentos (Script 1).');
    };
  });

  cont.querySelectorAll('.cd3-btn-reasignar').forEach(btn => {
    btn.onclick = async () => {
      const idx = Number(btn.dataset.idx);
      const doc = CD3_DOCUMENTOS[idx];
      if (!doc.manual) return;
      const sub = CD2_SUBDIRECCIONES[doc.manual];
      const comentario = document.querySelector('#PCD_ComentarioReasignacion')?.value.trim() || 'Se remite para trámite pertinente';
      const jefe = await cd2ObtenerJefe(sub.idOficina).catch(() => null);
      const nombreJefe = jefe ? jefe.NOMBRESAPELLIDOS : '(jefe no identificado)';
      if (!confirm(`¿Reasignar el IDC ${doc.idc} a "${sub.nombre}"?\n\nJefe destino: ${nombreJefe}`)) return;
      doc.estadoEnvio = 'enviando'; cd3RenderizarResultados();
      try {
        const r = await cd2ReasignarDocumento(String(doc.idc), doc.manual, comentario);
        const ok = r.resultado && r.resultado.RESPUESTA !== false;
        doc.estadoEnvio = ok ? 'ok' : 'error';
        console.log(ok ? '✅' : '⚠️', doc.idc, '→', r.subdireccion, r.resultado);
      } catch (e) { doc.estadoEnvio = 'error'; console.log('❌', doc.idc, e.message); }
      cd3RenderizarResultados();
    };
  });
}

async function cd3ReasignarTodosLosClasificados() {
  const btn = document.querySelector('#PCD_ReasignarTodo');

  let base = CD3_DOCUMENTOS;
  if (CD3_FILTRO_ACTUAL === 'con-prediccion') base = CD3_DOCUMENTOS.filter(d => !!d.manual);
  else if (CD3_FILTRO_ACTUAL === 'sin-prediccion') base = CD3_DOCUMENTOS.filter(d => !d.manual);
  else if (CD3_FILTRO_ACTUAL === 'priorizacion') base = CD3_DOCUMENTOS.filter(d => d.esPriorizacion);
  else if (CD3_SUBDIRECCIONES[CD3_FILTRO_ACTUAL]) base = CD3_DOCUMENTOS.filter(d => d.manual === CD3_FILTRO_ACTUAL);

  const pendientes = base.filter(d => d.manual && d.estadoEnvio !== 'ok');
  if (!pendientes.length) return alert('No hay documentos pendientes por reasignar dentro del filtro actual.');

  const grupos = {};
  pendientes.forEach(d => { if (!grupos[d.manual]) grupos[d.manual] = []; grupos[d.manual].push(d); });
  const resumen = Object.entries(grupos).map(([clave, docs]) => `${CD3_SUBDIRECCIONES[clave].nombre}: ${docs.length} documento(s)`).join('\n');
  const etiquetaFiltro = CD3_FILTRO_ACTUAL === 'todos' ? 'todos los clasificados' : `el filtro activo`;

  if (!confirm(`Se reasignarán ${pendientes.length} documento(s) dentro de ${etiquetaFiltro}:\n\n${resumen}\n\n¿Confirmas?`)) return;

  const comentario = document.querySelector('#PCD_ComentarioReasignacion')?.value.trim() || 'Se remite para trámite pertinente';
  const estado = document.querySelector('#PCD_EstadoReasignacionMasiva');

  const textoOriginal = btn.textContent;
  btn.disabled = true;
  btn.style.opacity = '0.6';
  btn.style.cursor = 'not-allowed';
  btn.textContent = '⏳ Reasignando...';

  let hechos = 0;
  for (const [clave, docs] of Object.entries(grupos)) {
    for (const doc of docs) {
      doc.estadoEnvio = 'enviando'; cd3RenderizarResultados();
      try {
        const r = await cd2ReasignarDocumento(String(doc.idc), clave, comentario);
        const ok = r.resultado && r.resultado.RESPUESTA !== false;
        doc.estadoEnvio = ok ? 'ok' : 'error';
      } catch (e) { doc.estadoEnvio = 'error'; }
      hechos++;
      if (estado) estado.textContent = `⏳ Procesando ${hechos}/${pendientes.length}...`;
      cd3RenderizarResultados();
      await new Promise(res => setTimeout(res, 1200));
    }
  }
  const exitosos = pendientes.filter(d => d.estadoEnvio === 'ok').length;
  if (estado) estado.textContent = `🏁 Completado: ${exitosos} exitosos, ${pendientes.length - exitosos} fallidos (dentro del filtro).`;

  btn.disabled = false;
  btn.style.opacity = '1';
  btn.style.cursor = 'pointer';
  btn.textContent = textoOriginal;
}

async function cd3ReasignarLoteManual(claveSubdireccion, btnRef) {
  const sub = CD2_SUBDIRECCIONES[claveSubdireccion];
  const idsRaw = document.querySelector('#PCD_ManualIds').value.trim();
  const comentario = document.querySelector('#PCD_ComentarioReasignacion')?.value.trim() || 'Se remite para trámite pertinente';
  const estado = document.querySelector('#PCD_EstadoManual');
  if (!idsRaw) return alert('Ingresa al menos un IDC o Radicado en el cuadro de arriba.');
  const lista = idsRaw.split(/[\n,;]+/).map(s => s.trim()).filter(Boolean);
  const jefe = await cd2ObtenerJefe(sub.idOficina).catch(() => null);
  const nombreJefe = jefe ? jefe.NOMBRESAPELLIDOS : '(jefe no identificado)';
  if (!confirm(`¿Confirmas reasignar ${lista.length} documento(s) a "${sub.nombre}"?\n\nJefe destino: ${nombreJefe}\n\nDocumentos: ${lista.join(', ')}`)) return;

  const textoOriginal = btnRef.textContent;
  estado.textContent = `⏳ Procesando ${lista.length} documento(s)...`;
  btnRef.disabled = true;
  btnRef.style.opacity = '0.6';
  btnRef.style.cursor = 'not-allowed';

  const resultados = await cd2ReasignarLote(lista, claveSubdireccion, comentario);

  btnRef.disabled = false;
  btnRef.style.opacity = '1';
  btnRef.style.cursor = 'pointer';
  estado.textContent = `✅ ${resultados.exitosos.length} exitosos, ❌ ${resultados.fallidos.length} fallidos. Revisa la consola para detalle.`;
}

function cd3ToggleSeccion(idCuerpo, idFlecha) {
  const cuerpo = document.querySelector(idCuerpo);
  const flecha = document.querySelector(idFlecha);
  const oculto = cuerpo.style.display === 'none';
  cuerpo.style.display = oculto ? 'block' : 'none';
  flecha.textContent = oculto ? '▾' : '▸';
}

function cd3CrearPanel() {
  const existente = document.querySelector('#PanelClasificadorDoc');
  if (existente) existente.remove();
  const cont = document.createElement('div');
  cont.id = 'PanelClasificadorDoc';
  cont.style.cssText = 'position:fixed; top:20px; left:20px; z-index:99999; background:#fff; border:1px solid #ccc; border-radius:10px; padding:14px; box-shadow:0 4px 18px rgba(0,0,0,0.25); width:540px; max-height:88vh; overflow-y:auto; font-family:sans-serif; font-size:13px;';

  const palabrasHtml = Object.entries(CD3_SUBDIRECCIONES).map(([clave, sub]) => `
    <div style="margin-bottom:8px;">
      <label style="color:${sub.color}; font-size:11px; font-weight:bold;">${sub.emoji} ${sub.nombre}</label>
      <textarea data-clave="${clave}" class="cd3-palabras" rows="1" style="width:100%; padding:4px; border:1px solid #ccc; border-radius:4px; font-size:11px; box-sizing:border-box;">${sub.palabras}</textarea>
    </div>
  `).join('');

  const botonesManuales = Object.entries(CD2_SUBDIRECCIONES).map(([clave, sub]) => `
    <button class="cd3-btn-manual-sub" data-clave="${clave}" style="display:block; width:100%; text-align:left; padding:8px 10px; margin-bottom:6px; background:${sub.color}; color:#fff; border:none; border-radius:6px; cursor:pointer; font-weight:600;">
      ${sub.emoji} ${sub.nombre}
    </button>
  `).join('');

  cont.innerHTML = `
    <div id="PCD_EncabezadoGeneral" style="display:flex; justify-content:space-between; align-items:center; font-weight:bold; margin-bottom:12px; cursor:grab; user-select:none;">
      <span>🔍 Clasificador por Competencia</span>
      <div style="display:flex; gap:4px;">
        <button id="PCD_MinimizarTodo" title="Minimizar panel completo" style="background:none; border:none; font-size:16px; cursor:pointer;">➖</button>
        <button id="PCD_Cerrar" title="Cerrar" style="background:none; border:none; font-size:16px; cursor:pointer;">✕</button>
      </div>
    </div>
    <div id="PCD_CuerpoGeneral">
      <div style="border:1px solid #e5e7eb; border-radius:8px; margin-bottom:10px; overflow:hidden;">
        <div id="PCD_HeaderSec1" style="display:flex; justify-content:space-between; align-items:center; padding:8px 10px; background:#f9fafb; cursor:pointer; font-weight:bold;">
          <span><span id="PCD_FlechaSec1">▸</span> ⚙️ Configuración de Palabras Clave</span>
        </div>
        <div id="PCD_CuerpoSec1" style="display:none; padding:10px;">
          ${palabrasHtml}
          <label style="color:#6b7280; font-size:11px; font-weight:bold;">🏛️ Palabras clave — Priorizaciones y Control Político</label>
          <textarea id="PCD_PalabrasPriorizacion" rows="3" style="width:100%; padding:4px; border:1px solid #ccc; border-radius:4px; font-size:11px; box-sizing:border-box;">${CD3_PALABRAS_PRIORIZACION}</textarea>
          <button id="PCD_GuardarPalabras" style="margin-top:8px; width:100%; padding:7px; background:#374151; color:#fff; border:none; border-radius:6px; cursor:pointer; font-size:12px;">💾 Guardar y Reclasificar</button>
        </div>
      </div>
      <div style="border:1px solid #e5e7eb; border-radius:8px; margin-bottom:10px; overflow:hidden;">
        <div id="PCD_HeaderSec2" style="display:flex; justify-content:space-between; align-items:center; padding:8px 10px; background:#f9fafb; cursor:pointer; font-weight:bold;">
          <span><span id="PCD_FlechaSec2">▾</span> 🔄 Cargar y Clasificar</span>
        </div>
        <div id="PCD_CuerpoSec2" style="display:block; padding:10px;">
          <button id="PCD_Clasificar" style="width:100%; padding:8px; background:#111827; color:#fff; border:none; border-radius:6px; cursor:pointer; font-weight:bold;">🔄 Cargar Documentos Pendientes de la Bandeja</button>
          <div id="PCD_Estado" style="font-size:12px; color:#6b7280; margin-top:8px;"></div>
        </div>
      </div>
      <div style="border:1px solid #e5e7eb; border-radius:8px; margin-bottom:10px; overflow:hidden;">
        <div id="PCD_HeaderSec3" style="display:flex; justify-content:space-between; align-items:center; padding:8px 10px; background:#f9fafb; cursor:pointer; font-weight:bold;">
          <span><span id="PCD_FlechaSec3">▾</span> 📊 Resultados <span id="PCD_ContadorResultados" style="color:#6b7280; font-weight:normal;"></span></span>
        </div>
        <div id="PCD_CuerpoSec3" style="display:block; padding:10px;">
          <label style="color:#6b7280; font-size:11px;">Comentario del trámite (se usa al reasignar desde este panel)</label>
          <input id="PCD_ComentarioReasignacion" type="text" value="Se remite para trámite pertinente" style="width:100%; padding:5px; border:1px solid #ccc; border-radius:4px; margin:3px 0 8px; font-size:11px; box-sizing:border-box;">

          <label style="color:#6b7280; font-size:11px;">Filtrar tabla</label>
          <select id="PCD_FiltroTabla" style="width:100%; padding:5px; border:1px solid #ccc; border-radius:4px; margin:3px 0 8px; font-size:11px; box-sizing:border-box;">
            <option value="todos">📋 Todos</option>
            <option value="con-prediccion">✅ Con predicción</option>
            <option value="sin-prediccion">⚠️ Sin predicción</option>
            <option value="priorizacion">🏛️ Priorizaciones y Control Político</option>
            ${Object.entries(CD3_SUBDIRECCIONES).map(([clave, sub]) => `<option value="${clave}">${sub.emoji} Solo: ${sub.nombre}</option>`).join('')}
          </select>

          <div id="PCD_TablaResultados" style="max-height:280px; overflow-y:auto;">
            <div style="color:#9ca3af; font-size:12px; padding:10px 0;">Aún no hay documentos clasificados.</div>
          </div>
          <button id="PCD_ReasignarTodo" style="width:100%; margin-top:10px; padding:8px; background:#16a34a; color:#fff; border:none; border-radius:6px; cursor:pointer; font-weight:bold;">🚀 Reasignar clasificados (respeta el filtro activo)</button>
          <div id="PCD_EstadoReasignacionMasiva" style="font-size:12px; color:#6b7280; margin-top:6px;"></div>
        </div>
      </div>

      <div style="border:1px solid #e5e7eb; border-radius:8px; margin-top:10px; overflow:hidden;">
        <div id="PCD_HeaderSec4" style="display:flex; justify-content:space-between; align-items:center; padding:8px 10px; background:#f9fafb; cursor:pointer; font-weight:bold;">
          <span><span id="PCD_FlechaSec4">▸</span> 📥 Reasignación Manual (pegar IDs sueltos)</span>
        </div>
        <div id="PCD_CuerpoSec4" style="display:none; padding:10px;">
          <label style="color:#6b7280; font-size:11px;">IDCs o Radicados (uno por línea, o separados por coma)</label>
          <textarea id="PCD_ManualIds" rows="4" style="width:100%; padding:6px; border:1px solid #ccc; border-radius:6px; margin:4px 0 10px; box-sizing:border-box;" placeholder="2333190, 2332499, 2328268&#10;o uno por línea"></textarea>
          ${botonesManuales}
          <div id="PCD_EstadoManual" style="margin-top:8px; font-size:12px; color:#6b7280;"></div>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(cont);
  cd3HabilitarArrastre(cont, document.querySelector('#PCD_EncabezadoGeneral'));

  document.querySelector('#PCD_Cerrar').onclick = (e) => { e.stopPropagation(); cont.remove(); };
  document.querySelector('#PCD_Cerrar').addEventListener('mousedown', (e) => e.stopPropagation());

  let minimizadoTodo = false;
  const btnMinTodo = document.querySelector('#PCD_MinimizarTodo');
  const cuerpoGeneral = document.querySelector('#PCD_CuerpoGeneral');
  btnMinTodo.addEventListener('mousedown', (e) => e.stopPropagation());
  btnMinTodo.onclick = () => {
    minimizadoTodo = !minimizadoTodo;
    cuerpoGeneral.style.display = minimizadoTodo ? 'none' : 'block';
    cont.style.width = minimizadoTodo ? '300px' : '540px';
    btnMinTodo.textContent = minimizadoTodo ? '🔼' : '➖';
  };

  document.querySelector('#PCD_HeaderSec1').onclick = () => cd3ToggleSeccion('#PCD_CuerpoSec1', '#PCD_FlechaSec1');
  document.querySelector('#PCD_HeaderSec2').onclick = () => cd3ToggleSeccion('#PCD_CuerpoSec2', '#PCD_FlechaSec2');
  document.querySelector('#PCD_HeaderSec3').onclick = () => cd3ToggleSeccion('#PCD_CuerpoSec3', '#PCD_FlechaSec3');
  document.querySelector('#PCD_HeaderSec4').onclick = () => cd3ToggleSeccion('#PCD_CuerpoSec4', '#PCD_FlechaSec4');

  document.querySelector('#PCD_Clasificar').onclick = cd3EjecutarClasificacion;
  document.querySelector('#PCD_ReasignarTodo').onclick = cd3ReasignarTodosLosClasificados;

  document.querySelector('#PCD_FiltroTabla').onchange = (e) => {
    CD3_FILTRO_ACTUAL = e.target.value;
    cd3RenderizarResultados();
  };

  document.querySelector('#PCD_GuardarPalabras').onclick = () => {
    document.querySelectorAll('.cd3-palabras').forEach(ta => { CD3_SUBDIRECCIONES[ta.dataset.clave].palabras = ta.value; });
    CD3_PALABRAS_PRIORIZACION = document.querySelector('#PCD_PalabrasPriorizacion').value;
    if (CD3_DOCUMENTOS.length) cd3EjecutarClasificacion();
    else alert('Palabras clave guardadas. Abre "Cargar y Clasificar" para ver el resultado.');
  };

  cont.querySelectorAll('.cd3-btn-manual-sub').forEach(btn => {
    btn.addEventListener('mousedown', (e) => e.stopPropagation());
    btn.onmouseenter = () => btn.style.opacity = '0.85';
    btn.onmouseleave = () => btn.style.opacity = '1';
    btn.onclick = () => cd3ReasignarLoteManual(btn.dataset.clave, btn);
  });
}

function cd3HabilitarArrastre(contenedor, agarre) {
  let arrastrando = false, offsetX = 0, offsetY = 0;
  agarre.addEventListener('mousedown', (e) => {
    arrastrando = true;
    const rect = contenedor.getBoundingClientRect();
    offsetX = e.clientX - rect.left; offsetY = e.clientY - rect.top;
    contenedor.style.right = 'auto'; contenedor.style.left = rect.left + 'px'; contenedor.style.top = rect.top + 'px';
  });
  document.addEventListener('mousemove', (e) => { if (!arrastrando) return; contenedor.style.left = (e.clientX - offsetX) + 'px'; contenedor.style.top = (e.clientY - offsetY) + 'px'; });
  document.addEventListener('mouseup', () => { arrastrando = false; });
}

cd3CrearPanel();
