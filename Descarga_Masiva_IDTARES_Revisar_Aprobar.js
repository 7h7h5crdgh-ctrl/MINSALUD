// ==========================================
// DESCARGA MASIVA — ÚLTIMA VERSIÓN PDF POR IDTAREADOC (TareasDoc - ControlDoc)
// Pega varios IDTAREADOC, el script consulta el flujo de cada uno, toma el
// paso más reciente que tenga PDF diligenciado y lo descarga (en un ZIP o
// archivo por archivo). Solo lectura: no modifica ninguna tarea.
// USO: pegar en consola (F12) estando logueado en ControlDoc.
// ==========================================

const TDM_CONFIG = {
  urlValidar:  'https://controldoc.minsalud.gov.co/Controldoc//TareasDoc/ValidarTraladosRadicados/',
  urlCrearDoc: 'https://controldoc.minsalud.gov.co/Controldoc//TareasDoc/CrearDoc',
  urlPdfB64:   'https://controldoc.minsalud.gov.co/Controldoc//TareasDoc/Base64DocumentoPdf',
  urlRutaRepo: 'https://controldoc.minsalud.gov.co/Controldoc///Home/ObtenerValorLlave?key=RUTAREPOSITORIO',
};

// Consultas simultáneas. Si notas PDFs cruzados entre tareas, bájalo a 1.
const TDM_CONCURRENCIA = 3;
// Pausa entre descargas en modo individual (evita que el navegador las bloquee).
const TDM_PAUSA_INDIVIDUAL_MS = 500;

let TDM_RUTA_REPO = null;
let TDM_RESULTADOS = [];   // { id, estado: 'pendiente'|'procesando'|'ok'|'error', orden, totalPasos, asunto, nombre, blob, error }
let TDM_EN_CURSO = false;

// ---------- utilidades de red ----------
async function tdmPost(url, params) {
  return fetch(url, {
    method: 'POST', credentials: 'same-origin',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8', 'X-Requested-With': 'XMLHttpRequest' },
    body: new URLSearchParams(params).toString(),
  });
}

async function tdmRutaRepo() {
  if (TDM_RUTA_REPO !== null) return TDM_RUTA_REPO;
  const r = await fetch(TDM_CONFIG.urlRutaRepo, { credentials: 'same-origin' }).then(x => x.json());
  TDM_RUTA_REPO = r.value ?? r.VALOR ?? '';
  return TDM_RUTA_REPO;
}

function tdmExtraerFlujo(html) {
  const idxClave = html.indexOf('"data":{"Data":[');
  if (idxClave === -1) return [];
  const idxInicio = html.indexOf('[', idxClave);
  let prof = 0;
  for (let i = idxInicio; i < html.length; i++) {
    if (html[i] === '[') prof++;
    else if (html[i] === ']' && --prof === 0) {
      try { return JSON.parse(html.substring(idxInicio, i + 1)); } catch (e) { return []; }
    }
  }
  return [];
}

// ---------- lógica principal por tarea ----------
async function tdmObtenerUltimaVersion(idTarea) {
  await tdmPost(TDM_CONFIG.urlValidar, { IDTAREADOC: idTarea });
  const html = await tdmPost(TDM_CONFIG.urlCrearDoc, {
    TipoDocumento: 'D', IdTareaInicial: idTarea, IdTareaActual: idTarea,
    Editar: 'NO', INSTRUCCIONES: 'REVISAR', IDRAD: 0,
  }).then(r => r.text());

  const flujo = tdmExtraerFlujo(html);
  if (!flujo.length) throw new Error('Sin flujo (ID inexistente o sin permisos)');

  const ordenado = [...flujo].sort((a, b) => (Number(a.ORDEN) || 0) - (Number(b.ORDEN) || 0));
  const ultimo = ordenado[ordenado.length - 1];
  // Toma el paso más reciente que sí tenga PDF (el último puede no tenerlo).
  const conPdf = [...ordenado].reverse().find(p => p.NOMBREARCHIVO);
  if (!conPdf) throw new Error('Ningún paso del flujo tiene PDF');

  return { paso: conPdf, totalPasos: ordenado.length, asunto: ultimo.ASUNTO || '' };
}

function tdmSanitizarBase64(str) {
  let s = String(str).trim();
  if (s.startsWith('"') && s.endsWith('"')) s = s.slice(1, -1);
  s = s.replace(/\\r|\\n|[\r\n\s]/g, '');
  const coma = s.lastIndexOf(',');
  if (coma !== -1 && coma > s.length - 10 && /^[a-zA-Z0-9]{1,6}$/.test(s.slice(coma + 1))) s = s.slice(0, coma);
  return s;
}

async function tdmDescargarPdfBlob(nombreArchivo) {
  const rutaRepo = await tdmRutaRepo();
  const archivo = nombreArchivo.toLowerCase().endsWith('.pdf') ? nombreArchivo : `${nombreArchivo}.pdf`;
  const data = await tdmPost(TDM_CONFIG.urlPdfB64, {
    Ruta: rutaRepo + 'PDF\\DOC_DILIGENCIADO\\',
    ArchivoNombre: archivo,
    RutaFria: 'NOPDF\\DOC_DILIGENCIADO\\',
  }).then(r => r.json());

  const valor = data && data.VALORESPUESTA;
  if (!valor || data.RESPUESTA === false) throw new Error(data?.MENSAJE || 'El servidor no devolvió el PDF');

  if (typeof valor === 'string' && valor.startsWith('http')) {
    const r = await fetch(valor, { credentials: 'same-origin' });
    if (!r.ok) throw new Error('Fallo al descargar desde URL (HTTP ' + r.status + ')');
    return new Blob([await r.arrayBuffer()], { type: 'application/pdf' });
  }
  const bin = atob(tdmSanitizarBase64(valor));
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return new Blob([bytes], { type: 'application/pdf' });
}

async function tdmProcesarTarea(r) {
  r.estado = 'procesando'; r.error = ''; tdmPintarTabla();
  try {
    const { paso, totalPasos, asunto } = await tdmObtenerUltimaVersion(r.id);
    r.orden = paso.ORDEN; r.totalPasos = totalPasos; r.asunto = asunto;
    r.blob = await tdmDescargarPdfBlob(paso.NOMBREARCHIVO);
    r.nombre = `Tarea_${r.id}_v${paso.ORDEN}.pdf`;
    r.estado = 'ok';
  } catch (e) {
    r.estado = 'error'; r.error = e.message; r.blob = null;
    console.warn('[TDM]', r.id, e);
  }
  tdmPintarTabla();
}

async function tdmPool(items, limite, fn, onProgreso) {
  let idx = 0, hechos = 0;
  const trabajador = async () => {
    while (idx < items.length) {
      const item = items[idx++];
      try { await fn(item); } finally { onProgreso(++hechos, items.length); }
    }
  };
  await Promise.all(Array.from({ length: Math.min(limite, items.length) }, trabajador));
}

// ---------- ZIP sin librerías (store, nombres UTF-8) ----------
const TDM_CRC = (() => {
  const t = new Uint32Array(256);
  for (let n = 0; n < 256; n++) { let c = n; for (let k = 0; k < 8; k++) c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1); t[n] = c >>> 0; }
  return t;
})();
function tdmCrc32(b) { let c = 0xFFFFFFFF; for (let i = 0; i < b.length; i++) c = TDM_CRC[(c ^ b[i]) & 0xFF] ^ (c >>> 8); return (c ^ 0xFFFFFFFF) >>> 0; }

function tdmCrearZip(archivos) {
  const enc = new TextEncoder(), ahora = new Date();
  const hora = (ahora.getHours() << 11) | (ahora.getMinutes() << 5) | (ahora.getSeconds() >> 1);
  const fecha = ((ahora.getFullYear() - 1980) << 9) | ((ahora.getMonth() + 1) << 5) | ahora.getDate();
  const partes = [], central = []; let offset = 0;
  for (const { nombre, bytes } of archivos) {
    const nom = enc.encode(nombre), crc = tdmCrc32(bytes);
    const loc = new DataView(new ArrayBuffer(30));
    loc.setUint32(0, 0x04034b50, true); loc.setUint16(4, 20, true); loc.setUint16(6, 0x0800, true);
    loc.setUint16(10, hora, true); loc.setUint16(12, fecha, true); loc.setUint32(14, crc, true);
    loc.setUint32(18, bytes.length, true); loc.setUint32(22, bytes.length, true); loc.setUint16(26, nom.length, true);
    partes.push(new Uint8Array(loc.buffer), nom, bytes);
    const cen = new DataView(new ArrayBuffer(46));
    cen.setUint32(0, 0x02014b50, true); cen.setUint16(4, 20, true); cen.setUint16(6, 20, true); cen.setUint16(8, 0x0800, true);
    cen.setUint16(12, hora, true); cen.setUint16(14, fecha, true); cen.setUint32(16, crc, true);
    cen.setUint32(20, bytes.length, true); cen.setUint32(24, bytes.length, true); cen.setUint16(28, nom.length, true);
    cen.setUint32(42, offset, true);
    central.push(new Uint8Array(cen.buffer), nom);
    offset += 30 + nom.length + bytes.length;
  }
  const tamCentral = central.reduce((s, p) => s + p.length, 0);
  const fin = new DataView(new ArrayBuffer(22));
  fin.setUint32(0, 0x06054b50, true); fin.setUint16(8, archivos.length, true); fin.setUint16(10, archivos.length, true);
  fin.setUint32(12, tamCentral, true); fin.setUint32(16, offset, true);
  return new Blob([...partes, ...central, new Uint8Array(fin.buffer)], { type: 'application/zip' });
}

function tdmGuardarBlob(blob, nombre) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = nombre;
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}

// ---------- entrega de archivos ----------
async function tdmEntregar(modo) {
  const listos = TDM_RESULTADOS.filter(r => r.estado === 'ok' && r.blob);
  if (!listos.length) return;
  if (modo === 'zip' && listos.length > 1) {
    tdmEstado('⏳ Armando el ZIP…');
    const archivos = [];
    for (const r of listos) archivos.push({ nombre: r.nombre, bytes: new Uint8Array(await r.blob.arrayBuffer()) });
    const f = new Date(), p = n => String(n).padStart(2, '0');
    tdmGuardarBlob(tdmCrearZip(archivos), `UltimasVersiones_Tareas_${f.getFullYear()}${p(f.getMonth() + 1)}${p(f.getDate())}_${p(f.getHours())}${p(f.getMinutes())}.zip`);
  } else {
    for (const r of listos) {
      tdmGuardarBlob(r.blob, r.nombre);
      await new Promise(res => setTimeout(res, TDM_PAUSA_INDIVIDUAL_MS));
    }
  }
}

// ---------- ejecución ----------
function tdmParsearIds(texto) {
  return [...new Set(texto.split(/[\s,;]+/).map(s => s.trim()).filter(s => /^\d+$/.test(s)))];
}

async function tdmEjecutar(soloFallidos = false) {
  if (TDM_EN_CURSO) return;
  let objetivo;
  if (soloFallidos) {
    objetivo = TDM_RESULTADOS.filter(r => r.estado === 'error');
    if (!objetivo.length) return tdmEstado('No hay tareas fallidas para reintentar.');
  } else {
    const ids = tdmParsearIds(document.querySelector('#TDM_Ids').value);
    if (!ids.length) return tdmEstado('Pega al menos un IDTAREADOC válido (solo números).');
    TDM_RESULTADOS = ids.map(id => ({ id, estado: 'pendiente', orden: '', totalPasos: '', asunto: '', nombre: '', blob: null, error: '' }));
    objetivo = TDM_RESULTADOS;
  }

  TDM_EN_CURSO = true; tdmBotones(false); tdmPintarTabla();
  const modo = document.querySelector('#TDM_Modo').value;

  await tdmPool(objetivo, TDM_CONCURRENCIA, tdmProcesarTarea,
    (hechos, total) => tdmEstado(`⏳ Consultando ${hechos}/${total}… (${TDM_CONCURRENCIA} a la vez)`));

  const nuevosOk = objetivo.filter(r => r.estado === 'ok');
  if (nuevosOk.length) {
    // En reintento se entregan solo los recuperados; en ejecución normal, todos.
    const respaldo = TDM_RESULTADOS;
    if (soloFallidos) TDM_RESULTADOS = nuevosOk;
    await tdmEntregar(modo);
    TDM_RESULTADOS = respaldo;
  }

  const ok = TDM_RESULTADOS.filter(r => r.estado === 'ok').length;
  const err = TDM_RESULTADOS.filter(r => r.estado === 'error').length;
  tdmEstado(`🏁 ${ok} descargado(s) · ${err} con error${err ? ' (usa "Reintentar fallidos" o revisa la consola)' : ''}.`);
  TDM_EN_CURSO = false; tdmBotones(true);
}

function tdmExportarExcel() {
  if (!TDM_RESULTADOS.length) return tdmEstado('Aún no hay resultados para exportar.');
  const esc = s => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const filas = TDM_RESULTADOS.map(r => `<tr><td>${esc(r.id)}</td><td>${r.estado === 'ok' ? 'OK' : 'ERROR'}</td><td>${esc(r.orden)}</td><td>${esc(r.totalPasos)}</td><td>${esc(r.nombre)}</td><td>${esc(r.asunto)}</td><td>${esc(r.error)}</td></tr>`).join('');
  const html = `<html><head><meta charset="UTF-8"></head><body><table border="1"><tr><th>IDTAREADOC</th><th>Resultado</th><th>Versión descargada</th><th>Pasos del flujo</th><th>Archivo</th><th>Asunto</th><th>Error</th></tr>${filas}</table></body></html>`;
  tdmGuardarBlob(new Blob([html], { type: 'application/vnd.ms-excel' }), `Descarga_UltimasVersiones_${new Date().toISOString().slice(0, 10)}.xls`);
}

// ---------- interfaz ----------
function tdmEstado(t) { const el = document.querySelector('#TDM_Estado'); if (el) el.textContent = t; }

function tdmBotones(activos) {
  ['#TDM_Ejecutar', '#TDM_Reintentar'].forEach(s => {
    const b = document.querySelector(s); if (!b) return;
    b.disabled = !activos; b.style.opacity = activos ? '1' : '0.6'; b.style.cursor = activos ? 'pointer' : 'not-allowed';
  });
}

function tdmPintarTabla() {
  const cont = document.querySelector('#TDM_Tabla');
  if (!cont) return;
  if (!TDM_RESULTADOS.length) { cont.innerHTML = ''; return; }
  const icono = { pendiente: '⏸', procesando: '⏳', ok: '✅', error: '❌' };
  const esc = s => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  cont.innerHTML = `
    <table style="width:100%; border-collapse:collapse; font-size:12px;">
      <thead><tr style="background:#f3f4f6; text-align:left;">
        <th style="padding:4px;"></th><th style="padding:4px;">IDTAREADOC</th><th style="padding:4px;">Versión</th><th style="padding:4px;">Asunto / detalle</th><th style="padding:4px;"></th>
      </tr></thead>
      <tbody>${TDM_RESULTADOS.map((r, i) => `
        <tr style="border-bottom:1px solid #f3f4f6; ${r.estado === 'error' ? 'background:#fff7f7;' : ''}">
          <td style="padding:4px;">${icono[r.estado]}</td>
          <td style="padding:4px; font-weight:bold;">${esc(r.id)}</td>
          <td style="padding:4px;">${r.orden ? `v${esc(r.orden)} de ${esc(r.totalPasos)}` : '—'}</td>
          <td style="padding:4px; word-break:break-word;">${r.estado === 'error' ? `<span style="color:#dc2626;">${esc(r.error)}</span>` : esc(r.asunto).slice(0, 90)}</td>
          <td style="padding:4px;">${r.estado === 'ok' ? `<button class="tdm-ver" data-i="${i}" title="Previsualizar" style="border:none; background:none; cursor:pointer;">👁</button>` : ''}</td>
        </tr>`).join('')}</tbody>
    </table>`;
  cont.querySelectorAll('.tdm-ver').forEach(b => {
    b.onclick = () => { const r = TDM_RESULTADOS[Number(b.dataset.i)]; if (r?.blob) window.open(URL.createObjectURL(r.blob), '_blank'); };
  });
}

function tdmCrearPanel() {
  document.querySelector('#PanelDescargaMasivaTareas')?.remove();
  const cont = document.createElement('div');
  cont.id = 'PanelDescargaMasivaTareas';
  cont.style.cssText = 'position:fixed; top:20px; right:20px; z-index:99999; background:#fff; border:1px solid #ccc; border-radius:10px; padding:14px; box-shadow:0 4px 18px rgba(0,0,0,0.25); width:560px; max-height:88vh; overflow-y:auto; font-family:sans-serif; font-size:13px;';
  cont.innerHTML = `
    <div id="TDM_Encabezado" style="display:flex; justify-content:space-between; align-items:center; font-weight:bold; margin-bottom:10px; cursor:grab; user-select:none;">
      <span>📦 Descarga masiva — última versión PDF por tarea</span>
      <span>
        <button id="TDM_Minimizar" title="Minimizar" style="background:none; border:none; color:#666; font-size:16px; font-weight:bold; cursor:pointer; margin-right:6px;">–</button>
        <button id="TDM_Cerrar" title="Cerrar" style="background:none; border:none; color:#666; font-size:16px; font-weight:bold; cursor:pointer;">✕</button>
      </span>
    </div>
    <div id="TDM_Cuerpo">
      <label style="color:#6b7280; font-size:11px;">IDTAREADOC (uno por línea, o separados por coma, espacio o punto y coma)</label>
      <textarea id="TDM_Ids" rows="5" placeholder="466393&#10;466401, 466420" style="width:100%; padding:6px; border:1px solid #ccc; border-radius:6px; margin:4px 0 8px; box-sizing:border-box;"></textarea>
      <div style="display:flex; gap:6px; margin-bottom:8px;">
        <select id="TDM_Modo" style="flex:1; padding:6px; border:1px solid #ccc; border-radius:6px; font-size:12px;">
          <option value="zip">Un solo ZIP con todos los PDF (recomendado)</option>
          <option value="individual">Un PDF por archivo</option>
        </select>
        <button id="TDM_Ejecutar" style="padding:6px 12px; background:#2563eb; color:#fff; border:none; border-radius:6px; cursor:pointer; font-weight:bold;">⬇ Descargar</button>
      </div>
      <div style="display:flex; gap:6px; margin-bottom:8px;">
        <button id="TDM_Reintentar" style="flex:1; padding:6px; background:#e5e7eb; border:none; border-radius:6px; cursor:pointer; font-size:12px;">🔁 Reintentar fallidos</button>
        <button id="TDM_CopiarFallidos" style="flex:1; padding:6px; background:#e5e7eb; border:none; border-radius:6px; cursor:pointer; font-size:12px;">📋 Copiar IDs fallidos</button>
        <button id="TDM_Exportar" style="flex:1; padding:6px; background:#374151; color:#fff; border:none; border-radius:6px; cursor:pointer; font-size:12px;">📥 Excel de resultados</button>
      </div>
      <div id="TDM_Estado" style="font-size:12px; color:#6b7280; margin-bottom:8px;">Pega los IDTAREADOC y pulsa Descargar.</div>
      <div id="TDM_Tabla" style="max-height:340px; overflow-y:auto;"></div>
    </div>`;
  document.body.appendChild(cont);

  // Arrastre
  const agarre = cont.querySelector('#TDM_Encabezado');
  let arrastrando = false, offX = 0, offY = 0;
  agarre.addEventListener('mousedown', e => {
    arrastrando = true; const r = cont.getBoundingClientRect();
    offX = e.clientX - r.left; offY = e.clientY - r.top;
    cont.style.right = 'auto'; cont.style.left = r.left + 'px'; cont.style.top = r.top + 'px';
  });
  document.addEventListener('mousemove', e => {
    if (!arrastrando) return;
    cont.style.left = Math.min(Math.max(e.clientX - offX, 0), Math.max(0, window.innerWidth - cont.offsetWidth)) + 'px';
    cont.style.top = Math.min(Math.max(e.clientY - offY, 0), Math.max(0, window.innerHeight - cont.offsetHeight)) + 'px';
  });
  document.addEventListener('mouseup', () => { arrastrando = false; });

  const btnMin = cont.querySelector('#TDM_Minimizar'), cuerpo = cont.querySelector('#TDM_Cuerpo');
  let minimizado = false;
  ['#TDM_Minimizar', '#TDM_Cerrar'].forEach(s => cont.querySelector(s).addEventListener('mousedown', e => e.stopPropagation()));
  btnMin.onclick = () => {
    minimizado = !minimizado;
    cuerpo.style.display = minimizado ? 'none' : 'block';
    cont.style.width = minimizado ? 'auto' : '560px';
    btnMin.textContent = minimizado ? '▢' : '–';
  };
  cont.querySelector('#TDM_Cerrar').onclick = () => cont.remove();
  cont.querySelector('#TDM_Ejecutar').onclick = () => tdmEjecutar(false);
  cont.querySelector('#TDM_Reintentar').onclick = () => tdmEjecutar(true);
  cont.querySelector('#TDM_Exportar').onclick = tdmExportarExcel;
  cont.querySelector('#TDM_CopiarFallidos').onclick = () => {
    const ids = TDM_RESULTADOS.filter(r => r.estado === 'error').map(r => r.id);
    if (!ids.length) return tdmEstado('No hay IDs fallidos para copiar.');
    navigator.clipboard?.writeText(ids.join('\n'));
    tdmEstado(`📋 ${ids.length} ID(s) fallidos copiados al portapapeles.`);
  };
}

tdmCrearPanel();
