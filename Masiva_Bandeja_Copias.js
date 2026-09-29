// ==========================================
// COPIAS SIN REVISAR — LISTADO Y CAMBIO MASIVO A "REVISADO" (ControlDoc)
// Lista todas las copias pendientes por revisar (mismo origen que el botón
// nativo "Copias") y permite marcarlas como revisadas una a una o todas con
// un solo botón. Verifica contra el servidor que cada una haya salido de la lista.
// USO: pegar en consola (F12) estando logueado en ControlDoc.
// ==========================================

const CPR_CONFIG = {
  urlListar:   'https://controldoc.minsalud.gov.co/ControlDoc/Documentos/CoppiasByIDUSUARIO',
  urlRevisada: 'https://controldoc.minsalud.gov.co/Controldoc//Documentos/ActualizarACopiaRevisada/',
  urlContador: 'https://controldoc.minsalud.gov.co/Controldoc//Documentos/ObtenerContadorBtnCopias/',
  urlPdfB64:   'https://controldoc.minsalud.gov.co/Controldoc//Documentos/IMAGENB64byIDDOCUMENTO/',
};

const CPR_CONCURRENCIA = 5;   // copias marcadas al mismo tiempo en el proceso masivo

let CPR_COPIAS = [];          // { idGestion, idc, radicado, asunto, remitente, oficina, fecha, leido, firmante, destinatario, tipo, anio, estado, error }
let CPR_EN_CURSO = false;

// ---------- red ----------
const CPR_HEADERS = { 'X-Requested-With': 'XMLHttpRequest' };

async function cprListarAnio(anio) {
  const resp = await fetch(`${CPR_CONFIG.urlListar}?tipo=sinRevisar&anio=${anio}`, { credentials: 'same-origin', headers: CPR_HEADERS });
  if (!resp.ok) throw new Error('HTTP ' + resp.status);
  const data = await resp.json();
  return Array.isArray(data) ? data : [];
}

async function cprContadorServidor() {
  try {
    const r = await fetch(CPR_CONFIG.urlContador, { method: 'POST', credentials: 'same-origin', headers: CPR_HEADERS });
    const n = Number((await r.text()).trim());
    return Number.isFinite(n) ? n : null;
  } catch (e) { return null; }
}

async function cprMarcarRevisada(idGestion) {
  const resp = await fetch(CPR_CONFIG.urlRevisada, {
    method: 'POST', credentials: 'same-origin',
    headers: { ...CPR_HEADERS, 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
    body: new URLSearchParams({ _IDDOCGESTION: idGestion }).toString(),
  });
  const data = await resp.json();
  if (!data || data.RESPUESTA !== true) throw new Error(data?.MENSAJE || 'El servidor no confirmó el cambio');
  return data;
}

function cprFecha(v) {
  const m = /\/Date\((-?\d+)\)\//.exec(v || '');
  if (!m || Number(m[1]) < 0) return '';
  return new Date(Number(m[1])).toLocaleString('es-CO', { dateStyle: 'short', timeStyle: 'short' });
}

function cprResumir(d, anio) {
  return {
    idGestion: d.IDDOCUMENTOGESTION, idc: d.IDDOCUMENTO, radicado: d.RADICADO || '',
    asunto: d.DESCRIPCION || '', remitente: d.USUARIOASIGNO || '', oficina: d.OFICINAPRODUCTORA || '',
    fecha: cprFecha(d.FECHAASIGNO), fechaMs: Number((/\((-?\d+)\)/.exec(d.FECHAASIGNO || '') || [])[1]) || 0,
    leido: String(d.LEIDO).toUpperCase() === 'SI', firmante: d.FIRMANTE || '', destinatario: d.DESTINATARIO || '',
    tipo: d.TIPODOCUMENTAL || '', comentario: d.COMENTARIO || '', anio, estado: 'pendiente', error: '',
  };
}

// ---------- carga ----------
function cprAniosSeleccionados() {
  const v = document.querySelector('#CPR_Anio').value;
  const actual = new Date().getFullYear();
  return v === 'ambos' ? [actual, actual - 1] : [Number(v)];
}

async function cprCargar() {
  if (CPR_EN_CURSO) return;
  cprEstado('⏳ Consultando copias sin revisar…');
  const anios = cprAniosSeleccionados();
  try {
    const listas = await Promise.all(anios.map(a => cprListarAnio(a).then(l => l.map(d => cprResumir(d, a)))));
    const vistos = new Set();
    CPR_COPIAS = listas.flat()
      .filter(c => !vistos.has(c.idGestion) && vistos.add(c.idGestion))
      .sort((a, b) => b.fechaMs - a.fechaMs);
  } catch (e) {
    cprEstado('❌ No se pudo consultar la lista: ' + e.message);
    return;
  }
  const total = await cprContadorServidor();
  cprPintar();
  cprEstado(`${CPR_COPIAS.length} copia(s) sin revisar en ${anios.join(' y ')}` +
    (total !== null && total !== CPR_COPIAS.length ? ` · el contador general de ControlDoc marca ${total} (puede haber copias de otros años)` : '') + '.');
}

// ---------- marcado ----------
async function cprPool(items, limite, fn, onProgreso) {
  let idx = 0, hechos = 0;
  const trabajador = async () => {
    while (idx < items.length) {
      const it = items[idx++];
      try { await fn(it); } finally { onProgreso(++hechos, items.length); }
    }
  };
  await Promise.all(Array.from({ length: Math.min(limite, items.length) }, trabajador));
}

// Vuelve a pedir la lista y confirma que las marcadas ya no aparecen.
async function cprVerificar(copias) {
  const anios = [...new Set(copias.map(c => c.anio))];
  const siguen = new Set();
  for (const a of anios) (await cprListarAnio(a)).forEach(d => siguen.add(d.IDDOCUMENTOGESTION));
  for (const c of copias) {
    if (c.estado !== 'ok') continue;
    if (siguen.has(c.idGestion)) { c.estado = 'error'; c.error = 'El servidor respondió OK pero la copia sigue sin revisar'; }
  }
}

async function cprMarcarVarias(copias) {
  if (CPR_EN_CURSO || !copias.length) return;
  CPR_EN_CURSO = true; cprBloquear(true);
  copias.forEach(c => { c.estado = 'enviando'; c.error = ''; });
  cprPintar();

  await cprPool(copias, CPR_CONCURRENCIA, async (c) => {
    try { await cprMarcarRevisada(c.idGestion); c.estado = 'ok'; }
    catch (e) { c.estado = 'error'; c.error = e.message; console.warn('[CPR]', c.idc, e); }
    cprPintarFila(c);
  }, (h, t) => cprEstado(`⏳ Marcando como revisadas ${h}/${t}… (${CPR_CONCURRENCIA} a la vez)`));

  cprEstado('⏳ Verificando contra el servidor…');
  try { await cprVerificar(copias); } catch (e) { console.warn('[CPR] No se pudo verificar:', e); }

  const ok = copias.filter(c => c.estado === 'ok').length;
  const err = copias.length - ok;
  cprPintar();
  cprEstado(`🏁 ${ok} marcada(s) como revisada(s)${err ? ` · ❌ ${err} con error (vuelve a intentarlo o revisa la consola)` : ''}.`);

  // Retira de la lista las que ya quedaron revisadas.
  setTimeout(() => { CPR_COPIAS = CPR_COPIAS.filter(c => c.estado !== 'ok'); cprPintar(); }, 3000);
  CPR_EN_CURSO = false; cprBloquear(false);
}

function cprMarcarTodas() {
  const objetivo = cprVisibles().filter(c => c.estado !== 'ok');
  if (!objetivo.length) return cprEstado('No hay copias pendientes para marcar.');
  const filtrado = objetivo.length !== CPR_COPIAS.filter(c => c.estado !== 'ok').length;
  if (!confirm(`¿Marcar ${objetivo.length} copia(s)${filtrado ? ' (las que muestra el filtro actual)' : ''} como REVISADAS?`)) return;
  cprMarcarVarias(objetivo);
}

// Revisa TODA la bandeja de copias: recorre desde el año actual hacia atrás
// hasta reunir todas las que marca el contador general de ControlDoc (máximo
// CPR_ANIOS_ATRAS años), ignora filtros y las marca como revisadas de una vez.
const CPR_ANIOS_ATRAS = 5;

async function cprRevisarTodaLaBandeja() {
  if (CPR_EN_CURSO) return;
  CPR_EN_CURSO = true; cprBloquear(true);
  cprEstado('⏳ Reuniendo todas las copias sin revisar de la bandeja…');

  let todas = [];
  const totalServidor = await cprContadorServidor();
  try {
    const vistos = new Set();
    const actual = new Date().getFullYear();
    for (let a = actual; a >= actual - CPR_ANIOS_ATRAS; a--) {
      cprEstado(`⏳ Consultando ${a}… (${todas.length}${totalServidor !== null ? ' de ' + totalServidor : ''} encontradas)`);
      (await cprListarAnio(a)).forEach(d => { if (!vistos.has(d.IDDOCUMENTOGESTION)) { vistos.add(d.IDDOCUMENTOGESTION); todas.push(cprResumir(d, a)); } });
      if (totalServidor !== null && todas.length >= totalServidor) break;
    }
  } catch (e) {
    CPR_EN_CURSO = false; cprBloquear(false);
    return cprEstado('❌ No se pudo consultar la bandeja: ' + e.message);
  }
  CPR_EN_CURSO = false; cprBloquear(false);

  CPR_COPIAS = todas.sort((a, b) => b.fechaMs - a.fechaMs);
  document.querySelector('#CPR_Filtro').value = '';
  document.querySelector('#CPR_SoloNoLeidas').checked = false;
  cprPintar();

  if (!todas.length) return cprEstado('✅ La bandeja de copias ya está al día: no hay nada por revisar.');
  const aviso = totalServidor !== null && todas.length < totalServidor
    ? `\n\n⚠️ El contador de ControlDoc marca ${totalServidor}; solo se encontraron ${todas.length} en los últimos ${CPR_ANIOS_ATRAS + 1} años.` : '';
  if (!confirm(`¿Marcar TODA la bandeja (${todas.length} copia(s)) como REVISADA?${aviso}`)) {
    return cprEstado(`${todas.length} copia(s) cargadas. Revisión masiva cancelada.`);
  }

  await cprMarcarVarias(todas);
  const restantes = await cprContadorServidor();
  if (restantes !== null) cprEstado(document.querySelector('#CPR_Estado').textContent + ` Contador de ControlDoc ahora: ${restantes}.`);
}

// ---------- PDF ----------
async function cprVerPdf(idc) {
  try {
    const resp = await fetch(CPR_CONFIG.urlPdfB64, {
      method: 'POST', credentials: 'same-origin',
      headers: { ...CPR_HEADERS, 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
      body: new URLSearchParams({ IDDOCUMENTO: idc }).toString(),
    });
    const texto = await resp.text();
    let valor = texto;
    try { const j = JSON.parse(texto); valor = (j && typeof j === 'object') ? j.VALORESPUESTA : j; } catch (e) { /* texto plano */ }
    if (!valor) throw new Error('sin contenido');
    if (typeof valor === 'string' && valor.startsWith('http')) {
      const r = await fetch(valor, { credentials: 'same-origin' });
      return window.open(URL.createObjectURL(new Blob([await r.arrayBuffer()], { type: 'application/pdf' })), '_blank');
    }
    let s = String(valor).trim().replace(/^"|"$/g, '').replace(/\\r|\\n|[\r\n\s]/g, '');
    const coma = s.lastIndexOf(',');
    if (coma > s.length - 10 && /^[a-zA-Z0-9]{1,6}$/.test(s.slice(coma + 1))) s = s.slice(0, coma);
    const bin = atob(s), bytes = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
    window.open(URL.createObjectURL(new Blob([bytes], { type: 'application/pdf' })), '_blank');
  } catch (e) {
    console.warn('[CPR] PDF IDC', idc, e);
    alert('No se pudo abrir el PDF de este documento. Revisa la consola (F12).');
  }
}

// ---------- exportar ----------
function cprExportar() {
  if (!CPR_COPIAS.length) return cprEstado('Primero carga la lista.');
  const esc = s => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const filas = CPR_COPIAS.map(c => `<tr><td>${esc(c.idc)}</td><td>${esc(c.radicado)}</td><td>${esc(c.tipo)}</td><td>${esc(c.asunto)}</td><td>${esc(c.remitente)}</td><td>${esc(c.oficina)}</td><td>${esc(c.firmante)}</td><td>${esc(c.destinatario)}</td><td>${esc(c.fecha)}</td><td>${c.leido ? 'SÍ' : 'NO'}</td></tr>`).join('');
  const html = `<html><head><meta charset="UTF-8"></head><body><table border="1"><tr><th>IDC</th><th>Radicado</th><th>Tipo</th><th>Asunto</th><th>Asignó</th><th>Oficina</th><th>Firmante</th><th>Destinatario</th><th>Fecha asignación</th><th>Leído</th></tr>${filas}</table></body></html>`;
  const url = URL.createObjectURL(new Blob([html], { type: 'application/vnd.ms-excel' }));
  const a = document.createElement('a');
  a.href = url; a.download = `Copias_sin_revisar_${new Date().toISOString().slice(0, 10)}.xls`;
  document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url);
}

// ---------- interfaz ----------
const cprEsc = s => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
function cprNorm(s) { return String(s || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toUpperCase(); }
function cprEstado(t) { const el = document.querySelector('#CPR_Estado'); if (el) el.textContent = t; }

function cprVisibles() {
  const f = cprNorm(document.querySelector('#CPR_Filtro')?.value.trim());
  const soloNoLeidas = document.querySelector('#CPR_SoloNoLeidas')?.checked;
  return CPR_COPIAS.filter(c =>
    (!f || cprNorm([c.idc, c.radicado, c.asunto, c.remitente, c.oficina, c.firmante, c.tipo].join(' ')).includes(f)) &&
    (!soloNoLeidas || !c.leido));
}

function cprBloquear(si) {
  ['#CPR_Cargar', '#CPR_MarcarTodas', '#CPR_RevisarBandeja'].forEach(s => {
    const b = document.querySelector(s); if (!b) return;
    b.disabled = si; b.style.opacity = si ? '0.6' : '1'; b.style.cursor = si ? 'not-allowed' : 'pointer';
  });
  document.querySelectorAll('.cpr-btn-revisar').forEach(b => { b.disabled = si; });
}

function cprIcono(c) {
  return { enviando: '⏳', ok: '✅', error: '❌' }[c.estado] || '';
}

function cprHtmlFila(c) {
  const i = CPR_COPIAS.indexOf(c);
  const hecho = c.estado === 'ok';
  return `
  <div id="cpr-fila-${c.idGestion}" style="border:1px solid #e5e7eb; border-radius:8px; padding:9px; margin-bottom:7px; background:${hecho ? '#f0fdf4' : c.estado === 'error' ? '#fff7f7' : '#fff'}; ${c.leido ? '' : 'border-left:4px solid #2563eb;'}">
    <div style="display:flex; justify-content:space-between; gap:8px; align-items:flex-start;">
      <div style="font-weight:bold;">IDC ${cprEsc(c.idc)} <span style="color:#6b7280; font-weight:normal; font-size:11px;">· Rad ${cprEsc(c.radicado)} · ${cprEsc(c.tipo)}</span></div>
      <span title="${cprEsc(c.error)}" style="font-size:14px;">${cprIcono(c)}</span>
    </div>
    <div style="margin-top:4px; font-size:12px; word-break:break-word;">${cprEsc(c.asunto)}</div>
    <div style="color:#6b7280; font-size:11px; margin-top:4px; line-height:1.5;">
      Asignó: <b style="color:#1e3a8a;">${cprEsc(c.remitente)}</b> (${cprEsc(c.oficina)}) · ${cprEsc(c.fecha)}${c.leido ? '' : ' · <b style="color:#2563eb;">No leída</b>'}<br>
      Firmante: ${cprEsc(c.firmante) || '—'} → Destinatario: ${cprEsc(c.destinatario) || '—'}
    </div>
    ${c.estado === 'error' ? `<div style="color:#dc2626; font-size:11px; margin-top:4px;">${cprEsc(c.error)}</div>` : ''}
    <div style="display:flex; gap:6px; margin-top:7px;">
      <button data-i="${i}" class="cpr-btn-pdf" style="padding:5px 10px; font-size:12px; background:#e5e7eb; border:none; border-radius:5px; cursor:pointer;">👁 Ver PDF</button>
      <button data-i="${i}" class="cpr-btn-copiar" style="padding:5px 10px; font-size:12px; background:#e5e7eb; border:none; border-radius:5px; cursor:pointer;">📋 IDC</button>
      <button data-i="${i}" class="cpr-btn-revisar" ${hecho || c.estado === 'enviando' ? 'disabled' : ''} style="padding:5px 10px; font-size:12px; background:${hecho ? '#bbf7d0' : '#16a34a'}; color:${hecho ? '#166534' : '#fff'}; border:none; border-radius:5px; cursor:${hecho ? 'default' : 'pointer'}; font-weight:600;">${hecho ? '✔ Revisada' : '✔ Marcar revisada'}</button>
    </div>
  </div>`;
}

function cprVincular(cont) {
  cont.querySelectorAll('.cpr-btn-pdf').forEach(b => { b.onclick = () => cprVerPdf(CPR_COPIAS[Number(b.dataset.i)].idc); });
  cont.querySelectorAll('.cpr-btn-copiar').forEach(b => {
    b.onclick = () => {
      navigator.clipboard?.writeText(String(CPR_COPIAS[Number(b.dataset.i)].idc));
      const t = b.textContent; b.textContent = '✓'; setTimeout(() => { b.textContent = t; }, 1000);
    };
  });
  cont.querySelectorAll('.cpr-btn-revisar').forEach(b => {
    b.onclick = () => { const c = CPR_COPIAS[Number(b.dataset.i)]; if (c && c.estado !== 'ok') cprMarcarVarias([c]); };
  });
}

function cprPintarFila(c) {
  const el = document.querySelector(`#cpr-fila-${c.idGestion}`);
  if (!el) return;
  el.outerHTML = cprHtmlFila(c);
  const nuevo = document.querySelector(`#cpr-fila-${c.idGestion}`);
  if (nuevo) cprVincular(nuevo);
}

function cprPintar() {
  const cont = document.querySelector('#CPR_Lista');
  const btn = document.querySelector('#CPR_MarcarTodas');
  if (!cont) return;
  const vis = cprVisibles();
  const pendientes = vis.filter(c => c.estado !== 'ok').length;
  if (btn) btn.textContent = `✔ Marcar ${pendientes} como revisadas`;
  document.querySelector('#CPR_Contador').textContent = CPR_COPIAS.length ? `(${vis.length} de ${CPR_COPIAS.length})` : '';
  if (!CPR_COPIAS.length) { cont.innerHTML = '<div style="color:#9ca3af; font-size:12px; padding:10px 0;">No hay copias sin revisar cargadas.</div>'; return; }
  if (!vis.length) { cont.innerHTML = '<div style="color:#9ca3af; font-size:12px; padding:10px 0;">Ninguna copia coincide con el filtro.</div>'; return; }
  cont.innerHTML = vis.map(cprHtmlFila).join('');
  cprVincular(cont);
}

function cprCrearPanel() {
  document.querySelector('#PanelCopiasSinRevisar')?.remove();
  const anio = new Date().getFullYear();
  const cont = document.createElement('div');
  cont.id = 'PanelCopiasSinRevisar';
  cont.style.cssText = 'position:fixed; top:20px; right:20px; z-index:99999; background:#fff; border:1px solid #ccc; border-radius:10px; padding:14px; box-shadow:0 4px 18px rgba(0,0,0,0.25); width:580px; max-height:88vh; overflow-y:auto; font-family:sans-serif; font-size:13px;';
  cont.innerHTML = `
    <div id="CPR_Encabezado" style="display:flex; justify-content:space-between; align-items:center; font-weight:bold; margin-bottom:10px; cursor:grab; user-select:none;">
      <span>📨 Copias sin revisar <span id="CPR_Contador" style="color:#6b7280; font-weight:normal;"></span></span>
      <span>
        <button id="CPR_Minimizar" title="Minimizar" style="background:none; border:none; color:#666; font-size:16px; font-weight:bold; cursor:pointer; margin-right:6px;">–</button>
        <button id="CPR_Cerrar" title="Cerrar" style="background:none; border:none; color:#666; font-size:16px; font-weight:bold; cursor:pointer;">✕</button>
      </span>
    </div>
    <div id="CPR_Cuerpo">
      <div style="display:flex; gap:6px; margin-bottom:8px;">
        <select id="CPR_Anio" style="padding:6px; border:1px solid #ccc; border-radius:6px; font-size:12px;">
          <option value="${anio}">${anio}</option>
          <option value="${anio - 1}">${anio - 1}</option>
          <option value="ambos">${anio} y ${anio - 1}</option>
        </select>
        <button id="CPR_Cargar" style="flex:1; padding:6px 12px; background:#2563eb; color:#fff; border:none; border-radius:6px; cursor:pointer; font-weight:bold;">🔄 Cargar copias sin revisar</button>
        <button id="CPR_Exportar" style="padding:6px 10px; background:#374151; color:#fff; border:none; border-radius:6px; cursor:pointer; font-size:12px;">📥 Excel</button>
      </div>
      <div style="display:flex; gap:8px; align-items:center; margin-bottom:8px;">
        <input id="CPR_Filtro" type="text" placeholder="Filtrar por asunto, IDC, radicado, remitente…" style="flex:1; padding:6px; border:1px solid #ccc; border-radius:6px; font-size:12px;">
        <label style="font-size:11px; color:#6b7280; white-space:nowrap;"><input id="CPR_SoloNoLeidas" type="checkbox"> Solo no leídas</label>
      </div>
      <button id="CPR_RevisarBandeja" style="width:100%; padding:10px; background:#b91c1c; color:#fff; border:none; border-radius:6px; cursor:pointer; font-weight:bold; margin-bottom:6px;">⚡ Revisar toda la bandeja de copias</button>
      <button id="CPR_MarcarTodas" style="width:100%; padding:9px; background:#16a34a; color:#fff; border:none; border-radius:6px; cursor:pointer; font-weight:bold; margin-bottom:6px;">✔ Marcar 0 como revisadas</button>
      <div id="CPR_Estado" style="font-size:12px; color:#6b7280; margin-bottom:8px;">Pulsa "Cargar copias sin revisar".</div>
      <div id="CPR_Lista" style="max-height:480px; overflow-y:auto;"></div>
    </div>`;
  document.body.appendChild(cont);

  const agarre = cont.querySelector('#CPR_Encabezado');
  let arr = false, ox = 0, oy = 0;
  agarre.addEventListener('mousedown', e => {
    arr = true; const r = cont.getBoundingClientRect();
    ox = e.clientX - r.left; oy = e.clientY - r.top;
    cont.style.right = 'auto'; cont.style.left = r.left + 'px'; cont.style.top = r.top + 'px';
  });
  document.addEventListener('mousemove', e => {
    if (!arr) return;
    cont.style.left = Math.min(Math.max(e.clientX - ox, 0), Math.max(0, window.innerWidth - cont.offsetWidth)) + 'px';
    cont.style.top = Math.min(Math.max(e.clientY - oy, 0), Math.max(0, window.innerHeight - cont.offsetHeight)) + 'px';
  });
  document.addEventListener('mouseup', () => { arr = false; });

  ['#CPR_Minimizar', '#CPR_Cerrar'].forEach(s => cont.querySelector(s).addEventListener('mousedown', e => e.stopPropagation()));
  const btnMin = cont.querySelector('#CPR_Minimizar'), cuerpo = cont.querySelector('#CPR_Cuerpo');
  let min = false;
  btnMin.onclick = () => {
    min = !min;
    cuerpo.style.display = min ? 'none' : 'block';
    cont.style.width = min ? 'auto' : '580px';
    btnMin.textContent = min ? '▢' : '–';
  };
  cont.querySelector('#CPR_Cerrar').onclick = () => cont.remove();
  cont.querySelector('#CPR_Cargar').onclick = cprCargar;
  cont.querySelector('#CPR_Anio').onchange = cprCargar;
  cont.querySelector('#CPR_MarcarTodas').onclick = cprMarcarTodas;
  cont.querySelector('#CPR_RevisarBandeja').onclick = cprRevisarTodaLaBandeja;
  cont.querySelector('#CPR_Exportar').onclick = cprExportar;
  cont.querySelector('#CPR_Filtro').addEventListener('input', cprPintar);
  cont.querySelector('#CPR_SoloNoLeidas').addEventListener('change', cprPintar);

  cprPintar();
  cprCargar();
}

cprCrearPanel();
