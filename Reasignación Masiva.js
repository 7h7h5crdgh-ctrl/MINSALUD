// ════════════════════════════════════════════════════════════════
// ═══ CONFIGURACIÓN CENTRAL DE DEPENDENCIAS ═══
// Para agregar una nueva dependencia (subdirección/dirección), agrega
// una entrada nueva aquí abajo. El resto del script (clasificador,
// reasignación, filtros, UI) la toma automáticamente sin tocar nada más.
//
// Campos de cada entrada:
//   nombre    -> nombre visible de la dependencia
//   idOficina -> IDOFICINAPRODUCTORA en ControlDoc (necesario para reasignar).
//                Si no lo sabes, corre cdBuscarOficinaPorNombre('texto') en
//                la consola (con el panel ya cargado) para encontrarlo, y
//                déjalo en null mientras tanto: el clasificador seguirá
//                funcionando igual, solo la reasignación fallará con un
//                mensaje claro hasta que lo completes.
//   idUnidad  -> IDUNIDADADMINISTRATIVA (opcional; si se omite usa
//                CD2_IDUNIDAD, el valor por defecto que comparten todas
//                las dependencias existentes). El IDOFICINAPRODUCTORA por
//                sí solo NO es único en ControlDoc — siempre va combinado
//                con su IDUNIDADADMINISTRATIVA.
//   color     -> color hexadecimal usado en botones y etiquetas
//   emoji     -> ícono que acompaña el nombre en toda la interfaz
//   palabras  -> palabras/frases clave separadas por comas, usadas por el
//                clasificador automático (también editables luego desde
//                el panel, en "⚙️ Configuración de Palabras Clave")
// ════════════════════════════════════════════════════════════════

const CONFIG_DEPENDENCIAS = {
  transmisibles: {
    nombre: 'Enfermedades Transmisibles', idOficina: 41, color: '#dc2626', emoji: '🦠',
    palabras: 'FIEBRE AMARILLA, LEPRA, ZOONOSIS, ETV, ENFERMEDADES TRANSMITIDAS POR VECTORES, VECTORES, VECTOR, COLVOL, HANSEN, TUBERCULOSIS, MALARIA, DENGUE, VACUNACION, VACUNACIÓN, VACUNA, VACUNAS, PAI, ZIKA, PAIWEB, RED DE FRIO, RED DE FRÍO, CHAGAS, CUIDADOCHAGAS, CUIDADO CHAGAS, BIOLOGICOS, BIOLÓGICOS, LEY DE MODERNIZACIÓN, LEY DE MODERNIZACION, LEY 2406, ENFERMEDADES TROPICALES, TROPICALES, TRACOMA, SARAMPIÓN, SARAMPION, TOLDILLOS, LEISHMANIASIS, HEPATITIS A, HEPATITIS B, COVID, T-080, T 080',
  },
  noTransmisibles: {
    nombre: 'Enfermedades No Transmisibles', idOficina: 45, color: '#7c3aed', emoji: '❤️',
    palabras: 'ONCOLOGICO, ONCOLÓGICO, TAMIZAJE, CANCER, CÁNCER, DIABETES, HIPERTENSION, HIPERTENSIÓN, OBESIDAD, TABACO, NICOTINA, VAPEADORES, VAPEADOR, ENFERMEDADES CRONICAS, ENFERMEDADES CRÓNICAS, ENFERMEDADES HUERFANAS, ENFERMEDADES HUÉRFANAS, ENFERMEDADES RARAS, ETIQUETADO, EMPAQUETADO, CIGARRILOS, CIGARRILLO, BUCAL, SALUD BUCAL, SALUD VISUAL, ASMA, CIGARRILLO ELECTRICO, CIGARRILLO ELÉCTRICO, ALIMENTACIÓN SALUDABLE, ALIMENTACION SALUDABLE',
  },
  saludAmbiental: {
    nombre: 'Salud Ambiental y Cambio Climático', idOficina: 49, color: '#059669', emoji: '🌱',
    palabras: 'AMBIENTE, CAMBIO CLIMATICO, CAMBIO CLIMÁTICO, CALIDAD DEL AIRE, RESIDUOS, AGUA POTABLE, SANEAMIENTO, AGUA PARA EL CONSUMO HUMANO, PISCINAS, PISCINA, CADAVER, CADÁVER, PESTISIDAS, MINERIA ILEGAL, MINERÍA ILEGAL, T-236, T 236, GLIFOSATO, TANATOPRAXIA, INCINERACIÓN, INCINERACION, CREMACIÓN, CREMACION, RESIDUOS, PISA, POLÍTICA INTEGRAL DE SALUD AMBIENTAL, POLITICA INTEGRAL DE SALUD AMBIENTAL, SUISA, SISTEMA UNIFICADO DE INFORMACIÓN DE SALUD AMBIENTAL, SISTEMA UNIFICADO DE INFORMACION DE SALUD AMBIENTAL, SANEAMIENTO BASICO, SANEAMIENTO BÁSICO, PIGCCS, PLAN INTEGRAL DE GESTIÓN DEL CAMBIO CLIMATICO DEL SECTOR SALUD, PLAN INTEGRAL DE GESTION DEL CAMBIO CLIMATICO DEL SECTOR SALUD, RUIDO, COSMETICOS, COSMÉTICOS, GETSA, GESTIÓN TERRITORIAL EN SALUD AMBIENTAL, GESTION TERRITORIAL EN SALUD AMBIENTAL, VACUNA ANTIRRABICA, VACUNA ANTIRRÁBICA, PERRO, PERROS, GATO, GATOS, COTSA, CONSEJOS TERRITORIALES DE SALUD AMBIENTAL CONASA, SEGURIDAD VIAL, RESOLUCIÓN 0234 DE 2026, RESOLUCION 0234 DE 2026, RESOLUCIÓN 0929 DE 2026, RESOLUCION 0929 DE 2026, PNEET, CALIDAD DEL AIRE EN EL INTERIOR, SENTENCIA T614, T-614, T 614, PTACCA, PLANES TERRITORIALES EN ADAPTACIÓN AL CAMBIO CLIMATICO DESDE SALUD AMBIENTAL, PLANES TERRITORIALES EN ADAPTACION AL CAMBIO CLIMATICO DESDE SALUD AMBIENTAL, PLAGISIDAS, PESTISIDAS, RESIDUOS, AGUAS RESIDUALES, CEMENTERIOS, ENTORNOS SALUDABLES, DECRETO 1085 DE 2021, EISA, ESTRATEGIA INTEGRADORA DE SALUD AMBIENTAL, MERCURIO, METALES, T-622 DE 2016, T 622, IPIAC, ',
  },
  nutricion: {
    nombre: 'Nutrición, Alimentación y Soberanía', idOficina: 53, color: '#d97706', emoji: '🍎',
    palabras: 'ALIMENTACION ESCOLAR, ALIMENTACIÓN ESCOLAR, DESNUTRICION, DESNUTRICIÓN, LACTANCIA, SOBERANIA ALIMENTARIA, SOBERANÍA ALIMENTARIA',
  },
  promocion: {
    nombre: 'Promoción de la Salud', idOficina: 130, color: '#0891b2', emoji: '💙',
    palabras: 'MUERTE DIGNA, MORRIR CON DIGNIDAD, SUBDIRECCIÓN DE PROMOCIÓN DE LA SALUD, SUBDIRECCION DE PROMOCION DE LA SALUD, SUBDORECCIÓN DE PROMOCION DE LA SALUD, SUBDIRECCION DE PROMOCIÓN DE LA SALUD, EUTANASIA, VIH, PEP, PREP, PROFILAXIS, SEXUALIDAD, DERECHOS SEXUALES, DERECHOS REPRODUCTIVOS, ANTICONCEPCION, ANTICONCEPCIÓN, INFERTILIDAD, AUTONOMIA REPRODUCTIVA, AUTONOMÍA REPRODUCTIVA, INTERRUPCION VOLUNTARIA DEL EMBARAZO, INTERRUPCIÓN VOLUNTARIA DEL EMBARAZO, IVE, SALUD MENSTRUAL, CUIDADO MENSTRUAL, ENDOMETRIOSIS, SALUD SEXUAL, SALUD REPRODUCTIVA, NINAS NINOS Y ADOLESCENTES, NIÑAS NIÑOS Y ADOLESCENTES, SALUD TRANS, VIOLENCIAS BASADAS EN GENERO, VIOLENCIAS BASADAS EN GÉNERO, VIDA LIBRE DE VIOLENCIAS, ATENCION A VICTIMAS, ATENCIÓN A VÍCTIMAS, SIVIGE, ABORDAJE DEL VIH, INFECCION POR VIH, INFECCIÓN POR VIH, HEPATITIS, ETMI PLUS, ASPECTOS BIOETICOS, ASPECTOS BIOÉTICOS, MUERTE DIGNA, SUBROGACION UTERINA, SUBROGACIÓN UTERINA, TRIAGE ETICO, TRIAGE ÉTICO, POLITICA NACIONAL DE SEXUALIDAD, POLÍTICA NACIONAL DE SEXUALIDAD',
  },

  // ─── Nueva dependencia, agregada tal como pediste ───
  // idOficina e idUnidad quedan en null porque aún no los tenemos: con el
  // panel cargado, corre en la consola  cdBuscarOficinaPorNombre('SALUD MENTAL')
  // y reemplaza ambos por los valores IDOFICINAPRODUCTORA e
  // IDUNIDADADMINISTRATIVA que te devuelva.
  saludMental: {
    nombre: 'Salud Mental y Convivencia', idOficina: 132, idUnidad: 2, color: '#9333ea', emoji: '🧠',
    palabras: 'SALUD MENTAL, CONVIVENCIA, CONVIVENCIA SOCIAL, PREVENCION DEL SUICIDIO, PREVENCIÓN DEL SUICIDIO, CONSUMO DE SUSTANCIAS PSICOACTIVAS, SUSTANCIAS PSICOACTIVAS, SALUD MENTAL Y CONVIVENCIA',
  },

  equiposbasicos: {
    nombre: 'Subdireccion de Fortalecimiento del Acceso a la Salud y Equipos Basicos', idOficina: 141, idUnidad: 2, color: '#93c5fd', emoji: '🚑',
    palabras: 'EQUIPOS BÁSICOS, EQUIPOS BASICOS, EBS',
  },

  ciudadanias: {
    nombre: 'Direccion de Ciudadanias, Equidad y Salud', idOficina: 133, idUnidad: 2, color: '#facc15', emoji: '👥',
    palabras: 'ALERTA ROSA, LEY 2326 DE 2023',
  },

};
// --> cdBuscarOficinaPorNombre('NOMBRE DE DIRECCIÓN/DEPENDENCIA') [EJECUTAR Y LLENAR LA NUEVA ENTRADA DE LA SUBDIRECCIÓN/DIRECCIÓN]

// Cuántas reasignaciones/cierres se corren al mismo tiempo en los procesos
// masivos ("Reasignar clasificados" y "Reasignación Manual"). Pediste 5 en
// simultáneo: sube o baja este número aquí si más adelante quieres ajustarlo.
const CONCURRENCIA_MAXIMA = 5;

// Corre `tareaFn` sobre cada elemento de `items`, con como máximo `limite`
// tareas en vuelo al mismo tiempo (en vez de esperar a que cada una termine
// antes de lanzar la siguiente). `onProgreso(completados, total)` se llama
// cada vez que una tarea termina, para poder actualizar la UI en vivo.
async function ejecutarConPool(items, limite, tareaFn, onProgreso) {
  let indice = 0;
  let completados = 0;
  const total = items.length;

  async function trabajador() {
    while (indice < total) {
      const miIndice = indice++;
      const item = items[miIndice];
      try {
        await tareaFn(item);
      } finally {
        completados++;
        if (onProgreso) onProgreso(completados, total);
      }
    }
  }

  const trabajadores = Array.from({ length: Math.min(limite, total) }, () => trabajador());
  await Promise.all(trabajadores);
}

// Prueba de carga NO destructiva: dispara varias llamadas de solo lectura
// (buscar jefe de una oficina) en paralelo y mide cuántas tolera el servidor
// sin fallar y qué tan rápido responde, sin mover ni un solo documento.
// Úsalo así en la consola: probarConcurrenciaSegura()
async function probarConcurrenciaSegura(nivelesAProbar = [1, 3, 5, 8, 12]) {
  const url = 'https://controldoc.minsalud.gov.co/ControlDoc/Usuarios/FuncionariosObtenerByCriterios?IDUNIDADADMINISTRATIVA=2&IDOFICINAPRODUCTORA=41&IDCARGO=2&NOMBRES=&APELLIDOS=&ListFuncSel=[]&ListFuncCop=[]&IDGRUPOTRABAJO=0&PROCESOSENA=&PROCEDENCIA=&BUSCARINACTIVO=NO&API=';
  for (const n of nivelesAProbar) {
    const inicio = performance.now();
    const resultados = await Promise.allSettled(
      Array.from({ length: n }, () => fetch(url, { credentials: 'same-origin', headers: { 'X-Requested-With': 'XMLHttpRequest' } }))
    );
    const ms = Math.round(performance.now() - inicio);
    const exitosos = resultados.filter(r => r.status === 'fulfilled' && r.value.ok).length;
    const fallidos = n - exitosos;
    console.log(`[Prueba] Concurrencia ${n}: ${exitosos} ok / ${fallidos} fallidos — ${ms}ms total (${Math.round(ms / n)}ms promedio)`);
    await new Promise(r => setTimeout(r, 2000));
  }
}

// ════════════════════════════════════════════════════════════════
// ═══ SCRIPT 1: PANEL DE SEGUIMIENTO DE DOCUMENTOS ═══
// ════════════════════════════════════════════════════════════════

const CD_CONFIG = {
  urlBuscar:        'https://controldoc.minsalud.gov.co/ControlDoc/Documentos/DocumentosBuscar',
  urlInfoGeneral:   'https://controldoc.minsalud.gov.co/ControlDoc/Documentos/INFORMACIONGENERALDOCUMENTO',
  urlWorkFlow:      'https://controldoc.minsalud.gov.co/Controldoc//Gestion/ModalWorkFlow',
  urlDocsAsociados: 'https://controldoc.minsalud.gov.co/ControlDoc/Documentos/ListarDocumentosAsociados',
  urlImagenB64:     'https://controldoc.minsalud.gov.co/Controldoc//Documentos/IMAGENB64byIDDOCUMENTO/',
  urlGuardarZip:    'https://controldoc.minsalud.gov.co/Controldoc//Gestion/GuardarAdjuntosZIP',
  urlOficinas:      'https://controldoc.minsalud.gov.co/ControlDoc/Parametrizacion/OFICINASPRODUCTORASObtener',
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

// Ayuda a encontrar el IDOFICINAPRODUCTORA de una dependencia nueva.
// Úsalo así en la consola, con el panel ya cargado:
//   cdBuscarOficinaPorNombre('SALUD MENTAL')
async function cdBuscarOficinaPorNombre(textoBusqueda) {
  const resp = await cdFetchGet(CD_CONFIG.urlOficinas);
  const data = await resp.json();
  const coincidencias = (data || []).filter(o => (o.NOMBRE || '').toUpperCase().includes(textoBusqueda.toUpperCase()));
  console.log(`[Config] Coincidencias para "${textoBusqueda}":`, coincidencias.map(o => ({
    IDOFICINAPRODUCTORA: o.IDOFICINAPRODUCTORA, NOMBRE: o.NOMBRE, IDUNIDADADMINISTRATIVA: o.IDUNIDADADMINISTRATIVA,
  })));
  return coincidencias;
}

function cdEstadoGlobal(pasoReciente, strEstadoDocumento) {
  const estadoFlujo = (pasoReciente?.ESTADOFLUJO || '').toUpperCase().trim();
  if (estadoFlujo.includes('EXITOSA')) return { texto: 'Gestión exitosa', color: '#16a34a', fondo: '#dcfce7' };
  if (estadoFlujo === 'TRANSITO') return { texto: 'En tránsito', color: '#2563eb', fondo: '#dbeafe' };
  if (estadoFlujo === 'SIN INICIAR TRAMITE' || !estadoFlujo) return { texto: strEstadoDocumento || 'Sin tramitar', color: '#6b7280', fondo: '#f3f4f6' };
  return { texto: estadoFlujo, color: '#92400e', fondo: '#fef3c7' };
}

function cdSanitizarBase64(str) {
  if (typeof str !== 'string') return '';
  let limpio = str.trim();
  if (limpio.startsWith('"') && limpio.endsWith('"')) limpio = limpio.slice(1, -1);
  limpio = limpio.replace(/[\r\n\s]/g, '');
  limpio = limpio.replace(/\\r/g, '').replace(/\\n/g, '').replace(/\\"/g, '"').replace(/\\\\/g, '\\');

  // Quita un sufijo de extensión pegado al final con coma, ej: "...==,pdf" o "...==,docx"
  const idxComa = limpio.lastIndexOf(',');
  if (idxComa !== -1 && idxComa > limpio.length - 10) {
    const sufijo = limpio.slice(idxComa + 1);
    if (/^[a-zA-Z0-9]{1,6}$/.test(sufijo)) {
      limpio = limpio.slice(0, idxComa);
    }
  }
  return limpio;
}

function cdBase64APdfBlob(base64) {
  const limpio = cdSanitizarBase64(base64);
  const binario = atob(limpio);
  const bytes = new Uint8Array(binario.length);
  for (let i = 0; i < binario.length; i++) bytes[i] = binario.charCodeAt(i);
  return new Blob([bytes], { type: 'application/pdf' });
}

async function cdObtenerPdfBlobUrl(idDocumento) {
  const resp = await cdFetchPost(CD_CONFIG.urlImagenB64, { IDDOCUMENTO: idDocumento });
  const textoCrudo = await resp.text();

  let data = null;
  try { data = JSON.parse(textoCrudo); } catch (e) { /* no era JSON válido */ }

  let candidato = null;
  let urlDirecta = null;

  if (data && typeof data === 'object' && data.VALORESPUESTA) {
    const valor = data.VALORESPUESTA;
    if (typeof valor === 'string' && valor.startsWith('http')) {
      urlDirecta = valor;
    } else {
      candidato = String(valor);
    }
  } else if (typeof data === 'string') {
    candidato = data;
  } else if (data === null) {
    candidato = textoCrudo;
  }

  if (urlDirecta) {
    const pdfResp = await fetch(urlDirecta, { credentials: 'same-origin' });
    if (!pdfResp.ok) { console.warn('[CD] Fallo al descargar desde URL, status:', pdfResp.status); return null; }
    return URL.createObjectURL(await pdfResp.blob());
  }

  if (candidato) {
    const limpio = cdSanitizarBase64(candidato);
    console.log('[CD] Candidato base64 — inicio:', limpio.slice(0, 40), '| fin:', limpio.slice(-40), '| longitud:', limpio.length);
    try {
      return URL.createObjectURL(cdBase64APdfBlob(limpio));
    } catch (e) {
      console.warn('[CD] Error al decodificar base64:', e.message, '— primeros 300 caracteres de la respuesta cruda:', textoCrudo.slice(0, 300));
      return null;
    }
  }

  console.warn('[CD] No se reconoció ningún formato válido. Primeros 300 caracteres:', textoCrudo.slice(0, 300));
  return null;
}

async function cdPrevisualizarPdf(idDocumento) {
  const url = await cdObtenerPdfBlobUrl(idDocumento);
  if (!url) return alert('No se encontró un PDF válido para este documento. Revisa la consola (F12) para más detalle.');
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
  console.log('[CD] Respuesta GuardarAdjuntosZIP:', data);

  if (!data || data.RESPUESTA !== true || !data.VALORESPUESTA) {
    alert(data?.MENSAJE || 'Este documento no tiene adjuntos disponibles.');
    return false;
  }

  const valor = data.VALORESPUESTA;
  const nombreArchivo = data.OBJETOS || `AdjuntosDoc_${idDocumento}.zip`;

  if (typeof valor === 'string' && valor.startsWith('http')) {
    const fileResp = await fetch(valor, { credentials: 'same-origin' });
    if (!fileResp.ok) {
      console.warn('[CD] Fallo al descargar ZIP, status:', fileResp.status);
      alert('No se pudo descargar el ZIP. Revisa la consola (F12).');
      return false;
    }
    const url = URL.createObjectURL(await fileResp.blob());
    const a = document.createElement('a');
    a.href = url; a.download = nombreArchivo;
    document.body.appendChild(a); a.click(); a.remove();
    URL.revokeObjectURL(url);
    return true;
  }

  const a = document.createElement('a');
  a.href = valor; a.download = nombreArchivo;
  document.body.appendChild(a); a.click(); a.remove();
  return true;
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

// ════════════════════════════════════════════════════════════════
// ═══ SCRIPT 2: MOTOR DE REASIGNACIÓN (verificación real por bandeja) ═══
// ════════════════════════════════════════════════════════════════

const CD2_CONFIG = {
  urlBandeja:          'https://controldoc.minsalud.gov.co/ControlDoc/Documentos/DOCUMENTOSGESTIONObtenerbyESTADOFLUJOeIDUSUARIOASIGNO',
  urlFuncionarios:     'https://controldoc.minsalud.gov.co/ControlDoc/Usuarios/FuncionariosObtenerByCriterios',
  urlTramitar:         'https://controldoc.minsalud.gov.co/Controldoc//Gestion/TRAMITARENUNSOLOMETODO',
  urlValidar:          'https://controldoc.minsalud.gov.co/Controldoc//Gestion/VALIDARUSUARIOSESTADOSI',
  urlCerrarComentario: 'https://controldoc.minsalud.gov.co/Controldoc//Gestion/DOCUMENTOSGESTIONActualizarAlTramitarByGESTION/',
};

const CD2_IDACCION_GESTION_EXITOSA = 4;
const CD2_COMENTARIO_CIERRE_DEFAULT = ' --- POR LO QUE SE PROCEDE A ARCHIVAR Y CERRAR LA PRESENTE COMUNICACIÓN POR COMENTARIO.';
const CD2_COMENTARIO_REASIGNACION_DEFAULT = 'SE ASIGNA LA PRESENTE YA QUE SE CONSIDERA DE SU COMPETENCIA, EN CASO DE NO SER ASÍ, POR FAVOR DAR TRASLADO INMEDIATO AL ÁREA CORRESPONDIENTE, EN APLICACIÓN DE LA RESOLUCIÓN NO 3687 DE 2016 Y CIRCULAR 18 DE 2020';

const CD2_SUBDIRECCIONES = CONFIG_DEPENDENCIAS;
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
async function cd2ObtenerJefe(idOficina, idUnidad) {
  idUnidad = idUnidad ?? CD2_IDUNIDAD; // funciona tanto si idUnidad es undefined como si es null
  const claveCache = `${idUnidad}-${idOficina}`;
  if (cd2CacheJefes[claveCache]) return cd2CacheJefes[claveCache];
  const params = {
    IDUNIDADADMINISTRATIVA: idUnidad, IDOFICINAPRODUCTORA: idOficina, IDCARGO: 2,
    NOMBRES: '', APELLIDOS: '', ListFuncSel: '[]', ListFuncCop: '[]',
    IDGRUPOTRABAJO: 0, PROCESOSENA: '', PROCEDENCIA: '', BUSCARINACTIVO: 'NO', API: '',
  };
  const url = `${CD2_CONFIG.urlFuncionarios}?${new URLSearchParams(params).toString()}`;
  const resp = await fetch(url, { credentials: 'same-origin', headers: { 'X-Requested-With': 'XMLHttpRequest' } });
  const data = await resp.json();
  if (!data || !data.length) throw new Error(`No se encontró jefe para la oficina ${idOficina}`);
  cd2CacheJefes[claveCache] = data[0];
  return data[0];
}

async function cd2ValidarFuncionario(funcionario) {
  try {
    const data = await cd2Post(CD2_CONFIG.urlValidar, { LSTIDFUNCIONARIOS: JSON.stringify([funcionario]) });
    return data;
  } catch (e) {
    return { RESPUESTA: null, MENSAJE: 'No se pudo validar: ' + e.message };
  }
}

// Construye el DOCUMENTOGESTION base a partir del registro en bandeja
// (info del lado del remitente/documento, compartida sin importar el
// destino o destinos a los que se vaya a tramitar).
function cd2ConstruirDocumentoGestion(registro, comentario) {
  const ahoraISO = new Date().toISOString();
  const fechaVieja = 'Sun Dec 17 1995 00:00:00 GMT-0500 (hora estándar de Colombia)';
  return {
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
}

async function cd2EnviarTramite(registro, listaFuncionarios, comentario) {
  const documentoGestion = cd2ConstruirDocumentoGestion(registro, comentario);
  const params = cd2Serializar({ tramite: { DOCUMENTOREQUISITOS: [0], DOCUMENTOGESTION: documentoGestion, lstFUNCIONARIOS: listaFuncionarios } });
  params.append('ESTADOFLUJO', 'TRANSITO');
  params.append('IDDOCUMENTOGESTION', registro.IDDOCUMENTOGESTION);
  params.append('COMENTARIO', comentario);

  const resp = await fetch(CD2_CONFIG.urlTramitar, {
    method: 'POST', credentials: 'same-origin',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8', 'X-Requested-With': 'XMLHttpRequest' },
    body: params.toString(),
  });
  return resp.json();
}

// Reasigna un IDC a UNA sola dependencia (usado por el botón 🚀 de cada fila
// y por "Reasignar clasificados").
async function cd2ReasignarDocumento(idDocumento, claveSubdireccion, comentario) {
  const sub = CD2_SUBDIRECCIONES[claveSubdireccion];
  if (!sub) throw new Error('Subdirección no reconocida: ' + claveSubdireccion);
  if (sub.idOficina == null) {
    throw new Error(`Falta configurar "idOficina" para "${sub.nombre}" en CONFIG_DEPENDENCIAS. Corre cdBuscarOficinaPorNombre('${sub.nombre}') en la consola para encontrarlo.`);
  }
  const registro = await cd2BuscarEnBandeja(idDocumento);
  const jefe = await cd2ObtenerJefe(sub.idOficina, sub.idUnidad);
  const funcionario = { ...jefe, IDINSTRUCCION: 8, DIAS: false, COMENTARIO: comentario, SELECCIONADO: true };

  const validacion = await cd2ValidarFuncionario(funcionario);
  console.log(`[CD2] Validación funcionario (${jefe.NOMBRESAPELLIDOS}) para IDC ${idDocumento}:`, validacion);

  const data = await cd2EnviarTramite(registro, [funcionario], comentario);
  console.log(`[CD2] Respuesta TRAMITARENUNSOLOMETODO para IDC ${idDocumento}:`, data);

  // Verificación real de éxito: si el documento ya no aparece en tu bandeja
  // "SIN INICIAR TRAMITE", significa que el trámite sí lo movió de verdad —
  // esto es más confiable que la validación previa, que puede decir
  // "funcionario inactivo" incluso cuando el trámite sí se completa bien.
  let movioBandeja = false;
  try {
    await cd2BuscarEnBandeja(idDocumento);
  } catch (e) {
    movioBandeja = true;
  }

  return { idDocumento, subdireccion: sub.nombre, jefe: jefe.NOMBRESAPELLIDOS, resultado: data, validacion, movioBandeja };
}

// Reasigna un IDC a VARIAS dependencias al mismo tiempo, en un solo POST
// (el mismo mecanismo que usa "Buscador de Usuarios" en la interfaz cuando
// seleccionas varios destinatarios y le das "Agregar Todos").
async function cd2ReasignarDocumentoMultiple(idDocumento, clavesSubdirecciones, comentario) {
  const subs = clavesSubdirecciones.map(clave => {
    const sub = CD2_SUBDIRECCIONES[clave];
    if (!sub) throw new Error('Subdirección no reconocida: ' + clave);
    if (sub.idOficina == null) {
      throw new Error(`Falta configurar "idOficina" para "${sub.nombre}" en CONFIG_DEPENDENCIAS.`);
    }
    return sub;
  });

  const registro = await cd2BuscarEnBandeja(idDocumento);

  const destinos = [];
  for (const sub of subs) {
    const jefe = await cd2ObtenerJefe(sub.idOficina, sub.idUnidad);
    destinos.push({ sub, jefe });
  }

  const listaFuncionarios = destinos.map(({ jefe }) => ({ ...jefe, IDINSTRUCCION: 8, DIAS: false, COMENTARIO: comentario, SELECCIONADO: true }));

  const validaciones = [];
  for (const funcionario of listaFuncionarios) {
    const v = await cd2ValidarFuncionario(funcionario);
    validaciones.push({ nombre: funcionario.NOMBRESAPELLIDOS, validacion: v });
    console.log(`[CD2] Validación funcionario (${funcionario.NOMBRESAPELLIDOS}) para IDC ${idDocumento}:`, v);
  }

  const data = await cd2EnviarTramite(registro, listaFuncionarios, comentario);
  console.log(`[CD2] Respuesta TRAMITARENUNSOLOMETODO (multi-destino) para IDC ${idDocumento}:`, data);

  let movioBandeja = false;
  try {
    await cd2BuscarEnBandeja(idDocumento);
  } catch (e) {
    movioBandeja = true;
  }

  return {
    idDocumento,
    destinos: destinos.map(({ sub, jefe }) => ({ nombre: sub.nombre, jefe: jefe.NOMBRESAPELLIDOS })),
    resultado: data, validaciones, movioBandeja,
  };
}

async function cd2ReasignarLote(listaIds, claveSubdireccion, comentario, onProgreso) {
  const resultados = { exitosos: [], fallidos: [] };
  await ejecutarConPool(listaIds, CONCURRENCIA_MAXIMA, async (idRaw) => {
    const id = idRaw.trim();
    try {
      const r = await cd2ReasignarDocumento(id, claveSubdireccion, comentario);
      console.log(r.movioBandeja ? '✅' : '❌', id, '→', r.subdireccion, '(', r.jefe, ')', r.resultado, 'validación:', r.validacion);
      if (r.movioBandeja) resultados.exitosos.push(id); else resultados.fallidos.push({ id, error: r.resultado });
    } catch (e) { console.log('❌', id, e.message); resultados.fallidos.push({ id, error: e.message }); }
  }, onProgreso);
  console.log(`\n🏁 Lote completo. ✅ ${resultados.exitosos.length} — ❌ ${resultados.fallidos.length}`);
  return resultados;
}

async function cd2ReasignarLoteMultiple(listaIds, clavesSubdirecciones, comentario, onProgreso) {
  const resultados = { exitosos: [], fallidos: [] };
  await ejecutarConPool(listaIds, CONCURRENCIA_MAXIMA, async (idRaw) => {
    const id = idRaw.trim();
    try {
      const r = await cd2ReasignarDocumentoMultiple(id, clavesSubdirecciones, comentario);
      console.log(r.movioBandeja ? '✅' : '❌', id, '→', r.destinos.map(d => `${d.nombre} (${d.jefe})`).join(' + '), r.resultado);
      if (r.movioBandeja) resultados.exitosos.push(id); else resultados.fallidos.push({ id, error: r.resultado });
    } catch (e) { console.log('❌', id, e.message); resultados.fallidos.push({ id, error: e.message }); }
  }, onProgreso);
  console.log(`\n🏁 Lote completo. ✅ ${resultados.exitosos.length} — ❌ ${resultados.fallidos.length}`);
  return resultados;
}

// Cierre por comentario: no necesita jefe ni validación, solo el
// IDDOCUMENTOGESTION (que cd2BuscarEnBandeja ya resuelve) y un POST directo.
async function cd2CerrarPorComentario(idDocumento, comentario) {
  const registro = await cd2BuscarEnBandeja(idDocumento);
  const params = new URLSearchParams({
    'actualizarTramite[DOCUMENTOGESTION][IDDOCUMENTO]': registro.IDDOCUMENTO,
    'actualizarTramite[DOCUMENTOGESTION][IDACCION]': CD2_IDACCION_GESTION_EXITOSA,
    'actualizarTramite[DOCUMENTOGESTION][ESTADOFLUJO]': 'GESTION EXITOSA',
    'actualizarTramite[DOCUMENTOGESTION][COMENTARIO]': comentario,
    'actualizarTramite[DOCUMENTOGESTION][DOCGESGENERO]': '',
    'actualizarTramite[DOCUMENTOGESTION][TRAMITADO]': 'SI',
    'actualizarTramite[DOCUMENTOGESTION][strIDDOCUMENTOSGESTION]': registro.IDDOCUMENTOGESTION,
  });
  const resp = await fetch(CD2_CONFIG.urlCerrarComentario, {
    method: 'POST', credentials: 'same-origin',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8', 'X-Requested-With': 'XMLHttpRequest' },
    body: params.toString(),
  });
  const data = await resp.json();
  console.log(`[CD2] Respuesta cierre por comentario para IDC ${idDocumento}:`, data);

  // Misma verificación real: si ya no está en la bandeja, sí se cerró.
  let movioBandeja = false;
  try {
    await cd2BuscarEnBandeja(idDocumento);
  } catch (e) {
    movioBandeja = true;
  }

  return { idDocumento, resultado: data, movioBandeja };
}

// ════════════════════════════════════════════════════════════════
// ═══ SCRIPT 3: CLASIFICADOR DE DOCUMENTOS POR COMPETENCIA ═══
// ════════════════════════════════════════════════════════════════

const CD3_CONFIG = { urlBandeja: 'https://controldoc.minsalud.gov.co/ControlDoc/Documentos/DOCUMENTOSGESTIONObtenerbyESTADOFLUJOeIDUSUARIOASIGNO' };

const CD3_SUBDIRECCIONES = CONFIG_DEPENDENCIAS;

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
      return { idc: doc.IDDOCUMENTO, radicado: doc.RADICADO, asunto: doc.DESCRIPCION || '(sin descripción)', prediccion, esPriorizacion, manual: prediccion, estadoEnvio: null, mensajeEstado: '' };
    });
    estado.textContent = `✅ ${CD3_DOCUMENTOS.length} documento(s) clasificado(s).`;
    cd3RenderizarResultados();
  }

  btn.disabled = false;
  btn.style.opacity = '1';
  btn.style.cursor = 'pointer';
  btn.textContent = textoOriginal;
}

function cd3ProgramarLimpieza(doc) {
  setTimeout(() => {
    const idx = CD3_DOCUMENTOS.indexOf(doc);
    if (idx !== -1 && doc.estadoEnvio === 'ok') {
      CD3_DOCUMENTOS.splice(idx, 1);
      cd3RenderizarResultados();
    }
  }, 5000);
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
    const iconoEstado = d.estadoEnvio === 'ok' ? '✅'
      : d.estadoEnvio === 'error' ? '❌'
      : d.estadoEnvio === 'advertencia' ? '⚠️'
      : d.estadoEnvio === 'enviando' ? '⏳' : '';
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
        <button data-idx="${i}" class="cd3-btn-cerrar" title="Cerrar por comentario (comunicación informativa)" style="padding:3px 5px; background:#0d9488; color:#fff; border:none; border-radius:4px; cursor:pointer; font-size:11px;">🗂️</button>
        <span style="margin-left:2px;" title="${d.mensajeEstado || ''}">${iconoEstado}</span>
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
    sel.value = CD3_DOCUMENTOS[idx].manual || '';
    sel.onchange = () => { CD3_DOCUMENTOS[idx].manual = sel.value || null; cd3RenderizarResultados(); };
  });

  cont.querySelectorAll('.cd3-btn-preview').forEach(btn => {
    btn.onclick = () => {
      const doc = CD3_DOCUMENTOS[Number(btn.dataset.idx)];
      cdPrevisualizarPdf(doc.idc);
    };
  });

  cont.querySelectorAll('.cd3-btn-adjuntos').forEach(btn => {
    btn.onclick = () => {
      const doc = CD3_DOCUMENTOS[Number(btn.dataset.idx)];
      cdDescargarAdjuntos(doc.idc);
    };
  });

  cont.querySelectorAll('.cd3-btn-reasignar').forEach(btn => {
    btn.onclick = async () => {
      const idx = Number(btn.dataset.idx);
      const doc = CD3_DOCUMENTOS[idx];
      if (!doc.manual) return;
      const sub = CD2_SUBDIRECCIONES[doc.manual];
      const comentario = document.querySelector('#PCD_ComentarioReasignacion')?.value.trim() || CD2_COMENTARIO_REASIGNACION_DEFAULT;
      const jefe = await cd2ObtenerJefe(sub.idOficina, sub.idUnidad).catch(() => null);
      const nombreJefe = jefe ? jefe.NOMBRESAPELLIDOS : '(jefe no identificado)';
      if (!confirm(`¿Reasignar el IDC ${doc.idc} a "${sub.nombre}"?\n\nJefe destino: ${nombreJefe}`)) return;
      doc.estadoEnvio = 'enviando'; cd3RenderizarResultados();
      try {
        const r = await cd2ReasignarDocumento(String(doc.idc), doc.manual, comentario);
        if (r.movioBandeja) {
          doc.estadoEnvio = 'ok';
          doc.mensajeEstado = '';
        } else {
          doc.estadoEnvio = 'error';
          doc.mensajeEstado = 'El documento sigue en tu bandeja: el trámite no se completó. ' + (r.validacion?.MENSAJE || '');
        }
        console.log(r.movioBandeja ? '✅' : '❌', doc.idc, '→', r.subdireccion, r.resultado, 'validación:', r.validacion);
        if (doc.estadoEnvio === 'ok') cd3ProgramarLimpieza(doc);
      } catch (e) { doc.estadoEnvio = 'error'; doc.mensajeEstado = e.message; console.log('❌', doc.idc, e.message); }
      cd3RenderizarResultados();
    };
  });

  cont.querySelectorAll('.cd3-btn-cerrar').forEach(btn => {
    btn.onclick = async () => {
      const idx = Number(btn.dataset.idx);
      const doc = CD3_DOCUMENTOS[idx];
      const comentario = document.querySelector('#PCD_ComentarioCierre')?.value.trim() || CD2_COMENTARIO_CIERRE_DEFAULT;
      if (!confirm(`¿Cerrar el IDC ${doc.idc} por comentario (comunicación informativa)?\n\nComentario: "${comentario}"`)) return;
      doc.estadoEnvio = 'enviando'; cd3RenderizarResultados();
      try {
        const r = await cd2CerrarPorComentario(String(doc.idc), comentario);
        doc.estadoEnvio = r.movioBandeja ? 'ok' : 'error';
        doc.mensajeEstado = r.movioBandeja ? '' : 'El documento sigue en tu bandeja: el cierre no se completó.';
        console.log(r.movioBandeja ? '✅' : '❌', doc.idc, 'cierre por comentario:', r.resultado);
        if (r.movioBandeja) cd3ProgramarLimpieza(doc);
      } catch (e) { doc.estadoEnvio = 'error'; doc.mensajeEstado = e.message; console.log('❌', doc.idc, e.message); }
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

  const comentario = document.querySelector('#PCD_ComentarioReasignacion')?.value.trim() || CD2_COMENTARIO_REASIGNACION_DEFAULT;
  const estado = document.querySelector('#PCD_EstadoReasignacionMasiva');

  const textoOriginal = btn.textContent;
  btn.disabled = true;
  btn.style.opacity = '0.6';
  btn.style.cursor = 'not-allowed';
  btn.textContent = '⏳ Reasignando...';

  // Lista plana de tareas (doc + dependencia), para correrlas con un límite
  // de concurrencia en vez de una por una en secuencia.
  const tareas = [];
  for (const [clave, docs] of Object.entries(grupos)) {
    for (const doc of docs) tareas.push({ doc, clave });
  }

  let advertencias = 0;

  await ejecutarConPool(tareas, CONCURRENCIA_MAXIMA, async ({ doc, clave }) => {
    doc.estadoEnvio = 'enviando'; cd3RenderizarResultados();
    try {
      const r = await cd2ReasignarDocumento(String(doc.idc), clave, comentario);
      if (r.movioBandeja) {
        doc.estadoEnvio = 'ok';
      } else {
        doc.estadoEnvio = 'error';
        doc.mensajeEstado = 'El documento sigue en tu bandeja: el trámite no se completó.';
        advertencias++;
      }
      if (doc.estadoEnvio === 'ok') cd3ProgramarLimpieza(doc);
    } catch (e) { doc.estadoEnvio = 'error'; doc.mensajeEstado = e.message; }
    cd3RenderizarResultados();
  }, (completados, total) => {
    if (estado) estado.textContent = `⏳ Procesando ${completados}/${total}... (${CONCURRENCIA_MAXIMA} a la vez)`;
  });

  const exitosos = pendientes.filter(d => d.estadoEnvio === 'ok').length;
  const advertenciaTexto = advertencias ? ` — ⚠️ ${advertencias} no se movieron realmente de la bandeja (revisa manualmente)` : '';
  if (estado) estado.textContent = `🏁 Completado: ${exitosos} exitosos, ${pendientes.length - exitosos} fallidos (dentro del filtro)${advertenciaTexto}.`;

  btn.disabled = false;
  btn.style.opacity = '1';
  btn.style.cursor = 'pointer';
  btn.textContent = textoOriginal;
}

// ── Reasignación manual: pegar IDCs sueltos + marcar 1 o varias dependencias ──
async function cd3ReasignarManualMultiple() {
  const idsRaw = document.querySelector('#PCD_ManualIds').value.trim();
  const comentario = document.querySelector('#PCD_ComentarioReasignacion')?.value.trim() || CD2_COMENTARIO_REASIGNACION_DEFAULT;
  const estado = document.querySelector('#PCD_EstadoManual');
  const btn = document.querySelector('#PCD_ReasignarManual');

  if (!idsRaw) return alert('Ingresa al menos un IDC o Radicado en el cuadro de arriba.');
  const lista = idsRaw.split(/[\n,;]+/).map(s => s.trim()).filter(Boolean);

  const clavesSeleccionadas = Array.from(document.querySelectorAll('.cd3-check-manual:checked')).map(chk => chk.value);
  if (!clavesSeleccionadas.length) return alert('Marca al menos una dependencia destino.');

  const nombresDestinos = clavesSeleccionadas.map(c => CD2_SUBDIRECCIONES[c].nombre).join(' + ');
  if (!confirm(`¿Confirmas reasignar ${lista.length} documento(s) a:\n\n${nombresDestinos}\n\nDocumentos: ${lista.join(', ')}`)) return;

  const textoOriginal = btn.textContent;
  estado.textContent = `⏳ Procesando 0/${lista.length}... (${CONCURRENCIA_MAXIMA} a la vez)`;
  btn.disabled = true;
  btn.style.opacity = '0.6';
  btn.style.cursor = 'not-allowed';

  const resultados = await cd2ReasignarLoteMultiple(lista, clavesSeleccionadas, comentario, (completados, total) => {
    estado.textContent = `⏳ Procesando ${completados}/${total}... (${CONCURRENCIA_MAXIMA} a la vez)`;
  });

  btn.disabled = false;
  btn.style.opacity = '1';
  btn.style.cursor = 'pointer';
  btn.textContent = textoOriginal;
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

  const checkboxesManuales = Object.entries(CD2_SUBDIRECCIONES).map(([clave, sub]) => `
    <label style="display:flex; align-items:center; gap:8px; padding:7px 10px; margin-bottom:5px; background:${sub.color}22; border-left:4px solid ${sub.color}; border-radius:6px; cursor:pointer; font-size:12px; font-weight:600;">
      <input type="checkbox" class="cd3-check-manual" value="${clave}" style="flex-shrink:0;">
      ${sub.emoji} ${sub.nombre}
    </label>
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
          <input id="PCD_ComentarioReasignacion" type="text" value="${CD2_COMENTARIO_REASIGNACION_DEFAULT}" style="width:100%; padding:5px; border:1px solid #ccc; border-radius:4px; margin:3px 0 8px; font-size:11px; box-sizing:border-box;">

          <label style="color:#6b7280; font-size:11px;">Comentario de cierre (se usa al cerrar 🗂️ desde este panel)</label>
          <textarea id="PCD_ComentarioCierre" rows="2" style="width:100%; padding:5px; border:1px solid #ccc; border-radius:4px; margin:3px 0 8px; font-size:11px; box-sizing:border-box;">${CD2_COMENTARIO_CIERRE_DEFAULT}</textarea>

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

          <label style="color:#6b7280; font-size:11px;">Dependencia(s) destino — marca una o varias</label>
          <div style="margin:4px 0 10px;">
            ${checkboxesManuales}
          </div>

          <button id="PCD_ReasignarManual" style="width:100%; padding:8px; background:#16a34a; color:#fff; border:none; border-radius:6px; cursor:pointer; font-weight:bold;">🚀 Reasignar a las dependencias marcadas</button>
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

  document.querySelector('#PCD_ReasignarManual').onclick = cd3ReasignarManualMultiple;
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

// ════════════════════════════════════════════════════════════════
// ═══ INICIALIZACIÓN ═══
// ════════════════════════════════════════════════════════════════
cdCrearPanel();
cd3CrearPanel();
