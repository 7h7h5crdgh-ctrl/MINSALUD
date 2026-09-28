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
    palabras: 'VACCUNACION, VACCUNACIONES, FIEBRE AMARILLA, LEPRA, ZOONOSIS, ETV, ENFERMEDADES TRANSMITIDAS POR VECTORES, VECTORES, VECTOR, COLVOL, HANSEN, TUBERCULOSIS, MALARIA, DENGUE, VACUNACION, VACUNACIÓN, VACUNA, VACUNAS, PAI, ZIKA, PAIWEB, RED DE FRIO, RED DE FRÍO, CHAGAS, CUIDADOCHAGAS, CUIDADO CHAGAS, BIOLOGICOS, BIOLÓGICOS, LEY DE MODERNIZACIÓN, LEY DE MODERNIZACION, LEY 2406, ENFERMEDADES TROPICALES, TROPICALES, TRACOMA, SARAMPIÓN, SARAMPION, TOLDILLOS, LEISHMANIASIS, HEPATITIS A, HEPATITIS B, COVID, T-080, T 080',
  },
  noTransmisibles: {
    nombre: 'Enfermedades No Transmisibles', idOficina: 45, color: '#7c3aed', emoji: '❤️',
    palabras: 'ONCOLOGICO, ONCOLÓGICO, TAMIZAJE, CANCER, CÁNCER, DIABETES, HIPERTENSION, HIPERTENSIÓN, OBESIDAD, TABACO, NICOTINA, VAPEADORES, VAPEADOR, ENFERMEDADES CRONICAS, ENFERMEDADES CRÓNICAS, ENFERMEDADES HUERFANAS, ENFERMEDADES HUÉRFANAS, ENFERMEDADES RARAS, ETIQUETADO, EMPAQUETADO, CIGARRILOS, CIGARRILLO, BUCAL, SALUD BUCAL, SALUD VISUAL, ASMA, CIGARRILLO ELECTRICO, CIGARRILLO ELÉCTRICO, ALIMENTACIÓN SALUDABLE, ALIMENTACION SALUDABLE',
  },
  saludAmbiental: {
    nombre: 'Salud Ambiental y Cambio Climático', idOficina: 49, color: '#059669', emoji: '🌱',
    // Nota de pesos: AMBIENTE, MATERIAL/MATERIALES, RUIDO, PERRO/PERROS/GATO/GATOS
    // y CULTIVO/CULTIVOS son palabras genéricas que aparecen en muchos contextos
    // ajenos a esta dependencia — se les bajó el peso a 0.3-0.5 para que por sí
    // solas casi no ganen la clasificación, pero sí sumen si aparecen junto a
    // otras más específicas. Números de resolución/decreto/sentencia son muy
    // específicos y casi nunca dan falso positivo, así que pesan más (2).
    excluir: 'AMBIENTE LABORAL, CLIMA LABORAL',
    palabras: 'COCA, CULTIVO:0.4, CULTIVOS:0.4, GLUFOSINATO:1.5, AMONIO:1.2, MATERIALES:0.3, MATERIAL:0.3, AMBIENTE:0.3, CAMBIO CLIMATICO, CAMBIO CLIMÁTICO, CALIDAD DEL AIRE, RESIDUOS, AGUA POTABLE, SANEAMIENTO, AGUA PARA EL CONSUMO HUMANO, PISCINAS, PISCINA, CADAVER, CADÁVER, PESTISIDAS, MINERIA ILEGAL, MINERÍA ILEGAL, T-236:2, T 236:2, GLIFOSATO, TANATOPRAXIA, INCINERACIÓN, INCINERACION, CREMACIÓN, CREMACION, RESIDUOS, PISA, POLÍTICA INTEGRAL DE SALUD AMBIENTAL, POLITICA INTEGRAL DE SALUD AMBIENTAL, SUISA, SISTEMA UNIFICADO DE INFORMACIÓN DE SALUD AMBIENTAL, SISTEMA UNIFICADO DE INFORMACION DE SALUD AMBIENTAL, SANEAMIENTO BASICO, SANEAMIENTO BÁSICO, PIGCCS, PLAN INTEGRAL DE GESTIÓN DEL CAMBIO CLIMATICO DEL SECTOR SALUD, PLAN INTEGRAL DE GESTION DEL CAMBIO CLIMATICO DEL SECTOR SALUD, RUIDO:0.5, COSMETICOS, COSMÉTICOS, GETSA, GESTIÓN TERRITORIAL EN SALUD AMBIENTAL, GESTION TERRITORIAL EN SALUD AMBIENTAL, VACUNA ANTIRRABICA, VACUNA ANTIRRÁBICA, PERRO:0.5, PERROS:0.5, GATO:0.5, GATOS:0.5, COTSA, CONSEJOS TERRITORIALES DE SALUD AMBIENTAL CONASA, SEGURIDAD VIAL, RESOLUCIÓN 0234 DE 2026:2, RESOLUCION 0234 DE 2026:2, RESOLUCIÓN 0929 DE 2026:2, RESOLUCION 0929 DE 2026:2, PNEET, CALIDAD DEL AIRE EN EL INTERIOR, SENTENCIA T614:2, T-614:2, T 614:2, PTACCA, PLANES TERRITORIALES EN ADAPTACIÓN AL CAMBIO CLIMATICO DESDE SALUD AMBIENTAL, PLANES TERRITORIALES EN ADAPTACION AL CAMBIO CLIMATICO DESDE SALUD AMBIENTAL, PLAGISIDAS, PESTISIDAS, RESIDUOS, AGUAS RESIDUALES, CEMENTERIOS, ENTORNOS SALUDABLES, DECRETO 1085 DE 2021:2, EISA, ESTRATEGIA INTEGRADORA DE SALUD AMBIENTAL, MERCURIO, METALES, T-622 DE 2016:2, T 622:2, IPIAC, ',
  },
  nutricion: {
    nombre: 'Nutrición, Alimentación y Soberanía', idOficina: 53, color: '#d97706', emoji: '🍎',
    palabras: 'ALIMENTACION ESCOLAR, ALIMENTACIÓN ESCOLAR, DESNUTRICION, DESNUTRICIÓN, LACTANCIA, SOBERANIA ALIMENTARIA, SOBERANÍA ALIMENTARIA',
  },
  promocion: {
    nombre: 'Promoción de la Salud', idOficina: 130, color: '#0891b2', emoji: '💙',
    palabras: 'MUERTES VIOLENTAS, FEMINICIDIO, FEMICIDIO, PISIS, MUERTE DIGNA, MORRIR CON DIGNIDAD, SUBDIRECCIÓN DE PROMOCIÓN DE LA SALUD:2, SUBDIRECCION DE PROMOCION DE LA SALUD:2, SUBDORECCIÓN DE PROMOCION DE LA SALUD:2, SUBDIRECCION DE PROMOCIÓN DE LA SALUD:2, EUTANASIA, VIH, PEP, PREP, PROFILAXIS, SEXUALIDAD, DERECHOS SEXUALES, DERECHOS REPRODUCTIVOS, ANTICONCEPCION, ANTICONCEPCIÓN, INFERTILIDAD, AUTONOMIA REPRODUCTIVA, AUTONOMÍA REPRODUCTIVA, INTERRUPCION VOLUNTARIA DEL EMBARAZO, INTERRUPCIÓN VOLUNTARIA DEL EMBARAZO, IVE:1.5, SALUD MENSTRUAL, CUIDADO MENSTRUAL, ENDOMETRIOSIS, SALUD SEXUAL, SALUD REPRODUCTIVA, NINAS NINOS Y ADOLESCENTES, NIÑAS NIÑOS Y ADOLESCENTES, SALUD TRANS, VIOLENCIAS BASADAS EN GENERO, VIOLENCIAS BASADAS EN GÉNERO, VIDA LIBRE DE VIOLENCIAS, ATENCION A VICTIMAS, ATENCIÓN A VÍCTIMAS, SIVIGE:1.5, ABORDAJE DEL VIH, INFECCION POR VIH, INFECCIÓN POR VIH, HEPATITIS, ETMI PLUS, ASPECTOS BIOETICOS, ASPECTOS BIOÉTICOS, MUERTE DIGNA, SUBROGACION UTERINA, SUBROGACIÓN UTERINA, TRIAGE ETICO, TRIAGE ÉTICO, POLITICA NACIONAL DE SEXUALIDAD, POLÍTICA NACIONAL DE SEXUALIDAD',
  },

  // ─── Nueva dependencia, agregada tal como pediste ───
  // idOficina e idUnidad quedan en null porque aún no los tenemos: con el
  // panel cargado, corre en la consola  cdBuscarOficinaPorNombre('SALUD MENTAL')
  // y reemplaza ambos por los valores IDOFICINAPRODUCTORA e
  // IDUNIDADADMINISTRATIVA que te devuelva.
  saludMental: {
    nombre: 'Salud Mental y Convivencia', idOficina: 132, idUnidad: 2, color: '#9333ea', emoji: '🧠',
    palabras: 'SUICIDIO:2, SALUD MENTAL:1.5, CONVIVENCIA, CONVIVENCIA SOCIAL, PREVENCION DEL SUICIDIO:2, PREVENCIÓN DEL SUICIDIO:2, CONSUMO DE SUSTANCIAS PSICOACTIVAS, SUSTANCIAS PSICOACTIVAS, SALUD MENTAL Y CONVIVENCIA:2',
  },

  equiposbasicos: {
    nombre: 'Subdireccion de Fortalecimiento del Acceso a la Salud y Equipos Basicos', idOficina: 141, idUnidad: 2, color: '#93c5fd', emoji: '🚑',
    palabras: 'EQUIPOS BÁSICOS:1.5, EQUIPOS BASICOS:1.5, EBS:0.5',
  },

  ciudadanias: {
    nombre: 'Direccion de Ciudadanias, Equidad y Salud', idOficina: 133, idUnidad: 2, color: '#facc15', emoji: '👥',
    palabras: 'ALERTA ROSA:2, LEY 2326 DE 2023:2',
  },

};
// --> cdBuscarOficinaPorNombre('NOMBRE DE DIRECCIÓN/DEPENDENCIA') [EJECUTAR Y LLENAR LA NUEVA ENTRADA DE LA SUBDIRECCIÓN/DIRECCIÓN]
//
// Formato de "palabras": cada palabra puede llevar opcionalmente ":PESO" al
// final (ej. "T-080:2"). Sin ":PESO" el peso por defecto es 1. Usa pesos
// bajos (0.3-0.5) en palabras genéricas que dan muchos falsos positivos, y
// altos (1.5-2) en frases muy específicas que casi nunca fallan.
//
// Formato de "excluir" (opcional): frases separadas por coma que, si
// aparecen en el documento, le restan puntos a esa dependencia (para
// contrarrestar falsos positivos de una palabra genérica de su lista).

// ════════════════════════════════════════════════════════════════
// ═══ COMENTARIOS PREDEFINIDOS (tabla editable) ═══
// El primero de cada lista es el que aparece por defecto ya escrito en el
// textbox al abrir el panel. Para agregar uno nuevo, copia una fila y
// cambia "etiqueta" (lo que se ve en el desplegable, corto) y "texto" (lo
// que se copia al cuadro, puede ser tan largo como quieras).
// ════════════════════════════════════════════════════════════════

const CD2_COMENTARIO_REASIGNACION_DEFAULT = 'SE ASIGNA LA PRESENTE YA QUE SE CONSIDERA DE SU COMPETENCIA, EN CASO DE NO SER ASÍ, POR FAVOR DAR TRASLADO INMEDIATO AL ÁREA CORRESPONDIENTE, EN APLICACIÓN DE LA RESOLUCIÓN NO 3687 DE 2016 Y CIRCULAR 18 DE 2020';
const CD2_COMENTARIO_CIERRE_DEFAULT = ' --- POR LO QUE SE PROCEDE A ARCHIVAR Y CERRAR LA PRESENTE COMUNICACIÓN POR COMENTARIO.';

const CD3_COMENTARIOS_REASIGNACION = [
  { etiqueta: 'Estándar (Resolución 3687/2016)', texto: CD2_COMENTARIO_REASIGNACION_DEFAULT },
  { etiqueta: 'Reasginación solicitud e insumos Control Polític', texto: 'SE ASIGNA LA PRESENTE COMUNICACIÓN POR SER DE COMPETENCIA DE ESTA DEPENDENCIA EN EL MARCO DE CONTROL POLÍTICO, POR LO CUAL SE SOLICITA GESTIONAR Y DAR RESPUESTA DENTRO DE LOS TÉRMINOS LEGALES ESTABLECIDOS.'},
  { etiqueta: 'Remisión para trámite y respuesta de fondo', texto: 'SE REMITE PARA TRÁMITE Y RESPUESTA DE FONDO POR COMPETENCIA, DENTRO DE LOS TÉRMINOS DE LEY.' },
  { etiqueta: 'Revisión conjunta con área técnica', texto: 'SE ASIGNA PARA REVISIÓN Y RESPUESTA CONJUNTA CON EL ÁREA TÉCNICA CORRESPONDIENTE.' },
  // ── Agrega aquí tus propios comentarios de reasignación ──
  // { etiqueta: 'Tu etiqueta corta', texto: 'TU TEXTO COMPLETO AQUÍ' },
];

const CD3_COMENTARIOS_CIERRE = [
  { etiqueta: 'Estándar (cierre por comentario)', texto: CD2_COMENTARIO_CIERRE_DEFAULT },
  { etiqueta: 'Respuesta de fondo entregada', texto: ' --- SE DA RESPUESTA DE FONDO AL PETICIONARIO Y SE CIERRA LA PRESENTE COMUNICACIÓN.' },
  { etiqueta: 'Cierre por duplicidad', texto: ' --- EL REQUERIMIENTO YA FUE ATENDIDO POR OTRA DEPENDENCIA, SE CIERRA POR DUPLICIDAD.' },
  // ── Agrega aquí tus propios comentarios de cierre ──
  // { etiqueta: 'Tu etiqueta corta', texto: 'TU TEXTO COMPLETO AQUÍ' },
];

// ════════════════════════════════════════════════════════════════
// ═══ BANDEJAS DE OTROS FUNCIONARIOS (solo lectura) ═══
// Equivale a la opción nativa "Gestión Trámites → Ver Bandeja de Gestión por
// Funcionario". Aquí se define en qué oficina se buscan los funcionarios y
// qué cargos se ofrecen. Los IDs salen de las peticiones reales de ControlDoc.
// ════════════════════════════════════════════════════════════════
const CD3_BANDEJA_UNIDAD = 2;    // IDUNIDADADMINISTRATIVA (Despacho del Viceministro de Salud Pública y Atención Primaria)
const CD3_BANDEJA_OFICINA = 36;  // IDOFICINAPRODUCTORA (Dirección de Determinantes Sociales, Promoción y Prevención)
const CD3_BANDEJA_CARGOS = { 'GESTOR': 4, 'JEFE': 2 };  // nombre visible → IDCARGO (agrega otros cuando confirmes su ID)

// ════════════════════════════════════════════════════════════════
// ═══ BANDEJA DE TAREAS DOCUMENTALES (solo lectura) ═══
// Las listas del "Tablero de Control – Bandeja de Tareas Documentales"
// (Doc Creados, Por Revisar, Por Aprobar, Involucrado). Todas salen de
// TareasDoc/CargarBandeja; cambian los parámetros "Bandeja.*".
// ════════════════════════════════════════════════════════════════

// Por defecto se usa la cuenta de la SESIÓN ABIERTA (el script la detecta solo).
// Aquí puedes dejar atajos opcionales a otras cuentas que consultes seguido
// (nombre visible + ID de funcionario; el ID lo ves con el buscador).
// Ejemplo:  { nombre: 'Nombre visible', idFuncionario: 12345 },
const CD4_CUENTAS = [];

// Parámetros propios de cada lista. "{ID}" se reemplaza por el ID de la cuenta
// elegida. "parametros: null" = lista aún sin configurar (se completa con la
// captura de red de esa tarjeta: copia los parámetros de su CargarBandeja).
// "indicadorSalida: true" muestra ✅ (tiene IDC: el documento ya salió) o ❌
// (sin IDC: todavía no ha salido) en cada tarea de esa lista.
const CD4_LISTAS = {
  creados:     { etiqueta: '📝 Doc Creados',     indicadorSalida: true, parametros: { 'Bandeja.ACCIONES': 'PROYECTAR', 'Bandeja.IDFUNCIONARIOCREO': '{ID}' } },
  revisar:     { etiqueta: '🔎 Por Revisar',     parametros: null },
  aprobar:     { etiqueta: '✍️ Por Aprobar',     parametros: null },
  involucrado: { etiqueta: '👥 Involucrado',     parametros: null },
};

// Cuántas reasignaciones/cierres se corren al mismo tiempo en los procesos
// masivos ("Reasignar clasificados" y "Reasignación Manual"). Pediste 5 en
// simultáneo: sube o baja este número aquí si más adelante quieres ajustarlo.
const CONCURRENCIA_MAXIMA = 25;

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

// ── Historial de búsquedas en caché (mejora 1): guarda cada búsqueda ya
// resuelta (ficha + flujo) para volver a mostrarla con un clic sin llamar
// ningún endpoint de nuevo. Vive solo en esta sesión del script.
const CD_HISTORIAL = [];
const CD_HISTORIAL_MAX = 50;

function cdRegistrarHistorial(entrada) {
  const idxExistente = CD_HISTORIAL.findIndex(e => e.idc === entrada.idc);
  if (idxExistente !== -1) CD_HISTORIAL.splice(idxExistente, 1);
  CD_HISTORIAL.unshift(entrada);
  if (CD_HISTORIAL.length > CD_HISTORIAL_MAX) CD_HISTORIAL.length = CD_HISTORIAL_MAX;
}

let CD_HISTORIAL_ORDEN_DESC = true; // true = más reciente primero (por defecto)

function cdRenderizarHistorial() {
  const cont = document.querySelector('#PSD_HistorialLista');
  if (!cont) return;
  if (!CD_HISTORIAL.length) {
    cont.innerHTML = '<div style="color:#9ca3af; font-size:11px; padding:6px 0;">Aún no has buscado ningún documento en esta sesión.</div>';
    return;
  }
  // El arreglo siempre guarda el más reciente en el índice 0; el orden solo
  // decide en qué secuencia se pintan (no reordena CD_HISTORIAL en sí).
  const indices = CD_HISTORIAL.map((_, i) => i);
  if (!CD_HISTORIAL_ORDEN_DESC) indices.reverse();

  cont.innerHTML = indices.map((idxReal, posicion) => {
    const e = CD_HISTORIAL[idxReal];
    return `
    <div class="psd-historial-item" data-idx="${idxReal}" style="padding:6px 8px; border-bottom:1px solid #f3f4f6; cursor:pointer; font-size:11px;">
      <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:6px;">
        <b>#${posicion + 1} — IDC ${e.idc} — Radicado ${e.radicado}</b>
      </div>
      <span style="color:#6b7280;">${cdEscaparHtml((e.detalle || '(sin asunto)')).slice(0, 80)}</span>
      <div style="margin-top:4px; display:flex; gap:4px;">
        <button class="psd-copiar" data-copiar="idc" data-idx="${idxReal}" style="padding:2px 6px; font-size:10px; background:#e5e7eb; border:none; border-radius:4px; cursor:pointer;">📋 IDC</button>
        <button class="psd-copiar" data-copiar="radicado" data-idx="${idxReal}" style="padding:2px 6px; font-size:10px; background:#e5e7eb; border:none; border-radius:4px; cursor:pointer;">📋 Radicado</button>
        <button class="psd-copiar" data-copiar="asunto" data-idx="${idxReal}" style="padding:2px 6px; font-size:10px; background:#e5e7eb; border:none; border-radius:4px; cursor:pointer;">📋 Asunto</button>
      </div>
    </div>
  `;
  }).join('');

  cont.querySelectorAll('.psd-historial-item').forEach(el => {
    el.onclick = () => cdCargarDesdeHistorial(Number(el.dataset.idx));
    el.onmouseenter = () => el.style.background = '#f3f4f6';
    el.onmouseleave = () => el.style.background = '';
  });

  cont.querySelectorAll('.psd-copiar').forEach(btn => {
    btn.addEventListener('mousedown', (e) => e.stopPropagation()); // no dispara la carga del item
    btn.onclick = (e) => {
      e.stopPropagation();
      const entrada = CD_HISTORIAL[Number(btn.dataset.idx)];
      const campo = btn.dataset.copiar;
      const valor = campo === 'idc' ? String(entrada.idc) : campo === 'radicado' ? String(entrada.radicado) : (entrada.detalle || '');
      cdCopiarTexto(valor);
      const textoOriginal = btn.textContent;
      btn.textContent = '✓ Copiado';
      setTimeout(() => { btn.textContent = textoOriginal; }, 1200);
    };
  });
}

function cdCopiarTexto(texto) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(texto).catch(() => cdCopiarTextoFallback(texto));
  } else {
    cdCopiarTextoFallback(texto);
  }
}

function cdCopiarTextoFallback(texto) {
  const area = document.createElement('textarea');
  area.value = texto;
  area.style.position = 'fixed';
  area.style.opacity = '0';
  document.body.appendChild(area);
  area.select();
  try { document.execCommand('copy'); } catch (e) { /* silencioso */ }
  area.remove();
}

function cdEscaparHtml(str) {
  return String(str || '').replace(/[&<>]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));
}

// Pinta en el panel una entrada ya guardada, sin volver a llamar ControlDoc.
function cdCargarDesdeHistorial(indice) {
  const entrada = CD_HISTORIAL[indice];
  if (!entrada) return;
  const contenido = document.querySelector('#PSD_Contenido');
  contenido.innerHTML = cdPlantillaBase(entrada.doc);
  document.querySelector('#PSD_Ficha').innerHTML = entrada.ficha ? cdPlantillaFicha(entrada.ficha) : '<div style="color:#ea580c;">Sin ficha en caché.</div>';
  document.querySelector('#PSD_Flujo').innerHTML = cdPlantillaFlujo(entrada.pasos || []);
  const badge = document.querySelector('#PSD_Badge');
  if (badge) {
    const estado = cdEstadoGlobal((entrada.pasos || [])[0], entrada.doc.STRESTADODOCUMENTO);
    badge.textContent = estado.texto; badge.style.color = estado.color; badge.style.background = estado.fondo;
  }
  cdVincularBotones(entrada.idc, entrada.numAdjuntos);
  document.querySelector('#PSD_Input').value = entrada.idc;
}

// ── Conteo de adjuntos sin librerías externas (mejora 2): se reutiliza el
// mismo POST de GuardarAdjuntosZIP (no cambia nada en el servidor) y se lee
// el "End Of Central Directory" del ZIP resultante, que trae el número total
// de archivos — así no hace falta descomprimir nada para contar.
const CD_CACHE_ADJUNTOS = {};

function cdContarEntradasZip(arrayBuffer) {
  const bytes = new Uint8Array(arrayBuffer);
  const maxComentario = 65535;
  const desde = Math.max(0, bytes.length - 22 - maxComentario);
  for (let i = bytes.length - 22; i >= desde; i--) {
    if (bytes[i] === 0x50 && bytes[i + 1] === 0x4b && bytes[i + 2] === 0x05 && bytes[i + 3] === 0x06) {
      return bytes[i + 10] | (bytes[i + 11] << 8); // total de entradas, 2 bytes little-endian
    }
  }
  return null;
}

async function cdContarAdjuntos(idDocumento) {
  if (Object.prototype.hasOwnProperty.call(CD_CACHE_ADJUNTOS, idDocumento)) return CD_CACHE_ADJUNTOS[idDocumento];
  try {
    const resp = await cdFetchPost(CD_CONFIG.urlGuardarZip, { IDDOCUMENTO: idDocumento, DILIGENCIADOS: 'NO' });
    const data = await resp.json();
    if (!data || data.RESPUESTA !== true || !data.VALORESPUESTA) { CD_CACHE_ADJUNTOS[idDocumento] = 0; return 0; }
    const valor = data.VALORESPUESTA;
    if (typeof valor !== 'string' || !valor.startsWith('http')) { CD_CACHE_ADJUNTOS[idDocumento] = null; return null; }
    const fileResp = await fetch(valor, { credentials: 'same-origin' });
    if (!fileResp.ok) { CD_CACHE_ADJUNTOS[idDocumento] = null; return null; }
    const buffer = await fileResp.arrayBuffer();
    const n = cdContarEntradasZip(buffer);
    CD_CACHE_ADJUNTOS[idDocumento] = n;
    return n;
  } catch (e) {
    console.warn('[CD] No se pudo contar adjuntos:', e.message);
    return null;
  }
}

// Conecta los botones de acción de un documento ya pintado en el panel, y
// actualiza el contador de adjuntos en el botón correspondiente.
function cdVincularBotones(idDocumento, numAdjuntosCache) {
  document.querySelector('#PSD_BtnPreviewPdf').onclick = () => cdPrevisualizarPdf(idDocumento);
  document.querySelector('#PSD_BtnDescargarPdf').onclick = () => cdDescargarPdf(idDocumento);
  document.querySelector('#PSD_BtnAdjuntos').onclick = () => cdDescargarAdjuntos(idDocumento);
  document.querySelector('#PSD_BtnAsociados').onclick = () => cdMostrarAsociados(idDocumento);

  const btnAdjuntos = document.querySelector('#PSD_BtnAdjuntos');
  const pintarContador = (n) => {
    if (n === null || n === undefined) { btnAdjuntos.textContent = '📎 Descargar Adjuntos'; return; }
    btnAdjuntos.textContent = n === 0 ? '📎 Sin adjuntos' : `📎 Adjuntos (${n})`;
  };
  if (numAdjuntosCache !== undefined) {
    pintarContador(numAdjuntosCache);
  } else {
    btnAdjuntos.textContent = '📎 Adjuntos (…)';
    cdContarAdjuntos(idDocumento).then(n => {
      pintarContador(n);
      const entrada = CD_HISTORIAL.find(e => e.idc === idDocumento);
      if (entrada) entrada.numAdjuntos = n;
    });
  }
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

// Escala manual de la interfaz (afecta texto, botones y espaciados de ambos
// paneles a la vez). Se guarda en memoria durante la sesión: si cierras y
// vuelves a abrir un panel, conserva el último nivel elegido.
let CD_ESCALA_UI = 1;
const CD_ESCALA_PASO = 0.1;
const CD_ESCALA_MIN = 0.6;
const CD_ESCALA_MAX = 1.6;

function cdAplicarEscala(delta) {
  CD_ESCALA_UI = Math.min(CD_ESCALA_MAX, Math.max(CD_ESCALA_MIN, +(CD_ESCALA_UI + delta).toFixed(2)));
  const panelSeguimiento = document.querySelector('#PanelSeguimientoDoc');
  if (panelSeguimiento) panelSeguimiento.style.zoom = CD_ESCALA_UI;
  const panelClasificador = document.querySelector('#PanelClasificadorDoc');
  if (panelClasificador) panelClasificador.style.zoom = CD_ESCALA_UI;
  document.querySelectorAll('.cd-escala-label').forEach(el => { el.textContent = Math.round(CD_ESCALA_UI * 100) + '%'; });
}

function cdCrearPanel() {
  const existente = document.querySelector('#PanelSeguimientoDoc');
  if (existente) existente.remove();
  const cont = document.createElement('div');
  cont.id = 'PanelSeguimientoDoc';
  cont.style.cssText = 'position:fixed; top:20px; right:20px; z-index:99999; background:#fff; border:1px solid #ccc; border-radius:10px; padding:14px; box-shadow:0 4px 18px rgba(0,0,0,0.25); width:460px; max-height:88vh; overflow-y:auto; font-family:sans-serif; font-size:13px;';
  cont.style.zoom = CD_ESCALA_UI;
  cont.innerHTML = `
    <div id="PSD_Encabezado" style="display:flex; justify-content:space-between; align-items:center; font-weight:bold; margin-bottom:10px; cursor:grab; user-select:none;">
      <span>🔎 Seguimiento de Documento — ControlDoc</span>
      <div style="display:flex; align-items:center; gap:2px;">
        <button id="PSD_EscalaMenos" title="Reducir tamaño de la interfaz" style="background:none; border:none; font-size:14px; cursor:pointer; padding:2px 4px;">🔍➖</button>
        <span class="cd-escala-label" style="font-size:11px; color:#6b7280; min-width:34px; text-align:center;">${Math.round(CD_ESCALA_UI * 100)}%</span>
        <button id="PSD_EscalaMas" title="Aumentar tamaño de la interfaz" style="background:none; border:none; font-size:14px; cursor:pointer; padding:2px 4px;">🔍➕</button>
        <button id="PSD_Minimizar" title="Minimizar" style="background:none; border:none; font-size:16px; cursor:pointer; padding:2px 6px;">➖</button>
        <button id="PSD_Cerrar" title="Cerrar" style="background:none; border:none; color:#666; font-size:16px; font-weight:bold; cursor:pointer; padding:2px 6px;">✕</button>
      </div>
    </div>
    <div id="PSD_Cuerpo">
      <div style="display:flex; gap:6px; margin-bottom:10px;">
        <input id="PSD_Input" type="text" placeholder="IDC (2306470) o Radicado" style="flex:1; padding:6px; border:1px solid #ccc; border-radius:6px;">
        <button id="PSD_Buscar" style="padding:6px 12px; background:#2563eb; color:#fff; border:none; border-radius:6px; cursor:pointer; font-weight:bold;">Buscar</button>
      </div>
      <div style="border:1px solid #e5e7eb; border-radius:8px; margin-bottom:10px; overflow:hidden;">
        <div id="PSD_HeaderHistorial" style="display:flex; justify-content:space-between; align-items:center; padding:6px 8px; background:#f9fafb; cursor:pointer; font-size:12px; font-weight:bold;">
          <span><span id="PSD_FlechaHistorial">▸</span> 🕘 Historial de búsquedas</span>
        </div>
        <div id="PSD_CuerpoHistorial" style="display:none; max-height:200px; overflow-y:auto;">
          <div style="display:flex; justify-content:flex-end; padding:4px 8px; border-bottom:1px solid #f3f4f6;">
            <button id="PSD_OrdenHistorial" style="padding:2px 6px; font-size:10px; background:#e5e7eb; border:none; border-radius:4px; cursor:pointer;">🔽 Más reciente primero</button>
          </div>
          <div id="PSD_HistorialLista"></div>
        </div>
      </div>
      <div id="PSD_Contenido"></div>
    </div>
  `;
  document.body.appendChild(cont);
  cdHabilitarArrastre(cont, document.querySelector('#PSD_Encabezado'));
  document.querySelector('#PSD_Cerrar').onclick = (e) => { e.stopPropagation(); cont.remove(); };
  document.querySelector('#PSD_Cerrar').addEventListener('mousedown', (e) => e.stopPropagation());

  const btnEscalaMenos = document.querySelector('#PSD_EscalaMenos');
  const btnEscalaMas = document.querySelector('#PSD_EscalaMas');
  btnEscalaMenos.addEventListener('mousedown', (e) => e.stopPropagation());
  btnEscalaMas.addEventListener('mousedown', (e) => e.stopPropagation());
  btnEscalaMenos.onclick = () => cdAplicarEscala(-CD_ESCALA_PASO);
  btnEscalaMas.onclick = () => cdAplicarEscala(CD_ESCALA_PASO);

  document.querySelector('#PSD_HeaderHistorial').onclick = () => cd3ToggleSeccion('#PSD_CuerpoHistorial', '#PSD_FlechaHistorial');
  const btnOrden = document.querySelector('#PSD_OrdenHistorial');
  btnOrden.addEventListener('mousedown', (e) => e.stopPropagation());
  btnOrden.onclick = () => {
    CD_HISTORIAL_ORDEN_DESC = !CD_HISTORIAL_ORDEN_DESC;
    btnOrden.textContent = CD_HISTORIAL_ORDEN_DESC ? '🔽 Más reciente primero' : '🔼 Más antiguo primero';
    cdRenderizarHistorial();
  };
  cdRenderizarHistorial();

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
  cdVincularBotones(idDocumento);

  let ficha = null, pasos = [];
  try {
    ficha = await cdObtenerFicha(idDocumento);
    document.querySelector('#PSD_Ficha').innerHTML = cdPlantillaFicha(ficha);
  } catch (e) {
    document.querySelector('#PSD_Ficha').innerHTML = '<div style="color:#ea580c;">No se pudo cargar la ficha.</div>';
  }
  try {
    pasos = await cdObtenerFlujo(idDocumento, radicado);
    document.querySelector('#PSD_Flujo').innerHTML = cdPlantillaFlujo(pasos);
    const badge = document.querySelector('#PSD_Badge');
    if (badge) {
      const estado = cdEstadoGlobal(pasos[0], doc.STRESTADODOCUMENTO);
      badge.textContent = estado.texto; badge.style.color = estado.color; badge.style.background = estado.fondo;
    }
  } catch (e) {
    document.querySelector('#PSD_Flujo').innerHTML = '<div style="color:#ea580c;">No se pudo cargar el flujo.</div>';
  }

  cdRegistrarHistorial({ idc: idDocumento, radicado, detalle: (ficha && ficha['DETALLE']) || doc.DESCRIPCION || '', doc, ficha, pasos });
  cdRenderizarHistorial();
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
    <div style="display:flex; flex-wrap:wrap; gap:4px; margin-bottom:8px;">
      <button id="PSD_BtnPreviewPdf" style="flex:1; padding:4px; font-size:11px; background:#e5e7eb; border:none; border-radius:5px; cursor:pointer;">👁 Previsualizar</button>
      <button id="PSD_BtnDescargarPdf" style="flex:1; padding:4px; font-size:11px; background:#2563eb; color:#fff; border:none; border-radius:5px; cursor:pointer;">📄 PDF</button>
      <button id="PSD_BtnAdjuntos" style="flex:1; padding:4px; font-size:11px; background:#2563eb; color:#fff; border:none; border-radius:5px; cursor:pointer;">📎 Adjuntos</button>
      <button id="PSD_BtnAsociados" style="flex:1; padding:4px; font-size:11px; background:#e5e7eb; border:none; border-radius:5px; cursor:pointer;">🔗 Asociados</button>
    </div>
    <div id="PSD_Ficha" style="margin-bottom:10px; padding:8px; background:#f9fafb; border-radius:6px;">⏳ Cargando ficha...</div>
    <div id="PSD_Flujo" style="margin-bottom:10px; padding:8px; background:#f9fafb; border-radius:6px;">⏳ Cargando flujo...</div>
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

const CD2_SUBDIRECCIONES = CONFIG_DEPENDENCIAS;
const CD2_IDUNIDAD = 2;

// ── Bitácora de acciones (mejora 3): registra cada reasignación/cierre hecho
// desde el panel, para exportarla luego a un archivo tipo Excel.
const CD_BITACORA = [];

function cdBitacoraRegistrar({ accion, idc, radicado, asunto, destino, funcionario, comentario, resultado, detalleResultado }) {
  const entrada = {
    fecha: new Date().toLocaleString('es-CO', { dateStyle: 'short', timeStyle: 'medium' }),
    accion, idc, radicado: radicado || '', asunto: asunto || '', destino: destino || '', funcionario: funcionario || '',
    comentario: comentario || '', resultado, detalleResultado: detalleResultado || '',
    firmante: '', fechaRadicacion: '', tipologia: '', serieSubserie: '',
  };
  CD_BITACORA.push(entrada);
  const el = document.querySelector('#PCD_ContadorBitacora');
  if (el) el.textContent = `(${CD_BITACORA.length})`;
  cdBitacoraEnriquecerConFicha(entrada, idc);
}

// Completa en segundo plano los datos de la ficha (Firmante, Fecha
// Radicación, Tipología, Serie/Subserie) reutilizando el mismo endpoint que
// usa el panel de Seguimiento — no bloquea el registro inmediato de la
// bitácora, solo la va enriqueciendo apenas responde ControlDoc.
async function cdBitacoraEnriquecerConFicha(entrada, idc) {
  try {
    const ficha = await cdObtenerFicha(idc);
    entrada.firmante = ficha['FIRMANTE'] || '';
    entrada.fechaRadicacion = ficha['FECHA RADICACIÓN'] || '';
    entrada.tipologia = ficha['TIPOLOGÍA DOCUMENTAL'] || '';
    entrada.serieSubserie = `${ficha['SERIE'] || ''} / ${ficha['SUBSERIE'] || ''}`.trim();
  } catch (e) {
    // Si falla, la fila queda con esos campos vacíos — no interrumpe nada más.
  }
}

function cdBitacoraExportarExcel() {
  if (!CD_BITACORA.length) return alert('Aún no hay acciones registradas para exportar.');
  const escapar = (s) => String(s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const filas = CD_BITACORA.map(e => `
    <tr>
      <td>${escapar(e.fecha)}</td><td>${escapar(e.accion)}</td><td>${escapar(e.idc)}</td><td>${escapar(e.radicado)}</td>
      <td>${escapar(e.asunto)}</td><td>${escapar(e.destino)}</td>
      <td>${escapar(e.comentario)}</td><td>${escapar(e.resultado)}</td><td>${escapar(e.detalleResultado)}</td>
      <td>${escapar(e.funcionario)}</td>
      <td>${escapar(e.firmante)}</td><td>${escapar(e.fechaRadicacion)}</td><td>${escapar(e.tipologia)}</td><td>${escapar(e.serieSubserie)}</td>
    </tr>`).join('');
  const html = `<html><head><meta charset="UTF-8"></head><body>
    <table border="1">
      <tr><th>Fecha</th><th>Acción</th><th>IDC</th><th>Radicado</th><th>Asunto</th><th>Destino</th><th>Comentario</th><th>Resultado</th><th>Detalle</th><th>Funcionario</th><th>Firmante</th><th>Fecha Radicación</th><th>Tipología</th><th>Serie/Subserie</th></tr>
      ${filas}
    </table>
  </body></html>`;
  const blob = new Blob([html], { type: 'application/vnd.ms-excel' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = `Bitacora_ControlDoc_${new Date().toISOString().slice(0, 10)}.xls`;
  document.body.appendChild(a); a.click(); a.remove();
  URL.revokeObjectURL(url);
}

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
// Reasigna a un destino ya resuelto ({ idOficina, idUnidad, nombre }), sin
// necesidad de que esté en CONFIG_DEPENDENCIAS. La usan tanto
// cd2ReasignarDocumento (destinos configurados) como el buscador ad-hoc de
// dependencias (destinos encontrados al vuelo).
async function cd2ReasignarADestino(idDocumento, destino, comentario) {
  if (destino.idOficina == null) {
    throw new Error(`Falta idOficina para "${destino.nombre}".`);
  }
  const registro = await cd2BuscarEnBandeja(idDocumento);
  const jefe = await cd2ObtenerJefe(destino.idOficina, destino.idUnidad);
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

  return { idDocumento, radicado: registro.RADICADO, asunto: registro.DESCRIPCION || '', subdireccion: destino.nombre, jefe: jefe.NOMBRESAPELLIDOS, resultado: data, validacion, movioBandeja };
}

async function cd2ReasignarDocumento(idDocumento, claveSubdireccion, comentario) {
  const sub = CD2_SUBDIRECCIONES[claveSubdireccion];
  if (!sub) throw new Error('Subdirección no reconocida: ' + claveSubdireccion);
  if (sub.idOficina == null) {
    throw new Error(`Falta configurar "idOficina" para "${sub.nombre}" en CONFIG_DEPENDENCIAS. Corre cdBuscarOficinaPorNombre('${sub.nombre}') en la consola para encontrarlo.`);
  }
  return cd2ReasignarADestino(idDocumento, sub, comentario);
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
    idDocumento, radicado: registro.RADICADO, asunto: registro.DESCRIPCION || '',
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
      cdBitacoraRegistrar({ accion: 'Reasignación (lote manual)', idc: r.idDocumento, radicado: r.radicado, asunto: r.asunto, destino: r.subdireccion, funcionario: r.jefe, comentario, resultado: r.movioBandeja ? 'OK' : 'ERROR', detalleResultado: r.movioBandeja ? '' : 'No se movió de la bandeja' });
      cd3SincronizarTrasAccionExterna(id, r.movioBandeja);
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
      const destinoTexto = r.destinos.map(d => `${d.nombre} (${d.jefe})`).join(' + ');
      console.log(r.movioBandeja ? '✅' : '❌', id, '→', destinoTexto, r.resultado);
      cdBitacoraRegistrar({ accion: 'Reasignación multi-destino (lote manual)', idc: r.idDocumento, radicado: r.radicado, asunto: r.asunto, destino: r.destinos.map(d => d.nombre).join(' + '), funcionario: r.destinos.map(d => d.jefe).join(' + '), comentario, resultado: r.movioBandeja ? 'OK' : 'ERROR', detalleResultado: r.movioBandeja ? '' : 'No se movió de la bandeja' });
      cd3SincronizarTrasAccionExterna(id, r.movioBandeja);
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

  return { idDocumento, radicado: registro.RADICADO, resultado: data, movioBandeja };
}

// ════════════════════════════════════════════════════════════════
// ═══ SCRIPT 3: CLASIFICADOR DE DOCUMENTOS POR COMPETENCIA ═══
// ════════════════════════════════════════════════════════════════

const CD3_CONFIG = { urlBandeja: 'https://controldoc.minsalud.gov.co/ControlDoc/Documentos/DOCUMENTOSGESTIONObtenerbyESTADOFLUJOeIDUSUARIOASIGNO' };

const CD3_SUBDIRECCIONES = CONFIG_DEPENDENCIAS;

let CD3_PALABRAS_PRIORIZACION = 'HONORABLE SENADOR, HONORABLE SENADORA, HONORABLE REPRESENTANTE, SENADOR DE LA REPUBLICA, SENADOR DE LA REPÚBLICA, SENADORA DE LA REPUBLICA, SENADORA DE LA REPÚBLICA, SENADO DE LA REPUBLICA, SENADO DE LA REPÚBLICA, SENADO, SENADOR, SENADORA, CONGRESISTA, REPRESENTANTE A LA CAMARA, REPRESENTANTE A LA CÁMARA, CAMARA DE REPRESENTANTES, CÁMARA DE REPRESENTANTES, PROPOSICION, PROPOSICIÓN, DEBATE DE CONTROL POLITICO, DEBATE DE CONTROL POLÍTICO, CITACION, CITACIÓN, CONGRESO DE LA REPUBLICA, CONGRESO DE LA REPÚBLICA, CONCEJO MUNICIPAL, CONCEJO DISTRITAL, CONCEJAL, CONCEJALA, ASAMBLEA DEPARTAMENTAL, DIPUTADO, DIPUTADA, CONTRALORIA, CONTRALORÍA, CONTRALORIA GENERAL, CONTRALORÍA GENERAL, CONTRALOR, CONTRALORA, PROCURADURIA, PROCURADURÍA, PROCURADURIA GENERAL, PROCURADURÍA GENERAL, PROCURADOR, PROCURADORA, DEFENSORIA DEL PUEBLO, DEFENSORÍA DEL PUEBLO, DEFENSOR DEL PUEBLO, DEFENSORA DEL PUEBLO, PERSONERIA, PERSONERÍA, PERSONERO, PERSONERA, VEEDURIA, VEEDURÍA, VEEDOR, VEEDORA';

let CD3_DOCUMENTOS = [];
let CD3_FILTRO_ACTUAL = 'todos';
let CD3_FILA_SELECCIONADA = null; // idc de la fila resaltada (para no perderse entre documentos)

// Bandeja a cargar: idFuncionario 0 = la tuya. "Seleccionada" es lo que elegiste
// en el desplegable; "cargada" es la que realmente está en la tabla ahora (de
// ella depende el modo solo lectura).
let CD3_BANDEJA_SELECCIONADA = { idFuncionario: 0, nombre: null, cargo: '', oficina: '' };
let CD3_BANDEJA_CARGADA = { idFuncionario: 0, nombre: null, oficina: '' };
let CD3_FUNCIONARIOS_BANDEJA = [];

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

function cd3ParsearPalabras(cadena) {
  // Acepta "PALABRA" o "PALABRA:PESO" (peso por defecto 1 si no se indica).
  return cadena.split(',').map(p => p.trim()).filter(Boolean).map(p => {
    const idx = p.lastIndexOf(':');
    if (idx > 0) {
      const posiblePeso = parseFloat(p.slice(idx + 1));
      if (!isNaN(posiblePeso)) return { texto: p.slice(0, idx).trim().toUpperCase(), peso: posiblePeso };
    }
    return { texto: p.toUpperCase(), peso: 1 };
  });
}

function cd3ClasificarDocumento(doc) {
  const texto = `${doc.DESCRIPCION || ''} ${doc.RADICADO || ''}`.toUpperCase();

  // Puntaje acumulado por dependencia: suma el peso de CADA palabra que
  // aparece (no solo la primera que se encuentra), y resta una penalización
  // fija por cada palabra de "excluir" que también aparezca. Gana la
  // dependencia con mayor puntaje total, no la que aparece más a la izquierda.
  const puntajes = {};
  for (const [clave, sub] of Object.entries(CD3_SUBDIRECCIONES)) {
    let puntaje = 0;
    for (const { texto: palabra, peso } of cd3ParsearPalabras(sub.palabras)) {
      if (cd3BuscarPrimeraOcurrencia(texto, palabra) !== -1) puntaje += peso;
    }
    if (sub.excluir) {
      for (const { texto: palabraNeg } of cd3ParsearPalabras(sub.excluir)) {
        if (cd3BuscarPrimeraOcurrencia(texto, palabraNeg) !== -1) puntaje -= 3;
      }
    }
    if (puntaje > 0) puntajes[clave] = puntaje;
  }

  const entradas = Object.entries(puntajes).sort((a, b) => b[1] - a[1]);
  let mejorClave = null, confianza = null;
  if (entradas.length) {
    mejorClave = entradas[0][0];
    const mejor = entradas[0][1];
    const segundo = entradas.length > 1 ? entradas[1][1] : 0;
    confianza = (segundo === 0 || mejor >= segundo * 1.5) ? 'alta' : 'baja';
  }

  const palabrasPriorizacion = CD3_PALABRAS_PRIORIZACION.split(',').map(p => p.trim().toUpperCase()).filter(Boolean);
  const esPriorizacion = palabrasPriorizacion.some(p => cd3BuscarPrimeraOcurrencia(texto, p) !== -1);

  return { prediccion: mejorClave, esPriorizacion, confianza, puntajes };
}

// idFuncionario = 0 → tu propia bandeja. Con el ID de otro funcionario, el
// servidor devuelve la bandeja de esa persona (así lo hace la opción nativa
// "Ver Bandeja de Gestión por Funcionario"; se comprobó con una consulta real).
async function cd3ObtenerPendientes(idFuncionario = 0) {
  const params = {
    sort: '', group: '', filter: '', ESTADOFLUJO: 'SIN INICIAR TRAMITE', TRAMITADO: 'NO',
    ANIO: '', MES: '', DIA: '', IDTIPOLOGIADOCUMENTAL: 0, PRIORIDAD: '', IDCLASE: 0,
    IDCONTROL: 0, RADICADO: '', TIPOPROCESO: '', IDMODALIDADCONTRATACION: 0,
    IDREGIONAL: 0, IDCENTRO: 0, NUMPROCESO: '', CHCKFECHVENC: 'false', IDFUNCIONARIO_VBG: idFuncionario,
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
  const bandeja = { ...CD3_BANDEJA_SELECCIONADA };
  const deOtro = bandeja.idFuncionario !== 0;
  const sufijoBandeja = deOtro ? ` de la bandeja de ${bandeja.nombre}` : '';

  const textoOriginal = btn.textContent;
  btn.disabled = true;
  btn.style.opacity = '0.6';
  btn.style.cursor = 'not-allowed';
  btn.textContent = '⏳ Cargando documentos...';
  estado.textContent = '⏳ Consultando documentos pendientes...';

  let pendientes;
  try {
    pendientes = await cd3ObtenerPendientes(bandeja.idFuncionario);
  } catch (e) {
    estado.textContent = '❌ Error al consultar la bandeja: ' + e.message;
    btn.disabled = false;
    btn.style.opacity = '1';
    btn.style.cursor = 'pointer';
    btn.textContent = textoOriginal;
    return;
  }

  // Desde aquí la tabla corresponde a esta bandeja (de ello depende el modo solo lectura).
  CD3_BANDEJA_CARGADA = { idFuncionario: bandeja.idFuncionario, nombre: bandeja.nombre, oficina: bandeja.oficina || '' };
  cd3ActualizarBannerBandeja();

  if (!pendientes.length) {
    estado.textContent = `No hay documentos pendientes${sufijoBandeja} en este momento.`;
    CD3_DOCUMENTOS = [];
    CD3_FILA_SELECCIONADA = null;
    cd3RenderizarResultados();
  } else {
    CD3_DOCUMENTOS = pendientes.map(doc => {
      const { prediccion, esPriorizacion, confianza } = cd3ClasificarDocumento(doc);
      return {
        idc: doc.IDDOCUMENTO, radicado: doc.RADICADO, asunto: doc.DESCRIPCION || '(sin descripción)',
        // Ambas fechas vienen en el mismo registro de la bandeja: no hace falta pedirlas aparte.
        fechaAsignacion: cdParseAspDate(doc.FECHAASIGNO), fechaRadicacion: cdParseAspDate(doc.FECHARADICO),
        prediccion, esPriorizacion, confianza, manual: prediccion, estadoEnvio: null, mensajeEstado: '',
      };
    });
    CD3_FILA_SELECCIONADA = null;
    estado.textContent = `✅ ${CD3_DOCUMENTOS.length} documento(s) clasificado(s)${sufijoBandeja}.`;
    cd3RenderizarResultados();
  }

  btn.disabled = false;
  btn.style.opacity = '1';
  btn.style.cursor = 'pointer';
  btn.textContent = textoOriginal;
}

// ── Selector de bandeja (equivale a "Ver Bandeja de Gestión por Funcionario") ──

// Normaliza para comparar sin importar mayúsculas ni tildes.
function cd3Normalizar(str) {
  return String(str || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toUpperCase();
}

// De cada funcionario que devuelve ControlDoc (decenas de campos por persona,
// varios de ellos sensibles) se conservan SOLO los datos necesarios; el resto
// se descarta de inmediato.
function cd3ResumirFuncionario(f) {
  return {
    idFuncionario: Number(f.IDFUNCIONARIO),
    nombre: f.NOMBRESAPELLIDOS || `${f.NOMBRES || ''} ${f.APELLIDOS || ''}`.trim(),
    cargo: f.CARGO || '',
    oficina: f.OFICINAPRODUCTORA || '',
  };
}

async function cd3ConsultarFuncionarios(params) {
  const resp = await fetch(`${CD2_CONFIG.urlFuncionarios}?${new URLSearchParams(params).toString()}`, { credentials: 'same-origin', headers: { 'X-Requested-With': 'XMLHttpRequest' } });
  return resp.json();
}

// Lista los funcionarios de la oficina configurada (tu Dirección) para un cargo.
async function cd3ListarFuncionariosBandeja(idCargo) {
  const data = await cd3ConsultarFuncionarios({
    IDUNIDADADMINISTRATIVA: CD3_BANDEJA_UNIDAD, IDOFICINAPRODUCTORA: CD3_BANDEJA_OFICINA,
    IDCARGO: idCargo, NOMBRES: '', APELLIDOS: '',
  });
  return (data || []).map(cd3ResumirFuncionario).filter(f => f.idFuncionario)
    .sort((a, b) => a.nombre.localeCompare(b.nombre, 'es'));
}

// Búsqueda global por nombre y/o apellido en TODA la entidad (unidad, oficina y
// cargo vacíos: comprobado con una consulta real, devuelve funcionarios de
// todas las dependencias). ControlDoc filtra "nombres" y "apellidos" por
// separado, así que se consulta la palabra más larga en ambos campos, se unen
// los resultados y luego se exige (sin tildes) que aparezcan TODAS las palabras
// escritas; por eso "ricardo cuesta" también funciona.
async function cd3BuscarFuncionariosGlobal(texto) {
  const palabras = texto.trim().toUpperCase().split(/\s+/).filter(p => p.length >= 2);
  if (!palabras.length) return [];
  const clave = palabras.slice().sort((a, b) => b.length - a.length)[0];
  const base = { IDUNIDADADMINISTRATIVA: '', IDOFICINAPRODUCTORA: '', IDCARGO: '' };
  const respuestas = await Promise.allSettled([
    cd3ConsultarFuncionarios({ ...base, NOMBRES: clave, APELLIDOS: '' }),
    cd3ConsultarFuncionarios({ ...base, NOMBRES: '', APELLIDOS: clave }),
  ]);
  // Si fallaron las dos consultas es un error real, no "cero resultados".
  if (respuestas.every(r => r.status === 'rejected')) throw respuestas[0].reason;

  const requeridas = palabras.map(cd3Normalizar);
  const vistos = new Set();
  return respuestas
    .flatMap(r => (r.status === 'fulfilled' && Array.isArray(r.value)) ? r.value : [])
    .map(cd3ResumirFuncionario)
    .filter(f => f.idFuncionario && !vistos.has(f.idFuncionario) && vistos.add(f.idFuncionario))
    .filter(f => { const n = cd3Normalizar(f.nombre); return requeridas.every(p => n.includes(p)); })
    .sort((a, b) => a.nombre.localeCompare(b.nombre, 'es'));
}

function cd3EtiquetaFuncionario(f) {
  const detalle = [f.cargo, f.oficina ? cd3TruncarTexto(f.oficina, 40) : ''].filter(Boolean).join(' · ');
  return `${f.nombre}${detalle ? ' — ' + detalle : ''} (ID ${f.idFuncionario})`;
}

function cd3PintarListaFuncionariosBandeja() {
  const sel = document.querySelector('#PCD_BandejaFuncionario');
  if (!sel) return;
  const filtro = cd3Normalizar((document.querySelector('#PCD_BandejaFiltro').value || '').trim());
  let lista = CD3_FUNCIONARIOS_BANDEJA.filter(f => !filtro || cd3Normalizar(f.nombre).includes(filtro));
  // Si ya hay uno elegido y el filtro lo oculta, se conserva en la lista para no perder la selección.
  const elegido = CD3_BANDEJA_SELECCIONADA;
  if (elegido.idFuncionario && !lista.some(f => f.idFuncionario === elegido.idFuncionario)) {
    lista = [{ idFuncionario: elegido.idFuncionario, nombre: elegido.nombre, cargo: elegido.cargo || '', oficina: elegido.oficina || '' }, ...lista];
  }
  sel.innerHTML = '<option value="0">👤 Mi bandeja (predeterminado)</option>' +
    lista.map(f => `<option value="${f.idFuncionario}">${cdEscaparHtml(cd3EtiquetaFuncionario(f))}</option>`).join('');
  sel.value = String(elegido.idFuncionario);
}

async function cd3BuscarFuncionariosBandejaUI() {
  const estado = document.querySelector('#PCD_BandejaEstado');
  const idCargo = Number(document.querySelector('#PCD_BandejaCargo').value);
  estado.textContent = '⏳ Buscando funcionarios...';
  try {
    CD3_FUNCIONARIOS_BANDEJA = await cd3ListarFuncionariosBandeja(idCargo);
  } catch (e) {
    estado.textContent = '❌ No se pudo consultar la lista: ' + e.message;
    return;
  }
  cd3PintarListaFuncionariosBandeja();
  estado.textContent = `${CD3_FUNCIONARIOS_BANDEJA.length} funcionario(s) de tu Dirección. Elige uno y pulsa "Cargar Documentos Pendientes".`;
}

async function cd3BuscarFuncionariosGlobalUI() {
  const estado = document.querySelector('#PCD_BandejaEstado');
  const texto = document.querySelector('#PCD_BandejaBuscarTexto').value.trim();
  if (texto.replace(/\s+/g, '').length < 2) { estado.textContent = 'Escribe al menos 2 letras de un nombre o apellido.'; return; }
  estado.textContent = '⏳ Buscando en toda la entidad...';
  try {
    CD3_FUNCIONARIOS_BANDEJA = await cd3BuscarFuncionariosGlobal(texto);
  } catch (e) {
    estado.textContent = '❌ No se pudo consultar: ' + e.message;
    return;
  }
  document.querySelector('#PCD_BandejaFiltro').value = '';
  cd3PintarListaFuncionariosBandeja();
  const n = CD3_FUNCIONARIOS_BANDEJA.length;
  estado.textContent = n
    ? `${n} funcionario(s) en toda la entidad. Si una persona sale dos veces, tiene dos usuarios (dos IDs). Elige uno y pulsa "Cargar Documentos Pendientes".`
    : 'Sin coincidencias. Prueba con una sola palabra o sin tildes.';
}

function cd3ElegirBandeja(idFuncionario) {
  const estado = document.querySelector('#PCD_BandejaEstado');
  if (!idFuncionario) {
    CD3_BANDEJA_SELECCIONADA = { idFuncionario: 0, nombre: null, cargo: '', oficina: '' };
    if (estado) estado.textContent = 'Se cargará tu propia bandeja.';
  } else {
    const f = CD3_FUNCIONARIOS_BANDEJA.find(x => x.idFuncionario === idFuncionario)
      || (CD3_BANDEJA_SELECCIONADA.idFuncionario === idFuncionario ? CD3_BANDEJA_SELECCIONADA : null);
    if (!f) return;
    CD3_BANDEJA_SELECCIONADA = { idFuncionario: f.idFuncionario, nombre: f.nombre, cargo: f.cargo, oficina: f.oficina || '' };
    if (estado) estado.textContent = `Seleccionado: ${f.nombre}${f.oficina ? ' (' + f.oficina + ')' : ''}. Pulsa "Cargar Documentos Pendientes" para ver su bandeja.`;
  }
  cd3PintarListaFuncionariosBandeja();
}

// Aviso visible sobre la tabla cuando lo cargado NO es tu bandeja.
function cd3ActualizarBannerBandeja() {
  const el = document.querySelector('#PCD_BannerBandeja');
  if (!el) return;
  const c = CD3_BANDEJA_CARGADA;
  const deOtro = c.idFuncionario !== 0;
  el.style.display = deOtro ? 'block' : 'none';
  el.textContent = deOtro
    ? `👁️ Viendo la bandeja de ${c.nombre}${c.oficina ? ' (' + c.oficina + ')' : ''} — solo lectura (reasignar y cerrar están bloqueados)`
    : '';
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

// Si el IDC que se acaba de reasignar/cerrar por un camino "externo" a la
// tabla (Reasignación Manual o el buscador ad-hoc, que trabajan con IDs
// sueltos) también está siendo mostrado ahí mismo, esto lo refleja: lo marca
// ✅/❌ y lo hace desaparecer igual que cuando se reasigna desde la fila.
function cd3SincronizarTrasAccionExterna(idcComoTexto, exito, mensajeError) {
  const doc = CD3_DOCUMENTOS.find(d => String(d.idc) === String(idcComoTexto).trim());
  if (!doc) return;
  doc.estadoEnvio = exito ? 'ok' : 'error';
  doc.mensajeEstado = exito ? '' : (mensajeError || 'El documento sigue en tu bandeja: la acción no se completó.');
  cd3RenderizarResultados();
  if (exito) cd3ProgramarLimpieza(doc);
}

function cd3AplicarResaltado() {
  document.querySelectorAll('#PCD_TablaResultados tr[data-fila-idx]').forEach(tr => {
    const idx = Number(tr.dataset.filaIdx);
    if (idx === CD3_FILA_SELECCIONADA) { tr.style.background = '#dbeafe'; tr.style.boxShadow = 'inset 3px 0 0 #2563eb'; }
    else { tr.style.background = ''; tr.style.boxShadow = ''; }
  });
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
  else if (CD3_FILTRO_ACTUAL === 'baja-confianza') documentosFiltrados = CD3_DOCUMENTOS.filter(d => d.confianza === 'baja');
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
    const seleccionada = i === CD3_FILA_SELECCIONADA;
    const soloLectura = CD3_BANDEJA_CARGADA.idFuncionario !== 0;
    const tituloBloqueo = 'Solo lectura: estás viendo la bandeja de otro funcionario';
    return `
    <tr data-fila-idx="${i}" style="border-bottom:1px solid #e5e7eb; cursor:pointer; ${seleccionada ? 'background:#dbeafe; box-shadow:inset 3px 0 0 #2563eb;' : ''}">
      <td style="padding:5px; font-weight:bold;">${d.idc}</td>
      <td style="padding:5px; max-width:260px;">
        <div style="white-space:normal; word-break:break-word;">${d.asunto}</div>
        <div style="color:#9ca3af; font-size:10px; margin-top:3px; line-height:1.5;">
          📅 Radicación: ${d.fechaRadicacion || '—'}<br>
          📤 Asignación (remitido): ${d.fechaAsignacion || '—'}
        </div>
        <div style="display:flex; flex-wrap:wrap; gap:4px; margin-top:4px;">
          <button data-idx="${i}" data-copiar="idc" class="cd3-btn-copiar" title="Copiar IDC" style="padding:3px 7px; font-size:11px; background:#e5e7eb; border:none; border-radius:4px; cursor:pointer;">📋 IDC</button>
          <button data-idx="${i}" data-copiar="radicado" class="cd3-btn-copiar" title="Copiar Radicado" style="padding:3px 7px; font-size:11px; background:#e5e7eb; border:none; border-radius:4px; cursor:pointer;">📋 Rad</button>
          <button data-idx="${i}" data-copiar="asunto" class="cd3-btn-copiar" title="Copiar Asunto" style="padding:3px 7px; font-size:11px; background:#e5e7eb; border:none; border-radius:4px; cursor:pointer;">📋 Asu</button>
        </div>
      </td>
      <td style="padding:5px;">
        <select data-idx="${i}" class="cd3-select-sub" style="width:100%; font-size:11px; padding:2px;">
          <option value="">— Sin predicción —</option>${opcionesSelect}
        </select>
        ${d.confianza === 'baja' ? '<span title="Predicción de baja confianza: revisa manualmente" style="color:#d97706; font-size:11px;">⚠️</span>' : ''}
      </td>
      <td style="padding:5px; text-align:center;" title="Priorizaciones y Control Político">${d.esPriorizacion ? '🏛️' : ''}</td>
      <td style="padding:5px; text-align:center; white-space:nowrap;">
        <button data-idx="${i}" class="cd3-btn-preview" title="Previsualizar PDF" style="padding:3px 5px; background:#e5e7eb; border:none; border-radius:4px; cursor:pointer; font-size:11px;">👁</button>
        <button data-idx="${i}" class="cd3-btn-adjuntos" title="Descargar Adjuntos" style="padding:3px 5px; background:#e5e7eb; border:none; border-radius:4px; cursor:pointer; font-size:11px;">📎</button>
        <button data-idx="${i}" class="cd3-btn-reasignar" title="${soloLectura ? tituloBloqueo : 'Reasignar'}" style="padding:3px 5px; background:#111827; color:#fff; border:none; border-radius:4px; cursor:${soloLectura ? 'not-allowed' : 'pointer'}; font-size:11px; ${soloLectura ? 'opacity:0.4;' : ''}" ${(!d.manual || soloLectura) ? 'disabled' : ''}>🚀</button>
        <button data-idx="${i}" class="cd3-btn-cerrar" title="${soloLectura ? tituloBloqueo : 'Cerrar por comentario (comunicación informativa)'}" style="padding:3px 5px; background:#0d9488; color:#fff; border:none; border-radius:4px; cursor:${soloLectura ? 'not-allowed' : 'pointer'}; font-size:11px; ${soloLectura ? 'opacity:0.4;' : ''}" ${soloLectura ? 'disabled' : ''}>🗂️</button>
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

  // Resaltar fila al hacer clic en ella (excepto sobre el <select>, que ya
  // se resalta solo al cambiar de predicción, para no cerrarle el desplegable
  // nativo a medio elegir).
  cont.querySelectorAll('tr[data-fila-idx]').forEach(tr => {
    tr.addEventListener('click', (e) => {
      if (e.target.tagName === 'SELECT') return;
      CD3_FILA_SELECCIONADA = Number(tr.dataset.filaIdx);
      cd3RenderizarResultados();
    });
  });

  cont.querySelectorAll('.cd3-select-sub').forEach(sel => {
    const idx = Number(sel.dataset.idx);
    sel.value = CD3_DOCUMENTOS[idx].manual || '';
    sel.onchange = () => { CD3_DOCUMENTOS[idx].manual = sel.value || null; CD3_FILA_SELECCIONADA = idx; cd3RenderizarResultados(); };
  });

  cont.querySelectorAll('.cd3-btn-copiar').forEach(btn => {
    btn.addEventListener('mousedown', (e) => e.stopPropagation());
    btn.onclick = (e) => {
      e.stopPropagation();
      const doc = CD3_DOCUMENTOS[Number(btn.dataset.idx)];
      const campo = btn.dataset.copiar;
      const valor = campo === 'idc' ? String(doc.idc) : campo === 'radicado' ? String(doc.radicado) : (doc.asunto || '');
      cdCopiarTexto(valor);
      const textoOriginal = btn.textContent;
      btn.textContent = '✓';
      setTimeout(() => { btn.textContent = textoOriginal; }, 1000);
    };
  });

  cont.querySelectorAll('.cd3-btn-preview').forEach(btn => {
    btn.onclick = () => {
      const idx = Number(btn.dataset.idx);
      CD3_FILA_SELECCIONADA = idx; cd3AplicarResaltado();
      const doc = CD3_DOCUMENTOS[idx];
      cdPrevisualizarPdf(doc.idc);
    };
  });

  cont.querySelectorAll('.cd3-btn-adjuntos').forEach(btn => {
    btn.onclick = () => {
      const idx = Number(btn.dataset.idx);
      CD3_FILA_SELECCIONADA = idx; cd3AplicarResaltado();
      const doc = CD3_DOCUMENTOS[idx];
      cdDescargarAdjuntos(doc.idc);
    };
  });

  cont.querySelectorAll('.cd3-btn-reasignar').forEach(btn => {
    btn.onclick = async () => {
      const idx = Number(btn.dataset.idx);
      CD3_FILA_SELECCIONADA = idx; cd3AplicarResaltado();
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
        cdBitacoraRegistrar({ accion: 'Reasignación', idc: doc.idc, radicado: doc.radicado, asunto: doc.asunto, destino: sub.nombre, funcionario: r.jefe, comentario, resultado: doc.estadoEnvio === 'ok' ? 'OK' : 'ERROR', detalleResultado: doc.mensajeEstado });
        console.log(r.movioBandeja ? '✅' : '❌', doc.idc, '→', r.subdireccion, r.resultado, 'validación:', r.validacion);
        if (doc.estadoEnvio === 'ok') cd3ProgramarLimpieza(doc);
      } catch (e) { doc.estadoEnvio = 'error'; doc.mensajeEstado = e.message; console.log('❌', doc.idc, e.message); }
      cd3RenderizarResultados();
    };
  });

  cont.querySelectorAll('.cd3-btn-cerrar').forEach(btn => {
    btn.onclick = async () => {
      const idx = Number(btn.dataset.idx);
      CD3_FILA_SELECCIONADA = idx; cd3AplicarResaltado();
      const doc = CD3_DOCUMENTOS[idx];
      const comentario = document.querySelector('#PCD_ComentarioCierre')?.value.trim() || CD2_COMENTARIO_CIERRE_DEFAULT;
      if (!confirm(`¿Cerrar el IDC ${doc.idc} por comentario (comunicación informativa)?\n\nComentario: "${comentario}"`)) return;
      doc.estadoEnvio = 'enviando'; cd3RenderizarResultados();
      try {
        const r = await cd2CerrarPorComentario(String(doc.idc), comentario);
        doc.estadoEnvio = r.movioBandeja ? 'ok' : 'error';
        doc.mensajeEstado = r.movioBandeja ? '' : 'El documento sigue en tu bandeja: el cierre no se completó.';
        cdBitacoraRegistrar({ accion: 'Cierre por comentario', idc: doc.idc, radicado: doc.radicado, asunto: doc.asunto, destino: '-', comentario, resultado: doc.estadoEnvio === 'ok' ? 'OK' : 'ERROR', detalleResultado: doc.mensajeEstado });
        console.log(r.movioBandeja ? '✅' : '❌', doc.idc, 'cierre por comentario:', r.resultado);
        if (r.movioBandeja) cd3ProgramarLimpieza(doc);
      } catch (e) { doc.estadoEnvio = 'error'; doc.mensajeEstado = e.message; console.log('❌', doc.idc, e.message); }
      cd3RenderizarResultados();
    };
  });
}

async function cd3ReasignarTodosLosClasificados() {
  const btn = document.querySelector('#PCD_ReasignarTodo');
  if (CD3_BANDEJA_CARGADA.idFuncionario !== 0) {
    return alert(`Estás viendo la bandeja de ${CD3_BANDEJA_CARGADA.nombre} en modo solo lectura: reasignar está bloqueado.\n\nVuelve a cargar tu propia bandeja para reasignar.`);
  }

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
      cdBitacoraRegistrar({ accion: 'Reasignación (masiva)', idc: doc.idc, radicado: doc.radicado, asunto: doc.asunto, destino: CD3_SUBDIRECCIONES[clave].nombre, funcionario: r.jefe, comentario, resultado: doc.estadoEnvio === 'ok' ? 'OK' : 'ERROR', detalleResultado: doc.mensajeEstado });
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

function cd3TruncarTexto(str, n) {
  return str.length > n ? str.slice(0, n - 1) + '…' : str;
}

// ════════════════════════════════════════════════════════════════
// ═══ BUSCADOR AD-HOC DE DEPENDENCIAS / FUNCIONARIOS ═══
// Para reasignar hacia oficinas que NO están en CONFIG_DEPENDENCIAS —
// PQRSDF que salen de la competencia de la Dirección y sus subdirecciones.
// ════════════════════════════════════════════════════════════════

let CD3_RESULTADOS_OFICINA = [];   // últimas oficinas encontradas

async function cd3BuscarOficinaUI() {
  const texto = document.querySelector('#PCD_BuscarOficinaTexto').value.trim();
  const cont = document.querySelector('#PCD_ResultadosOficina');
  if (!texto) return alert('Escribe al menos una palabra del nombre de la dependencia/oficina.');
  cont.innerHTML = '<div style="color:#6b7280; font-size:11px;">⏳ Buscando...</div>';
  try {
    CD3_RESULTADOS_OFICINA = await cdBuscarOficinaPorNombre(texto);
  } catch (e) {
    cont.innerHTML = `<div style="color:#ea580c; font-size:11px;">❌ ${e.message}</div>`;
    return;
  }
  if (!CD3_RESULTADOS_OFICINA.length) {
    cont.innerHTML = '<div style="color:#9ca3af; font-size:11px;">Sin coincidencias.</div>';
    return;
  }
  cont.innerHTML = CD3_RESULTADOS_OFICINA.map((o, i) => `
    <div style="border:1px solid #e5e7eb; border-radius:6px; padding:6px 8px; margin-bottom:6px; font-size:11px;">
      <div style="font-weight:bold;">${cdEscaparHtml(o.NOMBRE)}</div>
      <div style="color:#6b7280;">IDOFICINA: ${o.IDOFICINAPRODUCTORA} — IDUNIDAD: ${o.IDUNIDADADMINISTRATIVA}</div>
      <div id="PCD_JefeOficina_${i}" style="color:#1e3a8a; font-weight:bold; margin-top:2px;"></div>
      <div style="display:flex; gap:4px; margin-top:5px;">
        <button data-idx="${i}" class="cd3-btn-ver-jefe" style="padding:3px 6px; font-size:10px; background:#e5e7eb; border:none; border-radius:4px; cursor:pointer;">👤 Ver jefe</button>
        <button data-idx="${i}" class="cd3-btn-usar-destino" style="padding:3px 6px; font-size:10px; background:#2563eb; color:#fff; border:none; border-radius:4px; cursor:pointer;">📥 Usar para reasignar</button>
      </div>
    </div>
  `).join('');

  cont.querySelectorAll('.cd3-btn-ver-jefe').forEach(btn => {
    btn.onclick = async () => {
      const i = Number(btn.dataset.idx);
      const o = CD3_RESULTADOS_OFICINA[i];
      const destino = document.querySelector(`#PCD_JefeOficina_${i}`);
      destino.textContent = '⏳ Consultando...';
      try {
        const jefe = await cd2ObtenerJefe(o.IDOFICINAPRODUCTORA, o.IDUNIDADADMINISTRATIVA);
        destino.textContent = `Jefe: ${jefe.NOMBRESAPELLIDOS}`;
      } catch (e) {
        destino.textContent = `❌ ${e.message}`;
      }
    };
  });

  cont.querySelectorAll('.cd3-btn-usar-destino').forEach(btn => {
    btn.onclick = () => {
      const i = Number(btn.dataset.idx);
      const o = CD3_RESULTADOS_OFICINA[i];
      document.querySelector('#PCD_DestinoAdHocNombre').value = o.NOMBRE;
      document.querySelector('#PCD_DestinoAdHocOficina').value = o.IDOFICINAPRODUCTORA;
      document.querySelector('#PCD_DestinoAdHocUnidad').value = o.IDUNIDADADMINISTRATIVA;
    };
  });
}

// Reasigna uno o varios IDCs al destino ad-hoc que se dejó cargado en los
// campos de "Usar para reasignar" (llenados por el buscador de oficinas).
async function cd3ReasignarAdHoc() {
  const nombre = document.querySelector('#PCD_DestinoAdHocNombre').value.trim();
  const idOficina = document.querySelector('#PCD_DestinoAdHocOficina').value.trim();
  const idUnidad = document.querySelector('#PCD_DestinoAdHocUnidad').value.trim();
  const idsRaw = document.querySelector('#PCD_DestinoAdHocIds').value.trim();
  const estado = document.querySelector('#PCD_EstadoAdHoc');
  const btn = document.querySelector('#PCD_ReasignarAdHoc');

  if (!nombre || !idOficina) return alert('Primero busca una dependencia arriba y pulsa "📥 Usar para reasignar".');
  if (!idsRaw) return alert('Ingresa al menos un IDC o Radicado.');
  const lista = idsRaw.split(/[\n,;]+/).map(s => s.trim()).filter(Boolean);
  const comentario = document.querySelector('#PCD_ComentarioReasignacion')?.value.trim() || CD2_COMENTARIO_REASIGNACION_DEFAULT;

  if (!confirm(`¿Confirmas reasignar ${lista.length} documento(s) a "${nombre}" (fuera de tu lista configurada)?\n\nDocumentos: ${lista.join(', ')}`)) return;

  const destino = { idOficina: Number(idOficina), idUnidad: idUnidad ? Number(idUnidad) : undefined, nombre };
  const textoOriginal = btn.textContent;
  btn.disabled = true; btn.style.opacity = '0.6'; btn.style.cursor = 'not-allowed';
  estado.textContent = `⏳ Procesando 0/${lista.length}...`;

  let exitosos = 0, fallidos = 0;
  await ejecutarConPool(lista, CONCURRENCIA_MAXIMA, async (idRaw) => {
    const id = idRaw.trim();
    try {
      const r = await cd2ReasignarADestino(id, destino, comentario);
      cdBitacoraRegistrar({ accion: 'Reasignación (ad-hoc)', idc: id, radicado: r.radicado, asunto: r.asunto, destino: nombre, funcionario: r.jefe, comentario, resultado: r.movioBandeja ? 'OK' : 'ERROR', detalleResultado: r.movioBandeja ? '' : 'No se movió de la bandeja' });
      cd3SincronizarTrasAccionExterna(id, r.movioBandeja);
      if (r.movioBandeja) exitosos++; else fallidos++;
      console.log(r.movioBandeja ? '✅' : '❌', id, '→', nombre, r.resultado);
    } catch (e) { fallidos++; console.log('❌', id, e.message); }
  }, (completados, total) => { estado.textContent = `⏳ Procesando ${completados}/${total}...`; });

  btn.disabled = false; btn.style.opacity = '1'; btn.style.cursor = 'pointer'; btn.textContent = textoOriginal;
  estado.textContent = `✅ ${exitosos} exitosos, ❌ ${fallidos} fallidos. Revisa la consola para detalle.`;
}

// ════════════════════════════════════════════════════════════════
// ═══ BANDEJA DE TAREAS DOCUMENTALES: lógica (solo lectura) ═══
// ════════════════════════════════════════════════════════════════

const CD4_URL_BANDEJA = 'https://controldoc.minsalud.gov.co/Controldoc//TareasDoc/CargarBandeja';
let CD4_FILAS = [];
let CD4_CARGADA = null;   // { lista, cuenta, idFuncionario } de lo que hay en la tabla
let CD4_RESULTADOS_CUENTA = [];
let CD4_CUENTA_SELECCIONADA = null;   // { idFuncionario, nombre, oficina? }; null = sin elegir
let CD4_SESION = null;                // cuenta de la sesión abierta, si se pudo detectar
let CD4_SESION_INTENTADA = false;

// ── Cuenta de la sesión abierta (bandeja predeterminada) ──
// ControlDoc ya expone datos de la sesión con Home/ObtenerDatoFuncionarioSesion
// (la página lo usa con key=FIRMA). Se pide la propiedad IDFUNCIONARIO — solo
// esa: IDUSUARIO NO sirve, porque en ControlDoc es otro número. Si no responde
// un ID válido, no se inventa nada: queda "sin detectar" y se usa el buscador.
async function cd4LeerDatoSesion(clave) {
  const resp = await fetch(`https://controldoc.minsalud.gov.co/Controldoc///Home/ObtenerDatoFuncionarioSesion?key=${encodeURIComponent(clave)}`, { credentials: 'same-origin', headers: { 'X-Requested-With': 'XMLHttpRequest' } });
  if (!resp.ok) return null;
  const texto = (await resp.text()).trim();
  if (!texto || texto.length > 200 || texto.startsWith('<')) return null;   // vacío, largo o página de error
  try {
    const j = JSON.parse(texto);
    if (j !== null && typeof j === 'object') return j.value ?? j.VALOR ?? j.VALORESPUESTA ?? null;
    return j;
  } catch (e) { return texto; }
}

async function cd4DetectarSesion() {
  CD4_SESION_INTENTADA = true;
  try {
    const bruto = await cd4LeerDatoSesion('IDFUNCIONARIO');
    const id = Number(bruto);
    if (!Number.isInteger(id) || id <= 0 || id > 99999999) {
      console.warn('[CD4] No se pudo detectar la cuenta de la sesión. Respuesta de key=IDFUNCIONARIO:', bruto);
      CD4_SESION = null;
      return null;
    }
    const texto = (v) => (typeof v === 'string' || typeof v === 'number') ? String(v).trim() : '';
    const [login, nombre] = await Promise.all([
      cd4LeerDatoSesion('LOGIN').catch(() => null),
      cd4LeerDatoSesion('NOMBRESAPELLIDOS').catch(() => null),
    ]);
    CD4_SESION = { idFuncionario: id, nombre: texto(nombre) || texto(login) || 'sesión abierta', login: texto(login) };
    if (!CD4_CUENTA_SELECCIONADA) CD4_CUENTA_SELECCIONADA = CD4_SESION;
  } catch (e) {
    console.warn('[CD4] Error al detectar la cuenta de la sesión:', e);
    CD4_SESION = null;
  }
  return CD4_SESION;
}

function cd4EtiquetaCuenta(c, esSesion) {
  const oficina = c.oficina ? ' — ' + cd3TruncarTexto(c.oficina, 35) : '';
  const login = esSesion && c.login ? ` [${c.login}]` : '';
  return `${esSesion ? '👤 Mi sesión: ' : ''}${c.nombre}${login}${oficina} (ID ${c.idFuncionario})`;
}

function cd4PintarSelectCuenta() {
  const sel = document.querySelector('#PCD_TareasCuenta');
  if (!sel) return;
  const opciones = [];
  if (CD4_SESION) opciones.push({ c: CD4_SESION, sesion: true });
  const yaEsta = (id) => opciones.some(o => o.c.idFuncionario === id);
  for (const c of [...CD4_CUENTAS, ...CD4_RESULTADOS_CUENTA]) if (!yaEsta(c.idFuncionario)) opciones.push({ c, sesion: false });
  if (CD4_CUENTA_SELECCIONADA && !yaEsta(CD4_CUENTA_SELECCIONADA.idFuncionario)) opciones.push({ c: CD4_CUENTA_SELECCIONADA, sesion: false });

  const aviso = !CD4_SESION
    ? `<option value="">${CD4_SESION_INTENTADA ? '— Sesión no detectada: busca una cuenta —' : '⏳ Detectando tu sesión...'}</option>`
    : '';
  sel.innerHTML = aviso + opciones.map(o => `<option value="${o.c.idFuncionario}">${cdEscaparHtml(cd4EtiquetaCuenta(o.c, o.sesion))}</option>`).join('');
  sel.value = CD4_CUENTA_SELECCIONADA ? String(CD4_CUENTA_SELECCIONADA.idFuncionario) : '';
}

async function cd4PrepararCuentaPorDefecto() {
  if (CD4_SESION_INTENTADA) return;
  cd4PintarSelectCuenta();
  const estado = document.querySelector('#PCD_TareasEstado');
  await cd4DetectarSesion();
  cd4PintarSelectCuenta();
  if (!estado) return;
  estado.textContent = CD4_SESION
    ? `Sesión detectada: ${CD4_SESION.nombre} (ID ${CD4_SESION.idFuncionario}). Elige una lista.`
    : 'No pude detectar la cuenta de la sesión. Búscala por nombre en el campo de arriba.';
}

async function cd4BuscarCuentaUI() {
  const estado = document.querySelector('#PCD_TareasEstado');
  const texto = document.querySelector('#PCD_TareasBuscarTexto').value.trim();
  if (texto.replace(/\s+/g, '').length < 2) { estado.textContent = 'Escribe al menos 2 letras de un nombre o apellido.'; return; }
  estado.textContent = '⏳ Buscando en toda la entidad...';
  try {
    CD4_RESULTADOS_CUENTA = await cd3BuscarFuncionariosGlobal(texto);
  } catch (e) {
    estado.textContent = '❌ No se pudo consultar: ' + e.message;
    return;
  }
  cd4PintarSelectCuenta();
  estado.textContent = CD4_RESULTADOS_CUENTA.length
    ? `${CD4_RESULTADOS_CUENTA.length} funcionario(s) encontrados — elígelo arriba y pulsa una lista.`
    : 'Sin coincidencias. Prueba con una sola palabra o sin tildes.';
}

function cd4ConstruirUrl(clave, idFuncionario) {
  const sinFecha = 'Mon Jan 01 1900 00:00:00 GMT-0456 (hora estándar de Colombia)';
  const ahora = new Date();
  const d2 = (n) => String(n).padStart(2, '0');
  const params = new URLSearchParams({
    'Bandeja.IDTAREAINICIAL': 0, 'Bandeja.ASUNTO': '', 'Bandeja.ESTADOTAREA': '',
    'Bandeja.IDFUNCIONARIOCREO': 0, 'Bandeja.IDFUNCIONARIOTAREA': 0, 'Bandeja.IDFUNCIONARIOFIRMO': 0,
    'Bandeja.FECHA1': sinFecha, 'Bandeja.FECHA2': sinFecha, 'Bandeja.ACCIONES': '', 'Bandeja.INSTRUCCION': '',
    'Bandeja.FECHAHOY': sinFecha, 'Bandeja.PROCESADO': '', 'Bandeja.ESTADO': 'SI',
    FechaHoy_BTDOC: `${d2(ahora.getDate())}/${d2(ahora.getMonth() + 1)}/${ahora.getFullYear()} ${ahora.getHours()}:${d2(ahora.getMinutes())}:${d2(ahora.getSeconds())}`,
  });
  for (const [k, v] of Object.entries(CD4_LISTAS[clave].parametros)) params.set(k, String(v).replace('{ID}', idFuncionario));
  return `${CD4_URL_BANDEJA}?${params.toString()}`;
}

function cd4ParsearFecha(v) {
  if (!v) return null;
  const m = /\/Date\((-?\d+)\)\//.exec(String(v));
  const d = m ? new Date(parseInt(m[1], 10)) : new Date(v);
  return (isNaN(d.getTime()) || d.getFullYear() < 2000) ? null : d;
}

// Fecha de creación de la tarea, tal como la muestra la columna nativa "FECHA
// CREACIÓN" ("Tarea documental del 17/09/2026 11:13:44": sale del campo NOMBRE).
// Si el texto no la trae, se recurre a FECHAGRABO y luego a FECHA.
function cd4ExtraerCreacion(f) {
  const m = /(\d{1,2}\/\d{1,2}\/\d{4})\s+(\d{1,2}:\d{2}(?::\d{2})?)/.exec(String(f.NOMBRE || ''));
  if (m) return `${m[1]} ${m[2]}`;
  const d = cd4ParsearFecha(f.FECHAGRABO) || cd4ParsearFecha(f.FECHA);
  if (!d) return '';
  const p = (n) => String(n).padStart(2, '0');
  return `${p(d.getDate())}/${p(d.getMonth() + 1)}/${d.getFullYear()} ${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())}`;
}

// De cada fila (unos 97 campos) se conserva solo lo que la tabla muestra.
function cd4ResumirFila(f) {
  return {
    idTarea: f.IDTAREADOC, idc: f.IDDOCUMENTO, conIdc: Number(f.IDDOCUMENTO) > 0,
    radicado: f.RADICADO || f.RADICADOSENLACE || '',
    asunto: f.ASUNTO || '', nombre: f.NOMBRE || '', creacion: cd4ExtraerCreacion(f), clase: f.CLASE || '',
    de: f.FUNCIONARIOCREO || '',
    para: f.NOMBRESFUNCIONARIOTAREA || f.FUNCIONARIOTAREA || f.DESTINATARIO || '',
    vence: cd4ParsearFecha(f.FECHAVENCE),
    leido: f.LEIDO === true || String(f.LEIDO || '').toUpperCase() === 'SI',
    adjuntos: Number(f.NUMADJUNTOS) || 0,   // referencia de la lista; NO es confiable: el botón usa adjuntosReal
    adjuntosReal: null,
    estado: f.ESTADOTAREA || '', instruccion: f.INSTRUCCION || '',
  };
}

const CD4_URL_ADJUNTOS = 'https://controldoc.minsalud.gov.co/Controldoc//TareasDoc/AdjuntosByIdTareaDoc';
const CD4_URL_BASE64DOC = 'https://controldoc.minsalud.gov.co/Controldoc//Adjuntos/Base64Documento';
const CD4_CONCURRENCIA_ADJUNTOS = 5;     // consultas simultáneas al contar adjuntos
const CD4_MAX_CONTEO_ADJUNTOS = 100;     // con listas más largas, el resto se cuenta al abrir cada tarea
let CD4_RUTA_REPO = '';

function cd4NombreAdjunto(a) { return a.ARCHIVONOMBRE || a.ARCHIVO || a.NOMBREARCHIVO || ''; }

// Adjuntos vigentes de una tarea: la misma consulta de la ventana nativa
// "DOCUMENTOS → Adjuntos" (los eliminados van en otra pestaña/consulta). Por
// si acaso, se descartan los que traigan fecha de eliminación.
async function cd4ObtenerAdjuntos(idTarea) {
  const resp = await fetch(`${CD4_URL_ADJUNTOS}?IDTAREADOC=${idTarea}&DILIGENCIADO=NO`, { credentials: 'same-origin', headers: { 'X-Requested-With': 'XMLHttpRequest' } });
  if (!resp.ok) throw new Error('HTTP ' + resp.status);
  const data = await resp.json();
  const lista = Array.isArray(data) ? data : ((data && (data.Data || data.OBJETOS)) || []);
  return lista.filter(a => !cd4ParsearFecha(a.FECHAELIMINO));
}

// Estado del botón 📎 de cada fila según el conteo real (adjuntosReal):
// null = contando · número = resultado · 'error' = falló · 'sin-contar' = lista muy larga
function cd4EstadoBotonAdjuntos(f) {
  const n = f.adjuntosReal;
  if (typeof n === 'number') {
    return n > 0
      ? { texto: `Adjuntos (${n})`, fondo: '#2563eb', color: '#fff', activo: true, titulo: 'Ver / descargar adjuntos' }
      : { texto: 'Sin adjuntos', fondo: '#e5e7eb', color: '#9ca3af', activo: false, titulo: 'Esta tarea no tiene adjuntos' };
  }
  if (n === 'error') return { texto: 'Adjuntos (?)', fondo: '#fde68a', color: '#92400e', activo: true, titulo: 'No se pudo contar: pulsa para intentarlo de nuevo' };
  if (n === 'sin-contar') return { texto: 'Adjuntos', fondo: '#dbeafe', color: '#1e3a8a', activo: true, titulo: 'Pulsa para ver los adjuntos' };
  return { texto: 'Adjuntos (…)', fondo: '#dbeafe', color: '#1e3a8a', activo: true, titulo: 'Contando adjuntos…' };
}

function cd4ActualizarBotonAdjuntos(f) {
  const b = document.querySelector(`.cd4-btn-adjuntos[data-tarea="${f.idTarea}"]`);
  if (!b) return;
  const e = cd4EstadoBotonAdjuntos(f);
  b.textContent = '📎 ' + e.texto; b.style.background = e.fondo; b.style.color = e.color;
  b.style.cursor = e.activo ? 'pointer' : 'not-allowed'; b.disabled = !e.activo; b.title = e.titulo;
}

// Cuenta los adjuntos reales de cada fila en segundo plano (pocas consultas a
// la vez, sin bloquear la tabla) y va actualizando cada botón en su sitio.
async function cd4ContarAdjuntosEnSegundoPlano(filas) {
  const aContar = filas.filter(f => f.adjuntosReal == null);
  aContar.slice(CD4_MAX_CONTEO_ADJUNTOS).forEach(f => { f.adjuntosReal = 'sin-contar'; cd4ActualizarBotonAdjuntos(f); });
  await ejecutarConPool(aContar.slice(0, CD4_MAX_CONTEO_ADJUNTOS), CD4_CONCURRENCIA_ADJUNTOS, async (f) => {
    try { f.adjuntosReal = (await cd4ObtenerAdjuntos(f.idTarea)).length; }
    catch (e) { f.adjuntosReal = 'error'; }
    cd4ActualizarBotonAdjuntos(f);
  });
}

async function cd4ObtenerRutaRepo() {
  if (CD4_RUTA_REPO) return CD4_RUTA_REPO;
  const r = await fetch('https://controldoc.minsalud.gov.co/Controldoc///Home/ObtenerValorLlave?key=RUTAREPOSITORIO', { credentials: 'same-origin', headers: { 'X-Requested-With': 'XMLHttpRequest' } }).then(x => x.json());
  CD4_RUTA_REPO = r.value ?? r.VALOR ?? '';
  return CD4_RUTA_REPO;
}

// Adaptado de tdObtenerAdjuntoBlobUrl (script de IDTAREAS): el adjunto vive en
// una carpeta por año dentro del repositorio, así que se prueba el año que
// trae el nombre del archivo y, si no, el actual y el anterior.
async function cd4ObtenerAdjuntoBlob(adjunto) {
  const rutaRepo = await cd4ObtenerRutaRepo();
  const archivo = cd4NombreAdjunto(adjunto);
  if (!archivo) { console.warn('[CD4] El adjunto no trae ARCHIVONOMBRE:', adjunto); return null; }

  const matchAnio = archivo.match(/_(\d{4})\d{10}/);
  const anioActual = new Date().getFullYear();
  const anios = [...(matchAnio ? [parseInt(matchAnio[1], 10)] : []), anioActual, anioActual - 1].filter((v, i, a) => a.indexOf(v) === i);

  for (const anio of anios) {
    const resp = await fetch(CD4_URL_BASE64DOC, {
      method: 'POST', credentials: 'same-origin',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8', 'X-Requested-With': 'XMLHttpRequest' },
      body: new URLSearchParams({ Ruta: `${rutaRepo}ADJUNTOS\\${anio}\\`, ArchivoNombre: archivo, RutaFria: `NOADJUNTOS\\${anio}\\` }).toString(),
    });
    const data = await resp.json();
    if (data.RESPUESTA === false) continue;
    const valor = data.VALORESPUESTA;
    if (!valor) continue;
    if (typeof valor === 'string' && valor.startsWith('http')) {
      const r2 = await fetch(valor, { credentials: 'same-origin' });
      if (r2.ok) return r2.blob();
      continue;
    }
    try {
      const binario = atob(valor);
      const bytes = new Uint8Array(binario.length);
      for (let i = 0; i < binario.length; i++) bytes[i] = binario.charCodeAt(i);
      return new Blob([bytes]);
    } catch (e) { continue; }
  }
  return null;
}

async function cd4ObtenerAdjuntoBlobUrl(adjunto) {
  const blob = await cd4ObtenerAdjuntoBlob(adjunto);
  return blob ? URL.createObjectURL(blob) : null;
}

function cd4DescargarBlob(blob, nombre) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = nombre;
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

// ── ZIP sin librerías (método "store", sin compresión: los adjuntos ya vienen
// comprimidos en su mayoría). Nombres en UTF-8 para conservar tildes y ñ.
const CD4_TABLA_CRC = (() => {
  const t = new Uint32Array(256);
  for (let n = 0; n < 256; n++) { let c = n; for (let k = 0; k < 8; k++) c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1); t[n] = c >>> 0; }
  return t;
})();
function cd4Crc32(bytes) {
  let c = 0xFFFFFFFF;
  for (let i = 0; i < bytes.length; i++) c = CD4_TABLA_CRC[(c ^ bytes[i]) & 0xFF] ^ (c >>> 8);
  return (c ^ 0xFFFFFFFF) >>> 0;
}
function cd4CrearZip(archivos) {   // archivos: [{ nombre, bytes: Uint8Array }]
  const enc = new TextEncoder();
  const ahora = new Date();
  const dosHora = (ahora.getHours() << 11) | (ahora.getMinutes() << 5) | (ahora.getSeconds() >> 1);
  const dosFecha = ((ahora.getFullYear() - 1980) << 9) | ((ahora.getMonth() + 1) << 5) | ahora.getDate();
  const partes = [], central = [];
  let offset = 0;
  for (const { nombre, bytes } of archivos) {
    const nom = enc.encode(nombre);
    const crc = cd4Crc32(bytes);
    const loc = new DataView(new ArrayBuffer(30));
    loc.setUint32(0, 0x04034b50, true); loc.setUint16(4, 20, true); loc.setUint16(6, 0x0800, true); loc.setUint16(8, 0, true);
    loc.setUint16(10, dosHora, true); loc.setUint16(12, dosFecha, true); loc.setUint32(14, crc, true);
    loc.setUint32(18, bytes.length, true); loc.setUint32(22, bytes.length, true); loc.setUint16(26, nom.length, true); loc.setUint16(28, 0, true);
    partes.push(new Uint8Array(loc.buffer), nom, bytes);
    const cen = new DataView(new ArrayBuffer(46));
    cen.setUint32(0, 0x02014b50, true); cen.setUint16(4, 20, true); cen.setUint16(6, 20, true); cen.setUint16(8, 0x0800, true); cen.setUint16(10, 0, true);
    cen.setUint16(12, dosHora, true); cen.setUint16(14, dosFecha, true); cen.setUint32(16, crc, true);
    cen.setUint32(20, bytes.length, true); cen.setUint32(24, bytes.length, true); cen.setUint16(28, nom.length, true);
    cen.setUint16(30, 0, true); cen.setUint16(32, 0, true); cen.setUint16(34, 0, true); cen.setUint16(36, 0, true); cen.setUint32(38, 0, true); cen.setUint32(42, offset, true);
    central.push(new Uint8Array(cen.buffer), nom);
    offset += 30 + nom.length + bytes.length;
  }
  const tamCentral = central.reduce((s, p) => s + p.length, 0);
  const fin = new DataView(new ArrayBuffer(22));
  fin.setUint32(0, 0x06054b50, true); fin.setUint16(8, archivos.length, true); fin.setUint16(10, archivos.length, true);
  fin.setUint32(12, tamCentral, true); fin.setUint32(16, offset, true);
  return new Blob([...partes, ...central, new Uint8Array(fin.buffer)], { type: 'application/zip' });
}

// Descarga todos los adjuntos de una tarea: un solo archivo → directo; varios → un ZIP.
async function cd4DescargarTodos(idTarea, adjuntos, mostrarEstado) {
  const usados = new Set();
  const nombreUnico = (n) => {
    const limpio = n.replace(/[\\/:*?"<>|]+/g, '_') || 'adjunto';
    let candidato = limpio, k = 2;
    const punto = limpio.lastIndexOf('.');
    const [base, ext] = punto > 0 ? [limpio.slice(0, punto), limpio.slice(punto)] : [limpio, ''];
    while (usados.has(candidato.toLowerCase())) candidato = `${base} (${k++})${ext}`;
    usados.add(candidato.toLowerCase());
    return candidato;
  };
  const obtenidos = [], fallidos = [];
  for (let i = 0; i < adjuntos.length; i++) {
    const nombre = cd4NombreAdjunto(adjuntos[i]) || `adjunto_${i + 1}`;
    mostrarEstado(`⏳ Descargando ${i + 1} de ${adjuntos.length}…`);
    try {
      const blob = await cd4ObtenerAdjuntoBlob(adjuntos[i]);
      if (!blob) throw new Error('sin archivo');
      obtenidos.push({ nombre: nombreUnico(nombre), blob });
    } catch (e) { console.warn('[CD4] No se pudo obtener el adjunto:', nombre, e); fallidos.push(nombre); }
  }
  if (!obtenidos.length) { mostrarEstado('❌ No se pudo descargar ningún adjunto. Revisa la consola (F12).'); return; }
  if (obtenidos.length === 1) {
    cd4DescargarBlob(obtenidos[0].blob, obtenidos[0].nombre);
  } else {
    mostrarEstado('⏳ Armando el ZIP…');
    const archivos = [];
    for (const o of obtenidos) archivos.push({ nombre: o.nombre, bytes: new Uint8Array(await o.blob.arrayBuffer()) });
    cd4DescargarBlob(cd4CrearZip(archivos), `Adjuntos_Tarea_${idTarea}.zip`);
  }
  mostrarEstado(fallidos.length
    ? `⚠️ Se descargaron ${obtenidos.length} de ${adjuntos.length}. No se pudo: ${fallidos.join(', ')}`
    : `✅ Listo: ${obtenidos.length} archivo(s)${obtenidos.length > 1 ? ' en un ZIP' : ''}.`);
}

async function cd4MostrarAdjuntos(idTarea) {
  document.querySelector('#PCD_ModalAdjuntosTarea')?.remove();
  const modal = document.createElement('div');
  modal.id = 'PCD_ModalAdjuntosTarea';
  modal.style.cssText = 'position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.4); z-index:100000; display:flex; align-items:center; justify-content:center;';
  modal.innerHTML = `
    <div style="background:#fff; border-radius:8px; padding:16px; width:460px; max-height:80vh; overflow-y:auto; font-size:12px;">
      <div style="display:flex; justify-content:space-between; margin-bottom:10px;">
        <b>Adjuntos — Tarea ${idTarea}</b>
        <button id="PCD_CerrarAdjuntosTarea" style="background:none; border:none; font-size:16px; cursor:pointer;">✕</button>
      </div>
      <div id="PCD_ListaAdjuntosTarea">⏳ Consultando...</div>
    </div>`;
  document.body.appendChild(modal);
  modal.querySelector('#PCD_CerrarAdjuntosTarea').onclick = () => modal.remove();
  const cont = modal.querySelector('#PCD_ListaAdjuntosTarea');

  let adjuntos = [];
  try { adjuntos = await cd4ObtenerAdjuntos(idTarea); } catch (e) {
    cont.innerHTML = `<span style="color:#ea580c;">❌ ${cdEscaparHtml(e.message)}</span>`;
    return;
  }
  // El resultado real corrige el botón de la fila si no coincidía.
  const fila = CD4_FILAS.find(f => String(f.idTarea) === String(idTarea));
  if (fila) { fila.adjuntosReal = adjuntos.length; cd4ActualizarBotonAdjuntos(fila); }

  if (!adjuntos.length) { cont.innerHTML = '<i style="color:#6b7280;">Sin adjuntos.</i>'; return; }
  cont.innerHTML = `
    <div style="display:flex; align-items:center; gap:8px; margin-bottom:8px;">
      <button id="PCD_DescargarTodosAdj" style="padding:7px 12px; background:#16a34a; color:#fff; border:none; border-radius:5px; cursor:pointer; font-size:12px; font-weight:bold;">⬇ Descargar todos (${adjuntos.length})</button>
      <span id="PCD_EstadoDescargaAdj" style="color:#6b7280;"></span>
    </div>` + adjuntos.map((a, i) => `
    <div style="display:flex; justify-content:space-between; align-items:center; padding:5px 0; border-bottom:1px solid #f3f4f6;">
      <span style="word-break:break-all;">${cdEscaparHtml(cd4NombreAdjunto(a) || '(sin nombre)')}</span>
      <button data-i="${i}" class="cd4-btn-descargar-adjunto" title="Descargar" style="border:none; background:none; cursor:pointer; font-size:14px; flex-shrink:0; margin-left:8px;">📥</button>
    </div>`).join('');

  const estado = cont.querySelector('#PCD_EstadoDescargaAdj');
  const btnTodos = cont.querySelector('#PCD_DescargarTodosAdj');
  btnTodos.onclick = async () => {
    btnTodos.disabled = true; btnTodos.style.opacity = '0.6';
    await cd4DescargarTodos(idTarea, adjuntos, (t) => { estado.textContent = t; });
    btnTodos.disabled = false; btnTodos.style.opacity = '1';
  };
  cont.querySelectorAll('.cd4-btn-descargar-adjunto').forEach(btn => {
    btn.onclick = async () => {
      const original = btn.textContent; btn.textContent = '⏳';
      const adj = adjuntos[Number(btn.dataset.i)];
      const blob = await cd4ObtenerAdjuntoBlob(adj);
      btn.textContent = original;
      if (!blob) return alert('No se pudo descargar este adjunto. Revisa la consola (F12).');
      cd4DescargarBlob(blob, cd4NombreAdjunto(adj) || 'adjunto');
    };
  });
}

function cd4Vencimiento(d) {
  if (!d) return { texto: '—', fondo: 'transparent', color: '#6b7280' };
  const dias = Math.ceil((d.getTime() - Date.now()) / 86400000);
  const fecha = d.toLocaleDateString('es-CO');
  return dias < 0
    ? { texto: `${fecha}<br>Vencido hace ${-dias} d`, fondo: '#fecaca', color: '#991b1b' }
    : { texto: `${fecha}<br>Faltan ${dias} d`, fondo: '#fde68a', color: '#92400e' };
}

async function cd4CargarLista(clave) {
  const estado = document.querySelector('#PCD_TareasEstado');
  const cuenta = CD4_CUENTA_SELECCIONADA;
  const lista = CD4_LISTAS[clave];
  document.querySelectorAll('.cd4-btn-lista').forEach(b => { b.style.background = b.dataset.lista === clave ? '#2563eb' : '#e5e7eb'; b.style.color = b.dataset.lista === clave ? '#fff' : '#111827'; });
  if (!lista.parametros) {
    CD4_FILAS = []; CD4_CARGADA = null; cd4RenderizarTabla();
    estado.textContent = `"${lista.etiqueta}" aún no está configurada: falta copiar los parámetros de su petición CargarBandeja en CD4_LISTAS (al inicio del script).`;
    return;
  }
  if (!cuenta) {
    estado.textContent = 'Primero elige una cuenta: la de tu sesión (si se detectó) o busca una por nombre.';
    return;
  }
  estado.textContent = '⏳ Cargando...';
  let datos;
  try {
    const resp = await fetch(cd4ConstruirUrl(clave, cuenta.idFuncionario), { credentials: 'same-origin', headers: { 'X-Requested-With': 'XMLHttpRequest' } });
    const j = await resp.json();
    datos = Array.isArray(j) ? j : (j.Data || j.OBJETOS || []);
  } catch (e) {
    estado.textContent = '❌ No se pudo cargar la lista: ' + e.message;
    return;
  }
  CD4_FILAS = datos.map(cd4ResumirFila);
  CD4_CARGADA = { lista: clave, cuenta: cuenta.nombre, idFuncionario: cuenta.idFuncionario };
  document.querySelector('#PCD_TareasFiltro').value = '';
  const selSalida = document.querySelector('#PCD_TareasSalida'); if (selSalida) selSalida.value = 'todas';
  cd4RenderizarTabla();
  cd4ContarAdjuntosEnSegundoPlano(CD4_FILAS);
}

function cd4RenderizarTabla() {
  const cont = document.querySelector('#PCD_TareasTabla');
  const estado = document.querySelector('#PCD_TareasEstado');
  if (!cont) return;
  const selSalida = document.querySelector('#PCD_TareasSalida');
  if (!CD4_CARGADA) { cont.innerHTML = ''; if (selSalida) selSalida.style.display = 'none'; return; }
  const lista = CD4_LISTAS[CD4_CARGADA.lista];
  const conIndicador = !!lista.indicadorSalida;   // ✅ tiene IDC (ya salió) / ❌ sin IDC (aún no sale)
  if (selSalida) selSalida.style.display = conIndicador ? '' : 'none';
  const modoSalida = conIndicador && selSalida ? selSalida.value : 'todas';
  const filtro = cd3Normalizar((document.querySelector('#PCD_TareasFiltro').value || '').trim());
  const visibles = CD4_FILAS
    .filter(f => !filtro || cd3Normalizar([f.idTarea, f.idc, f.radicado, f.asunto, f.de, f.para, f.clase].join(' ')).includes(filtro))
    .filter(f => modoSalida === 'todas' || (modoSalida === 'salieron' ? f.conIdc : !f.conIdc));
  const salieron = CD4_FILAS.filter(f => f.conIdc).length;
  estado.textContent = `👁️ ${lista.etiqueta} de «${CD4_CARGADA.cuenta}» — solo lectura · ${visibles.length} de ${CD4_FILAS.length}` +
    (conIndicador ? ` · ✅ ${salieron} con IDC · ❌ ${CD4_FILAS.length - salieron} sin IDC (aún no salen)` : '');
  if (!visibles.length) { cont.innerHTML = '<div style="color:#9ca3af; font-size:12px; padding:10px 0;">Sin tareas para mostrar.</div>'; return; }

  const e = cdEscaparHtml;
  cont.innerHTML = `
    <div style="font-size:10px; color:#6b7280; margin-bottom:4px;">Copiar: <b>T</b> = ID Tarea · <b>C</b> = IDC · <b>A</b> = Asunto</div>
    <table style="width:100%; table-layout:fixed; border-collapse:collapse; font-size:11px;">
      <colgroup>
        <col style="width:10%;"><col style="width:9%;"><col style="width:12%;">
        <col style="width:13%;"><col style="width:26%;"><col style="width:15%;"><col style="width:15%;">
      </colgroup>
      <thead><tr style="background:#f3f4f6; text-align:left;">
        <th style="padding:4px;">Tarea / IDC</th><th style="padding:4px;">Radicado</th><th style="padding:4px;">Creación</th>
        <th style="padding:4px;">De → Para</th><th style="padding:4px;">Asunto</th><th style="padding:4px;">Documento</th>
        <th style="padding:4px;" title="T = ID Tarea · C = IDC · A = Asunto">Copiar</th>
      </tr></thead>
      <tbody>${visibles.map(f => { const i = CD4_FILAS.indexOf(f);
        const icono = conIndicador ? `<span title="${f.conIdc ? 'Con IDC: el documento ya salió / se remitió' : 'Sin IDC: el documento aún no ha salido'}" style="font-size:13px; font-weight:normal;">${f.conIdc ? '✅' : '❌'}</span> ` : '';
        const textoIdc = f.conIdc ? e(f.idc) : (conIndicador ? '<span style="color:#dc2626;">sin IDC</span>' : '—');
        const [fechaCrea, horaCrea] = (f.creacion || '').split(' ');
        const meta = [f.clase, [f.estado, f.instruccion].filter(Boolean).join(' / ')].filter(Boolean).join(' · ');
        const estAdj = cd4EstadoBotonAdjuntos(f);
        const btn = 'display:block; width:100%; box-sizing:border-box; padding:7px 4px; font-size:12px; border:none; border-radius:5px; font-weight:normal;';
        return `
        <tr style="border-bottom:1px solid #e5e7eb; ${f.leido ? '' : 'font-weight:bold;'} ${conIndicador && !f.conIdc ? 'background:#fff7f7;' : ''}">
          <td style="padding:5px; word-break:break-word;">${icono}${e(f.idTarea)}<br><span style="color:#6b7280; font-weight:normal;">${textoIdc}</span></td>
          <td style="padding:5px; word-break:break-all;">${e(f.radicado) || '—'}</td>
          <td style="padding:5px 3px; font-weight:normal;">${fechaCrea ? e(fechaCrea) + '<br><span style="color:#6b7280;">' + e(horaCrea || '') + '</span>' : '—'}</td>
          <td style="padding:5px; word-break:break-word;">${e(f.de) || '—'}<br><span style="color:#6b7280; font-weight:normal;">→ ${e(f.para) || '—'}</span></td>
          <td style="padding:5px; white-space:normal; word-break:break-word; line-height:1.4;">${e(f.asunto)}${meta ? `<div style="color:#9ca3af; font-size:10px; font-weight:normal; margin-top:3px;">${e(meta)}</div>` : ''}</td>
          <td style="padding:5px;">
            <div style="display:flex; flex-direction:column; gap:6px;">
              <button data-i="${i}" class="cd4-btn-preview" title="${f.conIdc ? 'Previsualizar el documento (por IDC)' : 'Sin IDC: aún no hay documento para previsualizar'}" style="${btn} background:#e5e7eb; ${f.conIdc ? 'cursor:pointer;' : 'cursor:not-allowed; opacity:0.4;'}" ${f.conIdc ? '' : 'disabled'}>👁 Ver PDF</button>
              <button data-i="${i}" class="cd4-btn-descargar-pdf" title="${f.conIdc ? 'Descargar el documento en PDF (por IDC)' : 'Sin IDC: aún no hay documento para descargar'}" style="${btn} white-space:normal; line-height:1.2; background:#e5e7eb; ${f.conIdc ? 'cursor:pointer;' : 'cursor:not-allowed; opacity:0.4;'}" ${f.conIdc ? '' : 'disabled'}>⬇ Descargar PDF</button>
              <button data-i="${i}" data-tarea="${e(f.idTarea)}" class="cd4-btn-adjuntos" title="${estAdj.titulo}" style="${btn} white-space:normal; line-height:1.2; background:${estAdj.fondo}; color:${estAdj.color}; cursor:${estAdj.activo ? 'pointer' : 'not-allowed'};" ${estAdj.activo ? '' : 'disabled'}>📎 ${estAdj.texto}</button>
            </div>
          </td>
          <td style="padding:5px;">
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:6px;">
              <button data-i="${i}" data-copiar="idTarea" class="cd4-btn-copiar" title="Copiar ID Tarea" style="${btn} background:#e5e7eb; cursor:pointer;">📋T</button>
              <button data-i="${i}" data-copiar="idc" class="cd4-btn-copiar" title="${f.conIdc ? 'Copiar IDC' : 'Sin IDC'}" style="${btn} background:#e5e7eb; ${f.conIdc ? 'cursor:pointer;' : 'cursor:not-allowed; opacity:0.4;'}" ${f.conIdc ? '' : 'disabled'}>📋C</button>
              <button data-i="${i}" data-copiar="asunto" class="cd4-btn-copiar" title="Copiar Asunto" style="${btn} grid-column:1 / -1; background:#e5e7eb; cursor:pointer;">📋A</button>
            </div>
          </td>
        </tr>`; }).join('')}</tbody>
    </table>`;

  cont.querySelectorAll('.cd4-btn-adjuntos').forEach(b => { b.onclick = () => cd4MostrarAdjuntos(CD4_FILAS[Number(b.dataset.i)].idTarea); });
  cont.querySelectorAll('.cd4-btn-preview').forEach(b => { b.onclick = () => cdPrevisualizarPdf(CD4_FILAS[Number(b.dataset.i)].idc); });
  cont.querySelectorAll('.cd4-btn-descargar-pdf').forEach(b => {
    b.onclick = async () => {
      const original = b.textContent; b.textContent = '⏳ Descargando…'; b.disabled = true;
      try { await cdDescargarPdf(CD4_FILAS[Number(b.dataset.i)].idc); }
      catch (e) { alert('No se pudo descargar el PDF: ' + e.message); }
      finally { b.textContent = original; b.disabled = false; }
    };
  });
  cont.querySelectorAll('.cd4-btn-copiar').forEach(b => {
    b.onclick = () => {
      cdCopiarTexto(String(CD4_FILAS[Number(b.dataset.i)][b.dataset.copiar] || ''));
      const original = b.textContent; b.textContent = '✓'; setTimeout(() => { b.textContent = original; }, 1000);
    };
  });
}

function cd4ExportarExcel() {
  if (!CD4_CARGADA || !CD4_FILAS.length) return alert('Primero carga una lista con tareas.');
  const esc = (s) => String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const conInd = !!CD4_LISTAS[CD4_CARGADA.lista].indicadorSalida;
  const filas = CD4_FILAS.map(f => `<tr><td>${esc(f.idTarea)}</td><td>${esc(f.conIdc ? f.idc : '')}</td>${conInd ? `<td>${f.conIdc ? 'SÍ' : 'NO'}</td>` : ''}<td>${esc(f.radicado)}</td><td>${esc(f.vence ? f.vence.toLocaleDateString('es-CO') : '')}</td><td>${esc(f.de)}</td><td>${esc(f.para)}</td><td>${esc(f.clase)}</td><td>${esc(f.asunto)}</td><td>${esc(f.creacion || f.nombre)}</td><td>${esc(typeof f.adjuntosReal === 'number' ? f.adjuntosReal : '')}</td><td>${esc(f.estado)}</td><td>${esc(f.instruccion)}</td></tr>`).join('');
  const html = `<html><head><meta charset="UTF-8"></head><body><table border="1"><tr><th>ID Tarea</th><th>IDC</th>${conInd ? '<th>Salió (con IDC)</th>' : ''}<th>Radicado</th><th>Vence</th><th>De</th><th>Para</th><th>Clase</th><th>Asunto</th><th>Creación</th><th>Adjuntos</th><th>Estado</th><th>Instrucción</th></tr>${filas}</table></body></html>`;
  const url = URL.createObjectURL(new Blob([html], { type: 'application/vnd.ms-excel' }));
  const a = document.createElement('a');
  a.href = url; a.download = `Tareas_${CD4_CARGADA.lista}_${new Date().toISOString().slice(0, 10)}.xls`;
  document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url);
}

function cd3CrearPanel() {
  const existente = document.querySelector('#PanelClasificadorDoc');
  if (existente) existente.remove();
  const cont = document.createElement('div');
  cont.id = 'PanelClasificadorDoc';
  cont.style.cssText = 'position:fixed; top:20px; left:20px; z-index:99999; background:#fff; border:1px solid #ccc; border-radius:10px; padding:14px; box-shadow:0 4px 18px rgba(0,0,0,0.25); width:650px; max-height:88vh; overflow-y:auto; font-family:sans-serif; font-size:13px;';
  cont.style.zoom = CD_ESCALA_UI;

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
      <div style="display:flex; align-items:center; gap:2px;">
        <button id="PCD_EscalaMenos" title="Reducir tamaño de la interfaz" style="background:none; border:none; font-size:14px; cursor:pointer; padding:2px 4px;">🔍➖</button>
        <span class="cd-escala-label" style="font-size:11px; color:#6b7280; min-width:34px; text-align:center;">${Math.round(CD_ESCALA_UI * 100)}%</span>
        <button id="PCD_EscalaMas" title="Aumentar tamaño de la interfaz" style="background:none; border:none; font-size:14px; cursor:pointer; padding:2px 4px;">🔍➕</button>
        <button id="PCD_MinimizarTodo" title="Minimizar panel completo" style="background:none; border:none; font-size:16px; cursor:pointer;">➖</button>
        <button id="PCD_Cerrar" title="Cerrar" style="background:none; border:none; font-size:16px; cursor:pointer;">✕</button>
      </div>
    </div>
    <div id="PCD_CuerpoGeneral">
      <button id="PCD_ExportarBitacora" style="width:100%; margin-bottom:10px; padding:7px; background:#374151; color:#fff; border:none; border-radius:6px; cursor:pointer; font-size:12px; font-weight:bold;">📥 Exportar registro de acciones <span id="PCD_ContadorBitacora" style="font-weight:normal;">(0)</span></button>
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
          <label style="color:#6b7280; font-size:11px; font-weight:bold;">👁️ Bandeja a cargar (por defecto, la tuya)</label>
          <div style="display:flex; gap:6px; margin:4px 0;">
            <input id="PCD_BandejaBuscarTexto" type="text" placeholder="🌐 Nombre o apellido (toda la entidad)" style="flex:1; padding:5px; border:1px solid #ccc; border-radius:4px; font-size:11px;">
            <button id="PCD_BandejaBuscarGlobal" style="padding:4px 10px; background:#2563eb; color:#fff; border:none; border-radius:4px; cursor:pointer; font-size:11px;">Buscar</button>
          </div>
          <div style="display:flex; gap:6px; margin:4px 0;">
            <select id="PCD_BandejaCargo" style="padding:4px; border:1px solid #ccc; border-radius:4px; font-size:11px;">
              ${Object.entries(CD3_BANDEJA_CARGOS).map(([nombre, id]) => `<option value="${id}">${nombre}</option>`).join('')}
            </select>
            <button id="PCD_BandejaBuscar" style="padding:4px 10px; background:#374151; color:#fff; border:none; border-radius:4px; cursor:pointer; font-size:11px;">Listar mi Dirección</button>
            <button id="PCD_BandejaMia" title="Volver a tu propia bandeja" style="padding:4px 10px; background:#e5e7eb; border:none; border-radius:4px; cursor:pointer; font-size:11px;">↩ Mi bandeja</button>
          </div>
          <input id="PCD_BandejaFiltro" type="text" placeholder="Filtrar los resultados por nombre..." style="width:100%; padding:5px; border:1px solid #ccc; border-radius:4px; margin-bottom:4px; font-size:11px; box-sizing:border-box;">
          <select id="PCD_BandejaFuncionario" style="width:100%; padding:4px; border:1px solid #ccc; border-radius:4px; font-size:11px; box-sizing:border-box;">
            <option value="0">👤 Mi bandeja (predeterminado)</option>
          </select>
          <div id="PCD_BandejaEstado" style="font-size:11px; color:#6b7280; margin:4px 0 10px;"></div>
          <button id="PCD_Clasificar" style="width:100%; padding:8px; background:#111827; color:#fff; border:none; border-radius:6px; cursor:pointer; font-weight:bold;">🔄 Cargar Documentos Pendientes de la Bandeja</button>
          <div id="PCD_Estado" style="font-size:12px; color:#6b7280; margin-top:8px;"></div>
        </div>
      </div>
      <div style="border:1px solid #e5e7eb; border-radius:8px; margin-bottom:10px; overflow:hidden;">
        <div id="PCD_HeaderComentarios" style="display:flex; justify-content:space-between; align-items:center; padding:8px 10px; background:#f9fafb; cursor:pointer; font-weight:bold;">
          <span><span id="PCD_FlechaComentarios">▸</span> 💬 Comentarios de gestión</span>
        </div>
        <div id="PCD_CuerpoComentarios" style="display:none; padding:10px;">
          <label style="color:#6b7280; font-size:11px;">Comentario del trámite (se usa al reasignar desde este panel)</label>
          <select id="PCD_ComentarioReasignacionLista" style="width:100%; padding:4px; border:1px solid #ccc; border-radius:4px; margin:3px 0; font-size:11px; box-sizing:border-box;">
            <option value="">— Elegir comentario predefinido —</option>
            ${CD3_COMENTARIOS_REASIGNACION.map((c, i) => `<option value="${i}">${cd3TruncarTexto(c.etiqueta, 70)}</option>`).join('')}
          </select>
          <textarea id="PCD_ComentarioReasignacion" rows="2" style="width:100%; padding:5px; border:1px solid #ccc; border-radius:4px; margin:3px 0 8px; font-size:11px; box-sizing:border-box;">${CD2_COMENTARIO_REASIGNACION_DEFAULT}</textarea>

          <label style="color:#6b7280; font-size:11px;">Comentario de cierre (se usa al cerrar 🗂️ desde este panel)</label>
          <select id="PCD_ComentarioCierreLista" style="width:100%; padding:4px; border:1px solid #ccc; border-radius:4px; margin:3px 0; font-size:11px; box-sizing:border-box;">
            <option value="">— Elegir comentario predefinido —</option>
            ${CD3_COMENTARIOS_CIERRE.map((c, i) => `<option value="${i}">${cd3TruncarTexto(c.etiqueta, 70)}</option>`).join('')}
          </select>
          <textarea id="PCD_ComentarioCierre" rows="2" style="width:100%; padding:5px; border:1px solid #ccc; border-radius:4px; margin:3px 0 8px; font-size:11px; box-sizing:border-box;">${CD2_COMENTARIO_CIERRE_DEFAULT}</textarea>
        </div>
      </div>
      <div style="border:1px solid #e5e7eb; border-radius:8px; margin-bottom:10px; overflow:hidden;">
        <div id="PCD_HeaderSec3" style="display:flex; justify-content:space-between; align-items:center; padding:8px 10px; background:#f9fafb; cursor:pointer; font-weight:bold;">
          <span><span id="PCD_FlechaSec3">▾</span> 📊 Resultados <span id="PCD_ContadorResultados" style="color:#6b7280; font-weight:normal;"></span></span>
        </div>
        <div id="PCD_CuerpoSec3" style="display:block; padding:10px;">
          <div id="PCD_BannerBandeja" style="display:none; background:#fef3c7; border-left:4px solid #d97706; color:#92400e; padding:6px 8px; border-radius:4px; margin-bottom:8px; font-size:11px; font-weight:bold;"></div>
          <label style="color:#6b7280; font-size:11px;">Filtrar tabla</label>
          <select id="PCD_FiltroTabla" style="width:100%; padding:5px; border:1px solid #ccc; border-radius:4px; margin:3px 0 8px; font-size:11px; box-sizing:border-box;">
            <option value="todos">📋 Todos</option>
            <option value="con-prediccion">✅ Con predicción</option>
            <option value="sin-prediccion">⚠️ Sin predicción</option>
            <option value="priorizacion">🏛️ Priorizaciones y Control Político</option>
            <option value="baja-confianza">⚠️ Baja confianza (revisar)</option>
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

      <div style="border:1px solid #e5e7eb; border-radius:8px; margin-top:10px; overflow:hidden;">
        <div id="PCD_HeaderSec5" style="display:flex; justify-content:space-between; align-items:center; padding:8px 10px; background:#f9fafb; cursor:pointer; font-weight:bold;">
          <span><span id="PCD_FlechaSec5">▸</span> 🔎 Buscar dependencia / funcionario (fuera de tu lista)</span>
        </div>
        <div id="PCD_CuerpoSec5" style="display:none; padding:10px;">
          <label style="color:#6b7280; font-size:11px; font-weight:bold;">Buscar dependencia, dirección, subdirección u oficina por nombre</label>
          <div style="display:flex; gap:6px; margin:4px 0 8px;">
            <input id="PCD_BuscarOficinaTexto" type="text" placeholder="ej: SALUD MENTAL, FINANCIAMIENTO..." style="flex:1; padding:5px; border:1px solid #ccc; border-radius:4px; font-size:11px;">
            <button id="PCD_BuscarOficinaBtn" style="padding:5px 10px; background:#374151; color:#fff; border:none; border-radius:4px; cursor:pointer; font-size:11px;">Buscar</button>
          </div>
          <div id="PCD_ResultadosOficina" style="max-height:180px; overflow-y:auto; margin-bottom:10px;"></div>

          <label style="color:#6b7280; font-size:11px; font-weight:bold;">Reasignar al destino elegido arriba (📥 Usar para reasignar)</label>
          <input id="PCD_DestinoAdHocNombre" type="text" readonly placeholder="(ningún destino elegido aún)" style="width:100%; padding:5px; border:1px solid #ccc; border-radius:4px; margin:3px 0; font-size:11px; background:#f9fafb; box-sizing:border-box;">
          <input id="PCD_DestinoAdHocOficina" type="hidden">
          <input id="PCD_DestinoAdHocUnidad" type="hidden">
          <textarea id="PCD_DestinoAdHocIds" rows="3" style="width:100%; padding:6px; border:1px solid #ccc; border-radius:6px; margin:4px 0 8px; box-sizing:border-box;" placeholder="IDCs o Radicados a enviar a ese destino"></textarea>
          <button id="PCD_ReasignarAdHoc" style="width:100%; padding:8px; background:#16a34a; color:#fff; border:none; border-radius:6px; cursor:pointer; font-weight:bold;">🚀 Reasignar al destino de arriba</button>
          <div id="PCD_EstadoAdHoc" style="margin-top:8px; font-size:12px; color:#6b7280;"></div>
        </div>
      </div>

      <div style="border:1px solid #e5e7eb; border-radius:8px; margin-top:10px; overflow:hidden;">
        <div id="PCD_HeaderSec6" style="display:flex; justify-content:space-between; align-items:center; padding:8px 10px; background:#f9fafb; cursor:pointer; font-weight:bold;">
          <span><span id="PCD_FlechaSec6">▸</span> 📋 Bandeja de Tareas (solo lectura)</span>
        </div>
        <div id="PCD_CuerpoSec6" style="display:none; padding:10px;">
          <label style="color:#6b7280; font-size:11px; font-weight:bold;">Cuenta</label>
          <div style="display:flex; gap:6px; margin:3px 0 6px;">
            <input id="PCD_TareasBuscarTexto" type="text" placeholder="🌐 Buscar cuenta por nombre o apellido" style="flex:1; padding:5px; border:1px solid #ccc; border-radius:4px; font-size:11px;">
            <button id="PCD_TareasBuscarBtn" style="padding:4px 10px; background:#2563eb; color:#fff; border:none; border-radius:4px; cursor:pointer; font-size:11px;">Buscar</button>
          </div>
          <select id="PCD_TareasCuenta" style="width:100%; padding:4px; border:1px solid #ccc; border-radius:4px; margin-bottom:6px; font-size:11px; box-sizing:border-box;">
            <option value="">⏳ Detectando tu sesión...</option>
          </select>
          <div style="display:flex; gap:4px; flex-wrap:wrap; margin-bottom:6px;">
            ${Object.entries(CD4_LISTAS).map(([clave, l]) => `<button class="cd4-btn-lista" data-lista="${clave}" style="padding:5px 9px; background:#e5e7eb; color:#111827; border:none; border-radius:4px; cursor:pointer; font-size:11px; font-weight:bold;">${l.etiqueta}</button>`).join('')}
          </div>
          <div style="display:flex; gap:6px; margin-bottom:6px;">
            <input id="PCD_TareasFiltro" type="text" placeholder="Filtrar por asunto, radicado, ID, persona..." style="flex:1; padding:5px; border:1px solid #ccc; border-radius:4px; font-size:11px;">
            <select id="PCD_TareasSalida" title="Filtrar por si el documento ya salió (tiene IDC)" style="display:none; padding:4px; border:1px solid #ccc; border-radius:4px; font-size:11px;">
              <option value="todas">Todas</option>
              <option value="salieron">✅ Con IDC (salieron)</option>
              <option value="pendientes">❌ Sin IDC (aún no salen)</option>
            </select>
            <button id="PCD_TareasExportar" style="padding:4px 10px; background:#374151; color:#fff; border:none; border-radius:4px; cursor:pointer; font-size:11px;">📥 Excel</button>
          </div>
          <div id="PCD_TareasEstado" style="font-size:11px; color:#6b7280; margin-bottom:6px;">Elige una lista para cargarla.</div>
          <div id="PCD_TareasTabla" style="max-height:340px; overflow:auto;"></div>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(cont);
  cd3HabilitarArrastre(cont, document.querySelector('#PCD_EncabezadoGeneral'));

  document.querySelector('#PCD_Cerrar').onclick = (e) => { e.stopPropagation(); cont.remove(); };
  document.querySelector('#PCD_Cerrar').addEventListener('mousedown', (e) => e.stopPropagation());

  const btnEscalaMenosPCD = document.querySelector('#PCD_EscalaMenos');
  const btnEscalaMasPCD = document.querySelector('#PCD_EscalaMas');
  btnEscalaMenosPCD.addEventListener('mousedown', (e) => e.stopPropagation());
  btnEscalaMasPCD.addEventListener('mousedown', (e) => e.stopPropagation());
  btnEscalaMenosPCD.onclick = () => cdAplicarEscala(-CD_ESCALA_PASO);
  btnEscalaMasPCD.onclick = () => cdAplicarEscala(CD_ESCALA_PASO);

  let minimizadoTodo = false;
  const btnMinTodo = document.querySelector('#PCD_MinimizarTodo');
  const cuerpoGeneral = document.querySelector('#PCD_CuerpoGeneral');
  btnMinTodo.addEventListener('mousedown', (e) => e.stopPropagation());
  btnMinTodo.onclick = () => {
    minimizadoTodo = !minimizadoTodo;
    cuerpoGeneral.style.display = minimizadoTodo ? 'none' : 'block';
    cont.style.width = minimizadoTodo ? '300px' : '650px';
    btnMinTodo.textContent = minimizadoTodo ? '🔼' : '➖';
  };

  document.querySelector('#PCD_HeaderSec1').onclick = () => cd3ToggleSeccion('#PCD_CuerpoSec1', '#PCD_FlechaSec1');
  document.querySelector('#PCD_HeaderSec2').onclick = () => cd3ToggleSeccion('#PCD_CuerpoSec2', '#PCD_FlechaSec2');
  document.querySelector('#PCD_HeaderComentarios').onclick = () => cd3ToggleSeccion('#PCD_CuerpoComentarios', '#PCD_FlechaComentarios');
  document.querySelector('#PCD_HeaderSec3').onclick = () => cd3ToggleSeccion('#PCD_CuerpoSec3', '#PCD_FlechaSec3');
  document.querySelector('#PCD_HeaderSec4').onclick = () => cd3ToggleSeccion('#PCD_CuerpoSec4', '#PCD_FlechaSec4');
  document.querySelector('#PCD_HeaderSec5').onclick = () => cd3ToggleSeccion('#PCD_CuerpoSec5', '#PCD_FlechaSec5');
  document.querySelector('#PCD_HeaderSec6').onclick = () => { cd3ToggleSeccion('#PCD_CuerpoSec6', '#PCD_FlechaSec6'); cd4PrepararCuentaPorDefecto(); };

  document.querySelector('#PCD_Clasificar').onclick = cd3EjecutarClasificacion;

  document.querySelector('#PCD_BandejaBuscar').onclick = cd3BuscarFuncionariosBandejaUI;
  document.querySelector('#PCD_BandejaBuscarGlobal').onclick = cd3BuscarFuncionariosGlobalUI;
  document.querySelector('#PCD_BandejaBuscarTexto').addEventListener('keydown', (e) => { if (e.key === 'Enter') cd3BuscarFuncionariosGlobalUI(); });
  document.querySelector('#PCD_BandejaFiltro').addEventListener('input', cd3PintarListaFuncionariosBandeja);
  document.querySelector('#PCD_BandejaFuncionario').onchange = (e) => cd3ElegirBandeja(Number(e.target.value));
  document.querySelector('#PCD_BandejaMia').onclick = () => cd3ElegirBandeja(0);
  cd3PintarListaFuncionariosBandeja();
  cd3ActualizarBannerBandeja();
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

  document.querySelector('#PCD_BuscarOficinaBtn').onclick = cd3BuscarOficinaUI;
  document.querySelector('#PCD_BuscarOficinaTexto').addEventListener('keydown', (e) => { if (e.key === 'Enter') cd3BuscarOficinaUI(); });
  document.querySelector('#PCD_ReasignarAdHoc').onclick = cd3ReasignarAdHoc;

  document.querySelectorAll('.cd4-btn-lista').forEach(b => { b.onclick = () => cd4CargarLista(b.dataset.lista); });
  document.querySelector('#PCD_TareasFiltro').addEventListener('input', cd4RenderizarTabla);
  document.querySelector('#PCD_TareasExportar').onclick = cd4ExportarExcel;
  document.querySelector('#PCD_TareasBuscarBtn').onclick = cd4BuscarCuentaUI;
  document.querySelector('#PCD_TareasBuscarTexto').addEventListener('keydown', (e) => { if (e.key === 'Enter') cd4BuscarCuentaUI(); });
  document.querySelector('#PCD_TareasSalida').addEventListener('change', cd4RenderizarTabla);
  document.querySelector('#PCD_TareasCuenta').onchange = (e) => {
    const idFuncionario = Number(e.target.value);
    const encontrada = [CD4_SESION, ...CD4_CUENTAS, ...CD4_RESULTADOS_CUENTA].filter(Boolean).find(c => c.idFuncionario === idFuncionario);
    CD4_CUENTA_SELECCIONADA = encontrada || null;
    CD4_FILAS = []; CD4_CARGADA = null; cd4RenderizarTabla();
    document.querySelector('#PCD_TareasEstado').textContent = 'Cuenta cambiada. Elige una lista para cargarla.';
  };

  document.querySelector('#PCD_ExportarBitacora').onclick = cdBitacoraExportarExcel;
  document.querySelector('#PCD_ContadorBitacora').textContent = `(${CD_BITACORA.length})`;

  document.querySelector('#PCD_ComentarioReasignacionLista').onchange = (e) => {
    if (e.target.value === '') return;
    document.querySelector('#PCD_ComentarioReasignacion').value = CD3_COMENTARIOS_REASIGNACION[Number(e.target.value)].texto;
    e.target.value = '';
  };
  document.querySelector('#PCD_ComentarioCierreLista').onchange = (e) => {
    if (e.target.value === '') return;
    document.querySelector('#PCD_ComentarioCierre').value = CD3_COMENTARIOS_CIERRE[Number(e.target.value)].texto;
    e.target.value = '';
  };
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
