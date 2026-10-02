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

  // ─── Nueva dependencia, agregada tal como pediste ───
  // Sin "palabras" todavía: aparece en el desplegable y se puede elegir a mano,
  // pero no se le va a predecir nada automático hasta que definas qué temas
  // le pertenecen. Agrégalas en el mismo formato de las demás (ej:
  // 'CANAL DIGITAL:1.5, PQRSDF VIRTUAL, CHATBOT').
  gestorCanales: {
    nombre: 'Grupo Gestor de Canales', idOficina: 98, idUnidad: 4, color: '#0d9488', emoji: '📡',
    palabras: '',
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
let CONCURRENCIA_MAXIMA = 25;

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
  cdWirearFiltroFlujo();
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

function cdColorPorEstadoFlujo(estadoFlujoRaw) {
  const estadoFlujo = (estadoFlujoRaw || '').toUpperCase().trim();
  if (estadoFlujo.includes('EXITOSA')) return { color: '#16a34a', fondo: '#dcfce7' };
  if (estadoFlujo === 'TRANSITO') return { color: '#2563eb', fondo: '#dbeafe' };
  if (estadoFlujo === 'SIN INICIAR TRAMITE' || !estadoFlujo) return { color: '#6b7280', fondo: '#f3f4f6' };
  return { color: '#92400e', fondo: '#fef3c7' };
}

function cdEstadoGlobal(pasoReciente, strEstadoDocumento) {
  const estadoFlujo = (pasoReciente?.ESTADOFLUJO || '').toUpperCase().trim();
  const c = cdColorPorEstadoFlujo(pasoReciente?.ESTADOFLUJO);
  if (estadoFlujo.includes('EXITOSA')) return { texto: 'Gestión exitosa', ...c };
  if (estadoFlujo === 'TRANSITO') return { texto: 'En tránsito', ...c };
  if (estadoFlujo === 'SIN INICIAR TRAMITE' || !estadoFlujo) return { texto: strEstadoDocumento || 'Sin tramitar', ...c };
  return { texto: estadoFlujo, ...c };
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
  cont.style.cssText = 'position:fixed; top:20px; right:20px; z-index:99999; background:#fff; border:1px solid #ccc; border-radius:10px; padding:14px; box-shadow:0 4px 18px rgba(0,0,0,0.25); width:460px; max-height:92vh; overflow:hidden; display:flex; flex-direction:column; font-family:sans-serif; font-size:13px;';
  cont.style.zoom = CD_ESCALA_UI;
  cont.innerHTML = `
    <div id="PSD_Encabezado" style="display:flex; justify-content:space-between; align-items:center; font-weight:bold; margin-bottom:10px; cursor:grab; user-select:none; flex-shrink:0;">
      <span>🔎 Seguimiento de Documento — ControlDoc</span>
      <div style="display:flex; align-items:center; gap:2px;">
        <button id="PSD_EscalaMenos" title="Reducir tamaño de la interfaz" style="background:none; border:none; font-size:14px; cursor:pointer; padding:2px 4px;">🔍➖</button>
        <span class="cd-escala-label" style="font-size:11px; color:#6b7280; min-width:34px; text-align:center;">${Math.round(CD_ESCALA_UI * 100)}%</span>
        <button id="PSD_EscalaMas" title="Aumentar tamaño de la interfaz" style="background:none; border:none; font-size:14px; cursor:pointer; padding:2px 4px;">🔍➕</button>
        <button id="PSD_Minimizar" title="Minimizar" style="background:none; border:none; font-size:16px; cursor:pointer; padding:2px 6px;">➖</button>
        <button id="PSD_Cerrar" title="Cerrar" style="background:none; border:none; color:#666; font-size:16px; font-weight:bold; cursor:pointer; padding:2px 6px;">✕</button>
      </div>
    </div>
    <div id="PSD_Cuerpo" style="flex:1; min-height:0; overflow-y:auto; padding-right:4px;">
      <div style="display:flex; gap:6px; margin-bottom:10px;">
        <input id="PSD_Input" type="text" placeholder="IDC (2306470) o Radicado" style="flex:1; padding:6px; border:1px solid #ccc; border-radius:6px;">
        <button id="PSD_Buscar" style="padding:6px 12px; background:#2563eb; color:#fff; border:none; border-radius:6px; cursor:pointer; font-weight:bold;">Buscar</button>
      </div>
      <div style="border:1px solid #e5e7eb; border-radius:8px; margin-bottom:10px; overflow:hidden;">
        <div id="PSD_HeaderHistorial" style="display:flex; justify-content:space-between; align-items:center; padding:6px 8px; background:#f9fafb; cursor:pointer; font-size:12px; font-weight:bold; border-left:4px solid #0369a1;">
          <span style="color:#0369a1;"><span id="PSD_FlechaHistorial">▸</span> 🕘 Historial de búsquedas</span>
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
  btnMin.addEventListener('mousedown', (e) => e.stopPropagation());
  btnMin.onclick = () => {
    minimizado = true;
    cont.style.display = 'none';
    cdCrearBurbujaMinimizada({
      contenedor: cont, emoji: '🔎', colorFondo: 'linear-gradient(135deg, #60a5fa, #38bdf8)', id: 'PSD_Burbuja',
      alRestaurar: () => { minimizado = false; cont.style.display = 'block'; },
    });
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
  document.addEventListener('mousemove', (e) => {
    if (!arrastrando) return;
    // Solo se limita el borde superior (no puede quedar por encima de la
    // ventana, donde perderías el agarre); por izquierda, derecha y abajo sí
    // puede salir, como pediste.
    const y = Math.max(e.clientY - offsetY, 0);
    contenedor.style.left = (e.clientX - offsetX) + 'px'; contenedor.style.top = y + 'px';
  });
  document.addEventListener('mouseup', () => { arrastrando = false; });
}

// ── Burbuja de minimizado ──
// En vez de solo achicar el panel, lo oculta por completo y deja esta bolita
// flotante y arrastrable en su lugar (mismo límite de arrastre: no se puede
// ir por encima de la ventana). Un clic simple (sin arrastrar) la quita y
// vuelve a mostrar el panel; arrastrarla la mueve sin restaurar nada.
function cdCrearBurbujaMinimizada({ contenedor, emoji, colorFondo, id, alRestaurar }) {
  document.querySelector('#' + id)?.remove();
  const rect = contenedor.getBoundingClientRect();
  const burbuja = document.createElement('div');
  burbuja.id = id;
  burbuja.title = 'Clic para expandir — arrástrala para moverla';
  burbuja.style.cssText = `position:fixed; top:${Math.max(rect.top, 0)}px; left:${Math.max(rect.left, 0)}px; width:48px; height:48px; border-radius:50%; background:${colorFondo}; color:#fff; display:flex; align-items:center; justify-content:center; font-size:22px; box-shadow:0 4px 14px rgba(0,0,0,0.35); cursor:grab; z-index:100000; user-select:none;`;
  burbuja.textContent = emoji;
  document.body.appendChild(burbuja);

  let arrastrando = false, offsetX = 0, offsetY = 0, movioBastante = false, startX = 0, startY = 0;

  const alMoverMouse = (e) => {
    if (!arrastrando) return;
    if (Math.abs(e.clientX - startX) > 4 || Math.abs(e.clientY - startY) > 4) movioBastante = true;
    const y = Math.max(e.clientY - offsetY, 0); // igual que los paneles: nunca por encima de la ventana
    burbuja.style.left = (e.clientX - offsetX) + 'px';
    burbuja.style.top = y + 'px';
  };
  const alSoltarMouse = () => {
    if (!arrastrando) return;
    arrastrando = false;
    burbuja.style.cursor = 'grab';
    if (!movioBastante) {
      document.removeEventListener('mousemove', alMoverMouse);
      document.removeEventListener('mouseup', alSoltarMouse);
      burbuja.remove();
      alRestaurar();
    }
  };
  burbuja.addEventListener('mousedown', (e) => {
    e.preventDefault();
    arrastrando = true; movioBastante = false;
    startX = e.clientX; startY = e.clientY;
    const r = burbuja.getBoundingClientRect();
    offsetX = e.clientX - r.left; offsetY = e.clientY - r.top;
    burbuja.style.cursor = 'grabbing';
  });
  document.addEventListener('mousemove', alMoverMouse);
  document.addEventListener('mouseup', alSoltarMouse);
  return burbuja;
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
    cdWirearFiltroFlujo();
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

// Cada paso del historial, ya en orden cronológico (el más viejo primero),
// como un punto en una línea de tiempo vertical — con color según su estado,
// para que el ojo distinga de un vistazo qué pasos fueron gestión exitosa,
// cuáles quedaron en tránsito, etc., en vez de leer un bloque de texto plano.
function cdFilaTimelineFlujo(x, i, total) {
  const c = cdColorPorEstadoFlujo(x.ESTADOFLUJO);
  const esActual = i === total - 1; // el último en orden cronológico = el paso más reciente
  const buscar = cd3Normalizar(`${cdLimpiarHTML(x.USUARIOASIGNO)} ${cdLimpiarHTML(x.GESTORNOMBRESAPELLIDOS)} ${x.ESTADOFLUJO || ''} ${x.ACCION || ''}`);
  return `
    <div class="psd-paso-flujo" data-buscar="${cdEscaparHtml(buscar)}" style="display:flex; gap:8px;">
      <div style="display:flex; flex-direction:column; align-items:center; flex-shrink:0; width:14px;">
        <div style="width:10px; height:10px; border-radius:50%; background:${c.color}; margin-top:4px; flex-shrink:0; ${esActual ? `box-shadow:0 0 0 3px ${c.fondo};` : ''}"></div>
        ${i < total - 1 ? `<div style="flex:1; width:2px; background:#e5e7eb; margin-top:2px;"></div>` : ''}
      </div>
      <div style="flex:1; padding-bottom:12px; font-size:11px; min-width:0;">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:4px;">
          <span style="color:#9ca3af;">Paso #${x.ORDEN ?? (i + 1)}${esActual ? ' — <b style="color:#111827;">ACTUAL</b>' : ''}</span>
          <span style="padding:1px 7px; border-radius:10px; background:${c.fondo}; color:${c.color}; font-weight:bold; font-size:10px; white-space:nowrap;">${x.ESTADOFLUJO || '—'}</span>
        </div>
        <div style="margin-top:3px;">${cdFormatearPersona(x.USUARIOASIGNO)} <span style="color:#9ca3af;">→</span> ${cdFormatearPersona(x.GESTORNOMBRESAPELLIDOS)}</div>
        <div style="color:#9ca3af; font-size:10px; margin-top:2px;">${cdParseAspDate(x.FECHAASIGNO)}${x.ACCION ? ' · ' + x.ACCION : ''}</div>
        ${x.COMENTARIO ? `<div style="background:#f9fafb; border-left:2px solid ${c.color}; padding:4px 6px; border-radius:4px; margin-top:4px; color:#4b5563; font-size:10.5px;">${x.COMENTARIO}</div>` : ''}
      </div>
    </div>`;
}

// El filtro de la línea de tiempo se conecta aparte (cdWirearFiltroFlujo),
// justo después de insertar este HTML en el panel.
function cdPlantillaFlujo(pasos) {
  if (!pasos.length) return '<i>Sin información de flujo.</i>';
  const p = pasos[0]; // el más reciente: define el resumen de arriba
  const cActual = cdColorPorEstadoFlujo(p.ESTADOFLUJO);
  const cronologico = pasos.slice().reverse(); // de más viejo a más nuevo, como una historia
  return `
    <div style="display:flex; gap:10px; margin-bottom:6px;">
      <div style="flex:1;"><div style="color:#6b7280; font-size:11px;">ENVIADO POR</div>${cdFormatearPersona(p.USUARIOASIGNO)}
        <div style="color:#6b7280; font-size:11px; margin-top:2px;">${cdParseAspDate(p.FECHAASIGNO)}</div></div>
      <div style="align-self:center; color:#9ca3af; font-size:18px;">→</div>
      <div style="flex:1;"><div style="color:#6b7280; font-size:11px;">RECIBIDO POR</div>${cdFormatearPersona(p.GESTORNOMBRESAPELLIDOS)}</div>
    </div>
    <div style="display:flex; align-items:center; gap:8px; margin-top:4px; flex-wrap:wrap;">
      <span style="color:#6b7280; font-size:11px;">Estado del flujo:</span>
      <span style="padding:2px 9px; border-radius:10px; background:${cActual.fondo}; color:${cActual.color}; font-weight:bold; font-size:11px;">${p.ESTADOFLUJO || '—'}</span>
      ${p.ACCION ? `<span style="color:#6b7280; font-size:11px;">· ${p.ACCION}</span>` : ''}
    </div>
    <div style="background:#eff6ff; border-left:3px solid #2563eb; padding:6px 8px; border-radius:4px; margin-top:6px;">${p.COMENTARIO || '—'}</div>

    <details style="margin-top:10px;">
      <summary style="cursor:pointer; color:#2563eb; font-weight:bold;">📜 Línea de tiempo completa (${pasos.length} paso${pasos.length === 1 ? '' : 's'})</summary>
      ${pasos.length > 4 ? `<input id="PSD_FiltroFlujo" type="text" placeholder="🔎 Filtrar por nombre o estado..." style="width:100%; padding:5px; border:1px solid #ccc; border-radius:4px; margin:8px 0; font-size:11px; box-sizing:border-box;">` : ''}
      <div id="PSD_TimelineFlujo" style="margin-top:8px;">
        ${cronologico.map((x, i) => cdFilaTimelineFlujo(x, i, cronologico.length)).join('')}
      </div>
    </details>
  `;
}

// Conecta el filtro de texto de la línea de tiempo (si el flujo tiene más de
// 4 pasos, que es cuando aparece el cuadro). Se llama justo después de pintar
// #PSD_Flujo, tanto al buscar en vivo como al cargar desde el historial.
function cdWirearFiltroFlujo() {
  const input = document.querySelector('#PSD_FiltroFlujo');
  if (!input) return;
  input.addEventListener('input', () => {
    const q = cd3Normalizar(input.value.trim());
    document.querySelectorAll('.psd-paso-flujo').forEach(el => {
      el.style.display = (!q || (el.dataset.buscar || '').includes(q)) ? 'flex' : 'none';
    });
  });
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
// Reasigna a VARIOS destinos ya resueltos ({ idOficina, idUnidad, nombre })
// en un solo POST — igual mecanismo que "Agregar Todos" en el buscador de
// usuarios nativo. La usan tanto cd2ReasignarDocumentoMultiple (destinos de
// CONFIG_DEPENDENCIAS) como el buscador ad-hoc (destinos encontrados al vuelo).
async function cd2ReasignarADestinos(idDocumento, destinosResueltos, comentario) {
  for (const d of destinosResueltos) {
    if (d.idOficina == null) throw new Error(`Falta idOficina para "${d.nombre}".`);
  }
  const registro = await cd2BuscarEnBandeja(idDocumento);

  const destinos = [];
  for (const d of destinosResueltos) {
    const jefe = await cd2ObtenerJefe(d.idOficina, d.idUnidad);
    destinos.push({ d, jefe });
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
    destinos: destinos.map(({ d, jefe }) => ({ nombre: d.nombre, jefe: jefe.NOMBRESAPELLIDOS })),
    resultado: data, validaciones, movioBandeja,
  };
}

async function cd2ReasignarDocumentoMultiple(idDocumento, clavesSubdirecciones, comentario) {
  const subs = clavesSubdirecciones.map(clave => {
    const sub = CD2_SUBDIRECCIONES[clave];
    if (!sub) throw new Error('Subdirección no reconocida: ' + clave);
    if (sub.idOficina == null) {
      throw new Error(`Falta configurar "idOficina" para "${sub.nombre}" en CONFIG_DEPENDENCIAS.`);
    }
    return sub;
  });
  return cd2ReasignarADestinos(idDocumento, subs, comentario);
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
let CD3_ORDEN_ACTUAL = 'original'; // original | rad-asc | rad-desc | asig-asc | asig-desc
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
    cd3CambiarTab('resultados');
  } else {
    CD3_DOCUMENTOS = pendientes.map(doc => {
      const { prediccion, esPriorizacion, confianza } = cd3ClasificarDocumento(doc);
      return {
        idc: doc.IDDOCUMENTO, radicado: doc.RADICADO, asunto: doc.DESCRIPCION || '(sin descripción)',
        // Ambas fechas vienen en el mismo registro de la bandeja: no hace falta pedirlas aparte.
        fechaAsignacion: cdParseAspDate(doc.FECHAASIGNO), fechaRadicacion: cdParseAspDate(doc.FECHARADICO),
        fechaAsignacionMs: cd3FechaMs(doc.FECHAASIGNO), fechaRadicacionMs: cd3FechaMs(doc.FECHARADICO),
        prediccion, esPriorizacion, confianza, manual: prediccion, estadoEnvio: null, mensajeEstado: '',
      };
    });
    CD3_FILA_SELECCIONADA = null;
    estado.textContent = `✅ ${CD3_DOCUMENTOS.length} documento(s) clasificado(s)${sufijoBandeja}.`;
    cd3RenderizarResultados();
    cd3CargarUltimoFlujoEnSegundoPlano();
    cd3CambiarTab('resultados');
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
  }, 1000);
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
  document.querySelectorAll('#PCD_TablaResultados .cd3-fila-doc[data-fila-idx]').forEach(el => {
    const idx = Number(el.dataset.filaIdx);
    if (idx === CD3_FILA_SELECCIONADA) { el.style.background = '#dbeafe'; el.style.boxShadow = 'inset 3px 0 0 #2563eb'; }
    else { el.style.background = '#fff'; el.style.boxShadow = ''; }
  });
}

// ── "Ver en Seguimiento" (mejora 2): abre/reutiliza el panel de Seguimiento
// de Documento y ejecuta ahí la misma búsqueda que si escribieras el IDC a
// mano — ficha, flujo y registro en el historial, tal cual.
function cd3AsegurarPanelSeguimiento() {
  if (!document.querySelector('#PanelSeguimientoDoc')) cdCrearPanel();
}

async function cd3VerEnSeguimiento(idc) {
  cd3AsegurarPanelSeguimiento();
  const input = document.querySelector('#PSD_Input');
  input.value = String(idc);
  await cdEjecutarBusqueda();
}

// Descarga el PDF y los adjuntos del documento JUNTOS en un solo .zip. El zip
// de adjuntos que arma ControlDoc no se descomprime (evita depender de una
// librería de inflate): se incluye tal cual como un archivo más dentro del
// zip final, junto al PDF — al abrirlo verás el PDF suelto y, si había
// adjuntos, un segundo archivo "Adjuntos_<idc>.zip" con ellos adentro.
async function cd3DescargarPdfYAdjuntosZip(idDocumento) {
  const pdfBlobUrl = await cdObtenerPdfBlobUrl(idDocumento);
  if (!pdfBlobUrl) { alert('No se encontró un PDF válido para este documento.'); return; }
  const pdfBytes = new Uint8Array(await (await fetch(pdfBlobUrl)).arrayBuffer());
  URL.revokeObjectURL(pdfBlobUrl);

  let adjuntosBytes = null;
  try {
    const resp = await cdFetchPost(CD_CONFIG.urlGuardarZip, { IDDOCUMENTO: idDocumento, DILIGENCIADOS: 'NO' });
    const data = await resp.json();
    if (data && data.RESPUESTA === true && data.VALORESPUESTA) {
      const valor = data.VALORESPUESTA;
      if (typeof valor === 'string' && valor.startsWith('http')) {
        const r2 = await fetch(valor, { credentials: 'same-origin' });
        if (r2.ok) adjuntosBytes = new Uint8Array(await (await r2.blob()).arrayBuffer());
      } else if (typeof valor === 'string') {
        try {
          const bin = atob(cdSanitizarBase64(valor));
          adjuntosBytes = new Uint8Array(bin.length);
          for (let i = 0; i < bin.length; i++) adjuntosBytes[i] = bin.charCodeAt(i);
        } catch (e) { /* no era base64 válido: se descarga solo el PDF */ }
      }
    }
  } catch (e) {
    console.warn('[CD3] No se pudo obtener el zip de adjuntos, se descargará solo el PDF:', e.message);
  }

  const archivos = [{ nombre: `Documento_${idDocumento}.pdf`, bytes: pdfBytes }];
  if (adjuntosBytes && adjuntosBytes.length) archivos.push({ nombre: `Adjuntos_${idDocumento}.zip`, bytes: adjuntosBytes });

  cd4DescargarBlob(cd4CrearZip(archivos), `Documento_${idDocumento}_completo.zip`);
}

// ── Último paso del flujo por documento (mejora 3): quién te lo remitió de
// verdad. La bandeja de pendientes no lo trae (esos campos llegan vacíos
// mientras el documento sigue sin tramitar), así que se pide aparte con el
// mismo endpoint del panel de Seguimiento — en segundo plano, con poca
// concurrencia, sin bloquear el resto del panel.
const CD3_CONCURRENCIA_FLUJO = 5;

async function cd3CargarUltimoFlujoEnSegundoPlano() {
  const pendientes = CD3_DOCUMENTOS.filter(d => d.ultimoFlujo === undefined);
  await ejecutarConPool(pendientes, CD3_CONCURRENCIA_FLUJO, async (doc) => {
    doc.ultimoFlujo = 'cargando';
    try {
      const pasos = await cdObtenerFlujo(doc.idc, doc.radicado);
      doc.ultimoFlujo = pasos[0] || null;
    } catch (e) {
      doc.ultimoFlujo = 'error';
    }
    const cont = document.querySelector(`#cd3-flujo-${doc.idc}`);
    if (cont) cont.innerHTML = cd3RenderizarFlujoCompacto(doc.ultimoFlujo);
  });
}

function cd3RenderizarFlujoCompacto(paso) {
  if (paso === 'cargando' || paso === undefined) return '<span style="color:#9ca3af;">⏳ Cargando último flujo…</span>';
  if (paso === 'error') return '<span style="color:#dc2626;">❌ No se pudo cargar el flujo.</span>';
  if (!paso) return '<span style="color:#9ca3af;">Sin información de flujo.</span>';
  return `
    <div style="display:flex; gap:10px;">
      <div style="flex:1; min-width:0;"><div style="color:#6b7280; font-size:10px;">ENVIADO POR</div>${cdFormatearPersona(paso.USUARIOASIGNO)}</div>
      <div style="align-self:center; color:#9ca3af;">→</div>
      <div style="flex:1; min-width:0;"><div style="color:#6b7280; font-size:10px;">RECIBIDO POR</div>${cdFormatearPersona(paso.GESTORNOMBRESAPELLIDOS)}</div>
    </div>
    <div style="color:#6b7280; font-size:10px; margin-top:4px;">Estado del flujo: <b>${paso.ESTADOFLUJO || '—'}</b> · ${cdParseAspDate(paso.FECHAASIGNO)}</div>
    <div style="background:#eff6ff; border-left:3px solid #2563eb; padding:5px 7px; border-radius:4px; margin-top:5px; font-size:11px; color:#111827;">
      <span style="color:#6b7280; font-size:10px;">Observaciones:</span> ${paso.COMENTARIO ? cdEscaparHtml(paso.COMENTARIO) : '—'}
    </div>
  `;
}

// Convierte "/Date(1758000000000)/" (o una fecha legible) a milisegundos;
// null si no trae fecha válida (esos documentos quedan al final al ordenar).
function cd3FechaMs(valor) {
  if (!valor) return null;
  const m = /\/Date\((-?\d+)\)\//.exec(String(valor));
  const ms = m ? parseInt(m[1], 10) : Date.parse(valor);
  return Number.isFinite(ms) && ms > 0 ? ms : null;
}

const CD3_ORDENES = {
  'original':  { etiqueta: '↕️ Orden de la bandeja (sin ordenar)' },
  'rad-asc':   { etiqueta: '📅 Radicación: más antigua primero',  campo: 'fechaRadicacionMs', dir: 1 },
  'rad-desc':  { etiqueta: '📅 Radicación: más reciente primero', campo: 'fechaRadicacionMs', dir: -1 },
  'asig-asc':  { etiqueta: '📤 Asignación: más antigua primero',  campo: 'fechaAsignacionMs', dir: 1 },
  'asig-desc': { etiqueta: '📤 Asignación: más reciente primero', campo: 'fechaAsignacionMs', dir: -1 },
};

function cd3Ordenar(lista) {
  const o = CD3_ORDENES[CD3_ORDEN_ACTUAL];
  if (!o || !o.campo) return lista;
  return lista.slice().sort((a, b) => {
    const va = a[o.campo], vb = b[o.campo];
    if (va == null && vb == null) return 0;
    if (va == null) return 1;   // sin fecha, siempre al final
    if (vb == null) return -1;
    return (va - vb) * o.dir;
  });
}

// Aplica el filtro de categoría + terminación de radicado. La usan tanto el
// render de las tarjetas como el botón de "copiar los primeros N IDC".
function cd3ObtenerFiltrados() {
  let documentosFiltrados = CD3_DOCUMENTOS;
  if (CD3_FILTRO_ACTUAL === 'con-prediccion') documentosFiltrados = CD3_DOCUMENTOS.filter(d => !!d.manual);
  else if (CD3_FILTRO_ACTUAL === 'sin-prediccion') documentosFiltrados = CD3_DOCUMENTOS.filter(d => !d.manual);
  else if (CD3_FILTRO_ACTUAL === 'priorizacion') documentosFiltrados = CD3_DOCUMENTOS.filter(d => d.esPriorizacion);
  else if (CD3_FILTRO_ACTUAL === 'baja-confianza') documentosFiltrados = CD3_DOCUMENTOS.filter(d => d.confianza === 'baja');
  else if (CD3_SUBDIRECCIONES[CD3_FILTRO_ACTUAL]) documentosFiltrados = CD3_DOCUMENTOS.filter(d => d.manual === CD3_FILTRO_ACTUAL);

  // Filtro adicional por terminación del radicado (se suma al de arriba, no lo
  // reemplaza): "1,2,3" muestra solo los que terminan en esos dígitos.
  const terminaciones = (document.querySelector('#PCD_FiltroRadicadoTerminacion')?.value || '')
    .split(/[,\s]+/).map(t => t.trim()).filter(Boolean);
  if (terminaciones.length) {
    documentosFiltrados = documentosFiltrados.filter(d => terminaciones.some(t => String(d.radicado || '').endsWith(t)));
  }

  // Excluir IDC puntuales (se resta al final, sobre lo que haya quedado de los
  // filtros de arriba): los que pongas aquí nunca se muestran.
  const excluidos = new Set(
    (document.querySelector('#PCD_ExcluirIdc')?.value || '')
      .split(/[,\s]+/).map(t => t.trim()).filter(Boolean)
  );
  if (excluidos.size) {
    documentosFiltrados = documentosFiltrados.filter(d => !excluidos.has(String(d.idc)));
  }
  return cd3Ordenar(documentosFiltrados);
}

// Copia los primeros N IDC de la vista filtrada actual (cualquiera que sea el
// filtro activo), uno por línea — listos para pegar en "⬇️ Descargas".
function cd3CopiarPrimerosIdc(n) {
  const estado = document.querySelector('#PCD_CopiarPrimerosEstado');
  const filtrados = cd3ObtenerFiltrados();
  if (!filtrados.length) { estado.textContent = 'No hay documentos en la vista filtrada actual.'; estado.style.color = '#dc2626'; return; }
  const tomados = filtrados.slice(0, n);
  cdCopiarTexto(tomados.map(d => d.idc).join('\n'));
  estado.style.color = '#16a34a';
  estado.textContent = tomados.length < n
    ? `✅ Copiados ${tomados.length} IDC (la vista filtrada solo tenía ${tomados.length}).`
    : `✅ Copiados los primeros ${tomados.length} IDC de la vista filtrada.`;
}

function cd3RenderizarResultados() {
  const cont = document.querySelector('#PCD_TablaResultados');
  const contador = document.querySelector('#PCD_ContadorResultados');
  if (!CD3_DOCUMENTOS.length) {
    cont.innerHTML = '<div style="color:#9ca3af; font-size:12px; padding:10px 0;">Aún no hay documentos clasificados.</div>';
    contador.textContent = '';
    return;
  }

  const documentosFiltrados = cd3ObtenerFiltrados();

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
    const exito = d.estadoEnvio === 'ok';
    const enviando = d.estadoEnvio === 'enviando';
    const soloLectura = CD3_BANDEJA_CARGADA.idFuncionario !== 0;
    const tituloBloqueo = 'Solo lectura: estás viendo la bandeja de otro funcionario';
    const tituloEnviando = 'Hay una acción en curso sobre este documento: espera a que termine.';
    const accionBtn = 'padding:7px 11px; font-size:12px; border:none; border-radius:5px; cursor:pointer; font-weight:600;';
    // Prioridad del color de la tarjeta: éxito (verde) > en proceso (naranja) > seleccionada (azul) > normal.
    const estiloTarjeta = exito
      ? 'background:#dcfce7; box-shadow:inset 3px 0 0 #16a34a; transition:background 0.3s;'
      : enviando
        ? 'background:#ffedd5; box-shadow:inset 3px 0 0 #f97316;'
        : (seleccionada ? 'background:#dbeafe; box-shadow:inset 3px 0 0 #2563eb;' : 'background:#fff;');
    // Mientras se está reasignando/cerrando, se bloquean todos los controles
    // de la tarjeta para evitar una segunda acción sobre el mismo documento.
    const btnAux = (extra = '') => `padding:3px 7px; font-size:11px; border:none; border-radius:4px; ${enviando ? 'cursor:not-allowed; opacity:0.5;' : 'cursor:pointer;'} ${extra}`;
    return `
    <div data-fila-idx="${i}" class="cd3-fila-doc" style="border:1px solid #e5e7eb; border-radius:8px; padding:10px; margin-bottom:8px; cursor:pointer; ${estiloTarjeta}">
      <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:8px; flex-wrap:wrap;">
        <div>
          <div style="font-weight:bold; font-size:14px;">IDC ${d.idc}${d.esPriorizacion ? ' <span title="Priorizaciones y Control Político">🏛️</span>' : ''}</div>
          <div style="color:#6b7280; font-size:11px; font-weight:normal; margin-top:1px;">Radicado: ${d.radicado ? cdEscaparHtml(String(d.radicado)) : '—'}</div>
        </div>
        <div style="display:flex; align-items:center; gap:4px;">
          <label style="color:#6b7280; font-size:10px; font-weight:normal;">Predicción</label>
          <select data-idx="${i}" class="cd3-select-sub" style="font-size:11px; padding:3px; min-width:180px;" ${enviando ? 'disabled' : ''}>
            <option value="">— Sin predicción —</option>${opcionesSelect}
          </select>
          ${d.confianza === 'baja' ? '<span title="Predicción de baja confianza: revisa manualmente" style="color:#d97706;">⚠️</span>' : ''}
        </div>
      </div>

      <div style="margin-top:6px; font-size:12px; word-break:break-word;">${d.asunto}</div>
      <div style="color:#dc2626; font-size:12px; font-weight:bold; margin-top:5px; line-height:1.6;">
        📅 Radicación: ${d.fechaRadicacion || '—'} &nbsp;·&nbsp; 📤 Asignación (remitido): ${d.fechaAsignacion || '—'}
      </div>

      <div style="display:flex; flex-wrap:wrap; gap:4px; margin-top:6px;">
        <button data-idx="${i}" data-copiar="idc" class="cd3-btn-copiar" title="Copiar IDC" style="${btnAux('background:#e5e7eb;')}" ${enviando ? 'disabled' : ''}>📋 IDC</button>
        <button data-idx="${i}" data-copiar="radicado" class="cd3-btn-copiar" title="Copiar Radicado" style="${btnAux('background:#e5e7eb;')}" ${enviando ? 'disabled' : ''}>📋 Rad</button>
        <button data-idx="${i}" data-copiar="asunto" class="cd3-btn-copiar" title="Copiar Asunto" style="${btnAux('background:#e5e7eb;')}" ${enviando ? 'disabled' : ''}>📋 Asu</button>
        <button data-idx="${i}" class="cd3-btn-descargar-pdf-solo" title="${enviando ? tituloEnviando : 'Descargar solo el PDF del documento'}" style="${btnAux('background:#e0e7ff; color:#3730a3;')}" ${enviando ? 'disabled' : ''}>⬇ PDF</button>
        <button data-idx="${i}" class="cd3-btn-descargar-todo-zip" title="${enviando ? tituloEnviando : 'Descargar el PDF + los adjuntos, juntos en un solo .zip'}" style="${btnAux('background:#e0e7ff; color:#3730a3;')}" ${enviando ? 'disabled' : ''}>📦 ZIP (PDF+Adj.)</button>
      </div>

      <div style="display:flex; flex-wrap:wrap; gap:6px; margin-top:8px; align-items:center;">
        <button data-idx="${i}" class="cd3-btn-preview" title="${enviando ? tituloEnviando : 'Previsualizar el PDF en una pestaña nueva'}" style="${accionBtn} background:#e5e7eb; ${enviando ? 'cursor:not-allowed; opacity:0.5;' : ''}" ${enviando ? 'disabled' : ''}>👁 Ver PDF</button>
        <button data-idx="${i}" class="cd3-btn-ver-seguimiento" title="${enviando ? tituloEnviando : 'Ver ficha y flujo completos en el panel de Seguimiento (se guarda en su historial)'}" style="${accionBtn} background:#2563eb; color:#fff; ${enviando ? 'cursor:not-allowed; opacity:0.5;' : ''}" ${enviando ? 'disabled' : ''}>🔎 Ver Seguimiento</button>
        <button data-idx="${i}" class="cd3-btn-adjuntos" title="${enviando ? tituloEnviando : 'Descargar Adjuntos'}" style="${accionBtn} background:#e5e7eb; ${enviando ? 'cursor:not-allowed; opacity:0.5;' : ''}" ${enviando ? 'disabled' : ''}>📎 Adjuntos</button>
        <button data-idx="${i}" class="cd3-btn-reasignar" title="${enviando ? tituloEnviando : (soloLectura ? tituloBloqueo : 'Reasignar')}" style="${accionBtn} background:#111827; color:#fff; cursor:${(soloLectura || enviando) ? 'not-allowed' : 'pointer'}; ${(soloLectura || enviando) ? 'opacity:0.4;' : ''}" ${(!d.manual || soloLectura || enviando) ? 'disabled' : ''}>🚀 Reasignar</button>
        <button data-idx="${i}" class="cd3-btn-cerrar" title="${enviando ? tituloEnviando : (soloLectura ? tituloBloqueo : 'Cerrar por comentario (comunicación informativa)')}" style="${accionBtn} background:#0d9488; color:#fff; cursor:${(soloLectura || enviando) ? 'not-allowed' : 'pointer'}; ${(soloLectura || enviando) ? 'opacity:0.4;' : ''}" ${(soloLectura || enviando) ? 'disabled' : ''}>🗂️ Cerrar</button>
        <button data-idx="${i}" class="cd3-btn-buscar-destino" title="${enviando ? tituloEnviando : 'Abrir la pestaña 🔎 Buscar con este IDC ya listo, para reasignarlo a una dependencia fuera de tu lista'}" style="${accionBtn} background:#7c3aed; color:#fff; ${enviando ? 'cursor:not-allowed; opacity:0.5;' : ''}" ${enviando ? 'disabled' : ''}>🔎 Buscar destino</button>
        <span title="${d.mensajeEstado || ''}" style="font-size:14px;">${iconoEstado}</span>
      </div>

      <div id="cd3-flujo-${d.idc}" style="margin-top:8px; padding:6px 8px; background:#f9fafb; border-radius:6px; font-size:11px;">${cd3RenderizarFlujoCompacto(d.ultimoFlujo)}</div>
    </div>`;
  }).join('');

  cont.innerHTML = filas;

  // Resaltar la tarjeta al hacer clic en ella (excepto sobre el <select>, que
  // ya se resalta solo al cambiar de predicción, para no cerrarle el
  // desplegable nativo a medio elegir).
  cont.querySelectorAll('.cd3-fila-doc[data-fila-idx]').forEach(el => {
    el.addEventListener('click', (e) => {
      if (e.target.tagName === 'SELECT') return;
      CD3_FILA_SELECCIONADA = Number(el.dataset.filaIdx);
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

  cont.querySelectorAll('.cd3-btn-descargar-pdf-solo').forEach(btn => {
    btn.addEventListener('mousedown', (e) => e.stopPropagation());
    btn.onclick = async (e) => {
      e.stopPropagation();
      const doc = CD3_DOCUMENTOS[Number(btn.dataset.idx)];
      const original = btn.textContent; btn.textContent = '⏳'; btn.disabled = true;
      try { await cdDescargarPdf(doc.idc); }
      catch (err) { alert('No se pudo descargar el PDF: ' + err.message); }
      finally { btn.textContent = original; btn.disabled = false; }
    };
  });

  cont.querySelectorAll('.cd3-btn-descargar-todo-zip').forEach(btn => {
    btn.addEventListener('mousedown', (e) => e.stopPropagation());
    btn.onclick = async (e) => {
      e.stopPropagation();
      const doc = CD3_DOCUMENTOS[Number(btn.dataset.idx)];
      const original = btn.textContent; btn.textContent = '⏳ Armando ZIP…'; btn.disabled = true;
      try { await cd3DescargarPdfYAdjuntosZip(doc.idc); }
      catch (err) { alert('No se pudo generar el ZIP: ' + err.message); }
      finally { btn.textContent = original; btn.disabled = false; }
    };
  });

  cont.querySelectorAll('.cd3-btn-buscar-destino').forEach(btn => {
    btn.onclick = () => {
      const idx = Number(btn.dataset.idx);
      CD3_FILA_SELECCIONADA = idx; cd3AplicarResaltado();
      const doc = CD3_DOCUMENTOS[idx];
      cd3CambiarTab('buscador');
      const campo = document.querySelector('#PCD_DestinoAdHocIds');
      if (campo && !campo.value.split(/[\n,;]+/).map(s => s.trim()).includes(String(doc.idc))) {
        campo.value = campo.value.trim() ? campo.value.trim() + '\n' + doc.idc : String(doc.idc);
      }
      document.querySelector('#PCD_BuscarOficinaTexto')?.focus();
    };
  });

  cont.querySelectorAll('.cd3-btn-preview').forEach(btn => {
    btn.onclick = async () => {
      const idx = Number(btn.dataset.idx);
      CD3_FILA_SELECCIONADA = idx; cd3AplicarResaltado();
      const doc = CD3_DOCUMENTOS[idx];
      const original = btn.textContent;
      btn.textContent = '⏳ Abriendo…'; btn.disabled = true;
      try { await cdPrevisualizarPdf(doc.idc); }
      catch (e) { alert('No se pudo previsualizar el PDF: ' + e.message); }
      finally { btn.textContent = original; btn.disabled = false; }
    };
  });

  cont.querySelectorAll('.cd3-btn-ver-seguimiento').forEach(btn => {
    btn.onclick = async () => {
      const idx = Number(btn.dataset.idx);
      CD3_FILA_SELECCIONADA = idx; cd3AplicarResaltado();
      const doc = CD3_DOCUMENTOS[idx];
      const original = btn.textContent;
      btn.textContent = '⏳ Cargando…'; btn.disabled = true;
      try { await cd3VerEnSeguimiento(doc.idc); }
      finally { btn.textContent = original; btn.disabled = false; }
    };
  });

  cont.querySelectorAll('.cd3-btn-adjuntos').forEach(btn => {
    btn.onclick = async () => {
      const idx = Number(btn.dataset.idx);
      CD3_FILA_SELECCIONADA = idx; cd3AplicarResaltado();
      const doc = CD3_DOCUMENTOS[idx];
      const original = btn.textContent;
      btn.textContent = '⏳ Descargando…'; btn.disabled = true;
      try { await cdDescargarAdjuntos(doc.idc); }
      catch (e) { alert('No se pudieron descargar los adjuntos: ' + e.message); }
      finally { btn.textContent = original; btn.disabled = false; }
    };
  });

  cont.querySelectorAll('.cd3-btn-reasignar').forEach(btn => {
    btn.onclick = async () => {
      const idx = Number(btn.dataset.idx);
      CD3_FILA_SELECCIONADA = idx; cd3AplicarResaltado();
      const doc = CD3_DOCUMENTOS[idx];
      if (!doc.manual) return;
      const sub = CD2_SUBDIRECCIONES[doc.manual];
      const comentarioPorDefecto = document.querySelector('#PCD_ComentarioReasignacion')?.value.trim() || CD2_COMENTARIO_REASIGNACION_DEFAULT;
      const jefe = await cd2ObtenerJefe(sub.idOficina, sub.idUnidad).catch(() => null);
      const nombreJefe = jefe ? jefe.NOMBRESAPELLIDOS : '(jefe no identificado)';
      const comentarioEditado = prompt(`Reasignar el IDC ${doc.idc} a "${sub.nombre}".\nJefe destino: ${nombreJefe}\n\nPuedes editar el comentario antes de confirmar:`, comentarioPorDefecto);
      if (comentarioEditado === null) return; // canceló
      const comentario = comentarioEditado.trim();
      if (!comentario) return alert('El comentario no puede quedar vacío.');
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
      const comentarioPorDefecto = document.querySelector('#PCD_ComentarioCierre')?.value.trim() || CD2_COMENTARIO_CIERRE_DEFAULT;
      const comentarioEditado = prompt(`Cerrar el IDC ${doc.idc} por comentario (comunicación informativa).\n\nPuedes editar el texto antes de confirmar:`, comentarioPorDefecto);
      if (comentarioEditado === null) return; // canceló
      const comentario = comentarioEditado.trim();
      if (!comentario) return alert('El comentario no puede quedar vacío.');
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
  const comentarioPorDefecto = document.querySelector('#PCD_ComentarioReasignacion')?.value.trim() || CD2_COMENTARIO_REASIGNACION_DEFAULT;

  const comentarioEditado = prompt(`Se reasignarán ${pendientes.length} documento(s) dentro de ${etiquetaFiltro}:\n\n${resumen}\n\nPuedes editar el comentario antes de confirmar:`, comentarioPorDefecto);
  if (comentarioEditado === null) return; // canceló
  const comentario = comentarioEditado.trim();
  if (!comentario) return alert('El comentario no puede quedar vacío.');
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
  const comentarioPorDefecto = document.querySelector('#PCD_ComentarioReasignacion')?.value.trim() || CD2_COMENTARIO_REASIGNACION_DEFAULT;
  const estado = document.querySelector('#PCD_EstadoManual');
  const btn = document.querySelector('#PCD_ReasignarManual');

  if (!idsRaw) return alert('Ingresa al menos un IDC o Radicado en el cuadro de arriba.');
  const lista = idsRaw.split(/[\n,;]+/).map(s => s.trim()).filter(Boolean);

  const clavesSeleccionadas = Array.from(document.querySelectorAll('.cd3-check-manual:checked')).map(chk => chk.value);
  if (!clavesSeleccionadas.length) return alert('Marca al menos una dependencia destino.');

  const nombresDestinos = clavesSeleccionadas.map(c => CD2_SUBDIRECCIONES[c].nombre).join(' + ');
  const comentarioEditado = prompt(`Reasignar ${lista.length} documento(s) a:\n\n${nombresDestinos}\n\nDocumentos: ${lista.join(', ')}\n\nPuedes editar el comentario antes de confirmar:`, comentarioPorDefecto);
  if (comentarioEditado === null) return; // canceló
  const comentario = comentarioEditado.trim();
  if (!comentario) return alert('El comentario no puede quedar vacío.');

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
  document.querySelector('#PCD_ManualIds').value = '';
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

// Destinos elegidos con "📥 Usar para reasignar" (puede haber varios).
let CD3_DESTINOS_ADHOC = [];

function cd3PintarDestinosAdHoc() {
  const cont = document.querySelector('#PCD_DestinosAdHocLista');
  const btnLimpiar = document.querySelector('#PCD_DestinosAdHocLimpiar');
  if (!cont) return;
  if (!CD3_DESTINOS_ADHOC.length) {
    cont.innerHTML = '<div style="color:#9ca3af; font-size:11px; padding:4px 0;">(ningún destino elegido aún)</div>';
    if (btnLimpiar) btnLimpiar.style.display = 'none';
    return;
  }
  if (btnLimpiar) btnLimpiar.style.display = '';
  cont.innerHTML = CD3_DESTINOS_ADHOC.map((d, i) => `
    <div style="display:flex; justify-content:space-between; align-items:center; background:#eff6ff; border:1px solid #bfdbfe; border-radius:4px; padding:4px 8px; margin-bottom:4px; font-size:11px;">
      <span>${cdEscaparHtml(d.nombre)}</span>
      <button data-idx="${i}" class="cd3-btn-quitar-destino" title="Quitar este destino" style="border:none; background:none; color:#dc2626; cursor:pointer; font-weight:bold; padding:0 4px;">✕</button>
    </div>`).join('');
  cont.querySelectorAll('.cd3-btn-quitar-destino').forEach(btn => {
    btn.onclick = () => { CD3_DESTINOS_ADHOC.splice(Number(btn.dataset.idx), 1); cd3PintarDestinosAdHoc(); };
  });
}

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
      const nuevo = { idOficina: o.IDOFICINAPRODUCTORA, idUnidad: o.IDUNIDADADMINISTRATIVA, nombre: o.NOMBRE };
      if (!CD3_DESTINOS_ADHOC.some(d => d.idOficina === nuevo.idOficina && d.idUnidad === nuevo.idUnidad)) {
        CD3_DESTINOS_ADHOC.push(nuevo);
      }
      cd3PintarDestinosAdHoc();
      // Limpia la búsqueda para dejar el espacio libre para la siguiente.
      document.querySelector('#PCD_BuscarOficinaTexto').value = '';
      cont.innerHTML = '';
      CD3_RESULTADOS_OFICINA = [];
    };
  });
}

// Reasigna uno o varios IDCs a TODOS los destinos elegidos arriba (uno o
// varios), en un solo POST por IDC — igual que la Reasignación Manual, pero
// con destinos encontrados al vuelo en vez de los de CONFIG_DEPENDENCIAS.
async function cd3ReasignarAdHoc() {
  const idsRaw = document.querySelector('#PCD_DestinoAdHocIds').value.trim();
  const estado = document.querySelector('#PCD_EstadoAdHoc');
  const btn = document.querySelector('#PCD_ReasignarAdHoc');

  if (!CD3_DESTINOS_ADHOC.length) return alert('Primero busca una dependencia arriba y pulsa "📥 Usar para reasignar" (puedes elegir varias).');
  if (!idsRaw) return alert('Ingresa al menos un IDC o Radicado.');
  const lista = idsRaw.split(/[\n,;]+/).map(s => s.trim()).filter(Boolean);
  const comentarioPorDefecto = document.querySelector('#PCD_ComentarioReasignacion')?.value.trim() || CD2_COMENTARIO_REASIGNACION_DEFAULT;
  const destinos = CD3_DESTINOS_ADHOC.slice();
  const nombreDestinos = destinos.map(d => d.nombre).join(' + ');

  const comentarioEditado = prompt(`Reasignar ${lista.length} documento(s) a:\n\n${nombreDestinos}\n\n(fuera de tu lista configurada)\n\nDocumentos: ${lista.join(', ')}\n\nPuedes editar el comentario antes de confirmar:`, comentarioPorDefecto);
  if (comentarioEditado === null) return; // canceló
  const comentario = comentarioEditado.trim();
  if (!comentario) return alert('El comentario no puede quedar vacío.');

  const textoOriginal = btn.textContent;
  btn.disabled = true; btn.style.opacity = '0.6'; btn.style.cursor = 'not-allowed';
  estado.textContent = `⏳ Procesando 0/${lista.length}...`;

  let exitosos = 0, fallidos = 0;
  await ejecutarConPool(lista, CONCURRENCIA_MAXIMA, async (idRaw) => {
    const id = idRaw.trim();
    try {
      const r = await cd2ReasignarADestinos(id, destinos, comentario);
      const funcionarios = r.destinos.map(d => d.jefe).join(' + ');
      cdBitacoraRegistrar({ accion: 'Reasignación (ad-hoc)', idc: id, radicado: r.radicado, asunto: r.asunto, destino: nombreDestinos, funcionario: funcionarios, comentario, resultado: r.movioBandeja ? 'OK' : 'ERROR', detalleResultado: r.movioBandeja ? '' : 'No se movió de la bandeja' });
      cd3SincronizarTrasAccionExterna(id, r.movioBandeja);
      if (r.movioBandeja) exitosos++; else fallidos++;
      console.log(r.movioBandeja ? '✅' : '❌', id, '→', nombreDestinos, r.resultado);
    } catch (e) { fallidos++; console.log('❌', id, e.message); }
  }, (completados, total) => { estado.textContent = `⏳ Procesando ${completados}/${total}...`; });

  btn.disabled = false; btn.style.opacity = '1'; btn.style.cursor = 'pointer'; btn.textContent = textoOriginal;
  estado.textContent = `✅ ${exitosos} exitosos, ❌ ${fallidos} fallidos. Revisa la consola para detalle.`;
  document.querySelector('#PCD_DestinoAdHocIds').value = '';
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

// ════════════════════════════════════════════════════════════════
// ═══ DETALLE DE TAREA POR IDTAREADOC (script aportado, integrado) ═══
// Flujo de trabajo completo (todas las versiones, no solo la última),
// remitente real vs. sesión activa, destinatarios/copias/adjuntos.
// ════════════════════════════════════════════════════════════════

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

// Reemplaza al tdCrearPanel()/tdEjecutarBusqueda() originales del script
// aportado: en vez de abrir una ventana flotante propia, pinta dentro de la
// sección "📋 Detalle de Tarea" del Clasificador.
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
  if (!flujo.length) {
    contenido.innerHTML = '<div style="padding:10px; color:#ea580c;">❌ No se encontró flujo para ese IDTAREADOC.</div>';
    return;
  }
  const ultimoPaso = flujo[flujo.length - 1];
  const remitenteReal = flujo[0]?.FUNCIONARIOCREO || '—';
  const estado = tdEstadoGlobal(ultimoPaso);

  contenido.innerHTML = `
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
      <div>
        <span style="color:#6b7280; font-size:11px;">IDTAREADOC</span>
        <span style="font-weight:bold; font-size:15px; color:#b45309;"> ${idTarea}</span>
      </div>
      <span style="padding:3px 10px; border-radius:12px; font-size:11px; font-weight:bold; background:${estado.fondo}; color:${estado.color};">${estado.texto}</span>
    </div>
    <div style="margin-bottom:10px; padding:8px; background:#f9fafb; border-radius:6px; display:grid; grid-template-columns:auto 1fr; gap:2px 8px;">
      <span style="color:#6b7280;">Remitente real (paso 1):</span><span style="font-weight:bold; color:#b45309;">${remitenteReal}</span>
      <span style="color:#6b7280;">Asunto:</span><span>${ultimoPaso?.ASUNTO || '—'}</span>
      <span style="color:#6b7280;">Serie / Subserie:</span><span>${ultimoPaso?.SERIE || '—'} / ${ultimoPaso?.SUBSERIE || '—'}</span>
      <span style="color:#6b7280;">Medio de envío:</span><span>${sesion.medioEnvio || '—'}</span>
      <hr style="grid-column:1/-1; border:none; border-top:1px dashed #e5e7eb; margin:2px 0;">
      <span style="color:#9ca3af; font-size:11px;">Sesión activa:</span><span style="color:#9ca3af; font-size:11px;">${sesion.usuarioSesion} — ${sesion.oficinaSesion}</span>
    </div>
    <div style="margin-bottom:10px; overflow-x:auto;">
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
      <button id="TD_BtnDescargarPdf" style="flex:1; padding:6px; background:#b45309; color:#fff; border:none; border-radius:6px; cursor:pointer;">📄 Descargar última versión</button>
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
    <b style="color:#b45309;">${titulo} (${arr.length})</b>
    ${arr.length === 0 ? '<p style="color:#6b7280;"><i>Sin registros</i></p>' :
      arr.map(x => `<div style="padding:4px 0; border-bottom:1px solid #f3f4f6;">${x.NOMBRESAPELLIDOS || x.NOMBREARCHIVO || '—'} ${x.CORREO ? `— ${x.CORREO}` : ''}</div>`).join('')}
  `;

  const listaAdjuntos = (arr) => `
    <b style="color:#b45309;">Adjuntos (${arr.length})</b>
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
        <b style="color:#b45309;">Destinatarios y copias — Tarea ${idTarea}</b>
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

// ════════════════════════════════════════════════════════════════
// ═══ PESTAÑAS DEL CLASIFICADOR ═══
// Reemplaza el acordeón de secciones: solo una parte del panel está visible
// a la vez (como pestañas de navegador), para leer sin scroll y sin
// perderse. Cambia solo la navegación — cada sección hace exactamente lo
// mismo que antes.
// ════════════════════════════════════════════════════════════════
// ════════════════════════════════════════════════════════════════
// ═══ DESCARGA MASIVA (PDF, adjuntos, o ambos, para varios IDC) ═══
// Reutiliza cd4CrearZip/cd4DescargarBlob (genéricas) y la misma lógica de
// "no descomprimir el zip de adjuntos" de cd3DescargarPdfYAdjuntosZip: cada
// adjuntos-zip que ya arma ControlDoc se incluye tal cual, como un archivo
// más, dentro del zip final — nunca se decodifica su contenido.
// ════════════════════════════════════════════════════════════════
const CD5_CONCURRENCIA_DESCARGAS = 5;

async function cd5ObtenerPdfBytes(idDocumento) {
  const url = await cdObtenerPdfBlobUrl(idDocumento);
  if (!url) return null;
  try {
    return new Uint8Array(await (await fetch(url)).arrayBuffer());
  } finally {
    URL.revokeObjectURL(url);
  }
}

async function cd5ObtenerAdjuntosZipBytes(idDocumento) {
  try {
    const resp = await cdFetchPost(CD_CONFIG.urlGuardarZip, { IDDOCUMENTO: idDocumento, DILIGENCIADOS: 'NO' });
    const data = await resp.json();
    if (!(data && data.RESPUESTA === true && data.VALORESPUESTA)) return null;
    const valor = data.VALORESPUESTA;
    if (typeof valor === 'string' && valor.startsWith('http')) {
      const r2 = await fetch(valor, { credentials: 'same-origin' });
      if (!r2.ok) return null;
      return new Uint8Array(await (await r2.blob()).arrayBuffer());
    }
    if (typeof valor === 'string') {
      try {
        const bin = atob(cdSanitizarBase64(valor));
        const bytes = new Uint8Array(bin.length);
        for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
        return bytes;
      } catch (e) { return null; }
    }
  } catch (e) {
    console.warn('[CD5] No se pudo obtener el zip de adjuntos de', idDocumento, ':', e.message);
  }
  return null;
}

// Trae la lista de IDCs del cuadro de texto de la pestaña, sin duplicados.
function cd5ListaIds() {
  const texto = document.querySelector('#PCD_DescargasIds').value.trim();
  return [...new Set(texto.split(/[\n,;]+/).map(s => s.trim()).filter(Boolean))];
}

// Copia al cuadro de texto los IDC que ya están cargados en "📊 Result."
// (respeta el filtro activo ahí, incluida la terminación de radicado).
function cd5CargarDesdeResultados() {
  if (!CD3_DOCUMENTOS.length) return alert('Aún no has cargado documentos en la pestaña "📊 Result." — ve ahí primero y pulsa "Cargar Documentos Pendientes".');
  document.querySelector('#PCD_DescargasIds').value = CD3_DOCUMENTOS.map(d => d.idc).join('\n');
  document.querySelector('#PCD_DescargasEstado').textContent = `${CD3_DOCUMENTOS.length} IDC copiados desde Resultados.`;
}

// modo: 'pdf' | 'adjuntos' | 'ambos'
async function cd5DescargarMasivo(modo) {
  const lista = cd5ListaIds();
  const estado = document.querySelector('#PCD_DescargasEstado');
  if (!lista.length) return alert('Pega al menos un IDC, o usa "📥 Cargar desde Resultados".');

  const botones = document.querySelectorAll('.cd5-btn-descarga');
  botones.forEach(b => { b.disabled = true; b.style.opacity = '0.6'; b.style.cursor = 'not-allowed'; });
  estado.textContent = `⏳ Procesando 0/${lista.length}...`;

  const archivos = [];
  const sinPdf = [], sinAdjuntos = [];
  await ejecutarConPool(lista, CD5_CONCURRENCIA_DESCARGAS, async (idcRaw) => {
    const idc = idcRaw.trim();
    if (modo === 'pdf' || modo === 'ambos') {
      const bytes = await cd5ObtenerPdfBytes(idc).catch(() => null);
      if (bytes) archivos.push({ nombre: `Documento_${idc}.pdf`, bytes });
      else sinPdf.push(idc);
    }
    if (modo === 'adjuntos' || modo === 'ambos') {
      const bytes = await cd5ObtenerAdjuntosZipBytes(idc);
      if (bytes) archivos.push({ nombre: `Adjuntos_${idc}.zip`, bytes });
      else sinAdjuntos.push(idc);
    }
  }, (completados, total) => { estado.textContent = `⏳ Procesando ${completados}/${total}...`; });

  botones.forEach(b => { b.disabled = false; b.style.opacity = '1'; b.style.cursor = 'pointer'; });

  if (!archivos.length) {
    estado.textContent = '❌ No se pudo obtener ningún archivo (revisa la consola con F12 para el detalle).';
    return;
  }

  estado.textContent = '⏳ Armando el ZIP...';
  const nombreZip = modo === 'pdf' ? 'PDFs' : modo === 'adjuntos' ? 'Adjuntos' : 'PDF_y_Adjuntos';
  cd4DescargarBlob(cd4CrearZip(archivos), `${nombreZip}_masivo_${new Date().toISOString().slice(0, 10)}.zip`);

  const avisos = [];
  if (sinPdf.length) avisos.push(`sin PDF: ${sinPdf.join(', ')}`);
  if (sinAdjuntos.length) avisos.push(`sin adjuntos (o no se pudieron obtener): ${sinAdjuntos.join(', ')}`);
  estado.textContent = `✅ ZIP descargado con ${archivos.length} archivo(s) de ${lista.length} IDC.` + (avisos.length ? ` ⚠️ ${avisos.join(' · ')}` : '');
}


// ════════════════════════════════════════════════════════════════
// ═══ DESCARGAS → subpestaña "Por IDTAREADOC" (última versión PDF) ═══
// Reutiliza tdConsultarTarea / tdObtenerPdfBlobUrl (ya usadas en "🧾 Detalle")
// y cd4CrearZip / cd4DescargarBlob (genéricas): para cada IDTAREADOC busca el
// paso más reciente del flujo que tenga PDF diligenciado y lo descarga. Solo
// lectura: no modifica ninguna tarea.
// ════════════════════════════════════════════════════════════════
let CD6_RESULTADOS = [];   // { id, estado, orden, totalPasos, asunto, nombre, bytes, error }
let CD6_EN_CURSO = false;

async function cd6ObtenerUltimaVersion(idTarea) {
  const { flujo } = await tdConsultarTarea(idTarea);
  if (!flujo.length) throw new Error('Sin flujo (ID inexistente o sin permisos)');
  const ordenado = [...flujo].sort((a, b) => (Number(a.ORDEN) || 0) - (Number(b.ORDEN) || 0));
  const ultimo = ordenado[ordenado.length - 1];
  // Toma el paso más reciente que sí tenga PDF (el último paso puede no tenerlo).
  const conPdf = [...ordenado].reverse().find(p => p.NOMBREARCHIVO);
  if (!conPdf) throw new Error('Ningún paso del flujo tiene PDF');
  return { paso: conPdf, totalPasos: ordenado.length, asunto: ultimo.ASUNTO || '' };
}

async function cd6ProcesarTarea(r) {
  r.estado = 'procesando'; r.error = ''; cd6PintarTabla();
  try {
    const { paso, totalPasos, asunto } = await cd6ObtenerUltimaVersion(r.id);
    r.orden = paso.ORDEN; r.totalPasos = totalPasos; r.asunto = asunto;
    const blobUrl = await tdObtenerPdfBlobUrl(paso.NOMBREARCHIVO);
    if (!blobUrl) throw new Error('El servidor no devolvió el PDF de esa versión');
    r.bytes = new Uint8Array(await (await fetch(blobUrl)).arrayBuffer());
    URL.revokeObjectURL(blobUrl);
    r.nombre = `Tarea_${r.id}_v${paso.ORDEN}.pdf`;
    r.estado = 'ok';
  } catch (e) {
    r.estado = 'error'; r.error = e.message; r.bytes = null;
    console.warn('[CD6]', r.id, e);
  }
  cd6PintarTabla();
}

function cd6ParsearIds(texto) {
  return [...new Set(texto.split(/[\s,;]+/).map(s => s.trim()).filter(s => /^\d+$/.test(s)))];
}

function cd6Estado(t) { const el = document.querySelector('#PCD_TdmEstado'); if (el) el.textContent = t; }

function cd6Botones(activos) {
  ['#PCD_TdmEjecutar', '#PCD_TdmReintentar'].forEach(s => {
    const b = document.querySelector(s); if (!b) return;
    b.disabled = !activos; b.style.opacity = activos ? '1' : '0.6'; b.style.cursor = activos ? 'pointer' : 'not-allowed';
  });
}

async function cd6Entregar(modo) {
  const listos = CD6_RESULTADOS.filter(r => r.estado === 'ok' && r.bytes);
  if (!listos.length) return;
  if (modo === 'zip' && listos.length > 1) {
    cd6Estado('⏳ Armando el ZIP…');
    const archivos = listos.map(r => ({ nombre: r.nombre, bytes: r.bytes }));
    const f = new Date(), p = n => String(n).padStart(2, '0');
    cd4DescargarBlob(cd4CrearZip(archivos), `UltimasVersiones_Tareas_${f.getFullYear()}${p(f.getMonth() + 1)}${p(f.getDate())}_${p(f.getHours())}${p(f.getMinutes())}.zip`);
  } else {
    for (const r of listos) {
      cd4DescargarBlob(new Blob([r.bytes], { type: 'application/pdf' }), r.nombre);
      await new Promise(res => setTimeout(res, 500));
    }
  }
}

async function cd6Ejecutar(soloFallidos = false) {
  if (CD6_EN_CURSO) return;
  let objetivo;
  if (soloFallidos) {
    objetivo = CD6_RESULTADOS.filter(r => r.estado === 'error');
    if (!objetivo.length) return cd6Estado('No hay tareas fallidas para reintentar.');
  } else {
    const ids = cd6ParsearIds(document.querySelector('#PCD_TdmIds').value);
    if (!ids.length) return cd6Estado('Pega al menos un IDTAREADOC válido (solo números).');
    CD6_RESULTADOS = ids.map(id => ({ id, estado: 'pendiente', orden: '', totalPasos: '', asunto: '', nombre: '', bytes: null, error: '' }));
    objetivo = CD6_RESULTADOS;
  }

  CD6_EN_CURSO = true; cd6Botones(false); cd6PintarTabla();
  const modo = document.querySelector('#PCD_TdmModo').value;

  await ejecutarConPool(objetivo, Math.min(CONCURRENCIA_MAXIMA, 5), cd6ProcesarTarea,
    (hechos, total) => cd6Estado(`⏳ Consultando ${hechos}/${total}… (hasta 5 a la vez)`));

  const nuevosOk = objetivo.filter(r => r.estado === 'ok');
  if (nuevosOk.length) {
    // En reintento se entregan solo los recuperados; en ejecución normal, todos.
    const respaldo = CD6_RESULTADOS;
    if (soloFallidos) CD6_RESULTADOS = nuevosOk;
    await cd6Entregar(modo);
    CD6_RESULTADOS = respaldo;
  }

  const ok = CD6_RESULTADOS.filter(r => r.estado === 'ok').length;
  const err = CD6_RESULTADOS.filter(r => r.estado === 'error').length;
  cd6Estado(`🏁 ${ok} descargado(s) · ${err} con error${err ? ' (usa "Reintentar fallidos" o revisa la consola)' : ''}.`);
  CD6_EN_CURSO = false; cd6Botones(true);
}

function cd6ExportarExcel() {
  if (!CD6_RESULTADOS.length) return cd6Estado('Aún no hay resultados para exportar.');
  const esc = s => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const filas = CD6_RESULTADOS.map(r => `<tr><td>${esc(r.id)}</td><td>${r.estado === 'ok' ? 'OK' : 'ERROR'}</td><td>${esc(r.orden)}</td><td>${esc(r.totalPasos)}</td><td>${esc(r.nombre)}</td><td>${esc(r.asunto)}</td><td>${esc(r.error)}</td></tr>`).join('');
  const html = `<html><head><meta charset="UTF-8"></head><body><table border="1"><tr><th>IDTAREADOC</th><th>Resultado</th><th>Versión descargada</th><th>Pasos del flujo</th><th>Archivo</th><th>Asunto</th><th>Error</th></tr>${filas}</table></body></html>`;
  cd4DescargarBlob(new Blob([html], { type: 'application/vnd.ms-excel' }), `Descarga_UltimasVersiones_${new Date().toISOString().slice(0, 10)}.xls`);
}

function cd6PintarTabla() {
  const cont = document.querySelector('#PCD_TdmTabla');
  if (!cont) return;
  if (!CD6_RESULTADOS.length) { cont.innerHTML = ''; return; }
  const icono = { pendiente: '⏸', procesando: '⏳', ok: '✅', error: '❌' };
  const esc = s => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  cont.innerHTML = `
    <table style="width:100%; border-collapse:collapse; font-size:12px;">
      <thead><tr style="background:#f3f4f6; text-align:left;">
        <th style="padding:4px;"></th><th style="padding:4px;">IDTAREADOC</th><th style="padding:4px;">Versión</th><th style="padding:4px;">Asunto / detalle</th><th style="padding:4px;"></th>
      </tr></thead>
      <tbody>${CD6_RESULTADOS.map((r, i) => `
        <tr style="border-bottom:1px solid #f3f4f6; ${r.estado === 'error' ? 'background:#fff7f7;' : ''}">
          <td style="padding:4px;">${icono[r.estado]}</td>
          <td style="padding:4px; font-weight:bold;">${esc(r.id)}</td>
          <td style="padding:4px;">${r.orden ? `v${esc(r.orden)} de ${esc(r.totalPasos)}` : '—'}</td>
          <td style="padding:4px; word-break:break-word;">${r.estado === 'error' ? `<span style="color:#dc2626;">${esc(r.error)}</span>` : esc(r.asunto).slice(0, 90)}</td>
          <td style="padding:4px;">${r.estado === 'ok' ? `<button class="cd6-ver" data-i="${i}" title="Previsualizar" style="border:none; background:none; cursor:pointer;">👁</button>` : ''}</td>
        </tr>`).join('')}</tbody>
    </table>`;
  cont.querySelectorAll('.cd6-ver').forEach(b => {
    b.onclick = () => { const r = CD6_RESULTADOS[Number(b.dataset.i)]; if (r?.bytes) window.open(URL.createObjectURL(new Blob([r.bytes], { type: 'application/pdf' })), '_blank'); };
  });
}

function cd6CambiarSubtab(clave) {
  const esTarea = clave === 'tarea';
  document.querySelector('#PCD_SubCuerpoIdc').style.display = esTarea ? 'none' : 'block';
  document.querySelector('#PCD_SubCuerpoTarea').style.display = esTarea ? 'block' : 'none';
  const btnIdc = document.querySelector('#PCD_SubTabDescIdc'), btnTarea = document.querySelector('#PCD_SubTabDescTarea');
  btnIdc.style.background = esTarea ? '#e5e7eb' : '#2563eb'; btnIdc.style.color = esTarea ? '#111827' : '#fff';
  btnTarea.style.background = esTarea ? '#2563eb' : '#e5e7eb'; btnTarea.style.color = esTarea ? '#fff' : '#111827';
}


const CD3_TABS = [
  { clave: 'cargar',       emoji: '🔄', etiqueta: 'Cargar',    titulo: 'Cargar y Clasificar',                         color: '#111827', cuerpoId: '#PCD_CuerpoSec2' },
  { clave: 'resultados',   emoji: '📊', etiqueta: 'Result.',   titulo: 'Resultados',                                  color: '#2563eb', cuerpoId: '#PCD_CuerpoSec3' },
  { clave: 'manual',       emoji: '📥', etiqueta: 'Manual',    titulo: 'Reasignación Manual (pegar IDs sueltos)',     color: '#16a34a', cuerpoId: '#PCD_CuerpoSec4' },
  { clave: 'buscador',     emoji: '🔎', etiqueta: 'Buscar',    titulo: 'Buscar dependencia / funcionario (fuera de tu lista)', color: '#7c3aed', cuerpoId: '#PCD_CuerpoSec5' },
  { clave: 'tareas',       emoji: '📋', etiqueta: 'Tareas',    titulo: 'Bandeja de Tareas (solo lectura)',            color: '#0891b2', cuerpoId: '#PCD_CuerpoSec6' },
  { clave: 'detalleTarea', emoji: '🧾', etiqueta: 'Detalle',   titulo: 'Detalle de Tarea (flujo completo por IDTAREADOC)', color: '#b45309', cuerpoId: '#PCD_CuerpoSec7' },
  { clave: 'comentarios',  emoji: '💬', etiqueta: 'Coment.',   titulo: 'Comentarios de gestión',                      color: '#0d9488', cuerpoId: '#PCD_CuerpoComentarios' },
  { clave: 'palabras',     emoji: '⚙️', etiqueta: 'Palabras',  titulo: 'Configuración de Palabras Clave',             color: '#6b7280', cuerpoId: '#PCD_CuerpoSec1' },
  { clave: 'descargas',    emoji: '⬇️', etiqueta: 'Descargas', titulo: 'Descarga masiva (PDF, adjuntos, o ambos)',    color: '#be123c', cuerpoId: '#PCD_CuerpoSec8' },
  { clave: 'ia',           emoji: '🤖', etiqueta: 'IA',        titulo: 'Reasignación masiva desde tabla generada por IA', color: '#4f46e5', cuerpoId: '#PCD_CuerpoSec9' },
];
let CD3_TAB_ACTIVA = 'cargar';

function cd3CambiarTab(clave) {
  CD3_TAB_ACTIVA = clave;
  CD3_TABS.forEach(t => {
    const cuerpo = document.querySelector(t.cuerpoId);
    const btn = document.querySelector(`#PCD_Tab_${t.clave}`);
    const activa = t.clave === clave;
    if (cuerpo) cuerpo.style.display = activa ? 'block' : 'none';
    if (btn) {
      btn.style.background = activa ? t.color : '#e5e7eb';
      btn.style.color = activa ? '#fff' : '#111827';
    }
  });
  // La bandeja de tareas detecta la sesión solo la primera vez que se entra ahí.
  if (clave === 'tareas') cd4PrepararCuentaPorDefecto();
}

function cd3CrearPanel() {
  const existente = document.querySelector('#PanelClasificadorDoc');
  if (existente) existente.remove();
  const cont = document.createElement('div');
  cont.id = 'PanelClasificadorDoc';
  cont.style.cssText = 'position:fixed; top:20px; left:20px; z-index:99999; background:#fff; border:1px solid #ccc; border-radius:10px; padding:14px; box-shadow:0 4px 18px rgba(0,0,0,0.25); width:650px; max-height:92vh; overflow:hidden; display:flex; flex-direction:column; font-family:sans-serif; font-size:13px;';
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
    <div id="PCD_EncabezadoGeneral" style="display:flex; justify-content:space-between; align-items:center; font-weight:bold; margin-bottom:10px; cursor:grab; user-select:none; flex-shrink:0;">
      <span>🔍 Clasificador por Competencia</span>
      <div style="display:flex; align-items:center; gap:2px;">
        <button id="PCD_EscalaMenos" title="Reducir tamaño de la interfaz" style="background:none; border:none; font-size:14px; cursor:pointer; padding:2px 4px;">🔍➖</button>
        <span class="cd-escala-label" style="font-size:11px; color:#6b7280; min-width:34px; text-align:center;">${Math.round(CD_ESCALA_UI * 100)}%</span>
        <button id="PCD_EscalaMas" title="Aumentar tamaño de la interfaz" style="background:none; border:none; font-size:14px; cursor:pointer; padding:2px 4px;">🔍➕</button>
        <button id="PCD_MinimizarTodo" title="Minimizar panel completo" style="background:none; border:none; font-size:16px; cursor:pointer;">➖</button>
        <button id="PCD_Cerrar" title="Cerrar" style="background:none; border:none; font-size:16px; cursor:pointer;">✕</button>
      </div>
    </div>
    <button id="PCD_ExportarBitacora" style="width:100%; margin-bottom:8px; padding:6px; background:#374151; color:#fff; border:none; border-radius:6px; cursor:pointer; font-size:11px; font-weight:bold; flex-shrink:0;">📥 Exportar registro de acciones <span id="PCD_ContadorBitacora" style="font-weight:normal;">(0)</span></button>
    <div id="PCD_TabsBar" style="display:flex; flex-wrap:wrap; gap:4px; margin-bottom:10px; flex-shrink:0;">
      ${CD3_TABS.map(t => `<button class="cd3-tab-btn" id="PCD_Tab_${t.clave}" data-tab="${t.clave}" title="${t.titulo}" style="padding:6px 9px; border:none; border-radius:6px; cursor:pointer; font-size:11px; font-weight:bold; background:#e5e7eb; color:#111827; white-space:nowrap;">${t.emoji} ${t.etiqueta}</button>`).join('')}
    </div>
    <div id="PCD_CuerpoGeneral" style="flex:1; min-height:0; overflow-y:auto; padding-right:4px;">

      <div id="PCD_CuerpoSec2" style="display:none;">
        <label style="color:#6b7280; font-size:11px; font-weight:bold;">⚡ Documentos simultáneos al reasignar/cerrar en lote</label>
        <div style="display:flex; align-items:center; gap:8px; margin:4px 0 10px;">
          <input id="PCD_Concurrencia" type="number" min="1" max="50" value="${CONCURRENCIA_MAXIMA}" style="width:70px; padding:5px; border:1px solid #ccc; border-radius:4px; font-size:12px; text-align:center;">
          <span style="color:#6b7280; font-size:10px;">Cuántas peticiones al servidor van a la vez (ej: 10 más lento y prudente, 30 más rápido). Aplica a "Reasignar clasificados", Reasignación Manual y el buscador ad-hoc.</span>
        </div>
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

      <div id="PCD_CuerpoSec3" style="display:none;">
        <div style="font-size:12px; font-weight:bold; color:#2563eb; margin-bottom:8px;">📊 Resultados <span id="PCD_ContadorResultados" style="color:#6b7280; font-weight:normal;"></span></div>
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

        <label style="color:#6b7280; font-size:11px;">Ordenar por fecha</label>
        <select id="PCD_OrdenTabla" style="width:100%; padding:5px; border:1px solid #ccc; border-radius:4px; margin:3px 0 8px; font-size:11px; box-sizing:border-box;">
          ${Object.entries(CD3_ORDENES).map(([clave, o]) => `<option value="${clave}">${o.etiqueta}</option>`).join('')}
        </select>

        <label style="color:#6b7280; font-size:11px;">Terminación del radicado (además del filtro de arriba)</label>
        <input id="PCD_FiltroRadicadoTerminacion" type="text" placeholder="ej: 1,2,3 — muestra solo los radicados que terminan en esos dígitos" style="width:100%; padding:5px; border:1px solid #ccc; border-radius:4px; margin:3px 0 8px; font-size:11px; box-sizing:border-box;">

        <label style="color:#6b7280; font-size:11px;">📋 Copiar los primeros N IDC de la vista filtrada de arriba (para pegar en "⬇️ Descargas")</label>
        <div style="display:flex; align-items:center; gap:5px; flex-wrap:wrap; margin:3px 0 4px;">
          <button class="cd3-btn-copiar-primeros" data-n="5" style="padding:4px 10px; background:#e5e7eb; border:none; border-radius:4px; cursor:pointer; font-size:11px; font-weight:bold;">5</button>
          <button class="cd3-btn-copiar-primeros" data-n="10" style="padding:4px 10px; background:#e5e7eb; border:none; border-radius:4px; cursor:pointer; font-size:11px; font-weight:bold;">10</button>
          <button class="cd3-btn-copiar-primeros" data-n="20" style="padding:4px 10px; background:#e5e7eb; border:none; border-radius:4px; cursor:pointer; font-size:11px; font-weight:bold;">20</button>
          <button class="cd3-btn-copiar-primeros" data-n="25" style="padding:4px 10px; background:#e5e7eb; border:none; border-radius:4px; cursor:pointer; font-size:11px; font-weight:bold;">25</button>
          <input id="PCD_CopiarPrimerosN" type="number" min="1" placeholder="Otro #" style="width:65px; padding:4px; border:1px solid #ccc; border-radius:4px; font-size:11px;">
          <button id="PCD_CopiarPrimerosBtn" style="padding:4px 10px; background:#2563eb; color:#fff; border:none; border-radius:4px; cursor:pointer; font-size:11px; font-weight:bold;">📋 Copiar</button>
        </div>
        <div id="PCD_CopiarPrimerosEstado" style="font-size:11px; margin-bottom:8px;"></div>

        <label style="color:#6b7280; font-size:11px;">🚫 Excluir estos IDC (no se muestran, aunque cumplan los filtros de arriba)</label>
        <textarea id="PCD_ExcluirIdc" rows="2" placeholder="ej: 2333190, 2332499&#10;o uno por línea" style="width:100%; padding:5px; border:1px solid #ccc; border-radius:4px; margin:3px 0 8px; font-size:11px; box-sizing:border-box;"></textarea>

        <div id="PCD_TablaResultados" style="max-height:520px; overflow-y:auto;">
          <div style="color:#9ca3af; font-size:12px; padding:10px 0;">Aún no hay documentos clasificados.</div>
        </div>
        <button id="PCD_ReasignarTodo" style="width:100%; margin-top:10px; padding:8px; background:#16a34a; color:#fff; border:none; border-radius:6px; cursor:pointer; font-weight:bold;">🚀 Reasignar clasificados (respeta el filtro activo)</button>
        <div id="PCD_EstadoReasignacionMasiva" style="font-size:12px; color:#6b7280; margin-top:6px;"></div>
      </div>

      <div id="PCD_CuerpoSec4" style="display:none;">
        <label style="color:#6b7280; font-size:11px;">IDCs o Radicados (uno por línea, o separados por coma)</label>
        <textarea id="PCD_ManualIds" rows="4" style="width:100%; padding:6px; border:1px solid #ccc; border-radius:6px; margin:4px 0 10px; box-sizing:border-box;" placeholder="2333190, 2332499, 2328268&#10;o uno por línea"></textarea>

        <label style="color:#6b7280; font-size:11px;">Dependencia(s) destino — marca una o varias</label>
        <div style="margin:4px 0 10px;">
          ${checkboxesManuales}
        </div>

        <button id="PCD_ReasignarManual" style="width:100%; padding:8px; background:#16a34a; color:#fff; border:none; border-radius:6px; cursor:pointer; font-weight:bold;">🚀 Reasignar a las dependencias marcadas</button>
        <div id="PCD_EstadoManual" style="margin-top:8px; font-size:12px; color:#6b7280;"></div>
      </div>

      <div id="PCD_CuerpoSec5" style="display:none;">
        <label style="color:#6b7280; font-size:11px; font-weight:bold;">Buscar dependencia, dirección, subdirección u oficina por nombre</label>
        <div style="display:flex; gap:6px; margin:4px 0 8px;">
          <input id="PCD_BuscarOficinaTexto" type="text" placeholder="ej: SALUD MENTAL, FINANCIAMIENTO..." style="flex:1; padding:5px; border:1px solid #ccc; border-radius:4px; font-size:11px;">
          <button id="PCD_BuscarOficinaBtn" style="padding:5px 10px; background:#374151; color:#fff; border:none; border-radius:4px; cursor:pointer; font-size:11px;">Buscar</button>
        </div>
        <div id="PCD_ResultadosOficina" style="max-height:180px; overflow-y:auto; margin-bottom:10px;"></div>

        <div style="display:flex; justify-content:space-between; align-items:center; margin-top:2px;">
          <label style="color:#6b7280; font-size:11px; font-weight:bold;">Destino(s) elegidos (📥 Usar para reasignar) — puedes elegir varios</label>
          <button id="PCD_DestinosAdHocLimpiar" style="display:none; padding:2px 6px; font-size:10px; background:#fee2e2; color:#991b1b; border:none; border-radius:4px; cursor:pointer;">🗑 Eliminar seleccionados</button>
        </div>
        <div id="PCD_DestinosAdHocLista" style="margin:3px 0 8px;"></div>
        <textarea id="PCD_DestinoAdHocIds" rows="3" style="width:100%; padding:6px; border:1px solid #ccc; border-radius:6px; margin:4px 0 8px; box-sizing:border-box;" placeholder="IDCs o Radicados a enviar a esos destinos"></textarea>
        <button id="PCD_ReasignarAdHoc" style="width:100%; padding:8px; background:#16a34a; color:#fff; border:none; border-radius:6px; cursor:pointer; font-weight:bold;">🚀 Reasignar a los destinos de arriba</button>
        <div id="PCD_EstadoAdHoc" style="margin-top:8px; font-size:12px; color:#6b7280;"></div>
      </div>

      <div id="PCD_CuerpoSec6" style="display:none;">
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
        <div id="PCD_TareasTabla" style="max-height:540px; overflow:auto;"></div>
      </div>

      <div id="PCD_CuerpoSec7" style="display:none;">
        <p style="color:#6b7280; font-size:11px; margin:0 0 8px;">A diferencia de "🔎 Ver Seguimiento" (que usa el IDC), esto busca por <b>IDTAREADOC</b> y muestra <b>todas</b> las versiones del flujo, no solo la última — además de quién es el remitente real y quién tiene la sesión activa.</p>
        <div style="display:flex; gap:6px; margin-bottom:10px;">
          <input id="TD_Input" type="text" placeholder="IDTAREADOC (ej: 1494241)" style="flex:1; padding:6px; border:1px solid #ccc; border-radius:6px;">
          <button id="TD_Buscar" style="padding:6px 12px; background:#b45309; color:#fff; border:none; border-radius:6px; cursor:pointer; font-weight:bold;">Buscar</button>
        </div>
        <div id="TD_Contenido"></div>
      </div>

      <div id="PCD_CuerpoSec8" style="display:none;">
        <div style="display:flex; gap:6px; margin-bottom:10px;">
          <button id="PCD_SubTabDescIdc" class="cd6-subtab-btn" data-sub="idc" style="flex:1; padding:7px; background:#2563eb; color:#fff; border:none; border-radius:6px; cursor:pointer; font-size:11px; font-weight:bold;">🧾 Por IDC</button>
          <button id="PCD_SubTabDescTarea" class="cd6-subtab-btn" data-sub="tarea" style="flex:1; padding:7px; background:#e5e7eb; color:#111827; border:none; border-radius:6px; cursor:pointer; font-size:11px; font-weight:bold;">📑 Por IDTAREADOC (última versión)</button>
        </div>

        <div id="PCD_SubCuerpoIdc">
          <p style="color:#6b7280; font-size:11px; margin:0 0 8px;">Pega uno o varios IDC (uno por línea o separados por coma). Cada botón arma <b>un solo .zip</b> para descargar de una vez.</p>
          <div style="display:flex; gap:6px; margin-bottom:6px;">
            <button id="PCD_DescargasCargarResultados" style="padding:5px 10px; background:#e5e7eb; border:none; border-radius:4px; cursor:pointer; font-size:11px;">📥 Cargar desde Resultados</button>
          </div>
          <textarea id="PCD_DescargasIds" rows="5" style="width:100%; padding:6px; border:1px solid #ccc; border-radius:6px; margin-bottom:10px; box-sizing:border-box;" placeholder="2333190, 2332499, 2328268&#10;o uno por línea"></textarea>
          <div style="display:flex; flex-direction:column; gap:6px;">
            <button data-modo="pdf" class="cd5-btn-descarga" style="padding:9px; background:#e0e7ff; color:#3730a3; border:none; border-radius:6px; cursor:pointer; font-weight:bold;">📄 Solo PDF (un .zip con un PDF por documento)</button>
            <button data-modo="adjuntos" class="cd5-btn-descarga" style="padding:9px; background:#dbeafe; color:#1e3a8a; border:none; border-radius:6px; cursor:pointer; font-weight:bold;">📎 Solo Adjuntos (un .zip con los adjuntos de cada documento)</button>
            <button data-modo="ambos" class="cd5-btn-descarga" style="padding:9px; background:#be123c; color:#fff; border:none; border-radius:6px; cursor:pointer; font-weight:bold;">📦 PDF + Adjuntos juntos (todo en un solo .zip)</button>
          </div>
          <div id="PCD_DescargasEstado" style="font-size:12px; color:#6b7280; margin-top:8px;"></div>
        </div>

        <div id="PCD_SubCuerpoTarea" style="display:none;">
          <p style="color:#6b7280; font-size:11px; margin:0 0 8px;">Pega uno o varios <b>IDTAREADOC</b> (no es el IDC). Para cada uno se busca, dentro de su flujo, el paso más reciente que tenga un PDF diligenciado, y se descarga esa versión. Solo lectura: no modifica ninguna tarea.</p>
          <textarea id="PCD_TdmIds" rows="5" placeholder="466393&#10;466401, 466420" style="width:100%; padding:6px; border:1px solid #ccc; border-radius:6px; margin-bottom:8px; box-sizing:border-box;"></textarea>
          <div style="display:flex; gap:6px; margin-bottom:8px;">
            <select id="PCD_TdmModo" style="flex:1; padding:6px; border:1px solid #ccc; border-radius:6px; font-size:12px;">
              <option value="zip">Un solo ZIP con todos los PDF (recomendado)</option>
              <option value="individual">Un PDF por archivo</option>
            </select>
            <button id="PCD_TdmEjecutar" style="padding:6px 12px; background:#2563eb; color:#fff; border:none; border-radius:6px; cursor:pointer; font-weight:bold;">⬇ Descargar</button>
          </div>
          <div style="display:flex; gap:6px; margin-bottom:8px;">
            <button id="PCD_TdmReintentar" style="flex:1; padding:6px; background:#e5e7eb; border:none; border-radius:6px; cursor:pointer; font-size:12px;">🔁 Reintentar fallidos</button>
            <button id="PCD_TdmCopiarFallidos" style="flex:1; padding:6px; background:#e5e7eb; border:none; border-radius:6px; cursor:pointer; font-size:12px;">📋 Copiar IDs fallidos</button>
            <button id="PCD_TdmExportar" style="flex:1; padding:6px; background:#374151; color:#fff; border:none; border-radius:6px; cursor:pointer; font-size:12px;">📥 Excel de resultados</button>
          </div>
          <div id="PCD_TdmEstado" style="font-size:12px; color:#6b7280; margin-bottom:8px;">Pega los IDTAREADOC y pulsa Descargar.</div>
          <div id="PCD_TdmTabla" style="max-height:300px; overflow-y:auto;"></div>
        </div>
      </div>

      <div id="PCD_CuerpoComentarios" style="display:none;">
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

      <div id="PCD_CuerpoSec1" style="display:none;">
        ${palabrasHtml}
        <label style="color:#6b7280; font-size:11px; font-weight:bold;">🏛️ Palabras clave — Priorizaciones y Control Político</label>
        <textarea id="PCD_PalabrasPriorizacion" rows="3" style="width:100%; padding:4px; border:1px solid #ccc; border-radius:4px; font-size:11px; box-sizing:border-box;">${CD3_PALABRAS_PRIORIZACION}</textarea>
        <button id="PCD_GuardarPalabras" style="margin-top:8px; width:100%; padding:7px; background:#374151; color:#fff; border:none; border-radius:6px; cursor:pointer; font-size:12px;">💾 Guardar y Reclasificar</button>
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
  btnMinTodo.addEventListener('mousedown', (e) => e.stopPropagation());
  btnMinTodo.onclick = () => {
    minimizadoTodo = true;
    cont.style.display = 'none';
    cdCrearBurbujaMinimizada({
      contenedor: cont, emoji: '🔍', colorFondo: 'linear-gradient(135deg, #a78bfa, #f472b6)', id: 'PCD_Burbuja',
      alRestaurar: () => { minimizadoTodo = false; cont.style.display = 'flex'; },
    });
  };

  document.querySelectorAll('.cd3-tab-btn').forEach(btn => { btn.onclick = () => cd3CambiarTab(btn.dataset.tab); });
  document.querySelector('#PCD_DescargasCargarResultados').onclick = cd5CargarDesdeResultados;
  document.querySelectorAll('.cd5-btn-descarga').forEach(btn => { btn.onclick = () => cd5DescargarMasivo(btn.dataset.modo); });
  document.querySelectorAll('.cd6-subtab-btn').forEach(btn => { btn.onclick = () => cd6CambiarSubtab(btn.dataset.sub); });
  document.querySelector('#PCD_TdmEjecutar').onclick = () => cd6Ejecutar(false);
  document.querySelector('#PCD_TdmReintentar').onclick = () => cd6Ejecutar(true);
  document.querySelector('#PCD_TdmExportar').onclick = cd6ExportarExcel;
  document.querySelector('#PCD_TdmCopiarFallidos').onclick = () => {
    const ids = CD6_RESULTADOS.filter(r => r.estado === 'error').map(r => r.id);
    if (!ids.length) return cd6Estado('No hay IDs fallidos para copiar.');
    cdCopiarTexto(ids.join('\n'));
    cd6Estado(`📋 ${ids.length} ID(s) fallidos copiados al portapapeles.`);
  };
  cd7InyectarPestana();   // contenido de la pestaña 🤖 IA (sección más abajo)
  cd3CambiarTab(CD3_TAB_ACTIVA);
  document.querySelector('#TD_Buscar').onclick = tdEjecutarBusqueda;
  document.querySelector('#TD_Input').addEventListener('keydown', (e) => { if (e.key === 'Enter') tdEjecutarBusqueda(); });

  document.querySelector('#PCD_Clasificar').onclick = cd3EjecutarClasificacion;

  document.querySelector('#PCD_BandejaBuscar').onclick = cd3BuscarFuncionariosBandejaUI;
  document.querySelector('#PCD_BandejaBuscarGlobal').onclick = cd3BuscarFuncionariosGlobalUI;
  document.querySelector('#PCD_Concurrencia').addEventListener('change', (e) => {
    const n = Math.min(50, Math.max(1, Number(e.target.value) || 1));
    CONCURRENCIA_MAXIMA = n;
    e.target.value = n;
  });
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
  const selOrden = document.querySelector('#PCD_OrdenTabla');
  selOrden.value = CD3_ORDEN_ACTUAL;
  selOrden.onchange = (e) => { CD3_ORDEN_ACTUAL = e.target.value; cd3RenderizarResultados(); };
  document.querySelector('#PCD_FiltroRadicadoTerminacion').addEventListener('input', cd3RenderizarResultados);
  document.querySelector('#PCD_ExcluirIdc').addEventListener('input', cd3RenderizarResultados);
  document.querySelectorAll('.cd3-btn-copiar-primeros').forEach(btn => { btn.onclick = () => cd3CopiarPrimerosIdc(Number(btn.dataset.n)); });
  document.querySelector('#PCD_CopiarPrimerosBtn').onclick = () => {
    const n = Number(document.querySelector('#PCD_CopiarPrimerosN').value);
    if (!n || n < 1) return alert('Escribe un número mayor a 0 en "Otro #".');
    cd3CopiarPrimerosIdc(n);
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
  document.querySelector('#PCD_DestinosAdHocLimpiar').onclick = () => { CD3_DESTINOS_ADHOC = []; cd3PintarDestinosAdHoc(); };
  cd3PintarDestinosAdHoc();

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
  document.addEventListener('mousemove', (e) => {
    if (!arrastrando) return;
    // Solo se limita el borde superior (no puede quedar por encima de la
    // ventana, donde perderías el agarre); por izquierda, derecha y abajo sí
    // puede salir, como pediste.
    const y = Math.max(e.clientY - offsetY, 0);
    contenedor.style.left = (e.clientX - offsetX) + 'px'; contenedor.style.top = y + 'px';
  });
  document.addEventListener('mouseup', () => { arrastrando = false; });
}

// ════════════════════════════════════════════════════════════════
// ═══ PESTAÑA 🤖 IA: REASIGNACIÓN MASIVA DESDE TABLA GENERADA POR IA ═══
// Pegar la tabla generada por IA (IDC | dependencia | comentario |
// justificación) → se busca cada dependencia en el catálogo de oficinas de
// ControlDoc (sin tildes, sin mayúsculas y sin palabras vacías), se obtiene
// su jefe y se verifica que el IDC siga en tu bandeja → previsualización →
// reasignar fila por fila o todas las seleccionadas.
//
// Cada IDC puede ir a UNA o VARIAS dependencias (un solo trámite con varios
// destinatarios, igual que "Agregar Todos" en ControlDoc). Si la columna de
// dependencia trae varias separadas por "+" o ";", se cargan todas.
// ════════════════════════════════════════════════════════════════

const CD7_CONCURRENCIA_VALIDACION = 5;  // validaciones simultáneas al cargar la tabla
const CD7_UMBRAL_AUTO = 0.85;            // puntaje mínimo para aceptar el destino sin confirmación
const CD7_MARGEN_AUTO = 0.10;            // ventaja mínima del primer candidato sobre el segundo
const CD7_PUNTAJE_MINIMO = 0.40;         // por debajo de esto un candidato no se ofrece
const CD7_ESPERA_LIMPIEZA_MS = 2000;     // los IDC reasignados con éxito salen de la lista tras 2 segundos
const CD7_PALABRAS_VACIAS = new Set(['DE', 'DEL', 'LA', 'LAS', 'LOS', 'EL', 'Y', 'E', 'EN', 'A', 'PARA', 'POR', 'CON', 'AL']);
const CD7_PALABRAS_TIPO = new Set(['DIRECCION', 'SUBDIRECCION', 'OFICINA', 'GRUPO', 'DESPACHO', 'VICEMINISTERIO', 'VICEMINISTRO', 'SECRETARIA', 'UNIDAD', 'COORDINACION', 'ASESORA']);

let CD7_FILAS = [];
let CD7_CATALOGO = null;   // [{ idOficina, idUnidad, nombre, tipo:[], nucleo:[] }]
let CD7_EN_CURSO = false;

// ── Utilidades ──
function cd7Esc(s) {
  return String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

// Normaliza igual que ControlDoc registra sus dependencias: sin tildes, en
// mayúsculas, sin signos, y sin palabras vacías (DE, LA, Y…).
function cd7Tokens(texto) {
  return cd3Normalizar(texto).replace(/[^A-Z0-9 ]+/g, ' ').split(/\s+/).filter(t => t && !CD7_PALABRAS_VACIAS.has(t));
}

function cd7Separar(tokens) {
  return { tipo: tokens.filter(t => CD7_PALABRAS_TIPO.has(t)), nucleo: tokens.filter(t => !CD7_PALABRAS_TIPO.has(t)) };
}

// Compara el núcleo del nombre (sin "Dirección/Subdirección/Oficina…").
// Tolera nombres truncados en ControlDoc: "TRANSMIS" coincide con "TRANSMISIBLES".
function cd7Puntaje(consulta, cand) {
  const q = consulta.nucleo, c = cand.nucleo;
  if (!q.length || !c.length) return 0;
  const coincide = (a, b) => a === b || (a.length >= 5 && b.length >= 5 && (a.startsWith(b) || b.startsWith(a)));
  const cobertura = q.filter(t => c.some(x => coincide(t, x))).length / q.length;
  const precision = c.filter(t => q.some(x => coincide(t, x))).length / c.length;
  let p = 0.65 * cobertura + 0.35 * precision;
  // "Subdirección" y "Dirección" con el mismo núcleo no son lo mismo.
  if (consulta.tipo.length && cand.tipo.length) p += consulta.tipo[0] === cand.tipo[0] ? 0.05 : -0.10;
  return Math.max(0, Math.min(1, p));
}

async function cd7CargarCatalogo() {
  if (CD7_CATALOGO) return CD7_CATALOGO;
  const resp = await cdFetchGet(CD_CONFIG.urlOficinas);
  const data = await resp.json();
  const vistos = new Set();
  CD7_CATALOGO = (data || [])
    .filter(o => o.IDOFICINAPRODUCTORA != null && o.NOMBRE && String(o.ESTADO || 'SI').toUpperCase() !== 'NO')
    .map(o => ({ idOficina: Number(o.IDOFICINAPRODUCTORA), idUnidad: Number(o.IDUNIDADADMINISTRATIVA), nombre: o.NOMBRE, ...cd7Separar(cd7Tokens(o.NOMBRE)) }))
    .filter(o => { const k = `${o.idUnidad}-${o.idOficina}`; if (vistos.has(k)) return false; vistos.add(k); return true; });
  return CD7_CATALOGO;
}

// Candidatos ordenados por parecido. Las dependencias ya configuradas en
// CONFIG_DEPENDENCIAS reciben un pequeño empujón en caso de empate.
function cd7Candidatos(nombreDependencia, minimo = CD7_PUNTAJE_MINIMO) {
  const consulta = cd7Separar(cd7Tokens(nombreDependencia));
  const configuradas = new Set(Object.values(CONFIG_DEPENDENCIAS).filter(d => d.idOficina != null).map(d => `${d.idUnidad ?? CD2_IDUNIDAD}-${d.idOficina}`));
  return (CD7_CATALOGO || [])
    .map(c => {
      let p = cd7Puntaje(consulta, c);
      if (p > 0 && configuradas.has(`${c.idUnidad}-${c.idOficina}`)) p = Math.min(1, p + 0.05);
      return { ...c, puntaje: p };
    })
    .filter(c => c.puntaje >= minimo)
    .sort((a, b) => b.puntaje - a.puntaje)
    .slice(0, 6);
}

// ── Lectura de la tabla ──
// Acepta: tabla Markdown (con "|"), tabla copiada desde el chat (columnas
// separadas por tabulador) o JSON [{idc, dependencia, comentario, justificacion}].
function cd7ParsearTexto(texto) {
  const t = texto.trim();
  if (!t) return [];
  const limpiar = (s) => String(s ?? '').replace(/\*\*/g, '').trim();
  if (t.startsWith('[') || t.startsWith('{')) {
    let datos = JSON.parse(t);
    if (!Array.isArray(datos)) datos = [datos];
    return datos.map(o => ({
      idc: String(o.idc ?? o.IDC ?? '').replace(/\D/g, ''),
      dependencia: limpiar(Array.isArray(o.dependencia) ? o.dependencia.join(' + ') : (o.dependencia ?? o.DEPENDENCIA)),
      comentario: limpiar(o.comentario ?? o.COMENTARIO), justificacion: limpiar(o.justificacion ?? o.JUSTIFICACION),
    })).filter(f => f.idc);
  }
  const filas = [];
  for (const linea of t.split(/\r?\n/)) {
    let celdas;
    if (linea.includes('|')) celdas = linea.replace(/^\s*\|/, '').replace(/\|\s*$/, '').split('|');
    else if (linea.includes('\t')) celdas = linea.split('\t');
    else continue;
    celdas = celdas.map(limpiar);
    if (celdas.every(c => c === '' || /^:?-{2,}:?$/.test(c))) continue;   // línea separadora
    const idc = (celdas[0] || '').replace(/\D/g, '');
    if (!idc) continue;                                                    // encabezado
    filas.push({ idc, dependencia: celdas[1] || '', comentario: celdas[2] || '', justificacion: celdas.slice(3).join(' | ') });
  }
  return filas;
}

// Varias dependencias en la misma celda: "Dirección X + Subdirección Y" o "X; Y".
function cd7DividirDependencias(texto) {
  return String(texto || '').split(/\s*[+;]\s*/).map(s => s.trim()).filter(Boolean);
}

// ── Destinos de cada fila ──
// Cada destino: { texto, candidatos, sel, confianza, confirmado, jefe }
function cd7NuevoDestino(texto, minimo) {
  const candidatos = cd7Candidatos(texto, minimo);
  const [a, b] = candidatos;
  return {
    texto, candidatos, sel: candidatos.length ? 0 : -1, jefe: null, confirmado: false,
    confianza: a && a.puntaje >= CD7_UMBRAL_AUTO && (!b || a.puntaje - b.puntaje >= CD7_MARGEN_AUTO) ? 'alta' : (a ? 'baja' : 'ninguna'),
  };
}

function cd7Elegido(d) { return d.candidatos[d.sel] || null; }

async function cd7ResolverJefe(d) {
  const o = cd7Elegido(d);
  d.jefe = null;
  if (!o) return;
  try { d.jefe = (await cd2ObtenerJefe(o.idOficina, o.idUnidad)).NOMBRESAPELLIDOS; }
  catch (e) { d.jefe = 'error'; }
}

function cd7CalcularEstado(f) {
  if (f.estado === 'ok') return;
  if (f.enBandeja === false) { f.estado = 'error'; f.mensaje = 'No está pendiente en tu bandeja (ya se tramitó o no está asignado a ti).'; return; }
  if (!f.destinos.length) { f.estado = 'error'; f.mensaje = 'Sin dependencia: agrega una con "➕ Agregar dependencia" o quita la fila.'; return; }
  const sinCoincidencia = f.destinos.findIndex(d => d.sel < 0);
  if (sinCoincidencia !== -1) { f.estado = 'error'; f.mensaje = `Destino ${sinCoincidencia + 1}: no hay una dependencia parecida en ControlDoc. Búscala con 🔎.`; return; }
  const sinJefe = f.destinos.findIndex(d => !d.jefe || d.jefe === 'error');
  if (sinJefe !== -1) { f.estado = 'error'; f.mensaje = `Destino ${sinJefe + 1}: la dependencia no tiene jefe registrado. Elige otra.`; return; }
  const claves = f.destinos.map(d => { const o = cd7Elegido(d); return `${o.idUnidad}-${o.idOficina}`; });
  if (new Set(claves).size !== claves.length) { f.estado = 'revisar'; f.mensaje = 'Hay una dependencia repetida entre los destinos.'; return; }
  if (!f.comentario.trim()) { f.estado = 'revisar'; f.mensaje = 'El comentario está vacío.'; return; }
  const porConfirmar = f.destinos.findIndex(d => d.confianza !== 'alta' && !d.confirmado);
  if (porConfirmar !== -1) { f.estado = 'revisar'; f.mensaje = `Destino ${porConfirmar + 1}: el nombre no coincide exacto, confirma la dependencia en la lista.`; return; }
  f.estado = 'listo'; f.mensaje = '';
}

async function cd7Recalcular(f) {
  cd7CalcularEstado(f); cd7PintarFila(f); cd7PintarResumen();
}

async function cd7ValidarFila(f) {
  f.estado = 'validando'; cd7PintarFila(f);
  f.destinos = cd7DividirDependencias(f.dependencia).map(t => cd7NuevoDestino(t));
  try {
    const reg = await cd2BuscarEnBandeja(f.idc);
    f.enBandeja = true; f.radicado = reg.RADICADO || ''; f.asunto = reg.DESCRIPCION || '';
  } catch (e) { f.enBandeja = false; }
  if (f.radicado == null) await cd7AsegurarDatos(f);   // fuera de la bandeja: se busca igual para mostrar y copiar
  await Promise.all(f.destinos.map(cd7ResolverJefe));
  f.estado = 'pendiente';
  await cd7Recalcular(f);
}

async function cd7CargarTabla() {
  const estado = document.querySelector('#PCD7_Estado');
  let filas;
  try { filas = cd7ParsearTexto(document.querySelector('#PCD7_Texto').value); }
  catch (e) { estado.textContent = '❌ El texto parece JSON pero no es válido: ' + e.message; return; }
  if (!filas.length) { estado.textContent = 'No encontré filas con IDC. Pega la tabla completa, incluido el encabezado.'; return; }

  const vistos = new Set(), duplicados = [];
  CD7_FILAS = filas.filter(f => { if (vistos.has(f.idc)) { duplicados.push(f.idc); return false; } vistos.add(f.idc); return true; })
    .map(f => ({ ...f, incluirJust: document.querySelector('#PCD7_JustTodas').checked, seleccionado: true, destinos: [], enBandeja: null, radicado: null, asunto: null, estado: 'pendiente', mensaje: '' }));

  cd7PintarTodo();
  estado.textContent = '⏳ Cargando el catálogo de dependencias de ControlDoc…';
  try { await cd7CargarCatalogo(); }
  catch (e) { estado.textContent = '❌ No se pudo cargar el catálogo de dependencias: ' + e.message; return; }

  estado.textContent = `⏳ Validando 0/${CD7_FILAS.length}…`;
  await ejecutarConPool(CD7_FILAS.slice(), CD7_CONCURRENCIA_VALIDACION, cd7ValidarFila,
    (hechos, total) => { estado.textContent = `⏳ Validando ${hechos}/${total}…`; });
  estado.textContent = `${CD7_FILAS.length} fila(s) cargadas.` + (duplicados.length ? ` Se omitieron IDC repetidos: ${duplicados.join(', ')}.` : '');
}

// Radicado y asunto del IDC, con el mismo buscador del panel de Seguimiento
// (se usa cuando el documento ya no está en la bandeja).
async function cd7AsegurarDatos(f) {
  if (f.radicado != null && f.asunto != null) return;
  try {
    const doc = await cdBuscarDocumento(String(f.idc));
    f.radicado = doc.RADICADO || ''; f.asunto = doc.DESCRIPCION || '';
  } catch (e) { f.radicado = f.radicado ?? ''; f.asunto = f.asunto ?? ''; }
}

// Quita la fila de la lista (queda sin dependencia y no se reasigna).
function cd7QuitarFila(f) {
  if (['enviando'].includes(f.estado)) return;
  const idx = CD7_FILAS.indexOf(f);
  if (idx === -1) return;
  CD7_FILAS.splice(idx, 1);
  document.querySelector(`#cd7-fila-${f.idc}`)?.remove();
  if (!CD7_FILAS.length) cd7PintarTodo(); else cd7PintarResumen();
  const estado = document.querySelector('#PCD7_Estado');
  if (estado) estado.textContent = `IDC ${f.idc} quitado de la lista.`;
}

// ── Comentario final que se envía ──
function cd7ComentarioFinal(f) {
  let c = f.comentario.trim();
  if (f.incluirJust && f.justificacion.trim()) c += ' ' + f.justificacion.trim();
  const idxSufijo = document.querySelector('#PCD7_Sufijo')?.value;
  if (idxSufijo !== '' && idxSufijo != null) c += ' ' + CD3_COMENTARIOS_REASIGNACION[Number(idxSufijo)].texto;
  if (document.querySelector('#PCD7_Mayus')?.checked) c = c.toUpperCase();
  return c;
}

function cd7NombresDestinos(f) { return f.destinos.map(d => cd7Elegido(d)?.nombre || '?').join(' + '); }

// Igual que en "📊 Result.": la tarjeta queda en verde un momento para que se
// vea el éxito y luego sale sola de la lista.
function cd7ProgramarLimpieza(f) {
  setTimeout(() => {
    if (f.estado !== 'ok' || !CD7_FILAS.includes(f)) return;
    const el = document.querySelector(`#cd7-fila-${f.idc}`);
    if (el) { el.style.transition = 'opacity 0.3s'; el.style.opacity = '0'; }
    setTimeout(() => {
      const idx = CD7_FILAS.indexOf(f);
      if (idx === -1 || f.estado !== 'ok') return;
      CD7_FILAS.splice(idx, 1);
      document.querySelector(`#cd7-fila-${f.idc}`)?.remove();
      if (!CD7_FILAS.length) cd7PintarTodo(); else cd7PintarResumen();
    }, 300);
  }, CD7_ESPERA_LIMPIEZA_MS);
}

// ── Reasignación ──
async function cd7ReasignarFila(f) {
  if (!f.destinos.length || f.estado === 'enviando' || f.estado === 'ok') return;
  const destinos = f.destinos.map(d => { const o = cd7Elegido(d); return { idOficina: o.idOficina, idUnidad: o.idUnidad, nombre: o.nombre }; });
  const comentario = cd7ComentarioFinal(f);
  f.estado = 'enviando'; cd7PintarFila(f);
  try {
    let movio, radicado, asunto, jefes;
    if (destinos.length === 1) {
      const r = await cd2ReasignarADestino(String(f.idc), destinos[0], comentario);
      movio = r.movioBandeja; radicado = r.radicado; asunto = r.asunto; jefes = r.jefe;
    } else {
      const r = await cd2ReasignarADestinos(String(f.idc), destinos, comentario);
      movio = r.movioBandeja; radicado = r.radicado; asunto = r.asunto; jefes = r.destinos.map(d => d.jefe).join(' + ');
    }
    f.estado = movio ? 'ok' : 'fallo';
    f.mensaje = movio ? '' : 'Sigue en tu bandeja: el trámite no se completó.';
    cdBitacoraRegistrar({ accion: destinos.length > 1 ? 'Reasignación multi-destino (tabla IA)' : 'Reasignación (tabla IA)', idc: f.idc, radicado, asunto, destino: destinos.map(d => d.nombre).join(' + '), funcionario: jefes, comentario, resultado: movio ? 'OK' : 'ERROR', detalleResultado: f.mensaje });
    cd3SincronizarTrasAccionExterna(f.idc, movio);
    if (movio) cd7ProgramarLimpieza(f);
  } catch (e) { f.estado = 'fallo'; f.mensaje = e.message; }
  cd7PintarFila(f); cd7PintarResumen();
}

async function cd7ReasignarSeleccionados(soloFallidos = false) {
  if (CD7_EN_CURSO) return;
  const objetivo = CD7_FILAS.filter(f => soloFallidos ? f.estado === 'fallo' : (f.seleccionado && f.estado === 'listo'));
  if (!objetivo.length) return alert(soloFallidos ? 'No hay filas fallidas para reintentar.' : 'No hay filas seleccionadas en estado "Listo".');

  const grupos = {};
  objetivo.forEach(f => { const n = cd7NombresDestinos(f); grupos[n] = (grupos[n] || 0) + 1; });
  const resumen = Object.entries(grupos).map(([n, k]) => `• ${n}: ${k}`).join('\n');
  if (!confirm(`Se reasignarán ${objetivo.length} documento(s):\n\n${resumen}\n\n¿Continuar?`)) return;

  CD7_EN_CURSO = true;
  const estado = document.querySelector('#PCD7_Estado');
  await ejecutarConPool(objetivo, CONCURRENCIA_MAXIMA, cd7ReasignarFila,
    (hechos, total) => { estado.textContent = `⏳ Reasignando ${hechos}/${total}… (${CONCURRENCIA_MAXIMA} a la vez)`; });
  CD7_EN_CURSO = false;
  const ok = objetivo.filter(f => f.estado === 'ok').length;
  estado.textContent = `🏁 ${ok} reasignado(s), ${objetivo.length - ok} con error.`;
}

// ── Interfaz ──
const CD7_ESTILOS_ESTADO = {
  pendiente: { texto: 'En espera', fondo: '#f3f4f6', color: '#6b7280', borde: '#d1d5db' },
  validando: { texto: 'Validando…', fondo: '#dbeafe', color: '#1e40af', borde: '#93c5fd' },
  listo:     { texto: 'Listo', fondo: '#dcfce7', color: '#166534', borde: '#22c55e' },
  revisar:   { texto: 'Revisar', fondo: '#fef3c7', color: '#92400e', borde: '#f59e0b' },
  error:     { texto: 'No se puede reasignar', fondo: '#fee2e2', color: '#991b1b', borde: '#ef4444' },
  enviando:  { texto: 'Reasignando…', fondo: '#ffedd5', color: '#9a3412', borde: '#f97316' },
  ok:        { texto: 'Reasignado', fondo: '#16a34a', color: '#fff', borde: '#16a34a' },
  fallo:     { texto: 'Falló', fondo: '#dc2626', color: '#fff', borde: '#dc2626' },
};

const CD7_ESTILO_AUX = 'padding:3px 7px; font-size:11px; border:none; border-radius:4px; cursor:pointer;';

// Acciones de los botones auxiliares (las mismas que en "📊 Result.").
async function cd7AccionAuxiliar(f, accion, btn) {
  const original = btn.textContent;
  const marcar = (t) => { btn.textContent = t; setTimeout(() => { btn.textContent = original; }, 1000); };
  if (accion.startsWith('copiar-')) {
    if (accion !== 'copiar-idc') await cd7AsegurarDatos(f);
    const valor = accion === 'copiar-idc' ? String(f.idc) : accion === 'copiar-rad' ? String(f.radicado || '') : String(f.asunto || '');
    if (!valor) return alert('Este documento no tiene ese dato disponible.');
    cdCopiarTexto(valor);
    return marcar('✓');
  }
  btn.disabled = true; btn.textContent = '⏳';
  try {
    if (accion === 'ver-pdf') await cdPrevisualizarPdf(f.idc);
    else if (accion === 'descargar-pdf') await cdDescargarPdf(f.idc);
    else if (accion === 'adjuntos') await cdDescargarAdjuntos(f.idc);
    else if (accion === 'pdf-adjuntos') await cd3DescargarPdfYAdjuntosZip(f.idc);
  } catch (e) { alert('No se pudo completar la acción: ' + e.message); }
  finally { btn.disabled = false; btn.textContent = original; }
}

function cd7PintarTodo() {
  const cont = document.querySelector('#PCD7_Lista');
  if (!cont) return;
  cont.innerHTML = CD7_FILAS.length
    ? CD7_FILAS.map(f => `<div id="cd7-fila-${f.idc}"></div>`).join('')
    : '<div style="color:#9ca3af; font-size:12px; padding:10px 0;">Pega una tabla arriba y pulsa "Cargar y validar".</div>';
  CD7_FILAS.forEach(cd7PintarFila);
  cd7PintarResumen();
}

function cd7PintarResumen() {
  const cont = document.querySelector('#PCD7_Resumen');
  if (!cont) return;
  if (!CD7_FILAS.length) { cont.style.display = 'none'; return; }
  cont.style.display = 'flex';
  const cuenta = (e) => CD7_FILAS.filter(f => f.estado === e).length;
  const seleccionListos = CD7_FILAS.filter(f => f.seleccionado && f.estado === 'listo').length;
  document.querySelector('#PCD7_Conteos').innerHTML =
    `${CD7_FILAS.length} en la lista: ✅ ${cuenta('listo')} listos · ⚠️ ${cuenta('revisar')} por revisar · ⛔ ${cuenta('error')} bloqueados · 🚀 ${cuenta('ok')} reasignados · ❌ ${cuenta('fallo')} fallidos`;
  document.querySelector('#PCD7_ReasignarSel').textContent = `🚀 Reasignar seleccionados (${seleccionListos})`;
}

function cd7HtmlDestino(f, d, k, bloqueada) {
  const opciones = d.candidatos.map((c, i) => `<option value="${i}">${cd7Esc(c.nombre)} (${Math.round(c.puntaje * 100)}%)</option>`).join('');
  const jefe = !cd7Elegido(d) ? '' : d.jefe === 'error'
    ? '<span style="color:#dc2626;">Sin jefe registrado</span>'
    : (d.jefe ? `Jefe: ${cd7Esc(d.jefe)}` : '<span style="color:#9ca3af; font-weight:normal;">Buscando jefe…</span>');
  const aviso = d.confianza !== 'alta' && !d.confirmado && d.candidatos.length ? ' <span title="Coincidencia no exacta: confirma eligiendo en la lista" style="color:#d97706;">⚠️</span>' : '';
  return `
    <div style="background:#f9fafb; border-radius:6px; padding:5px 6px; margin-top:5px;">
      <div style="display:flex; gap:4px; align-items:center;">
        <span style="font-size:10px; color:#6b7280; white-space:nowrap;">${f.destinos.length > 1 ? `Destino ${k + 1}` : 'Destino'}${aviso}</span>
        <select class="cd7-destino" data-k="${k}" style="flex:1; min-width:0; padding:4px; font-size:11px; border:1px solid #ccc; border-radius:4px;" ${bloqueada || !d.candidatos.length ? 'disabled' : ''}>
          ${opciones || `<option>Sin coincidencias para "${cd7Esc(d.texto)}"</option>`}
        </select>
        <button class="cd7-buscar" data-k="${k}" title="Buscar esta dependencia por otro nombre" style="padding:3px 7px; font-size:11px; background:#ede9fe; color:#5b21b6; border:none; border-radius:4px; cursor:pointer;" ${bloqueada ? 'disabled' : ''}>🔎</button>
        <button class="cd7-quitar-destino" data-k="${k}" title="${f.destinos.length > 1 ? 'Quitar este destino' : 'Dejar sin dependencia y quitar el IDC de la lista'}" style="padding:3px 7px; font-size:11px; background:#fee2e2; color:#991b1b; border:none; border-radius:4px; cursor:pointer;" ${bloqueada ? 'disabled' : ''}>✕</button>
      </div>
      <div style="font-size:11px; margin-top:3px; color:#1e3a8a; font-weight:bold;">${jefe}</div>
    </div>`;
}

function cd7PintarFila(f) {
  const el = document.querySelector(`#cd7-fila-${f.idc}`);
  if (!el) return;
  const est = CD7_ESTILOS_ESTADO[f.estado] || CD7_ESTILOS_ESTADO.pendiente;
  const bloqueada = ['enviando', 'ok', 'validando'].includes(f.estado);
  const puedeEnviar = f.estado === 'listo' || f.estado === 'fallo';

  el.innerHTML = `
    <div style="border:1px solid #e5e7eb; border-left:4px solid ${est.borde}; border-radius:8px; padding:9px; margin-bottom:8px; background:${f.estado === 'ok' ? '#f0fdf4' : '#fff'};">
      <div style="display:flex; justify-content:space-between; align-items:center; gap:8px;">
        <label style="display:flex; align-items:center; gap:6px; font-weight:bold; font-size:13px; cursor:pointer;">
          <input type="checkbox" class="cd7-sel" ${f.seleccionado ? 'checked' : ''} ${bloqueada ? 'disabled' : ''}> IDC ${cd7Esc(f.idc)}
        </label>
        <div style="display:flex; align-items:center; gap:6px;">
          <span title="${cd7Esc(f.mensaje)}" style="padding:2px 9px; border-radius:10px; font-size:10px; font-weight:bold; background:${est.fondo}; color:${est.color}; white-space:nowrap;">${est.texto}</span>
          <button class="cd7-quitar-fila" title="Dejar sin dependencia y quitar el IDC de la lista" style="padding:2px 7px; font-size:10px; background:#e5e7eb; color:#374151; border:none; border-radius:4px; cursor:pointer;" ${f.estado === 'enviando' ? 'disabled' : ''}>🧹 Quitar</button>
        </div>
      </div>
      <div style="color:#6b7280; font-size:11px; margin-top:2px;">Radicado: ${f.radicado ? cd7Esc(f.radicado) : (f.radicado === null ? '…' : '—')}</div>
      ${f.asunto ? `<div style="font-size:11.5px; margin-top:4px; word-break:break-word; color:#111827;">${cd7Esc(f.asunto)}</div>` : ''}
      <div style="display:flex; flex-wrap:wrap; gap:4px; margin-top:6px;">
        <button class="cd7-aux" data-accion="copiar-idc" title="Copiar IDC" style="${CD7_ESTILO_AUX} background:#e5e7eb;">📋 IDC</button>
        <button class="cd7-aux" data-accion="copiar-rad" title="Copiar Radicado" style="${CD7_ESTILO_AUX} background:#e5e7eb;">📋 Rad</button>
        <button class="cd7-aux" data-accion="copiar-asu" title="Copiar Asunto" style="${CD7_ESTILO_AUX} background:#e5e7eb;">📋 Asu</button>
        <button class="cd7-aux" data-accion="ver-pdf" title="Previsualizar el PDF en una pestaña nueva" style="${CD7_ESTILO_AUX} background:#e5e7eb;">👁 Ver PDF</button>
        <button class="cd7-aux" data-accion="descargar-pdf" title="Descargar solo el PDF del documento" style="${CD7_ESTILO_AUX} background:#e0e7ff; color:#3730a3;">⬇ PDF</button>
        <button class="cd7-aux" data-accion="adjuntos" title="Descargar los adjuntos del documento" style="${CD7_ESTILO_AUX} background:#e0e7ff; color:#3730a3;">📎 Adjuntos</button>
        <button class="cd7-aux" data-accion="pdf-adjuntos" title="Descargar el PDF + los adjuntos, juntos en un solo .zip" style="${CD7_ESTILO_AUX} background:#e0e7ff; color:#3730a3;">📦 PDF + Adj.</button>
      </div>
      <div style="color:#6b7280; font-size:10px; margin-top:6px;">Sugerido por la IA: ${cd7Esc(f.dependencia) || '—'}</div>
      ${f.destinos.map((d, k) => cd7HtmlDestino(f, d, k, bloqueada)).join('')}
      <button class="cd7-agregar-destino" style="margin-top:5px; padding:4px 8px; font-size:11px; background:#eef2ff; color:#3730a3; border:1px dashed #a5b4fc; border-radius:4px; cursor:pointer;" ${bloqueada ? 'disabled' : ''}>➕ Agregar dependencia</button>
      <textarea class="cd7-comentario" rows="2" style="width:100%; margin-top:5px; padding:4px; font-size:11px; border:1px solid #ccc; border-radius:4px; box-sizing:border-box;" ${bloqueada ? 'disabled' : ''}>${cd7Esc(f.comentario)}</textarea>
      <div style="display:flex; justify-content:space-between; align-items:center; gap:6px; margin-top:4px; flex-wrap:wrap;">
        <label title="${cd7Esc(f.justificacion || 'Sin justificación en la tabla')}" style="font-size:11px; color:#4b5563; cursor:pointer; display:flex; align-items:center; gap:4px;">
          <input type="checkbox" class="cd7-just" ${f.incluirJust ? 'checked' : ''} ${bloqueada || !f.justificacion ? 'disabled' : ''}> Agregar justificación al comentario
        </label>
        <button class="cd7-enviar" style="padding:5px 10px; font-size:11px; font-weight:bold; background:#111827; color:#fff; border:none; border-radius:5px; cursor:${puedeEnviar ? 'pointer' : 'not-allowed'}; opacity:${puedeEnviar ? '1' : '0.4'};" ${puedeEnviar ? '' : 'disabled'}>🚀 Reasignar${f.destinos.length > 1 ? ` (${f.destinos.length} destinos)` : ''}</button>
      </div>
      ${f.mensaje ? `<div style="font-size:10.5px; color:${est.color === '#fff' ? est.fondo : est.color}; margin-top:4px;">${cd7Esc(f.mensaje)}</div>` : ''}
    </div>`;

  el.querySelectorAll('.cd7-destino').forEach(sel => {
    const d = f.destinos[Number(sel.dataset.k)];
    if (d.candidatos.length) sel.value = String(d.sel);
    sel.onchange = async () => {
      d.sel = Number(sel.value); d.confirmado = true; d.jefe = null; cd7PintarFila(f);
      await cd7ResolverJefe(d); cd7Recalcular(f);
    };
  });
  el.querySelectorAll('.cd7-buscar').forEach(btn => {
    btn.onclick = async () => {
      const k = Number(btn.dataset.k);
      const texto = prompt('Escribe parte del nombre de la dependencia (sin importar tildes):', f.destinos[k].texto);
      if (!texto || !texto.trim()) return;
      const nuevo = cd7NuevoDestino(texto.trim(), 0.2);
      if (!nuevo.candidatos.length) return alert('Sin coincidencias. Prueba con otra palabra clave del nombre.');
      f.destinos[k] = nuevo; cd7PintarFila(f);
      await cd7ResolverJefe(nuevo); cd7Recalcular(f);
    };
  });
  el.querySelectorAll('.cd7-quitar-destino').forEach(btn => {
    btn.onclick = () => {
      if (f.destinos.length <= 1) return cd7QuitarFila(f);   // sin dependencia → sale de la lista
      f.destinos.splice(Number(btn.dataset.k), 1);
      cd7Recalcular(f);
    };
  });
  el.querySelector('.cd7-agregar-destino').onclick = async () => {
    if (!CD7_CATALOGO) return alert('Primero carga la tabla para traer el catálogo de dependencias.');
    const texto = prompt(`Dependencia adicional para el IDC ${f.idc} (escribe parte del nombre, sin importar tildes):`, '');
    if (!texto || !texto.trim()) return;
    const nuevo = cd7NuevoDestino(texto.trim(), 0.2);
    if (!nuevo.candidatos.length) return alert('Sin coincidencias. Prueba con otra palabra clave del nombre.');
    nuevo.confirmado = true;   // la eligió el usuario a mano
    f.destinos.push(nuevo); cd7PintarFila(f);
    await cd7ResolverJefe(nuevo); cd7Recalcular(f);
  };
  el.querySelectorAll('.cd7-aux').forEach(btn => { btn.onclick = () => cd7AccionAuxiliar(f, btn.dataset.accion, btn); });
  el.querySelector('.cd7-quitar-fila').onclick = () => cd7QuitarFila(f);
  el.querySelector('.cd7-sel').onchange = (e) => { f.seleccionado = e.target.checked; cd7PintarResumen(); };
  el.querySelector('.cd7-just').onchange = (e) => { f.incluirJust = e.target.checked; };
  el.querySelector('.cd7-comentario').addEventListener('input', (e) => {
    const estabaVacio = !f.comentario.trim();
    f.comentario = e.target.value;
    if (estabaVacio !== !f.comentario.trim()) { cd7CalcularEstado(f); cd7PintarResumen(); }
  });
  el.querySelector('.cd7-enviar').onclick = () => {
    const detalle = f.destinos.map((d, k) => `${k + 1}. ${cd7Elegido(d).nombre} — Jefe: ${d.jefe}`).join('\n');
    if (!confirm(`Reasignar el IDC ${f.idc} a:\n${detalle}\n\nComentario:\n${cd7ComentarioFinal(f)}`)) return;
    cd7ReasignarFila(f);
  };
}

function cd7InyectarPestana() {
  const cuerpoGeneral = document.querySelector('#PCD_CuerpoGeneral');
  if (!cuerpoGeneral || document.querySelector('#PCD_CuerpoSec9')) return;
  const div = document.createElement('div');
  div.id = 'PCD_CuerpoSec9';
  div.style.display = 'none';
  div.innerHTML = `
    <p style="color:#6b7280; font-size:11px; margin:0 0 6px;">Pega la tabla que generó la IA, tal cual: en Markdown o copiada directamente de la tabla del chat. Columnas: IDC, dependencia, comentario y justificación (opcional). Si un IDC va a varias dependencias, sepáralas con "+" o ";" en la misma celda. También acepta JSON.</p>
    <textarea id="PCD7_Texto" rows="6" placeholder="| IDC | NOMBRE DEPENDENCIA COMPETENTE | COMENTARIO BREVE | JUSTIFICACIÓN |&#10;|---|---|---|---|&#10;| 2357356 | Subdirección de Salud Ambiental y Cambio Climático | ... | ... |" style="width:100%; padding:6px; border:1px solid #ccc; border-radius:6px; font-size:11px; box-sizing:border-box;"></textarea>
    <div style="display:flex; gap:6px; margin:6px 0;">
      <button id="PCD7_Cargar" style="flex:1; padding:8px; background:#4f46e5; color:#fff; border:none; border-radius:6px; cursor:pointer; font-weight:bold;">📥 Cargar y validar</button>
      <button id="PCD7_Limpiar" style="padding:8px 12px; background:#e5e7eb; border:none; border-radius:6px; cursor:pointer; font-size:12px;">🗑 Limpiar</button>
    </div>
    <div style="display:flex; flex-wrap:wrap; gap:10px; align-items:center; font-size:11px; color:#4b5563; margin-bottom:6px;">
      <label style="cursor:pointer;"><input type="checkbox" id="PCD7_Mayus" checked> Comentario en mayúsculas</label>
      <label style="cursor:pointer;"><input type="checkbox" id="PCD7_JustTodas"> Agregar justificación en todas</label>
      <label>Agregar al final:
        <select id="PCD7_Sufijo" style="padding:3px; font-size:11px; border:1px solid #ccc; border-radius:4px; max-width:220px;">
          <option value="">Nada</option>
          ${CD3_COMENTARIOS_REASIGNACION.map((c, i) => `<option value="${i}">${cd7Esc(cd3TruncarTexto(c.etiqueta, 45))}</option>`).join('')}
        </select>
      </label>
    </div>
    <div id="PCD7_Estado" style="font-size:12px; color:#6b7280; margin-bottom:6px;"></div>
    <div id="PCD7_Resumen" style="display:none; flex-direction:column; gap:6px; padding:8px; background:#f9fafb; border-radius:6px; margin-bottom:8px;">
      <div id="PCD7_Conteos" style="font-size:11px; color:#374151;"></div>
      <div style="display:flex; gap:5px; flex-wrap:wrap;">
        <button id="PCD7_SelListos" style="padding:4px 8px; font-size:11px; background:#e5e7eb; border:none; border-radius:4px; cursor:pointer;">☑ Solo los listos</button>
        <button id="PCD7_SelNinguno" style="padding:4px 8px; font-size:11px; background:#e5e7eb; border:none; border-radius:4px; cursor:pointer;">☐ Ninguno</button>
        <button id="PCD7_QuitarBloqueados" title="Quita de la lista los IDC que no se pueden reasignar" style="padding:4px 8px; font-size:11px; background:#e5e7eb; border:none; border-radius:4px; cursor:pointer;">🧹 Quitar bloqueados</button>
        <button id="PCD7_QuitarReasignados" title="Quita de la lista los IDC ya reasignados" style="padding:4px 8px; font-size:11px; background:#e5e7eb; border:none; border-radius:4px; cursor:pointer;">🧹 Quitar reasignados</button>
        <button id="PCD7_Reintentar" style="padding:4px 8px; font-size:11px; background:#e5e7eb; border:none; border-radius:4px; cursor:pointer;">🔁 Reintentar fallidos</button>
        <button id="PCD7_CopiarPendientes" style="padding:4px 8px; font-size:11px; background:#e5e7eb; border:none; border-radius:4px; cursor:pointer;">📋 Copiar IDC no reasignados</button>
      </div>
      <button id="PCD7_ReasignarSel" style="padding:8px; background:#16a34a; color:#fff; border:none; border-radius:6px; cursor:pointer; font-weight:bold;">🚀 Reasignar seleccionados (0)</button>
    </div>
    <div id="PCD7_Lista" style="max-height:520px; overflow-y:auto;"></div>`;
  cuerpoGeneral.appendChild(div);

  const quitarPorEstado = (estadoObjetivo, etiqueta) => {
    if (CD7_EN_CURSO) return;
    const antes = CD7_FILAS.length;
    CD7_FILAS = CD7_FILAS.filter(f => f.estado !== estadoObjetivo);
    cd7PintarTodo();
    document.querySelector('#PCD7_Estado').textContent = `${antes - CD7_FILAS.length} IDC ${etiqueta} quitados de la lista.`;
  };

  document.querySelector('#PCD7_Cargar').onclick = cd7CargarTabla;
  document.querySelector('#PCD7_Limpiar').onclick = () => {
    if (CD7_EN_CURSO) return;
    CD7_FILAS = []; document.querySelector('#PCD7_Texto').value = ''; document.querySelector('#PCD7_Estado').textContent = ''; cd7PintarTodo();
  };
  document.querySelector('#PCD7_JustTodas').onchange = (e) => {
    CD7_FILAS.forEach(f => { if (f.justificacion && !['ok', 'enviando'].includes(f.estado)) { f.incluirJust = e.target.checked; cd7PintarFila(f); } });
  };
  document.querySelector('#PCD7_SelListos').onclick = () => { CD7_FILAS.forEach(f => { f.seleccionado = f.estado === 'listo'; cd7PintarFila(f); }); cd7PintarResumen(); };
  document.querySelector('#PCD7_SelNinguno').onclick = () => { CD7_FILAS.forEach(f => { f.seleccionado = false; cd7PintarFila(f); }); cd7PintarResumen(); };
  document.querySelector('#PCD7_QuitarBloqueados').onclick = () => quitarPorEstado('error', 'bloqueados');
  document.querySelector('#PCD7_QuitarReasignados').onclick = () => quitarPorEstado('ok', 'ya reasignados');
  document.querySelector('#PCD7_ReasignarSel').onclick = () => cd7ReasignarSeleccionados(false);
  document.querySelector('#PCD7_Reintentar').onclick = () => cd7ReasignarSeleccionados(true);
  document.querySelector('#PCD7_CopiarPendientes').onclick = () => {
    const ids = CD7_FILAS.filter(f => f.estado !== 'ok').map(f => f.idc);
    if (!ids.length) return alert('Todas las filas ya fueron reasignadas.');
    cdCopiarTexto(ids.join('\n'));
    document.querySelector('#PCD7_Estado').textContent = `📋 ${ids.length} IDC copiados.`;
  };
  cd7PintarTodo();
}

// ════════════════════════════════════════════════════════════════
// ═══ INICIALIZACIÓN ═══
// ════════════════════════════════════════════════════════════════
cdCrearPanel();
cd3CrearPanel();
