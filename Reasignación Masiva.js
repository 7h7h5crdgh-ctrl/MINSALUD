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
  revisar:     { etiqueta: '🔎 Por Revisar',     parametros: { 'Bandeja.INSTRUCCION': 'REVISAR', 'Bandeja.PROCESADO': 'NO', 'Bandeja.IDFUNCIONARIOTAREA': '{ID}' } },
  aprobar:     { etiqueta: '✍️ Por Aprobar',     parametros: { 'Bandeja.INSTRUCCION': 'APROBAR', 'Bandeja.PROCESADO': 'NO', 'Bandeja.IDFUNCIONARIOTAREA': '{ID}' } },
  involucrado: { etiqueta: '👥 Involucrado',     parametros: null },
};

// Cuántas reasignaciones/cierres se corren al mismo tiempo en los procesos
// masivos ("Reasignar clasificados" y "Reasignación Manual"). Pediste 5 en
// simultáneo: sube o baja este número aquí si más adelante quieres ajustarlo.
let CONCURRENCIA_MAXIMA = 5;          // documentos a la vez (1 a CONCURRENCIA_TOPE)
const CONCURRENCIA_TOPE = 400;        // máximo permitido en la configuración del panel
// Modo de los procesos masivos (reasignar/cerrar en lote):
//  'paquetes' → envía N documentos juntos, espera a que TODO el paquete termine,
//               hace una pausa y envía el siguiente paquete (más ordenado y
//               menos propenso a saturar el servidor).
//  'continuo' → mantiene siempre N en curso: apenas uno termina, entra otro.
let MODO_MASIVO = 'paquetes';
let PAUSA_ENTRE_PAQUETES_MS = 1000;   // pausa entre paquetes (solo modo 'paquetes')

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

// Envía `items` en paquetes de `tamano`: todos los del paquete salen al mismo
// tiempo (Promise.all), se espera a que terminen, pausa y sigue el siguiente.
// `onProgreso(completados, total, paqueteActual, totalPaquetes)`.
async function ejecutarPorPaquetes(items, tamano, tareaFn, onProgreso, pausaMs = 0) {
  const total = items.length;
  const totalPaquetes = Math.ceil(total / tamano) || 0;
  let completados = 0;
  for (let p = 0; p < totalPaquetes; p++) {
    const paquete = items.slice(p * tamano, (p + 1) * tamano);
    await Promise.all(paquete.map(async (item) => {
      try { await tareaFn(item); }
      finally { completados++; if (onProgreso) onProgreso(completados, total, p + 1, totalPaquetes); }
    }));
    if (pausaMs > 0 && p < totalPaquetes - 1) await new Promise(r => setTimeout(r, pausaMs));
  }
}

// Punto único para todos los procesos masivos que MODIFICAN documentos: usa
// la configuración del panel (modo, documentos a la vez y pausa). Además
// cuenta cuántos documentos están EN CURSO en cada momento, para que el
// indicador muestre "terminados" y "en curso" por separado.
let CD_MASIVO_EN_CURSO = 0;
async function ejecutarMasivo(items, tareaFn, onProgreso) {
  if (typeof cd2InvalidarCacheBandeja === 'function') cd2InvalidarCacheBandeja();   // bandeja fresca para cada lote
  const total = items.length;
  const totalPaquetes = MODO_MASIVO === 'paquetes' ? Math.ceil(total / CONCURRENCIA_MAXIMA) : 0;
  let completados = 0;
  CD_MASIVO_EN_CURSO = 0;
  const avisar = (idx) => {
    const paquete = totalPaquetes ? Math.floor(idx / CONCURRENCIA_MAXIMA) + 1 : 0;
    if (onProgreso) onProgreso(completados, total, paquete, totalPaquetes);
  };
  const envueltos = items.map((item, idx) => ({ item, idx }));
  const tarea = async ({ item, idx }) => {
    CD_MASIVO_EN_CURSO++; avisar(idx);
    try { await tareaFn(item); }
    finally { CD_MASIVO_EN_CURSO--; completados++; avisar(idx); }
  };
  if (MODO_MASIVO === 'paquetes') {
    await ejecutarPorPaquetes(envueltos, CONCURRENCIA_MAXIMA, tarea, null, PAUSA_ENTRE_PAQUETES_MS);
  } else {
    await ejecutarConPool(envueltos, CONCURRENCIA_MAXIMA, tarea, null);
  }
  CD_MASIVO_EN_CURSO = 0;
}

// Texto de progreso común para los procesos masivos: "terminados / total" y,
// aparte, cuántos se están procesando simultáneamente en ese momento.
function textoProgresoMasivo(completados, total, paquete, totalPaquetes) {
  const enCurso = CD_MASIVO_EN_CURSO;
  const paq = MODO_MASIVO === 'paquetes' && totalPaquetes ? ` · paquete ${paquete}/${totalPaquetes}` : '';
  return `⏳ Terminados ${completados}/${total} · 🔄 ${enCurso} procesándose ahora${paq} (máx. ${CONCURRENCIA_MAXIMA} a la vez)`;
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

// Igual que cdParseAspDate pero devuelve el timestamp crudo (o null), para
// poder ORDENAR por fecha de verdad en vez de por el texto ya formateado.
function cdAspDateToMs(str) {
  if (!str) return null;
  const m = /\/Date\((-?\d+)\)\//.exec(str);
  if (!m) return null;
  const ms = parseInt(m[1], 10);
  return ms < 0 ? null : ms;
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

// POST con reintentos: si el servidor responde 500 o una página HTML de error
// (señal de saturación), espera y reintenta en vez de fallar de inmediato.
const CD2_REINTENTOS = 4;
async function cd2Post(url, paramsObj) {
  const body = new URLSearchParams(paramsObj).toString();
  let ultimoError;
  for (let intento = 1; intento <= CD2_REINTENTOS; intento++) {
    try {
      const resp = await fetch(url, {
        method: 'POST', credentials: 'same-origin',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8', 'X-Requested-With': 'XMLHttpRequest' },
        body,
      });
      const texto = await resp.text();
      if (!resp.ok || texto.trim().startsWith('<')) throw new Error(`Servidor saturado (HTTP ${resp.status})`);
      return JSON.parse(texto);
    } catch (e) {
      ultimoError = e;
      if (intento < CD2_REINTENTOS) await new Promise(r => setTimeout(r, 800 * intento + Math.random() * 500));
    }
  }
  throw ultimoError;
}

// ════════════════════════════════════════════════════════════════
// ═══ MODO RÁPIDO: menos peticiones por documento ═══
// Sin modo rápido, cada reasignación hace ~5 peticiones seguidas: buscar en la
// bandeja → jefe → validar → tramitar → verificar. Con modo rápido:
//  · la bandeja se descarga UNA sola vez para todo el lote (no una por IDC),
//  · se omite la validación previa (solo se registraba en consola, no decidía nada),
//  · la verificación final se agrupa: una sola consulta confirma todo el paquete.
// Así cada documento queda prácticamente en UNA petición (tramitar).
// ════════════════════════════════════════════════════════════════
let MODO_RAPIDO = true;
const CD2_TTL_BANDEJA_MS = 60000;
let CD2_CACHE_BANDEJA = null;   // { promesa, ts }
let CD2_VERIF_COLA = null;      // verificación agrupada en curso

function cd2ParamsBandeja(idControl) {
  return {
    sort: '', group: '', filter: '', ESTADOFLUJO: 'SIN INICIAR TRAMITE', TRAMITADO: 'NO',
    ANIO: '', MES: '', DIA: '', IDTIPOLOGIADOCUMENTAL: 0, PRIORIDAD: '', IDCLASE: 0,
    IDCONTROL: idControl, RADICADO: '', TIPOPROCESO: '', IDMODALIDADCONTRATACION: 0,
    IDREGIONAL: 0, IDCENTRO: 0, NUMPROCESO: '', CHCKFECHVENC: 'false', IDFUNCIONARIO_VBG: 0,
    DESCRIPCION: '', ASUNTO: '', FILTROPQR: 'NO',
  };
}

function cd2InvalidarCacheBandeja() { CD2_CACHE_BANDEJA = null; }

// Bandeja completa (una sola descarga compartida por todo el lote), indexada
// por IDC y por radicado. Cada registro se entrega UNA vez y se retira del
// mapa, para que nunca se tramite dos veces el mismo documento con datos viejos.
async function cd2ObtenerMapaBandeja() {
  const ahora = Date.now();
  if (CD2_CACHE_BANDEJA && ahora - CD2_CACHE_BANDEJA.ts < CD2_TTL_BANDEJA_MS) return CD2_CACHE_BANDEJA.promesa;
  const promesa = cd2Post(CD2_CONFIG.urlBandeja, cd2ParamsBandeja(0)).then(data => {
    const mapa = new Map();
    ((data && data.Data) || []).forEach(r => {
      mapa.set(String(r.IDDOCUMENTO), r);
      if (r.RADICADO) mapa.set(String(r.RADICADO), r);
    });
    return mapa;
  });
  CD2_CACHE_BANDEJA = { promesa, ts: ahora };
  promesa.catch(() => { if (CD2_CACHE_BANDEJA && CD2_CACHE_BANDEJA.promesa === promesa) CD2_CACHE_BANDEJA = null; });
  return promesa;
}

// Verificación agrupada: todos los documentos que terminan casi al mismo
// tiempo comparten UNA consulta de la bandeja. true = salió, false = sigue,
// null = no se pudo consultar.
function cd2VerificarEnBloque(id) {
  if (!CD2_VERIF_COLA) {
    let resolver;
    const cola = { promesa: new Promise(r => { resolver = r; }) };
    setTimeout(async () => {
      if (CD2_VERIF_COLA === cola) CD2_VERIF_COLA = null;
      try {
        const data = await cd2Post(CD2_CONFIG.urlBandeja, cd2ParamsBandeja(0));
        const presentes = new Set();
        ((data && data.Data) || []).forEach(r => { presentes.add(String(r.IDDOCUMENTO)); if (r.RADICADO) presentes.add(String(r.RADICADO)); });
        resolver(presentes);
      } catch (e) { resolver(null); }
    }, 400);
    CD2_VERIF_COLA = cola;
  }
  return CD2_VERIF_COLA.promesa.then(presentes => presentes ? !presentes.has(String(id).trim()) : null);
}

// Confirma si el documento salió de tu bandeja: true = salió, false = sigue
// ahí, null = no se pudo verificar (el servidor falló). Un error del servidor
// NO se cuenta como éxito.
async function cd2VerificarSalida(idDocumento) {
  if (MODO_RAPIDO) {
    const r = await cd2VerificarEnBloque(idDocumento);
    if (r !== null) return r;
  }
  try {
    await cd2BuscarEnBandeja(idDocumento, { forzarConsulta: true });
    return false;
  } catch (e) {
    return e.noEncontrado ? true : null;
  }
}

// Mide si ControlDoc atiende de verdad varias peticiones a la vez desde tu
// sesión (solo lectura: consulta la bandeja con un IDC inexistente).
async function cd2MedirSimultaneidad(n) {
  const consulta = () => cd2Post(CD2_CONFIG.urlBandeja, cd2ParamsBandeja(1));
  let t = performance.now();
  await consulta(); await consulta();
  const tUna = (performance.now() - t) / 2;
  t = performance.now();
  await Promise.all(Array.from({ length: n }, consulta));
  const tGrupo = performance.now() - t;
  const factor = tGrupo / tUna;
  return { n, tUna: Math.round(tUna), tGrupo: Math.round(tGrupo), factor, paralelo: factor < n * 0.6 };
}

function cd2Serializar(obj, prefijo, params) {
  params = params || new URLSearchParams();
  if (Array.isArray(obj)) { obj.forEach((v, i) => cd2Serializar(v, `${prefijo}[${i}]`, params)); }
  else if (obj !== null && typeof obj === 'object') {
    Object.entries(obj).forEach(([k, v]) => { cd2Serializar(v, prefijo ? `${prefijo}[${k}]` : k, params); });
  } else { params.append(prefijo, obj === null || obj === undefined ? '' : String(obj)); }
  return params;
}

async function cd2BuscarEnBandeja(idDocumento, { forzarConsulta = false } = {}) {
  if (MODO_RAPIDO && !forzarConsulta) {
    try {
      const mapa = await cd2ObtenerMapaBandeja();
      const clave = String(idDocumento).trim();
      const r = mapa.get(clave);
      if (r) {
        mapa.delete(String(r.IDDOCUMENTO)); if (r.RADICADO) mapa.delete(String(r.RADICADO));
        return r;
      }
    } catch (e) { /* si falla la descarga completa, se consulta el documento suelto */ }
  }
  const data = await cd2Post(CD2_CONFIG.urlBandeja, cd2ParamsBandeja(idDocumento));
  if (!data || !data.Data || !data.Data.length) {
    const err = new Error(`No se encontró el documento ${idDocumento} pendiente en la bandeja (¿ya fue tramitado o no está asignado a ti?)`);
    err.noEncontrado = true;
    throw err;
  }
  return data.Data[0];
}

const cd2CacheJefes = {};
async function cd2ObtenerJefe(idOficina, idUnidad) {
  idUnidad = idUnidad ?? CD2_IDUNIDAD; // funciona tanto si idUnidad es undefined como si es null
  const claveCache = `${idUnidad}-${idOficina}`;
  if (cd2CacheJefes[claveCache]) return cd2CacheJefes[claveCache];
  const promesa = cd2ConsultarJefe(idOficina, idUnidad);
  cd2CacheJefes[claveCache] = promesa;
  promesa.catch(() => { if (cd2CacheJefes[claveCache] === promesa) delete cd2CacheJefes[claveCache]; });
  return promesa;
}

async function cd2ConsultarJefe(idOficina, idUnidad) {
  const params = {
    IDUNIDADADMINISTRATIVA: idUnidad, IDOFICINAPRODUCTORA: idOficina, IDCARGO: 2,
    NOMBRES: '', APELLIDOS: '', ListFuncSel: '[]', ListFuncCop: '[]',
    IDGRUPOTRABAJO: 0, PROCESOSENA: '', PROCEDENCIA: '', BUSCARINACTIVO: 'NO', API: '',
  };
  const url = `${CD2_CONFIG.urlFuncionarios}?${new URLSearchParams(params).toString()}`;
  const resp = await fetch(url, { credentials: 'same-origin', headers: { 'X-Requested-With': 'XMLHttpRequest' } });
  const data = await resp.json();
  if (!data || !data.length) throw new Error(`No se encontró jefe para la oficina ${idOficina}`);
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

  const validacion = MODO_RAPIDO ? { omitida: 'modo rápido' } : await cd2ValidarFuncionario(funcionario);
  console.log(`[CD2] Validación funcionario (${jefe.NOMBRESAPELLIDOS}) para IDC ${idDocumento}:`, validacion);

  const data = await cd2EnviarTramite(registro, [funcionario], comentario);
  console.log(`[CD2] Respuesta TRAMITARENUNSOLOMETODO para IDC ${idDocumento}:`, data);

  // Verificación real de éxito: si el documento ya no aparece en tu bandeja
  // "SIN INICIAR TRAMITE", significa que el trámite sí lo movió de verdad —
  // esto es más confiable que la validación previa, que puede decir
  // "funcionario inactivo" incluso cuando el trámite sí se completa bien.
  const movioBandeja = await cd2VerificarSalida(idDocumento);

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
// Reasigna a VARIOS destinos ya resueltos ({ idOficina, idUnidad, nombre }
// o { funcionario, nombre } para un funcionario específico) en un solo POST —
// igual mecanismo que "Agregar Todos" en el buscador de usuarios nativo. La
// usan tanto cd2ReasignarDocumentoMultiple (destinos de CONFIG_DEPENDENCIAS)
// como el buscador ad-hoc (dependencias o funcionarios encontrados al vuelo).
async function cd2ReasignarADestinos(idDocumento, destinosResueltos, comentario) {
  for (const d of destinosResueltos) {
    if (!d.funcionario && d.idOficina == null) throw new Error(`Falta idOficina para "${d.nombre}".`);
  }
  const registro = await cd2BuscarEnBandeja(idDocumento);

  const destinos = [];
  for (const d of destinosResueltos) {
    // Si el destino es un funcionario específico, se usa tal cual; si es una dependencia, su jefe.
    const jefe = d.funcionario || await cd2ObtenerJefe(d.idOficina, d.idUnidad);
    destinos.push({ d, jefe });
  }

  const listaFuncionarios = destinos.map(({ jefe }) => ({ ...jefe, IDINSTRUCCION: 8, DIAS: false, COMENTARIO: comentario, SELECCIONADO: true }));

  const validaciones = [];
  for (const funcionario of listaFuncionarios) {
    const v = MODO_RAPIDO ? { omitida: 'modo rápido' } : await cd2ValidarFuncionario(funcionario);
    validaciones.push({ nombre: funcionario.NOMBRESAPELLIDOS, validacion: v });
    console.log(`[CD2] Validación funcionario (${funcionario.NOMBRESAPELLIDOS}) para IDC ${idDocumento}:`, v);
  }

  const data = await cd2EnviarTramite(registro, listaFuncionarios, comentario);
  console.log(`[CD2] Respuesta TRAMITARENUNSOLOMETODO (multi-destino) para IDC ${idDocumento}:`, data);

  const movioBandeja = await cd2VerificarSalida(idDocumento);

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
  await ejecutarMasivo(listaIds, async (idRaw) => {
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
  await ejecutarMasivo(listaIds, async (idRaw) => {
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
  const movioBandeja = await cd2VerificarSalida(idDocumento);

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
    cd3CambiarTab('resultados');
  } else {
    CD3_DOCUMENTOS = pendientes.map(doc => {
      const { prediccion, esPriorizacion, confianza } = cd3ClasificarDocumento(doc);
      return {
        idc: doc.IDDOCUMENTO, radicado: doc.RADICADO, asunto: doc.DESCRIPCION || '(sin descripción)',
        // Ambas fechas vienen en el mismo registro de la bandeja: no hace falta pedirlas aparte.
        fechaAsignacion: cdParseAspDate(doc.FECHAASIGNO), fechaRadicacion: cdParseAspDate(doc.FECHARADICO),
        fechaAsignacionMs: cdAspDateToMs(doc.FECHAASIGNO), fechaRadicacionMs: cdAspDateToMs(doc.FECHARADICO),
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

// Aplica el filtro de categoría + terminación de radicado. La usan tanto el
// render de las tarjetas como el botón de "copiar los primeros N IDC".
// Orden por fecha (se aplica al final, sobre lo que haya quedado de los
// filtros de arriba — reordena, no quita documentos). Los que no tengan esa
// fecha van siempre al final, sin importar la dirección elegida.
function cd3OrdenarPorFecha(lista) {
  const orden = document.querySelector('#PCD_OrdenFecha')?.value || 'ninguno';
  if (orden === 'ninguno') return lista;
  const campo = orden.startsWith('asignacion') ? 'fechaAsignacionMs' : 'fechaRadicacionMs';
  const ascendente = orden.endsWith('asc');
  return [...lista].sort((a, b) => {
    const ma = a[campo], mb = b[campo];
    if (ma == null && mb == null) return 0;
    if (ma == null) return 1;
    if (mb == null) return -1;
    return ascendente ? ma - mb : mb - ma;
  });
}

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
  return cd3OrdenarPorFecha(documentosFiltrados);
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
        <button data-idx="${i}" class="cd3-btn-buscar-destino" title="${enviando ? tituloEnviando : 'Abrir la pestaña 🔎 Buscar con este IDC ya listo, para reasignarlo a una dependencia o funcionario fuera de tu lista'}" style="${accionBtn} background:#7c3aed; color:#fff; ${enviando ? 'cursor:not-allowed; opacity:0.5;' : ''}" ${enviando ? 'disabled' : ''}>🔎 Buscar destino</button>
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

  await ejecutarMasivo(tareas, async ({ doc, clave }) => {
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
  }, (completados, total, paquete, totalPaquetes) => {
    if (estado) estado.textContent = textoProgresoMasivo(completados, total, paquete, totalPaquetes);
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
  estado.textContent = textoProgresoMasivo(0, lista.length, 1, Math.ceil(lista.length / CONCURRENCIA_MAXIMA));
  btn.disabled = true;
  btn.style.opacity = '0.6';
  btn.style.cursor = 'not-allowed';

  const resultados = await cd2ReasignarLoteMultiple(lista, clavesSeleccionadas, comentario, (completados, total, paquete, totalPaquetes) => {
    estado.textContent = textoProgresoMasivo(completados, total, paquete, totalPaquetes);
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
// PQRSDF que salen de la competencia de la Dirección y sus subdirecciones —
// o directamente a un funcionario específico (no al jefe de su oficina).
// ════════════════════════════════════════════════════════════════

let CD3_RESULTADOS_OFICINA = [];   // últimas oficinas encontradas

// Destinos elegidos con "📥 Usar para reasignar" (puede haber varios):
// dependencias ({ idOficina, idUnidad, nombre }) o funcionarios ({ funcionario, nombre }).
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
      if (!CD3_DESTINOS_ADHOC.some(d => !d.funcionario && d.idOficina === nuevo.idOficina && d.idUnidad === nuevo.idUnidad)) {
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

// ── Reasignar a un funcionario específico (no al jefe de la oficina) ──
let CD3_RESULTADOS_FUNCIONARIO = [];

// Igual que cd3BuscarFuncionariosGlobal, pero conserva el registro completo,
// que es el que exige TRAMITARENUNSOLOMETODO para asignar.
async function cd3BuscarFuncionariosCrudo(texto) {
  const palabras = texto.trim().toUpperCase().split(/\s+/).filter(p => p.length >= 2);
  if (!palabras.length) return [];
  const clave = palabras.slice().sort((a, b) => b.length - a.length)[0];
  // Mismos parámetros que usa la búsqueda del jefe, incluido BUSCARINACTIVO=NO,
  // para no ofrecer usuarios inactivos como destino.
  const base = { IDUNIDADADMINISTRATIVA: '', IDOFICINAPRODUCTORA: '', IDCARGO: '', ListFuncSel: '[]', ListFuncCop: '[]', IDGRUPOTRABAJO: 0, PROCESOSENA: '', PROCEDENCIA: '', BUSCARINACTIVO: 'NO', API: '' };
  const respuestas = await Promise.allSettled([
    cd3ConsultarFuncionarios({ ...base, NOMBRES: clave, APELLIDOS: '' }),
    cd3ConsultarFuncionarios({ ...base, NOMBRES: '', APELLIDOS: clave }),
  ]);
  if (respuestas.every(r => r.status === 'rejected')) throw respuestas[0].reason;
  const requeridas = palabras.map(cd3Normalizar);
  const vistos = new Set();
  return respuestas
    .flatMap(r => (r.status === 'fulfilled' && Array.isArray(r.value)) ? r.value : [])
    .filter(f => f && f.IDFUNCIONARIO && !vistos.has(Number(f.IDFUNCIONARIO)) && vistos.add(Number(f.IDFUNCIONARIO)))
    .map(f => ({ resumen: cd3ResumirFuncionario(f), crudo: f }))
    .filter(x => { const n = cd3Normalizar(x.resumen.nombre); return requeridas.every(p => n.includes(p)); })
    .sort((a, b) => a.resumen.nombre.localeCompare(b.resumen.nombre, 'es'));
}

async function cd3BuscarFuncionarioDestinoUI() {
  const input = document.querySelector('#PCD_BuscarFuncDestinoTexto');
  const cont = document.querySelector('#PCD_ResultadosFuncDestino');
  const texto = input.value.trim();
  if (texto.replace(/\s+/g, '').length < 2) return alert('Escribe al menos 2 letras del nombre o apellido.');
  cont.innerHTML = '<div style="color:#6b7280; font-size:11px;">⏳ Buscando en toda la entidad...</div>';
  try {
    CD3_RESULTADOS_FUNCIONARIO = await cd3BuscarFuncionariosCrudo(texto);
  } catch (e) {
    cont.innerHTML = `<div style="color:#ea580c; font-size:11px;">❌ ${cdEscaparHtml(e.message)}</div>`;
    return;
  }
  if (!CD3_RESULTADOS_FUNCIONARIO.length) {
    cont.innerHTML = '<div style="color:#9ca3af; font-size:11px;">Sin coincidencias. Prueba con una sola palabra o sin tildes.</div>';
    return;
  }
  const visibles = CD3_RESULTADOS_FUNCIONARIO.slice(0, 20);
  cont.innerHTML = visibles.map(({ resumen: f }, i) => `
    <div style="border:1px solid #e5e7eb; border-radius:6px; padding:6px 8px; margin-bottom:6px; font-size:11px;">
      <div style="font-weight:bold;">${cdEscaparHtml(f.nombre)} <span style="color:#9ca3af; font-weight:normal;">(ID ${f.idFuncionario})</span></div>
      <div style="color:#6b7280;">${cdEscaparHtml(f.cargo)}${f.oficina ? ' · ' + cdEscaparHtml(f.oficina) : ''}</div>
      <button data-idx="${i}" class="cd3-btn-usar-funcionario" style="margin-top:5px; padding:3px 6px; font-size:10px; background:#2563eb; color:#fff; border:none; border-radius:4px; cursor:pointer;">📥 Usar para reasignar</button>
    </div>`).join('') +
    (CD3_RESULTADOS_FUNCIONARIO.length > 20 ? `<div style="font-size:10px; color:#9ca3af;">Se muestran 20 de ${CD3_RESULTADOS_FUNCIONARIO.length}: afina la búsqueda.</div>` : '');

  cont.querySelectorAll('.cd3-btn-usar-funcionario').forEach(btn => {
    btn.onclick = () => {
      const { resumen, crudo } = CD3_RESULTADOS_FUNCIONARIO[Number(btn.dataset.idx)];
      if (!CD3_DESTINOS_ADHOC.some(d => d.funcionario && Number(d.funcionario.IDFUNCIONARIO) === resumen.idFuncionario)) {
        CD3_DESTINOS_ADHOC.push({ nombre: `👤 ${resumen.nombre}${resumen.oficina ? ' — ' + resumen.oficina : ''}`, funcionario: crudo });
      }
      cd3PintarDestinosAdHoc();
      input.value = '';
      cont.innerHTML = '';
      CD3_RESULTADOS_FUNCIONARIO = [];
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

  if (!CD3_DESTINOS_ADHOC.length) return alert('Primero elige al menos un destino arriba (dependencia o funcionario) con "📥 Usar para reasignar".');
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
  await ejecutarMasivo(lista, async (idRaw) => {
    const id = idRaw.trim();
    try {
      const r = await cd2ReasignarADestinos(id, destinos, comentario);
      const funcionarios = r.destinos.map(d => d.jefe).join(' + ');
      cdBitacoraRegistrar({ accion: 'Reasignación (ad-hoc)', idc: id, radicado: r.radicado, asunto: r.asunto, destino: nombreDestinos, funcionario: funcionarios, comentario, resultado: r.movioBandeja ? 'OK' : (r.movioBandeja === null ? 'SIN VERIFICAR' : 'ERROR'), detalleResultado: r.movioBandeja ? '' : (r.movioBandeja === null ? 'El servidor no respondió al verificar: revisar en ControlDoc' : 'No se movió de la bandeja') });
      cd3SincronizarTrasAccionExterna(id, r.movioBandeja);
      if (r.movioBandeja) exitosos++; else fallidos++;
      console.log(r.movioBandeja ? '✅' : '❌', id, '→', nombreDestinos, r.resultado);
    } catch (e) { fallidos++; console.log('❌', id, e.message); }
  }, (completados, total, paquete, totalPaquetes) => { estado.textContent = textoProgresoMasivo(completados, total, paquete, totalPaquetes); });

  btn.disabled = false; btn.style.opacity = '1'; btn.style.cursor = 'pointer'; btn.textContent = textoOriginal;
  estado.textContent = `✅ ${exitosos} exitosos, ❌ ${fallidos} fallidos. Revisa la consola para detalle.`;
  document.querySelector('#PCD_DestinoAdHocIds').value = '';
}

// ════════════════════════════════════════════════════════════════
// ═══ BANDEJA DE TAREAS DOCUMENTALES: lógica (solo lectura) ═══
// ════════════════════════════════════════════════════════════════

const CD4_URL_BANDEJA = 'https://controldoc.minsalud.gov.co/Controldoc//TareasDoc/CargarBandeja';
let CD4_FILAS = [];
let CD4_SELECCIONADA = null;   // paso (IDTAREADOC) de la fila que estás revisando; se resalta en amarillo
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
    // idTarea = el "ID TAREA" de ControlDoc (IDTAREAINICIAL; en Doc Creados coincide con IDTAREADOC); idPaso = IDTAREADOC.
    idTarea: Number(f.IDTAREAINICIAL) > 0 ? f.IDTAREAINICIAL : f.IDTAREADOC, idPaso: f.IDTAREADOC, idc: f.IDDOCUMENTO, conIdc: Number(f.IDDOCUMENTO) > 0,
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
  CD4_SELECCIONADA = null;
  CD4_CARGADA = { lista: clave, cuenta: cuenta.nombre, idFuncionario: cuenta.idFuncionario };
  document.querySelector('#PCD_TareasFiltro').value = '';
  const selSalida = document.querySelector('#PCD_TareasSalida'); if (selSalida) selSalida.value = 'todas';
  cd4RenderizarTabla();
  cd4ContarAdjuntosEnSegundoPlano(CD4_FILAS);
}

// Resalta la fila que estás revisando (cualquier clic dentro de ella, botones incluidos).
function cd4AplicarSeleccion() {
  document.querySelectorAll('#PCD_TareasTabla tr.cd4-fila').forEach(tr => {
    const sel = tr.dataset.clave === CD4_SELECCIONADA;
    tr.style.background = sel ? '#fef9c3' : (tr.dataset.bg || '');
    tr.style.boxShadow = sel ? 'inset 4px 0 0 #eab308' : '';
  });
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
        <tr class="cd4-fila" data-clave="${e(f.idPaso ?? f.idTarea)}" data-bg="${conIndicador && !f.conIdc ? '#fff7f7' : ''}" style="border-bottom:1px solid #e5e7eb; ${f.leido ? '' : 'font-weight:bold;'} ${String(f.idPaso ?? f.idTarea) === CD4_SELECCIONADA ? 'background:#fef9c3; box-shadow:inset 4px 0 0 #eab308;' : (conIndicador && !f.conIdc ? 'background:#fff7f7;' : '')}">
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
  cont.querySelectorAll('tr.cd4-fila').forEach(tr => {
    tr.addEventListener('click', () => { CD4_SELECCIONADA = tr.dataset.clave; cd4AplicarSeleccion(); });
  });
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


// ════════════════════════════════════════════════════════════════
// ═══ 🧭 SEGUIMIENTO Y TRAZABILIDAD de tareas por revisar / por aprobar ═══
// SOLO LECTURA (no aprueba, no devuelve, no envía, no marca como leído).
// Según el HAR del tablero nativo:
//  · Las listas son TareasDoc/CargarBandeja con Bandeja.INSTRUCCION=REVISAR|APROBAR,
//    Bandeja.IDFUNCIONARIOTAREA=<ID> y Bandeja.PROCESADO=NO (ver CD4_LISTAS).
//  · Los contadores del tablero vienen en el HTML de TareasDoc/Bandeja (ids
//    Mi…N_BTDOC) y el ID de tu sesión en su variable "IDUSUARIO".
//  · Cada tarea pertenece a una cadena (IDTAREAINICIAL) con un paso por IDTAREADOC;
//    el flujo completo se pide con el mismo CrearDoc de la pestaña "🧾 Detalle".
// ════════════════════════════════════════════════════════════════
const CD7_URL_TABLERO = 'https://controldoc.minsalud.gov.co/Controldoc//TareasDoc/Bandeja';
const CD7_DIAS_AMARILLO = 3;      // días en tu bandeja desde los que el semáforo pasa a amarillo
const CD7_DIAS_ROJO = 6;          // ... y a rojo (ajústalos a tu criterio)
const CD7_CONCURRENCIA_TRAZA = 3; // consultas de flujo simultáneas al cargar "todas"

let CD7_CONTADORES = null;        // { creados, revisar, revisarExtra, aprobar, firmar, devueltos, involucrados }
let CD7_SESION = { id: null, login: '' };
let CD7_CUENTA = null;            // { idFuncionario, nombre } cuyas tareas se muestran
let CD7_DATOS = { revisar: [], aprobar: [] };
let CD7_LISTA_ACTIVA = 'revisar';
let CD7_MODO_BUSQUEDA = 'fun';    // 'fun' (por funcionario) | 'dep' (por dependencia)
let CD7_TRAZA = {};               // idTarea -> { estado: 'cargando'|'ok'|'error', pasos, error }
let CD7_YA_CARGO = false;
let CD7_SELECCIONADA = null;      // idTarea (paso) de la tarjeta que estás revisando; se resalta en amarillo
let CD7_ERRORES = {};

function cd7Esc(s) { return cdEscaparHtml(s == null ? '' : String(s)); }
function cd7Q(s) { return document.querySelector(s); }

function cd7FechaMs(texto) {   // "dd/mm/yyyy hh:mm[:ss]" -> ms
  const m = /^(\d{1,2})\/(\d{1,2})\/(\d{4})\s+(\d{1,2}):(\d{2})(?::(\d{2}))?$/.exec(texto || '');
  return m ? new Date(+m[3], +m[2] - 1, +m[1], +m[4], +m[5], +(m[6] || 0)).getTime() : null;
}

function cd7Duracion(ms) {
  if (ms == null || ms < 0) return '—';
  const min = Math.floor(ms / 60000);
  if (min < 60) return `${min} min`;
  const h = Math.floor(min / 60);
  if (h < 24) return `${h} h`;
  return `${Math.floor(h / 24)} d ${h % 24} h`;
}

function cd7Semaforo(dias) {
  if (dias == null) return { fondo: '#f3f4f6', color: '#6b7280' };
  if (dias >= CD7_DIAS_ROJO) return { fondo: '#fecaca', color: '#991b1b' };
  if (dias >= CD7_DIAS_AMARILLO) return { fondo: '#fde68a', color: '#92400e' };
  return { fondo: '#dcfce7', color: '#166534' };
}

function cd7ColorEstadoTarea(e) {
  const x = (e || '').toUpperCase();
  if (x.includes('APROB')) return { color: '#166534', fondo: '#dcfce7' };
  if (x.includes('REVIS')) return { color: '#92400e', fondo: '#fef3c7' };
  if (x.includes('DEVOL')) return { color: '#991b1b', fondo: '#fee2e2' };
  if (x.includes('FIRM')) return { color: '#6b21a8', fondo: '#f3e8ff' };
  if (x.includes('PROYEC')) return { color: '#1e40af', fondo: '#dbeafe' };
  return { color: '#374151', fondo: '#f3f4f6' };
}

// ── Datos ──
async function cd7LeerTablero() {
  const resp = await fetch(CD7_URL_TABLERO, { credentials: 'same-origin' });
  if (!resp.ok) throw new Error('HTTP ' + resp.status);
  const html = await resp.text();
  const num = (id) => { const m = new RegExp(`id="${id}"[^>]*>\\s*\\(?(\\d+)\\)?\\s*<`).exec(html); return m ? Number(m[1]) : null; };
  const idSesion = /var\s+IDUSUARIO\s*=\s*parseInt\('(\d+)'\)/.exec(html);
  const login = /var\s+USUARIO\s*=\s*'([^']*)'/.exec(html);
  return {
    contadores: {
      creados: num('MiCreadosN_BTDOC'), revisar: num('MiRevisarN_BTDOC'), revisarExtra: num('MiRevisarExtra_BTDOC'),
      aprobar: num('MiAprobarN_BTDOC'), firmar: num('MiFirmarN_BTDOC'), devueltos: num('MiDevueltosN_BTDOC'),
      involucrados: num('MiInvolucradosN_BTDOC'),
    },
    idSesion: idSesion ? Number(idSesion[1]) : null,
    login: login ? login[1] : '',
  };
}

function cd7ResumirFila(f) {
  const creacion = cd4ExtraerCreacion(f);
  return {
    // idInicial = el "ID TAREA" que muestra ControlDoc; idTarea = el del paso (IDTAREADOC, oculto en esas vistas).
    idTarea: f.IDTAREADOC, idInicial: Number(f.IDTAREAINICIAL) > 0 ? f.IDTAREAINICIAL : f.IDTAREADOC, idc: f.IDDOCUMENTO,
    radicado: f.RADICADO || f.RADICADOSENLACE || '', asunto: f.ASUNTO || '',
    de: f.FUNCIONARIOCREO || '', instruccion: String(f.INSTRUCCION || '').toUpperCase(), estadoTarea: f.ESTADOTAREA || '',
    orden: f.ORDEN, leido: f.LEIDO === true || String(f.LEIDO || '').toUpperCase() === 'SI',
    adjuntos: Number(f.NUMADJUNTOS) || 0, // referencia de la lista; NO es confiable (llega en 0 aunque haya adjuntos): se muestra adjuntosReal
    adjuntosReal: null, adjuntosId: null, // conteo real (null = contando · número · 'error' · 'sin-contar') y el ID del que cuelgan
    numObs: Number(f.NUMOBSERVACION) || 0, obs: String(f.OBSERVACIONES || ''),
    tipoDoc: f.TIPODOC, // 0 = documento Word (D), 1 = Excel (X), 2 = PDF (P); lo usa "Aprobar para firma"
    vence: cd4ParsearFecha(f.FECHAVENCE), creacion, creacionMs: cd7FechaMs(creacion),
    nombreArchivo: f.NOMBREARCHIVO || '', trazaAbierta: false,
  };
}

async function cd7ConsultarLista(clave, idFuncionario) {
  const resp = await fetch(cd4ConstruirUrl(clave, idFuncionario), { credentials: 'same-origin', headers: { 'X-Requested-With': 'XMLHttpRequest' } });
  if (!resp.ok) throw new Error('HTTP ' + resp.status);
  const j = await resp.json();
  const datos = Array.isArray(j) ? j : ((j && (j.Data || j.OBJETOS)) || []);
  return datos.map(cd7ResumirFila);
}

// ── Adjuntos reales ──
// El campo NUMADJUNTOS de la lista llega en 0 aunque haya archivos, así que se
// consulta la misma ventana nativa "Adjuntos" que la pestaña Tareas. Los
// adjuntos cuelgan del ID TAREA (IDTAREAINICIAL); si ahí no hay, se prueba el
// del paso actual (IDTAREADOC), igual que hace el botón 📎.
async function cd7ContarAdjuntosFila(f) {
  const ids = [...new Set([f.idInicial, f.idTarea].filter(Boolean).map(String))];
  let huboError = false;
  for (const id of ids) {
    try {
      const n = (await cd4ObtenerAdjuntos(id)).length;
      if (n > 0) { f.adjuntosReal = n; f.adjuntosId = id; return n; }
    } catch (e) { huboError = true; }
  }
  if (huboError) { f.adjuntosReal = 'error'; f.adjuntosId = null; return 'error'; }
  f.adjuntosReal = 0; f.adjuntosId = null; return 0;
}

// Texto del contador 📎 de la tarjeta según el estado del conteo.
function cd7TextoAdjuntos(f) {
  const n = f.adjuntosReal;
  return typeof n === 'number' ? String(n) : (n === 'error' ? '?' : (n === 'sin-contar' ? '–' : '…'));
}

// Refresca solo el contador y el botón 📎 de esa tarjeta (sin repintar la lista).
function cd7ActualizarAdjuntosEnPantalla(f) {
  const tarjeta = [...document.querySelectorAll('#PCD_SegLista > div[data-idtarea]')].find(el => el.dataset.idtarea === String(f.idTarea));
  if (!tarjeta) return;
  const num = tarjeta.querySelector('.cd7-adj-n'); if (num) num.textContent = '📎 ' + cd7TextoAdjuntos(f);
  const b = tarjeta.querySelector('.cd7-btn-adjuntos'); if (!b) return;
  const e = cd4EstadoBotonAdjuntos(f);
  b.textContent = '📎 ' + e.texto; b.style.background = e.fondo; b.style.color = e.color;
  b.style.cursor = e.activo ? 'pointer' : 'not-allowed'; b.disabled = !e.activo; b.title = e.titulo;
}

async function cd7ContarAdjuntosEnSegundoPlano(filas) {
  const aContar = filas.filter(f => f.adjuntosReal == null);
  aContar.slice(CD4_MAX_CONTEO_ADJUNTOS).forEach(f => { f.adjuntosReal = 'sin-contar'; cd7ActualizarAdjuntosEnPantalla(f); });
  await ejecutarConPool(aContar.slice(0, CD4_MAX_CONTEO_ADJUNTOS), CD4_CONCURRENCIA_ADJUNTOS, async (f) => {
    await cd7ContarAdjuntosFila(f);
    cd7ActualizarAdjuntosEnPantalla(f);
  }, () => {});
}

// ── 📝 Abrir documento y ✍️ Aprobar para firma ──
// Según la captura (HAR) del flujo nativo, aprobar una tarea "Por aprobar"
// con instrucción FIRMAR hace, en este orden: RadicarTarea (asigna el
// radicado oficial) → ActProcesadoSi → RegistrarTareaDoc (crea la tarea
// FIRMAR en la bandeja de firma) → InsertarDestinatarios → y el editor de
// ControlDoc (Editor.aspx, sesión DevExpress) genera el PDF con el radicado.
// Ese último paso solo lo puede hacer el editor; por eso el script NO
// reimplementa esas peticiones: abre la pantalla nativa de la tarea y
// "simula" los clics que haría una persona (Acción → Aprobar → Enviar →
// Instrucción Firmar → Observación → Aceptar), de modo que es el propio
// código de ControlDoc el que radica, genera el PDF y deja el documento en
// la bandeja de firma. Solo queda en manos del usuario el RESUMEN final de
// ControlDoc ("¿Desea continuar?"), porque ese clic radica oficialmente.
const CD7_URL_LEIDO = 'https://controldoc.minsalud.gov.co/Controldoc//TareasDoc/ActualziarLeidoSI';
const CD7_OBSERVACION_FIRMA_DEFAULT = 'VB';
const CD7_ESPERA_EDITOR_MS = 90000;   // tiempo máximo para que cargue el editor de ControlDoc

function cd7TipoDocCodigo(t) {
  const n = Number(t);
  return n === 1 ? 'X' : n === 2 ? 'P' : 'D';
}

// Visible "de verdad": sirve con las ventanas UIkit de ControlDoc (clase uk-open / display).
function cd7Visible(sel) {
  const el = document.querySelector(sel);
  if (!el) return false;
  if (el.classList.contains('uk-open')) return true;
  return getComputedStyle(el).display !== 'none' && getComputedStyle(el).visibility !== 'hidden';
}

function cd7Dormir(ms) { return new Promise(r => setTimeout(r, ms)); }

// Espera a que `cond()` sea verdadera (revisando cada `paso` ms) o falla al agotar el tiempo.
function cd7EsperarA(cond, ms, descripcion, paso = 300) {
  return new Promise((resolver, rechazar) => {
    const t0 = Date.now();
    const revisar = () => {
      let ok = false;
      try { ok = !!cond(); } catch (e) { ok = false; }
      if (ok) return resolver(true);
      if (Date.now() - t0 > ms) return rechazar(new Error(`Tiempo de espera agotado: ${descripcion}`));
      setTimeout(revisar, paso);
    };
    revisar();
  });
}

// Aviso flotante (por encima de las ventanas de ControlDoc) para ir contando
// en qué paso va la aprobación automática.
function cd7Aviso(texto, tipo = 'info') {
  let el = document.querySelector('#CD7_AvisoFirma');
  if (!el) {
    el = document.createElement('div');
    el.id = 'CD7_AvisoFirma';
    el.style.cssText = 'position:fixed; right:20px; bottom:20px; z-index:100002; max-width:380px; padding:10px 12px; border-radius:8px; box-shadow:0 4px 14px rgba(0,0,0,0.3); font-family:sans-serif; font-size:12px; line-height:1.4;';
    document.body.appendChild(el);
  }
  const colores = { info: ['#eff6ff', '#1e3a8a', '#93c5fd'], ok: ['#dcfce7', '#166534', '#22c55e'], aviso: ['#fef3c7', '#92400e', '#f59e0b'], error: ['#fee2e2', '#991b1b', '#ef4444'] }[tipo] || ['#eff6ff', '#1e3a8a', '#93c5fd'];
  el.style.background = colores[0]; el.style.color = colores[1]; el.style.border = `1px solid ${colores[2]}`;
  el.innerHTML = `<div style="display:flex; justify-content:space-between; gap:8px;"><div>${texto}</div><button id="CD7_AvisoFirmaCerrar" style="background:none; border:none; cursor:pointer; font-size:14px; color:inherit;">✕</button></div>`;
  el.querySelector('#CD7_AvisoFirmaCerrar').onclick = () => el.remove();
}

// 📝 Abre la tarea en el editor nativo de ControlDoc (la misma pantalla que
// al hacer clic en la fila de la bandeja) con la instrucción indicada.
async function cd7AbrirDocumentoNativo(fila, instruccion) {
  const jq = window.jQuery;
  if (!jq || !document.querySelector('#page_content_inner')) {
    alert('Para abrir el documento, ten ControlDoc abierto en el "Tablero de Control – Bandeja de Tareas Documentales" y vuelve a pulsar el botón.');
    return false;
  }

  const v = await cd2Post(TD_CONFIG.urlValidar, { IDTAREADOC: fila.idTarea });
  if (!v || !v.RESPUESTA) {
    alert('ControlDoc indica que no se han radicado el/los traslado(s) de esta tarea, así que no permite abrirla todavía.');
    return false;
  }
  try { await cdFetchPost(CD7_URL_LEIDO, { idtareadoc: fila.idTarea }); } catch (e) { /* no impide abrir */ }

  const ruta = (window.GLOBALES && window.GLOBALES.URL) || 'https://controldoc.minsalud.gov.co/Controldoc//';
  if (window.modal_spinner && typeof window.modal_spinner.show === 'function') window.modal_spinner.show();
  jq('#page_content_inner').empty();
  jq('#page_content_inner').load(ruta + 'TareasDoc/CrearDoc', {
    TipoDocumento: cd7TipoDocCodigo(fila.tipoDoc), IdTareaInicial: fila.idInicial, IdTareaActual: fila.idTarea,
    Editar: 'SI', INSTRUCCIONES: instruccion, IDRAD: Number(fila.idc) > 0 ? Number(fila.idc) : 0,
  });
  // Deja la pantalla libre para ver el documento (el panel queda como burbuja).
  document.querySelector('#PCD_MinimizarTodo')?.click();
  return true;
}

// ✍️ Aprobar para firma en UN clic y sin mostrar nada: todo ocurre en una
// copia invisible de ControlDoc (iframe oculto de la misma sesión; ControlDoc
// lo permite: X-Frame-Options SAMEORIGIN). Ahí se carga la tarea, se espera
// al editor (es quien genera el PDF con el radicado), se deja el estado que
// dejaría la ventana "Enviar documento" (Acción APROBAR · instrucción FIRMAR ·
// firmante = usuario de la sesión · observación) y se llama directo a la
// función de ControlDoc que dispara los endpoints del HAR: RadicarTarea →
// ActProcesadoSi → RegistrarTareaDoc → InsertarDestinatarios → guardado del
// PDF. Tu pantalla no cambia: solo ves el aviso de la esquina.
// Si pulsas varias tarjetas, se procesan en fila, una detrás de otra.
const CD7_URL_INICIO = 'https://controldoc.minsalud.gov.co/Controldoc/Home/Index';
let CD7_COLA_FIRMA = Promise.resolve();

// Estado en vivo de cada aprobación (se pinta en la tarjeta mientras ocurre).
// fase: 'cola' | 'proceso' | 'aprobado' | 'error'
const CD7_FASES = {};
const CD7_ESTILO_FASE = {
  cola:     { fondo: '#f3f4f6', color: '#374151', borde: '#d1d5db', tarjeta: '' },
  proceso:  { fondo: '#ffedd5', color: '#9a3412', borde: '#f97316', tarjeta: 'background:#fff7ed; box-shadow:0 0 0 2px #f97316;' },
  aprobado: { fondo: '#dcfce7', color: '#166534', borde: '#22c55e', tarjeta: 'background:#f0fdf4; box-shadow:0 0 0 2px #22c55e;' },
  error:    { fondo: '#fee2e2', color: '#991b1b', borde: '#ef4444', tarjeta: 'background:#fef2f2; box-shadow:0 0 0 2px #ef4444;' },
};

function cd7HtmlFase(idTarea) {
  const f = CD7_FASES[String(idTarea)];
  if (!f) return '';
  const e = CD7_ESTILO_FASE[f.fase] || CD7_ESTILO_FASE.cola;
  return `<div style="margin-top:6px; padding:5px 8px; border-radius:6px; font-size:11px; font-weight:bold; background:${e.fondo}; color:${e.color}; border-left:3px solid ${e.borde};">${f.texto}</div>`;
}

function cd7MarcarFase(fila, fase, texto) {
  CD7_FASES[String(fila.idTarea)] = { fase, texto };
  const tarjeta = [...document.querySelectorAll('#PCD_SegLista > div[data-idtarea]')].find(el => el.dataset.idtarea === String(fila.idTarea));
  if (!tarjeta) return;
  const cont = tarjeta.querySelector('.cd7-fase');
  if (cont) cont.innerHTML = cd7HtmlFase(fila.idTarea);
  const e = CD7_ESTILO_FASE[fase];
  if (e && e.tarjeta) tarjeta.style.cssText += ';' + e.tarjeta;
}

// ── 📬 Seguimiento de lo aprobado: pendiente de firma → firmado ──
// Lo aprobado sale de "Por aprobar", así que se guarda aparte (en este
// navegador) y se revisa su flujo cada cierto tiempo para saber cuándo quedó
// firmado: un paso con instrucción FIRMAR y estado de firma FIRMADO.
const CD7_LS_APROBADOS = 'CD7_APROBADOS_V1';
const CD7_REVISION_FIRMAS_MS = 120000;   // cada 2 minutos mientras haya pendientes de firma
let CD7_APROBADOS = cd7LsLeer(CD7_LS_APROBADOS, []);
let CD7_TIMER_FIRMAS = null;
let CD7_REVISANDO_FIRMAS = false;

function cd7GuardarAprobados() {
  if (CD7_APROBADOS.length > 300) CD7_APROBADOS = CD7_APROBADOS.slice(-300);
  cd7LsEscribir(CD7_LS_APROBADOS, CD7_APROBADOS);
  cd7RenderAprobados();
  cd7ProgramarRevisionFirmas();
}

function cd7RegistrarAprobado(fila, radicado) {
  const previo = CD7_APROBADOS.find(a => String(a.idTarea) === String(fila.idTarea));
  const datos = { idTarea: fila.idTarea, idInicial: fila.idInicial, asunto: fila.asunto, radicado: radicado || '', aprobadoTs: Date.now(), fase: 'en-firma', firmadoTs: null, revisadoTs: null, firmante: '' };
  if (previo) Object.assign(previo, datos); else CD7_APROBADOS.push(datos);
  cd7GuardarAprobados();
}

function cd7EsFirmado(pasos) {
  const firmado = (p) => { const e = String(p.estadoFirma || '').toUpperCase(); return e.includes('FIRMADO') && !e.includes('NO FIRMADO') && !e.includes('SIN FIRMA'); };
  return pasos.find(p => (p.instruccion === 'FIRMAR' && firmado(p)) || p.estadoTarea === 'FIRMADO') || null;
}

async function cd7RevisarFirmas(manual = false) {
  if (CD7_REVISANDO_FIRMAS) return;
  const pendientes = CD7_APROBADOS.filter(a => a.fase === 'en-firma');
  if (!pendientes.length) { if (manual) cd7RenderAprobados('No hay documentos pendientes de firma.'); return; }
  CD7_REVISANDO_FIRMAS = true;
  cd7RenderAprobados(`⏳ Revisando ${pendientes.length} documento(s)…`);
  let nuevosFirmados = 0;
  await ejecutarConPool(pendientes, 2, async (a) => {
    try {
      const pasos = await cd7ObtenerPasos({ idTarea: a.idTarea, idInicial: a.idInicial, instruccion: 'APROBAR' });
      const paso = cd7EsFirmado(pasos);
      const ultimo = pasos[pasos.length - 1];
      a.revisadoTs = Date.now();
      if (ultimo) a.firmante = ultimo.a || a.firmante;
      if (paso) { a.fase = 'firmado'; a.firmadoTs = paso.fechaMs || Date.now(); a.firmante = paso.a || paso.de || a.firmante; nuevosFirmados++; }
    } catch (e) { a.revisadoTs = Date.now(); }
  }, () => {});
  CD7_REVISANDO_FIRMAS = false;
  cd7LsEscribir(CD7_LS_APROBADOS, CD7_APROBADOS);
  cd7RenderAprobados(nuevosFirmados ? `✍️ ${nuevosFirmados} documento(s) recién firmado(s).` : '');
  if (nuevosFirmados) cd7Aviso(`✍️ ${nuevosFirmados} documento(s) aprobado(s) ya quedaron <b>firmados</b>.`, 'ok');
  cd7ProgramarRevisionFirmas();
}

function cd7ProgramarRevisionFirmas() {
  clearTimeout(CD7_TIMER_FIRMAS);
  if (CD7_APROBADOS.some(a => a.fase === 'en-firma')) CD7_TIMER_FIRMAS = setTimeout(() => cd7RevisarFirmas(), CD7_REVISION_FIRMAS_MS);
}

function cd7RenderAprobados(nota = '') {
  const cont = document.querySelector('#PCD_SegAprobados');
  if (!cont) return;
  const lista = CD7_APROBADOS.slice().sort((a, b) => (a.fase === b.fase ? b.aprobadoTs - a.aprobadoTs : (a.fase === 'en-firma' ? -1 : 1)));
  if (!lista.length) { cont.style.display = 'none'; return; }
  cont.style.display = 'block';
  const enFirma = lista.filter(a => a.fase === 'en-firma').length, firmados = lista.length - enFirma;
  const fecha = (ms) => ms ? new Date(ms).toLocaleString('es-CO', { dateStyle: 'short', timeStyle: 'short' }) : '';
  cont.innerHTML = `
    <div style="display:flex; justify-content:space-between; align-items:center; gap:6px; flex-wrap:wrap;">
      <b style="font-size:11.5px;">📬 Aprobados para firma: 🟡 ${enFirma} pendiente(s) · 🟢 ${firmados} firmado(s)</b>
      <div style="display:flex; gap:4px;">
        <button id="PCD_SegRevisarFirmas" style="padding:3px 8px; font-size:10.5px; background:#e5e7eb; border:none; border-radius:4px; cursor:pointer;">🔄 Revisar firmas</button>
        <button id="PCD_SegLimpiarFirmados" style="padding:3px 8px; font-size:10.5px; background:#e5e7eb; border:none; border-radius:4px; cursor:pointer;">🧹 Quitar firmados</button>
      </div>
    </div>
    ${nota ? `<div style="font-size:10.5px; color:#6b7280; margin-top:3px;">${nota}</div>` : ''}
    <div style="max-height:200px; overflow-y:auto; margin-top:5px;">
      ${lista.map(a => `
        <div style="display:flex; justify-content:space-between; align-items:center; gap:6px; padding:4px 6px; margin-top:3px; border-radius:5px; font-size:10.5px; background:${a.fase === 'firmado' ? '#dcfce7' : '#fefce8'};">
          <div style="min-width:0;">
            <b>Tarea ${cd7Esc(a.idInicial)}</b>${a.radicado ? ` · Rad. <span class="cd7-copiar-rad" data-rad="${cd7Esc(a.radicado)}" title="Clic para copiar" style="cursor:copy; text-decoration:underline dotted;">${cd7Esc(a.radicado)}</span>` : ''}
            <div style="color:#6b7280; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${cd7Esc(a.asunto)}</div>
          </div>
          <span style="white-space:nowrap; font-weight:bold; color:${a.fase === 'firmado' ? '#166534' : '#92400e'};">${a.fase === 'firmado' ? `🟢 Firmado ${fecha(a.firmadoTs)}` : `🟡 Pendiente de firma`}</span>
        </div>`).join('')}
    </div>
    <div style="font-size:9.5px; color:#9ca3af; margin-top:3px;">Se revisa solo cada ${CD7_REVISION_FIRMAS_MS / 60000} min mientras haya pendientes.</div>`;
  cont.querySelector('#PCD_SegRevisarFirmas').onclick = () => cd7RevisarFirmas(true);
  cont.querySelector('#PCD_SegLimpiarFirmados').onclick = () => { CD7_APROBADOS = CD7_APROBADOS.filter(a => a.fase !== 'firmado'); cd7GuardarAprobados(); };
  cont.querySelectorAll('.cd7-copiar-rad').forEach(el => { el.onclick = () => { cdCopiarTexto(el.dataset.rad); const o = el.textContent; el.textContent = '✓ copiado'; setTimeout(() => { el.textContent = o; }, 1000); }; });
}
let CD7_FIRMA_PENDIENTES = 0;

async function cd7CrearControlDocOculto() {
  const marco = document.createElement('iframe');
  marco.setAttribute('aria-hidden', 'true');
  // Fuera de la pantalla pero con tamaño real, para que el editor se inicialice igual que visible.
  marco.style.cssText = 'position:fixed; left:-12000px; top:0; width:1400px; height:900px; border:0; opacity:0; pointer-events:none;';
  marco.src = CD7_URL_INICIO;
  document.body.appendChild(marco);
  await cd7EsperarA(() => marco.contentDocument && marco.contentDocument.readyState === 'complete' && marco.contentWindow.jQuery
    && marco.contentDocument.querySelector('#page_content_inner'), 60000, 'ControlDoc en segundo plano');
  await cd7Dormir(2500); // deja terminar lo que ControlDoc carga al iniciar, para que no pise la tarea
  return marco;
}

function cd7ObservacionFirma() {
  const v = (document.querySelector('#PCD_SegObsFirma')?.value || '').trim();
  return v || CD7_OBSERVACION_FIRMA_DEFAULT;
}

function cd7AprobarParaFirma(fila) {
  CD7_FIRMA_PENDIENTES++;
  if (CD7_FIRMA_PENDIENTES > 1) cd7Aviso(`🕒 Tarea ${fila.idInicial} en fila (${CD7_FIRMA_PENDIENTES - 1} antes).`);
  cd7MarcarFase(fila, 'cola', CD7_FIRMA_PENDIENTES > 1 ? `🕒 En fila para aprobar (${CD7_FIRMA_PENDIENTES - 1} antes)` : '🕒 Iniciando aprobación…');
  const tarea = CD7_COLA_FIRMA.then(() => cd7AprobarParaFirmaAhora(fila)).finally(() => { CD7_FIRMA_PENDIENTES--; });
  CD7_COLA_FIRMA = tarea.catch(() => {});
  return tarea;
}

async function cd7AprobarParaFirmaAhora(fila) {
  const obs = cd7ObservacionFirma();
  let marco = null;
  try {
    cd7Aviso(`⏳ Tarea ${fila.idInicial}: preparando la aprobación en segundo plano…`);
    cd7MarcarFase(fila, 'proceso', '⏳ 1/3 · Preparando la aprobación…');
    const v = await cd2Post(TD_CONFIG.urlValidar, { IDTAREADOC: fila.idTarea });
    if (!v || !v.RESPUESTA) throw new Error('ControlDoc indica que no se han radicado el/los traslado(s) de esta tarea');
    try { await cdFetchPost(CD7_URL_LEIDO, { idtareadoc: fila.idTarea }); } catch (e) { /* no impide seguir */ }

    cd7MarcarFase(fila, 'proceso', '⏳ 2/3 · Cargando el documento en segundo plano…');
    marco = await cd7CrearControlDocOculto();
    const W = marco.contentWindow, D = marco.contentDocument;
    const ruta = (W.GLOBALES && W.GLOBALES.URL) || 'https://controldoc.minsalud.gov.co/Controldoc//';
    W.jQuery('#page_content_inner').empty().load(ruta + 'TareasDoc/CrearDoc', {
      TipoDocumento: cd7TipoDocCodigo(fila.tipoDoc), IdTareaInicial: fila.idInicial, IdTareaActual: fila.idTarea,
      Editar: 'SI', INSTRUCCIONES: 'APROBAR', IDRAD: Number(fila.idc) > 0 ? Number(fila.idc) : 0,
    });

    CD7_MOVS.push({ ts: Date.now(), estado: 'PREPARADO', idTarea: fila.idTarea, idInicial: fila.idInicial, asunto: fila.asunto, listaOrigen: 'Por aprobar', accion: 'APROBAR → FIRMAR', destinatario: '', idDestinatario: '', comentario: obs, comentarioPreparado: obs, fechaPaso: '', login: CD7_SESION.login || '', detalle: 'Aprobación para firma enviada desde el panel' });
    cd7GuardarMovs();

    await cd7EsperarA(() => typeof W.TDOC_RADICAR === 'function' && typeof W.TDOC_GUARDARDOC === 'function'
      && typeof W.DefinirDestinatarioMinSalud === 'function' && typeof W.TDOC_SeleccionarAccion === 'function', CD7_ESPERA_EDITOR_MS, 'pantalla de la tarea');
    await cd7EsperarA(() => {
      const f = D.querySelector('#ControlDocCeroPapelPDF');
      return f && f.getAttribute('name') === 'ECP_EditorCeroPapel' && f.contentDocument && f.contentDocument.readyState === 'complete' && f.contentWindow.ASPx;
    }, CD7_ESPERA_EDITOR_MS, 'editor del documento');
    await cd7Dormir(3000); // margen para que el editor termine de inicializarse (en el HAR tardó ~7 s en total)

    // Mismas validaciones que hace ControlDoc antes de enviar.
    if (typeof W.ECP_EXL_VPDF_IDENTIFICAR === 'function' && W.ECP_EXL_VPDF_IDENTIFICAR() !== 'DOC') throw new Error('El editor no tiene seleccionada la última versión en formato DOC');
    if ((W.VPDF_FirmaPdf || W.ECP_TipoPdf) && !W.VPDF_GuardoPdf) throw new Error('ControlDoc pide guardar primero el documento confirmando la inserción de la firma');

    // Las ventanas de ControlDoc (avisos/confirmaciones) no se pueden ver en la copia
    // oculta: se capturan para mostrarlas en el aviso si aparece alguna.
    let mensajeControlDoc = '';
    if (typeof W.CD_modal_alert === 'function') {
      const original = W.CD_modal_alert;
      W.CD_modal_alert = function (titulo, mensaje) { mensajeControlDoc = String(mensaje || titulo || '').replace(/<[^>]+>/g, ' '); return original.apply(this, arguments); };
    }

    // Estado que deja la ventana "Enviar documento" al aceptar (DestinatarioTarea.js + CrearDocReady.js).
    W.TDOC_SeleccionarAccion('A');                 // TDOC_ACCION = 'APROBAR'
    W.DefinirDestinatarioMinSalud();               // firmante = usuario de la sesión
    const dest = W.ETDOC_DESTINATARIO && W.ETDOC_DESTINATARIO[0];
    if (!dest || !dest.IDFUNCIONARIO) throw new Error('ControlDoc no devolvió el firmante de la sesión');
    W.ETDOC_INSTRUCCIONES = 'FIRMAR'; W.ETDOC_INSTRUCCION = true; W.ETDOC_FIRMAR = true;
    W.ETDOC_OBSERVACIONES = obs; W.ETDOC_ENVIAR = true; W.ETDOC_PROCEDENCIA = 'FUNCIONARIOS';
    W.TDOC_FUNCIONARIOTAREA = dest;
    W.TDOC_IDFUNCIONARIOTAREA = dest.IDFUNCIONARIO;
    W.TDOC_NOMBREFUNCIONARIOTAREA = dest.NOMBRESAPELLIDOS;
    W.TDOC_TABLAFUNCIONARIO = 'FUNCIONARIOS';
    W.TDOC_INSTRUCCIONES = 'FIRMAR';
    W.TDOC_OBSERVACIONES = obs;
    W.TDOC_ENVIADO = true;

    cd7Aviso(`⏳ Tarea ${fila.idInicial}: radicando y enviando a la bandeja de firma de ${cd7Esc(dest.NOMBRESAPELLIDOS)}…`);
    cd7MarcarFase(fila, 'proceso', `⏳ 3/3 · Radicando y enviando a firma de ${cd7Esc(dest.NOMBRESAPELLIDOS)}…`);
    W.TDOC_DCDOCUMENTORADICADO = null;
    // Misma rama que ejecuta ControlDoc al confirmar el resumen (TDOC_CONFIRMARGUARDAR).
    if (W.AppLlaves && W.AppLlaves.BANDEJAFLUJOFIRMAS === 'SI') W.TDOC_RADICAR(); else W.TDOC_GUARDARDOC();

    let radicado = '';
    try {
      await cd7EsperarA(() => W.TDOC_DCDOCUMENTORADICADO && W.TDOC_DCDOCUMENTORADICADO.RADICADO, 60000, 'radicado');
      radicado = W.TDOC_DCDOCUMENTORADICADO.RADICADO;
    } catch (e) { /* algunas rutas de ControlDoc no publican el radicado en esa variable */ }
    // Al terminar, ControlDoc cierra el editor y vuelve a la bandeja (dentro de la copia oculta).
    let cerro = true;
    try {
      await cd7EsperarA(() => { const d = marco.contentDocument; return !d || !d.querySelector('#ControlDocCeroPapelPDF'); }, 90000, 'cierre del editor');
    } catch (e) { cerro = false; }
    await cd7Dormir(1500);

    // Confirmación real: la tarea ya no debe estar en "Por aprobar".
    let salio = null;
    try {
      const pendientes = await cd7ConsultarLista('aprobar', CD7_SESION.id || CD7_CUENTA.idFuncionario);
      salio = !pendientes.some(f => String(f.idTarea) === String(fila.idTarea));
    } catch (e) { salio = null; }

    const ult = [...CD7_MOVS].reverse().find(m => m.estado === 'PREPARADO' && String(m.idInicial) === String(fila.idInicial));
    if (ult && radicado) { ult.detalle = `Radicado ${radicado}`; cd7GuardarMovs(); }

    if (salio === true) {
      cd7Aviso(`✅ Tarea ${fila.idInicial}: aprobada${radicado ? ` · radicado <b>${cd7Esc(radicado)}</b>` : ''} y enviada a la bandeja de firma.`, 'ok');
      cd7MarcarFase(fila, 'aprobado', `✅ Aprobado${radicado ? ` · radicado ${cd7Esc(radicado)}` : ''} · 🟡 pendiente de firma`);
      cd7RegistrarAprobado(fila, radicado);
      // La tarjeta queda en verde un momento y luego sale de la lista (pasa a "📬 Aprobados para firma").
      setTimeout(() => { delete CD7_FASES[String(fila.idTarea)]; cd7CargarListas(); }, 2500);
    } else {
      cd7MarcarFase(fila, 'error', `⚠️ ${radicado ? `Radicado ${cd7Esc(radicado)}, pero ` : ''}${salio === false ? 'sigue en "Por aprobar"' : 'sin confirmar'} · revísala`);
      cd7Aviso(`⚠️ Tarea ${fila.idInicial}: ${radicado ? `se radicó (<b>${cd7Esc(radicado)}</b>) pero ` : ''}${salio === false ? 'sigue en "Por aprobar"' : 'no se pudo confirmar si salió de "Por aprobar"'}${!cerro ? ' y ControlDoc no cerró el editor' : ''}.${mensajeControlDoc ? ` Mensaje de ControlDoc: ${cd7Esc(mensajeControlDoc.slice(0, 200))}` : ''} Revísala con 📝 Abrir documento.`, 'aviso');
    }
  } catch (e) {
    cd7Aviso(`❌ Tarea ${fila.idInicial}: ${cd7Esc(e.message)}. No se envió nada.`, 'error');
    cd7MarcarFase(fila, 'error', `❌ ${cd7Esc(e.message)} · no se envió nada`);
  } finally {
    if (marco) setTimeout(() => marco.remove(), 1000);
  }
}

async function cd7CargarListas() {
  const estado = cd7Q('#PCD_SegEstado');
  if (!CD7_CUENTA) return;
  estado.textContent = '⏳ Cargando tareas…';
  CD7_ERRORES = {};
  const claves = ['revisar', 'aprobar'];
  const res = await Promise.allSettled(claves.map(c => cd7ConsultarLista(c, CD7_CUENTA.idFuncionario)));
  res.forEach((r, i) => {
    if (r.status === 'fulfilled') CD7_DATOS[claves[i]] = r.value;
    else { CD7_DATOS[claves[i]] = []; CD7_ERRORES[claves[i]] = r.reason && r.reason.message || 'error'; }
  });
  CD7_TRAZA = {};
  cd7Render();
  cd7ContarAdjuntosEnSegundoPlano([...(CD7_DATOS.revisar || []), ...(CD7_DATOS.aprobar || [])]); // sin esperar: va actualizando cada tarjeta
  const esSesion = !!(CD7_SESION.id && CD7_CUENTA.idFuncionario === CD7_SESION.id);
  if (esSesion && !CD7_ERRORES.revisar && !CD7_ERRORES.aprobar) await cd7ProcesarSnapshot();
}

async function cd7CargarTodo() {
  const estado = cd7Q('#PCD_SegEstado');
  estado.textContent = '⏳ Leyendo el tablero…';
  try {
    const t = await cd7LeerTablero();
    CD7_CONTADORES = t.contadores; CD7_SESION = { id: t.idSesion, login: t.login };
  } catch (e) {
    CD7_CONTADORES = null;
    estado.textContent = '⚠️ No pude leer los contadores del tablero: ' + e.message;
  }
  // Respaldo: la propia página define IDUSUARIO (el mismo ID que usa el tablero nativo en sus listas).
  if (!CD7_SESION.id && Number(window.IDUSUARIO) > 0) CD7_SESION = { id: Number(window.IDUSUARIO), login: String(window.USUARIO || '') };
  if (!CD7_CUENTA && CD7_SESION.id) CD7_CUENTA = { idFuncionario: CD7_SESION.id, nombre: 'Mi sesión' };
  if (!CD7_CUENTA) {
    cd7Render();
    estado.textContent = 'No pude detectar el ID de tu sesión. Busca tu nombre abajo y pulsa "Ver sus tareas".';
    return;
  }
  await cd7CargarListas();
}

async function cd7CambiarCuenta(cuenta) {
  CD7_CUENTA = { idFuncionario: Number(cuenta.idFuncionario), nombre: cuenta.nombre };
  CD7_SELECCIONADA = null;
  CD7_DATOS = { revisar: [], aprobar: [] };
  await cd7CargarListas();
}

// ── Trazabilidad por tarea ──
function cd7ResumirPaso(p) {
  const fecha = cd4ExtraerCreacion(p);
  return {
    orden: Number(p.ORDEN) || 0, idTarea: p.IDTAREADOC,
    estadoTarea: String(p.ESTADOTAREA || '').toUpperCase(), instruccion: String(p.INSTRUCCION || '').toUpperCase(),
    de: p.FUNCIONARIOCREO || '', a: p.FUNCIONARIOTAREA || p.NOMBRESFUNCIONARIOTAREA || '',
    fecha, fechaMs: cd7FechaMs(fecha) ?? (() => { const d = cd4ParsearFecha(p.FECHA); return d ? d.getTime() : null; })(),
    obs: String(p.OBSERVACIONES || ''), motivoDev: String(p.MOTIVODEVOLUCION || ''),
    estadoFirma: p.ESTADOFIRMA || '', tieneArchivo: !!p.NOMBREARCHIVO, nombreArchivo: p.NOMBREARCHIVO || '',
  };
}

async function cd7ObtenerPasos(fila) {
  await tdFetchPost(TD_CONFIG.urlValidar, { IDTAREADOC: fila.idTarea });
  const html = await tdFetchPost(TD_CONFIG.urlCrearDoc, {
    TipoDocumento: 'D', IdTareaInicial: fila.idInicial || fila.idTarea, IdTareaActual: fila.idTarea,
    Editar: 'NO', INSTRUCCIONES: fila.instruccion || 'REVISAR', IDRAD: 0,
  }).then(r => r.text());
  const flujo = tdExtraerFlujoJSON(html);
  if (!flujo.length) throw new Error('Sin flujo (sin permisos o la tarea ya no existe)');
  return flujo.map(cd7ResumirPaso).sort((a, b) => a.orden - b.orden);
}

async function cd7CargarTraza(fila) {
  const actual = CD7_TRAZA[fila.idTarea];
  if (actual && (actual.estado === 'ok' || actual.estado === 'cargando')) return;
  CD7_TRAZA[fila.idTarea] = { estado: 'cargando' };
  cd7RenderLista();
  try {
    CD7_TRAZA[fila.idTarea] = { estado: 'ok', pasos: await cd7ObtenerPasos(fila) };
  } catch (e) {
    CD7_TRAZA[fila.idTarea] = { estado: 'error', error: e.message };
  }
  cd7RenderLista();
}

function cd7ResumenTraza(traza) {
  if (!traza || traza.estado !== 'ok' || !traza.pasos.length) return null;
  const p = traza.pasos, ultimo = p[p.length - 1], primero = p[0];
  return {
    pasos: p.length, enPoderDe: ultimo.a, desdeMs: ultimo.fechaMs,
    tiempoEnPaso: ultimo.fechaMs ? Date.now() - ultimo.fechaMs : null,
    tiempoTotal: primero.fechaMs ? Date.now() - primero.fechaMs : null,
  };
}

function cd7HtmlTraza(traza, fila) {
  if (!traza) return '';
  if (traza.estado === 'cargando') return '<div style="color:#9ca3af; font-size:11px;">⏳ Cargando trazabilidad…</div>';
  if (traza.estado === 'error') return `<div style="color:#dc2626; font-size:11px;">❌ ${cd7Esc(traza.error)}</div>`;
  const pasos = traza.pasos, n = pasos.length;
  return pasos.map((p, i) => {
    const c = cd7ColorEstadoTarea(p.estadoTarea);
    const esActual = i === n - 1;
    const siguiente = pasos[i + 1];
    const duracion = p.fechaMs ? cd7Duracion((siguiente && siguiente.fechaMs ? siguiente.fechaMs : Date.now()) - p.fechaMs) : '—';
    return `
      <div style="display:flex; gap:8px;">
        <div style="display:flex; flex-direction:column; align-items:center; flex-shrink:0; width:14px;">
          <div style="width:10px; height:10px; border-radius:50%; background:${c.color}; margin-top:4px; flex-shrink:0; ${esActual ? `box-shadow:0 0 0 3px ${c.fondo};` : ''}"></div>
          ${i < n - 1 ? '<div style="flex:1; width:2px; background:#e5e7eb; margin-top:2px;"></div>' : ''}
        </div>
        <div style="flex:1; padding-bottom:10px; font-size:11px; min-width:0;">
          <div style="display:flex; justify-content:space-between; flex-wrap:wrap; gap:4px;">
            <span style="color:#9ca3af;">Paso #${p.orden}${esActual ? ' — <b style="color:#111827;">ACTUAL</b>' : ''} · id paso ${cd7Esc(p.idTarea)}</span>
            <span style="padding:1px 7px; border-radius:10px; background:${c.fondo}; color:${c.color}; font-weight:bold; font-size:10px;">${cd7Esc(p.estadoTarea || '—')}</span>
          </div>
          <div style="margin-top:3px;">${cd7Esc(p.de) || '—'} <span style="color:#9ca3af;">→</span> <b>${cd7Esc(p.a) || '—'}</b></div>
          <div style="color:#9ca3af; font-size:10px; margin-top:2px;">${cd7Esc(p.fecha) || '—'} · ${esActual ? 'lleva' : 'duró'} ${duracion}${p.instruccion ? ' · instrucción: ' + cd7Esc(p.instruccion) : ''}${p.estadoFirma ? ' · firma: ' + cd7Esc(p.estadoFirma) : ''}</div>
          ${p.nombreArchivo ? `<div style="margin-top:4px; display:flex; gap:5px;"><button class="cd7-paso-pdf" data-modo="ver" data-archivo="${cd7Esc(p.nombreArchivo)}" title="Ver el PDF de este paso" style="padding:3px 8px; background:#e5e7eb; border:none; border-radius:4px; cursor:pointer; font-size:10px;">👁 Ver PDF</button><button class="cd7-paso-pdf" data-modo="bajar" data-archivo="${cd7Esc(p.nombreArchivo)}" data-nombre="Tarea_${cd7Esc((fila && fila.idInicial) || p.idTarea)}_paso${p.orden}.pdf" title="Descargar el PDF de este paso" style="padding:3px 8px; background:#e5e7eb; border:none; border-radius:4px; cursor:pointer; font-size:10px;">⬇ Descargar</button></div>` : '<div style="margin-top:3px; font-size:10px; color:#9ca3af;">Sin PDF en este paso</div>'}
          ${p.obs ? `<div style="background:#f9fafb; border-left:2px solid ${c.color}; padding:4px 6px; border-radius:4px; margin-top:4px; color:#4b5563; font-size:10.5px;">${cd7Esc(p.obs)}</div>` : ''}
          ${p.motivoDev ? `<div style="background:#fef2f2; border-left:2px solid #dc2626; padding:4px 6px; border-radius:4px; margin-top:4px; color:#991b1b; font-size:10.5px;">Devolución: ${cd7Esc(p.motivoDev)}</div>` : ''}
        </div>
      </div>`;
  }).join('');
}

async function cd7TrazaTodas() {
  const filas = cd7FilasVisibles();
  const progreso = cd7Q('#PCD_SegProgreso');
  if (!filas.length) return;
  progreso.textContent = `⏳ Trazabilidad 0/${filas.length}…`;
  await ejecutarConPool(filas, CD7_CONCURRENCIA_TRAZA, (f) => cd7CargarTraza(f),
    (hechos, total) => { progreso.textContent = `⏳ Trazabilidad ${hechos}/${total}…`; });
  const fallidas = filas.filter(f => (CD7_TRAZA[f.idTarea] || {}).estado === 'error').length;
  progreso.textContent = `✅ Trazabilidad cargada para ${filas.length - fallidas} de ${filas.length} tarea(s)${fallidas ? ` · ❌ ${fallidas} con error (ábrelas una a una para ver el motivo)` : ''}.`;
}

// ── Vista ──
function cd7FilasVisibles() {
  const filas = CD7_DATOS[CD7_LISTA_ACTIVA] || [];
  const q = cd3Normalizar((cd7Q('#PCD_SegFiltro')?.value || '').trim());
  let out = filas.filter(f => !q || cd3Normalizar([f.idTarea, f.idInicial, f.idc, f.radicado, f.asunto, f.de, f.instruccion].join(' ')).includes(q));
  const orden = cd7Q('#PCD_SegOrden')?.value || 'antigua';
  const clave = (f) => orden === 'vence' ? (f.vence ? f.vence.getTime() : null) : f.creacionMs;
  const asc = orden !== 'reciente';
  return [...out].sort((a, b) => {
    const ma = clave(a), mb = clave(b);
    if (ma == null && mb == null) return 0;
    if (ma == null) return 1; if (mb == null) return -1;
    return asc ? ma - mb : mb - ma;
  });
}

function cd7RenderContadores() {
  const el = cd7Q('#PCD_SegContadores'); const c = CD7_CONTADORES;
  if (!el) return;
  const tile = (titulo, valor, extra, color) => `<div style="border:1px solid #e5e7eb; border-top:3px solid ${color}; border-radius:8px; padding:6px 8px; background:#fff;"><div style="font-size:18px; font-weight:bold; color:#111827;">${valor == null ? '—' : valor}${extra ? ` <span style="font-size:12px; color:#f97316;" title="Contador adicional que el tablero muestra junto a Por Revisar">(${extra})</span>` : ''}</div><div style="font-size:10px; color:#6b7280;">${titulo}</div></div>`;
  el.innerHTML = c
    ? tile('Por revisar', c.revisar, c.revisarExtra, '#f59e0b') + tile('Por aprobar', c.aprobar, null, '#f97316') + tile('Creados', c.creados, null, '#2563eb') + tile('Involucrado', c.involucrados, null, '#111827')
    : '<div style="grid-column:1/-1; font-size:11px; color:#9ca3af;">Sin datos del tablero todavía.</div>';
}

function cd7RenderCuenta() {
  const el = cd7Q('#PCD_SegCuenta'); if (!el) return;
  if (!CD7_CUENTA) { el.innerHTML = ''; return; }
  const esSesion = CD7_SESION.id && CD7_CUENTA.idFuncionario === CD7_SESION.id;
  el.innerHTML = esSesion
    ? `👤 Tareas de tu sesión${CD7_SESION.login ? ` (<b>${cd7Esc(CD7_SESION.login)}</b>)` : ''} · ID ${CD7_CUENTA.idFuncionario}`
    : `<span style="background:#fef3c7; color:#92400e; padding:3px 7px; border-radius:4px; font-weight:bold;">👁️ Viendo las tareas de ${cd7Esc(CD7_CUENTA.nombre)} (ID ${CD7_CUENTA.idFuncionario}) — solo lectura</span> <button id="PCD_SegVolverMias" style="padding:2px 8px; background:#e5e7eb; border:none; border-radius:4px; cursor:pointer; font-size:10px;">↩ Volver a las mías</button>`;
  const volver = cd7Q('#PCD_SegVolverMias');
  if (volver) volver.onclick = () => { CD7_SELECCIONADA = null; CD7_CUENTA = CD7_SESION.id ? { idFuncionario: CD7_SESION.id, nombre: 'Mi sesión' } : null; cd7CargarListas(); };
}

// Resalta la tarjeta que estás revisando (cualquier clic dentro de ella, botones incluidos).
function cd7AplicarSeleccion() {
  document.querySelectorAll('#PCD_SegLista > div[data-idtarea]').forEach(el => {
    const sel = el.dataset.idtarea === CD7_SELECCIONADA;
    el.style.background = sel ? '#fef9c3' : '#fff';
    el.style.boxShadow = sel ? '0 0 0 2px #eab308' : '';
    const marca = el.querySelector('.cd7-marca'); if (marca) marca.style.display = sel ? '' : 'none';
  });
}

function cd7RenderLista() {
  const cont = cd7Q('#PCD_SegLista'); const estado = cd7Q('#PCD_SegEstado');
  if (!cont) return;
  const total = (CD7_DATOS[CD7_LISTA_ACTIVA] || []).length;
  const filas = cd7FilasVisibles();
  const etiqueta = CD7_LISTA_ACTIVA === 'revisar' ? 'Por revisar' : 'Por aprobar';
  const puedePreparar = !!(CD7_SESION.id && CD7_CUENTA && CD7_CUENTA.idFuncionario === CD7_SESION.id);
  if (CD7_ERRORES[CD7_LISTA_ACTIVA]) { cont.innerHTML = `<div style="color:#dc2626; font-size:12px;">❌ No se pudo cargar "${etiqueta}": ${cd7Esc(CD7_ERRORES[CD7_LISTA_ACTIVA])}</div>`; return; }
  if (!filas.length) { cont.innerHTML = `<div style="color:#9ca3af; font-size:12px; padding:8px 0;">${total ? 'Ninguna tarea coincide con el filtro.' : `No hay tareas ${etiqueta.toLowerCase()}.`}</div>`; }
  else cont.innerHTML = filas.map((f) => {
    const dias = f.creacionMs ? Math.floor((Date.now() - f.creacionMs) / 86400000) : null;
    const sem = cd7Semaforo(dias);
    const cI = cd7ColorEstadoTarea(f.instruccion);
    const tz = CD7_TRAZA[f.idTarea]; const res = cd7ResumenTraza(tz);
    let vence = '';
    if (f.vence) { const d = Math.ceil((f.vence.getTime() - Date.now()) / 86400000); vence = `<span style="padding:1px 6px; border-radius:4px; font-size:10px; ${d < 0 ? 'background:#fecaca; color:#991b1b;' : 'background:#fde68a; color:#92400e;'}">Vence ${f.vence.toLocaleDateString('es-CO')} · ${d < 0 ? `vencida hace ${-d} d` : `faltan ${d} d`}</span>`; }
    return `
    <div data-idtarea="${cd7Esc(f.idTarea)}" style="border:1px solid #e5e7eb; border-radius:8px; padding:9px; margin-bottom:8px; ${String(f.idTarea) === CD7_SELECCIONADA ? 'background:#fef9c3; box-shadow:0 0 0 2px #eab308;' : 'background:#fff;'} ${f.leido ? '' : 'border-left:4px solid #2563eb;'} ${(CD7_ESTILO_FASE[(CD7_FASES[String(f.idTarea)] || {}).fase] || {}).tarjeta || ''}">
      <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:4px;">
        <span style="font-weight:${f.leido ? 'normal' : 'bold'}; font-size:12px;"><span class="cd7-id-copiar" data-id="${cd7Esc(f.idInicial)}" title="Clic para copiar el ID TAREA (el mismo que muestra ControlDoc)" style="cursor:copy; text-decoration:underline dotted;">Tarea ${cd7Esc(f.idInicial)}</span><span class="cd7-marca" style="${String(f.idTarea) === CD7_SELECCIONADA ? '' : 'display:none;'} background:#eab308; color:#fff; font-size:10px; font-weight:bold; padding:1px 7px; border-radius:8px; margin-left:6px;">👉 Seleccionada</span> <span style="color:#9ca3af; font-weight:normal; font-size:10px;">· paso ${cd7Esc(f.idTarea)}${Number(f.idc) > 0 ? ' · IDC ' + cd7Esc(f.idc) : ''}</span></span>
        <span style="padding:1px 8px; border-radius:10px; background:${cI.fondo}; color:${cI.color}; font-weight:bold; font-size:10px;">${cd7Esc(f.instruccion || f.estadoTarea || '—')}</span>
      </div>
      <div style="margin-top:5px; font-size:12px; word-break:break-word; line-height:1.4;">${cd7Esc(f.asunto)}</div>
      <div style="display:flex; flex-wrap:wrap; gap:6px; align-items:center; margin-top:5px; font-size:10.5px; color:#6b7280;">
        <span>De: <b style="color:#111827;">${cd7Esc(f.de) || '—'}</b></span>
        <span>📅 ${cd7Esc(f.creacion) || '—'}</span>
        <span style="padding:1px 6px; border-radius:4px; background:${sem.fondo}; color:${sem.color}; font-weight:bold;" title="Días desde que llegó a tu bandeja">⏱ ${dias == null ? '—' : dias + ' d en bandeja'}</span>
        ${vence}
        <span class="cd7-adj-n" title="Adjuntos reales de la tarea">📎 ${cd7TextoAdjuntos(f)}</span><span>💬 ${f.numObs}</span>${f.leido ? '' : '<span style="color:#2563eb; font-weight:bold;">● sin leer</span>'}
      </div>
      ${f.obs ? `<div style="background:#eff6ff; border-left:3px solid #2563eb; padding:4px 7px; border-radius:4px; margin-top:5px; font-size:10.5px; color:#1e3a8a;" title="${cd7Esc(f.obs)}">${cd7Esc(f.obs.length > 180 ? f.obs.slice(0, 180) + '…' : f.obs)}</div>` : ''}
      <div class="cd7-fase">${cd7HtmlFase(f.idTarea)}</div>
      ${res ? `<div style="margin-top:5px; font-size:10.5px; color:#374151;">📜 <b>${res.pasos}</b> pasos · en poder de <b>${cd7Esc(res.enPoderDe) || '—'}</b> hace <b>${cd7Duracion(res.tiempoEnPaso)}</b> · total ${cd7Duracion(res.tiempoTotal)}</div>` : ''}
      <div style="display:flex; flex-wrap:wrap; gap:4px; margin-top:6px;">
        <button class="cd7-btn-copiar" data-id="${cd7Esc(f.idTarea)}" data-campo="idInicial" title="Copiar el ID TAREA (el mismo que muestra ControlDoc)" style="padding:3px 7px; font-size:11px; background:#e5e7eb; border:none; border-radius:4px; cursor:pointer;">📋 IDT</button>
        <button class="cd7-btn-copiar" data-id="${cd7Esc(f.idTarea)}" data-campo="idTarea" title="Copiar el ID del paso actual (IDTAREADOC)" style="padding:3px 7px; font-size:11px; background:#e5e7eb; border:none; border-radius:4px; cursor:pointer;">📋 Paso</button>
        ${Number(f.idc) > 0 ? `<button class="cd7-btn-copiar" data-id="${cd7Esc(f.idTarea)}" data-campo="idc" title="Copiar IDC" style="padding:3px 7px; font-size:11px; background:#e5e7eb; border:none; border-radius:4px; cursor:pointer;">📋 IDC</button>` : ''}
        <button class="cd7-btn-copiar" data-id="${cd7Esc(f.idTarea)}" data-campo="asunto" title="Copiar asunto" style="padding:3px 7px; font-size:11px; background:#e5e7eb; border:none; border-radius:4px; cursor:pointer;">📋 Asu</button>
      </div>
      <div style="display:flex; flex-wrap:wrap; gap:6px; margin-top:7px;">
        <button class="cd7-btn-traza" data-id="${cd7Esc(f.idTarea)}" style="padding:6px 11px; background:#ea580c; color:#fff; border:none; border-radius:5px; cursor:pointer; font-size:12px; font-weight:600;">📜 ${f.trazaAbierta ? 'Ocultar' : 'Trazabilidad'}</button>
        <button class="cd7-btn-pdf" data-id="${cd7Esc(f.idTarea)}" ${f.nombreArchivo ? '' : 'disabled'} style="padding:6px 11px; background:#e5e7eb; border:none; border-radius:5px; cursor:${f.nombreArchivo ? 'pointer' : 'not-allowed'}; font-size:12px; font-weight:600;${f.nombreArchivo ? '' : ' opacity:0.5;'}">👁 Ver PDF</button>
        <button class="cd7-btn-bajar-pdf" data-id="${cd7Esc(f.idTarea)}" ${f.nombreArchivo ? '' : 'disabled'} style="padding:6px 11px; background:#e5e7eb; border:none; border-radius:5px; cursor:${f.nombreArchivo ? 'pointer' : 'not-allowed'}; font-size:12px; font-weight:600;${f.nombreArchivo ? '' : ' opacity:0.5;'}">⬇ PDF</button>
        ${(() => { const e = cd4EstadoBotonAdjuntos(f); return `<button class="cd7-btn-adjuntos" data-id="${cd7Esc(f.idTarea)}" title="${cd7Esc(e.titulo)}" ${e.activo ? '' : 'disabled'} style="padding:6px 11px; background:${e.fondo}; color:${e.color}; border:none; border-radius:5px; cursor:${e.activo ? 'pointer' : 'not-allowed'}; font-size:12px; font-weight:600;">📎 ${e.texto}</button>`; })()}
        ${puedePreparar ? `<button class="cd7-btn-abrir-doc" data-id="${cd7Esc(f.idTarea)}" title="Abre esta tarea en el editor de ControlDoc (la misma pantalla de la bandeja)" style="padding:6px 11px; background:#0f766e; color:#fff; border:none; border-radius:5px; cursor:pointer; font-size:12px; font-weight:600;">📝 Abrir documento</button>` : ''}
        ${puedePreparar && (CD7_LISTA_ACTIVA === 'aprobar' || f.instruccion === 'APROBAR') ? `<button class="cd7-btn-aprobar-firma" data-id="${cd7Esc(f.idTarea)}" title="Un clic: aprueba y envía a la bandeja de firma en segundo plano (radica directo, sin abrir nada)" style="padding:6px 11px; background:#16a34a; color:#fff; border:none; border-radius:5px; cursor:pointer; font-size:12px; font-weight:600;">✍️ Aprobar para firma</button>` : ''}
        ${puedePreparar ? `<button class="cd7-btn-preparar" data-id="${cd7Esc(f.idTarea)}" style="padding:6px 11px; background:#7c3aed; color:#fff; border:none; border-radius:5px; cursor:pointer; font-size:12px; font-weight:600;">📤 Preparar envío</button>` : ''}
      </div>
      ${f.trazaAbierta ? `<div style="margin-top:8px; padding:8px; background:#fafafa; border-radius:6px;">${cd7HtmlTraza(tz, f) || '<div style="color:#9ca3af; font-size:11px;">Pulsa de nuevo para cargar.</div>'}</div>` : ''}
    </div>`;
  }).join('');

  const porId = (id) => (CD7_DATOS[CD7_LISTA_ACTIVA] || []).find(f => String(f.idTarea) === String(id));
  cont.querySelectorAll('.cd7-btn-traza').forEach(b => { b.onclick = async () => {
    const f = porId(b.dataset.id); if (!f) return;
    f.trazaAbierta = !f.trazaAbierta;
    if (f.trazaAbierta) { const z = CD7_TRAZA[f.idTarea]; if (!z || z.estado === 'error') { if (z) delete CD7_TRAZA[f.idTarea]; await cd7CargarTraza(f); return; } }
    cd7RenderLista();
  }; });
  cont.querySelectorAll('.cd7-btn-pdf').forEach(b => { b.onclick = async () => {
    const f = porId(b.dataset.id); if (!f || !f.nombreArchivo) return;
    const original = b.textContent; b.textContent = '⏳ Abriendo…'; b.disabled = true;
    try { const url = await tdObtenerPdfBlobUrl(f.nombreArchivo); if (url) window.open(url, '_blank'); else alert('No se encontró el PDF de esta tarea.'); }
    catch (e) { alert('No se pudo abrir el PDF: ' + e.message); }
    finally { b.textContent = original; b.disabled = false; }
  }; });
  cont.querySelectorAll('.cd7-btn-copiar').forEach(b => { b.onclick = () => {
    const f = porId(b.dataset.id); if (!f) return;
    cdCopiarTexto(String(f[b.dataset.campo] || ''));
    const o = b.textContent; b.textContent = '✓'; setTimeout(() => { b.textContent = o; }, 1000);
  }; });

  [...cont.children].filter(el => el.dataset && el.dataset.idtarea).forEach(el => {
    el.addEventListener('click', () => { CD7_SELECCIONADA = el.dataset.idtarea; cd7AplicarSeleccion(); });
  });
  const retro = (el, ok) => { const o = el.textContent; el.textContent = ok; setTimeout(() => { el.textContent = o; }, 1000); };
  cont.querySelectorAll('.cd7-id-copiar').forEach(s => { s.onclick = () => { cdCopiarTexto(String(s.dataset.id)); retro(s, '✓ copiado'); }; });
  cont.querySelectorAll('.cd7-btn-bajar-pdf').forEach(b => { b.onclick = () => { const f = porId(b.dataset.id); if (f && f.nombreArchivo) cd7Ocupado(b, '⏳ Descargando…', () => cd7BajarPdf(f.nombreArchivo, `Tarea_${f.idInicial}${f.orden ? '_paso' + f.orden : ''}.pdf`)); }; });
  cont.querySelectorAll('.cd7-btn-adjuntos').forEach(b => { b.onclick = () => { const f = porId(b.dataset.id); if (f) cd7Ocupado(b, '⏳ Consultando…', () => cd7MostrarAdjuntos(f)); }; });
  cont.querySelectorAll('.cd7-btn-abrir-doc').forEach(b => { b.onclick = () => { const f = porId(b.dataset.id); if (f) cd7Ocupado(b, '⏳ Abriendo…', () => cd7AbrirDocumentoNativo(f, f.instruccion === 'APROBAR' || CD7_LISTA_ACTIVA === 'aprobar' ? 'APROBAR' : 'REVISAR')); }; });
  cont.querySelectorAll('.cd7-btn-aprobar-firma').forEach(b => { b.onclick = () => { const f = porId(b.dataset.id); if (f) cd7Ocupado(b, '⏳ Aprobando…', () => cd7AprobarParaFirma(f)); }; });
  cont.querySelectorAll('.cd7-btn-preparar').forEach(b => { b.onclick = () => { const f = porId(b.dataset.id); if (f) cd7AbrirPreparacion(f); }; });
  cont.querySelectorAll('.cd7-paso-pdf').forEach(b => { b.onclick = () => cd7Ocupado(b, '⏳', () => b.dataset.modo === 'ver' ? cd7AbrirPdf(b.dataset.archivo) : cd7BajarPdf(b.dataset.archivo, b.dataset.nombre)); });

  if (estado && !CD7_ERRORES[CD7_LISTA_ACTIVA]) {
    const c = CD7_CONTADORES, esSesion = CD7_SESION.id && CD7_CUENTA && CD7_CUENTA.idFuncionario === CD7_SESION.id;
    const delTablero = c ? (CD7_LISTA_ACTIVA === 'revisar' ? c.revisar : c.aprobar) : null;
    const aviso = esSesion && delTablero != null && delTablero !== total ? ` · ⚠️ el tablero marca ${delTablero} pero la lista trajo ${total}` : '';
    estado.textContent = `${etiqueta}: ${filas.length} de ${total}${aviso}`;
  }
}

function cd7Render() {
  cd7RenderContadores(); cd7RenderCuenta(); cd7RenderMovs();
  const n = (k) => (CD7_DATOS[k] || []).length;
  document.querySelectorAll('.cd7-lista-btn').forEach(b => {
    const activa = b.dataset.lista === CD7_LISTA_ACTIVA;
    b.textContent = `${b.dataset.lista === 'revisar' ? '🔎 Por Revisar' : '✍️ Por Aprobar'} (${n(b.dataset.lista)})`;
    b.style.background = activa ? '#ea580c' : '#e5e7eb'; b.style.color = activa ? '#fff' : '#111827';
  });
  cd7RenderLista();
}

function cd7Excel() {
  const filas = cd7FilasVisibles();
  if (!filas.length) return alert('No hay tareas en la lista actual para exportar.');
  const esc = (s) => String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const lista = CD7_LISTA_ACTIVA === 'revisar' ? 'Por revisar' : 'Por aprobar';
  const cuerpo = filas.map(f => {
    const dias = f.creacionMs ? Math.floor((Date.now() - f.creacionMs) / 86400000) : '';
    const r = cd7ResumenTraza(CD7_TRAZA[f.idTarea]);
    return `<tr><td>${lista}</td><td>${esc(f.idInicial)}</td><td>${esc(f.idTarea)}</td><td>${Number(f.idc) > 0 ? esc(f.idc) : ''}</td><td>${esc(f.radicado)}</td><td>${esc(f.asunto)}</td><td>${esc(f.de)}</td><td>${esc(f.instruccion)}</td><td>${esc(f.creacion)}</td><td>${dias}</td><td>${f.vence ? esc(f.vence.toLocaleDateString('es-CO')) : ''}</td><td>${typeof f.adjuntosReal === 'number' ? f.adjuntosReal : ''}</td><td>${f.numObs}</td><td>${f.leido ? 'SÍ' : 'NO'}</td><td>${r ? r.pasos : ''}</td><td>${r ? esc(r.enPoderDe) : ''}</td><td>${r ? esc(cd7Duracion(r.tiempoEnPaso)) : ''}</td></tr>`;
  }).join('');
  const html = `<html><head><meta charset="UTF-8"></head><body><table border="1"><tr><th>Lista</th><th>ID Tarea (el de ControlDoc)</th><th>ID del paso (IDTAREADOC)</th><th>IDC</th><th>Radicado</th><th>Asunto</th><th>De</th><th>Instrucción</th><th>Creación</th><th>Días en bandeja</th><th>Vence</th><th>Adjuntos</th><th>Observaciones (n)</th><th>Leído</th><th>Pasos (si cargó trazabilidad)</th><th>En poder de</th><th>Tiempo en el paso actual</th></tr>${cuerpo}</table></body></html>`;
  cd4DescargarBlob(new Blob([html], { type: 'application/vnd.ms-excel' }), `Seguimiento_${lista.replace(' ', '_')}_${new Date().toISOString().slice(0, 10)}.xls`);
}

// ── Buscadores: por funcionario y por dependencia (con su jefe) ──
async function cd7ListarJefes(idOficina, idUnidad) {
  const data = await cd3ConsultarFuncionarios({ IDUNIDADADMINISTRATIVA: idUnidad, IDOFICINAPRODUCTORA: idOficina, IDCARGO: 2, NOMBRES: '', APELLIDOS: '' });
  return (data || []).map(cd3ResumirFuncionario).filter(f => f.idFuncionario);
}

function cd7PintarModo() {
  document.querySelectorAll('.cd7-modo-btn').forEach(b => {
    const activo = b.dataset.modo === CD7_MODO_BUSQUEDA;
    b.style.background = activo ? '#ea580c' : '#e5e7eb'; b.style.color = activo ? '#fff' : '#111827';
  });
  const inp = cd7Q('#PCD_SegBuscarTexto');
  if (inp) inp.placeholder = CD7_MODO_BUSQUEDA === 'fun' ? 'Nombre o apellido del funcionario…' : 'Nombre de la dependencia, dirección, subdirección o grupo…';
}

// ════════════════════════════════════════════════════════════════
// ═══ Seguimiento: botones por tarea, PDF por paso, preparar envío y REGISTRO de movimientos ═══
// El envío a revisión/aprobación NO se replica desde aquí: en ControlDoc cada envío genera un
// archivo nuevo del documento mediante un postback del editor (ViewState + estado del editor),
// y eso no se puede reproducir con seguridad. En su lugar: "📤 Preparar envío" deja listos
// destinatario y comentario (copiables) y el REGISTRO guarda cada movimiento; cuando haces el
// envío en ControlDoc y pulsas 🔄 Actualizar, el movimiento se detecta y se confirma solo con
// los datos reales (destinatario, instrucción y comentario del paso nuevo).
// ════════════════════════════════════════════════════════════════
const CD7_COMENTARIOS_ENVIO = {
  REVISAR: 'Cordial saludo, remito para revisión en lo que corresponda antes de dar salida.',
  APROBAR: 'Cordial saludo, remito para su aprobación en lo que corresponda antes de dar salida.',
};
const CD7_LS_MOVS = 'CD7_MOVIMIENTOS_V1';
const CD7_LS_SNAPSHOT = 'CD7_SNAPSHOT_V1';
const CD7_MAX_MOVS = 1000;

function cd7LsLeer(clave, defecto) { try { const t = localStorage.getItem(clave); return t ? JSON.parse(t) : defecto; } catch (e) { return defecto; } }
function cd7LsEscribir(clave, valor) { try { localStorage.setItem(clave, JSON.stringify(valor)); return true; } catch (e) { return false; } }
let CD7_MOVS = cd7LsLeer(CD7_LS_MOVS, []);

async function cd7Ocupado(btn, textoOcupado, fn) {
  const original = btn.textContent; btn.textContent = textoOcupado; btn.disabled = true;
  try { await fn(); } catch (e) { alert('No se pudo completar la acción: ' + e.message); }
  finally { btn.textContent = original; btn.disabled = false; }
}

async function cd7AbrirPdf(nombreArchivo) {
  const url = await tdObtenerPdfBlobUrl(nombreArchivo);
  if (!url) throw new Error('No se encontró el PDF de esta versión.');
  window.open(url, '_blank');
}

async function cd7BajarPdf(nombreArchivo, nombreSalida) {
  const url = await tdObtenerPdfBlobUrl(nombreArchivo);
  if (!url) throw new Error('No se encontró el PDF de esta versión.');
  const blob = await (await fetch(url)).blob();
  cd4DescargarBlob(blob, nombreSalida);
}

// Los adjuntos de una cadena cuelgan de su tarea inicial (así los pide el editor nativo).
async function cd7MostrarAdjuntos(fila) {
  if (!fila.adjuntosId) await cd7ContarAdjuntosFila(fila); // vuelve a contar (también recupera un conteo fallido)
  cd7ActualizarAdjuntosEnPantalla(fila);
  await cd4MostrarAdjuntos(fila.adjuntosId || String(fila.idInicial || fila.idTarea));
}

// Copia los ID de tarea de los primeros N de la vista actual (respeta filtro y orden).
function cd7CopiarPrimeros(n) {
  const estado = cd7Q('#PCD_SegCopiarEstado');
  const filas = cd7FilasVisibles();
  if (!filas.length) { estado.style.color = '#dc2626'; estado.textContent = 'No hay tareas en la vista actual.'; return; }
  const tomadas = filas.slice(0, n);
  cdCopiarTexto([...new Set(tomadas.map(f => f.idInicial))].join('\n'));
  estado.style.color = '#16a34a';
  estado.textContent = tomadas.length < n
    ? `✅ Copiados ${tomadas.length} ID de tarea (la vista solo tenía ${tomadas.length}).`
    : `✅ Copiados los primeros ${tomadas.length} ID de tarea de la vista.`;
}

// ── Registro de movimientos (persiste en este navegador) ──
function cd7GuardarMovs() {
  if (CD7_MOVS.length > CD7_MAX_MOVS) CD7_MOVS = CD7_MOVS.slice(-CD7_MAX_MOVS);
  cd7LsEscribir(CD7_LS_MOVS, CD7_MOVS);
  cd7RenderMovs();
}

function cd7RenderMovs() {
  const n = cd7Q('#PCD_SegMovsN'), lista = cd7Q('#PCD_SegMovsLista');
  if (n) n.textContent = String(CD7_MOVS.length);
  if (!lista) return;
  const icono = { PREPARADO: '📝', CONFIRMADO: '✅', DETECTADO: '🔎' };
  lista.innerHTML = CD7_MOVS.length
    ? CD7_MOVS.slice(-8).reverse().map(m => `<div style="font-size:10.5px; padding:3px 0; border-bottom:1px solid #f3f4f6;">${icono[m.estado] || '•'} <b>${cd7Esc(m.estado)}</b> · ${cd7Esc(new Date(m.ts).toLocaleString('es-CO'))} · tarea ${cd7Esc(m.idInicial || m.idTarea)}${m.accion ? ' → ' + cd7Esc(m.accion) : ''}${m.destinatario ? ' a <b>' + cd7Esc(m.destinatario) + '</b>' : ''}</div>`).join('')
    : '<div style="font-size:11px; color:#9ca3af;">Aún no hay movimientos registrados.</div>';
}

function cd7ExcelMovimientos() {
  if (!CD7_MOVS.length) return alert('Aún no hay movimientos en el registro.');
  const esc = (s) => String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const filas = CD7_MOVS.map(m => `<tr><td>${esc(new Date(m.ts).toLocaleString('es-CO'))}</td><td>${esc(m.estado)}</td><td>${esc(m.idInicial || m.idTarea)}</td><td>${esc(m.idTarea)}</td><td>${esc(m.asunto)}</td><td>${esc(m.listaOrigen)}</td><td>${esc(m.accion)}</td><td>${esc(m.destinatario)}</td><td>${esc(m.idDestinatario)}</td><td>${esc(m.comentario)}</td><td>${esc(m.comentarioPreparado)}</td><td>${esc(m.fechaPaso)}</td><td>${esc(m.login)}</td><td>${esc(m.detalle)}</td></tr>`).join('');
  const html = `<html><head><meta charset="UTF-8"></head><body><table border="1"><tr><th>Fecha de registro</th><th>Estado</th><th>ID Tarea (el de ControlDoc)</th><th>ID del paso (IDTAREADOC)</th><th>Asunto</th><th>Lista de origen</th><th>Acción / instrucción</th><th>Destinatario</th><th>ID destinatario</th><th>Comentario (real si está confirmado)</th><th>Comentario preparado</th><th>Fecha del paso en ControlDoc</th><th>Usuario de la sesión</th><th>Detalle</th></tr>${filas}</table></body></html>`;
  cd4DescargarBlob(new Blob([html], { type: 'application/vnd.ms-excel' }), `Movimientos_Tareas_${new Date().toISOString().slice(0, 10)}.xls`);
}

function cd7MinFila(f, lista) {
  return { idTarea: f.idTarea, idInicial: f.idInicial, orden: f.orden, instruccion: f.instruccion, asunto: f.asunto, lista };
}

// Una tarea que estaba en tu bandeja y ya no está = movimiento. Se lee el paso nuevo de su
// cadena para registrar a quién se envió, con qué instrucción y con qué comentario REALES.
function cd7RegistrarSalida(s, siguiente, error) {
  const preparado = [...CD7_MOVS].reverse().find(m => m.estado === 'PREPARADO' && String(m.idInicial) === String(s.idInicial));
  const real = siguiente ? {
    accion: siguiente.estadoTarea || siguiente.instruccion || '', destinatario: siguiente.a || '', comentario: siguiente.obs || '', fechaPaso: siguiente.fecha || '',
  } : { accion: '', destinatario: '', comentario: '', fechaPaso: '' };
  const detalle = error ? `No se pudo leer el flujo: ${error}` : (siguiente ? '' : 'La tarea salió de tu bandeja y no hay un paso siguiente visible (verifícala en ControlDoc).');
  if (preparado) {
    Object.assign(preparado, real, { estado: 'CONFIRMADO', detalle, ts: preparado.ts });
  } else {
    CD7_MOVS.push({ ts: Date.now(), estado: 'DETECTADO', idTarea: s.idTarea, idInicial: s.idInicial, asunto: s.asunto, listaOrigen: s.lista, ...real, idDestinatario: '', comentarioPreparado: '', login: CD7_SESION.login || '', detalle });
  }
}

async function cd7DetectarMovimientos(salidas) {
  const progreso = cd7Q('#PCD_SegProgreso');
  progreso.textContent = `⏳ Detectando ${salidas.length} movimiento(s)…`;
  let registrados = 0;
  await ejecutarConPool(salidas, CD7_CONCURRENCIA_TRAZA, async (s) => {
    let pasos = null, error = '';
    try { pasos = await cd7ObtenerPasos({ idTarea: s.idTarea, idInicial: s.idInicial, instruccion: s.instruccion }); } catch (e) { error = e.message; }
    const orden = Number(s.orden) || 0;
    const posteriores = pasos ? pasos.filter(p => orden > 0 ? p.orden > orden : String(p.idTarea) !== String(s.idTarea)).sort((a, b) => b.orden - a.orden) : [];
    if (!error && !posteriores.length) return;   // sin paso nuevo: no es un movimiento real (lectura incompleta)
    cd7RegistrarSalida(s, posteriores[0] || null, error);
    registrados++;
  }, () => {});
  cd7GuardarMovs();
  progreso.textContent = registrados ? `✅ ${registrados} movimiento(s) detectado(s) y guardado(s) en el registro.` : '';
}

async function cd7ProcesarSnapshot() {
  const progreso = cd7Q('#PCD_SegProgreso');
  const actuales = [...CD7_DATOS.revisar.map(f => cd7MinFila(f, 'Por revisar')), ...CD7_DATOS.aprobar.map(f => cd7MinFila(f, 'Por aprobar'))];
  // El contador del tablero puede incluir tareas que la lista no trae (p. ej. pretareas), así
  // que ya no se bloquea por esa diferencia: cada salida se confirma leyendo su flujo y solo
  // se registra si de verdad hay un paso nuevo.
  const previo = cd7LsLeer(CD7_LS_SNAPSHOT, null);
  if (previo && previo.cuenta === CD7_CUENTA.idFuncionario) {
    const ahora = new Set(actuales.map(f => String(f.idTarea)));
    const salidas = (previo.filas || []).filter(f => !ahora.has(String(f.idTarea)));
    if (salidas.length) await cd7DetectarMovimientos(salidas);
  }
  cd7LsEscribir(CD7_LS_SNAPSHOT, { cuenta: CD7_CUENTA.idFuncionario, ts: Date.now(), filas: actuales });
}

// ── Preparar envío (destinatario + comentario editable + registro) ──
function cd7AbrirPreparacion(fila) {
  document.querySelector('#PCD_ModalEnvio')?.remove();
  let accion = 'REVISAR', destino = null, comentarioTocado = false, modo = 'fun', guardado = false;
  const modal = document.createElement('div');
  modal.id = 'PCD_ModalEnvio';
  modal.style.cssText = 'position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.4); z-index:100001; display:flex; align-items:center; justify-content:center;';
  modal.innerHTML = `
    <div style="background:#fff; border-radius:8px; padding:16px; width:540px; max-height:88vh; overflow-y:auto; font-size:12px;">
      <div style="display:flex; justify-content:space-between; margin-bottom:8px;">
        <b>📤 Preparar envío — Tarea ${cd7Esc(fila.idInicial || fila.idTarea)}</b>
        <button id="PCD_EnvioCerrar" style="background:none; border:none; font-size:16px; cursor:pointer;">✕</button>
      </div>
      <div style="background:#fff7ed; border:1px solid #fed7aa; border-radius:6px; padding:6px 8px; font-size:10.5px; color:#7c2d12; margin-bottom:8px;">
        ControlDoc genera un archivo nuevo del documento en cada envío, desde su editor; por eso el envío se hace en la bandeja nativa (<b>Acción → Revisar/Aprobar</b>). Aquí dejas listo el destinatario y el comentario, y queda en el registro: al pulsar 🔄 Actualizar después de enviarlo, el movimiento se confirma solo con los datos reales.
      </div>
      <div style="margin-bottom:8px; color:#374151;">${cd7Esc(fila.asunto.length > 170 ? fila.asunto.slice(0, 170) + '…' : fila.asunto)}</div>
      <div style="margin-bottom:4px; font-weight:bold; color:#6b7280;">Acción</div>
      <div style="display:flex; gap:6px; margin-bottom:8px;">
        <button class="cd7-env-acc" data-acc="REVISAR" style="flex:1; padding:6px; border:none; border-radius:5px; cursor:pointer; font-weight:bold;">🔎 Revisar</button>
        <button class="cd7-env-acc" data-acc="APROBAR" style="flex:1; padding:6px; border:none; border-radius:5px; cursor:pointer; font-weight:bold;">✍️ Aprobar</button>
      </div>
      <div style="margin-bottom:4px; font-weight:bold; color:#6b7280;">Destinatario</div>
      <div style="display:flex; gap:4px; margin-bottom:4px;">
        <button class="cd7-env-modo" data-modo="fun" style="padding:4px 9px; border:none; border-radius:4px; cursor:pointer; font-size:11px; font-weight:bold;">👤 Por funcionario</button>
        <button class="cd7-env-modo" data-modo="dep" style="padding:4px 9px; border:none; border-radius:4px; cursor:pointer; font-size:11px; font-weight:bold;">🏢 Por dependencia (su jefe)</button>
      </div>
      <div style="display:flex; gap:6px;">
        <input id="PCD_EnvioBuscarTexto" type="text" style="flex:1; padding:5px; border:1px solid #ccc; border-radius:4px; font-size:11px;">
        <button id="PCD_EnvioBuscarBtn" style="padding:4px 12px; background:#374151; color:#fff; border:none; border-radius:4px; cursor:pointer; font-size:11px;">Buscar</button>
      </div>
      <div id="PCD_EnvioResultados" style="max-height:160px; overflow-y:auto;"></div>
      <div id="PCD_EnvioDestino" style="margin:8px 0; padding:6px 8px; background:#f3f4f6; border-radius:6px; color:#6b7280;">Aún no has elegido destinatario.</div>
      <div style="margin-bottom:4px; font-weight:bold; color:#6b7280;">Comentario (puedes editarlo)</div>
      <textarea id="PCD_EnvioComentario" rows="3" style="width:100%; padding:6px; border:1px solid #ccc; border-radius:6px; box-sizing:border-box;"></textarea>
      <div style="display:flex; gap:6px; flex-wrap:wrap; margin-top:8px;">
        <button id="PCD_EnvioCopiarComentario" style="padding:6px 10px; background:#e5e7eb; border:none; border-radius:5px; cursor:pointer;">📋 Copiar comentario</button>
        <button id="PCD_EnvioCopiarNombre" style="padding:6px 10px; background:#e5e7eb; border:none; border-radius:5px; cursor:pointer;">📋 Copiar nombre del destinatario</button>
        <button id="PCD_EnvioGuardar" style="padding:6px 12px; background:#ea580c; color:#fff; border:none; border-radius:5px; cursor:pointer; font-weight:bold;">📝 Guardar en el registro</button>
      </div>
      <div id="PCD_EnvioEstado" style="margin-top:8px; font-size:11px; color:#6b7280;"></div>
    </div>`;
  document.body.appendChild(modal);
  const m = (s) => modal.querySelector(s);
  const estado = m('#PCD_EnvioEstado'), area = m('#PCD_EnvioComentario');
  const pintar = () => {
    modal.querySelectorAll('.cd7-env-acc').forEach(b => { const a = b.dataset.acc === accion; b.style.background = a ? '#ea580c' : '#e5e7eb'; b.style.color = a ? '#fff' : '#111827'; });
    modal.querySelectorAll('.cd7-env-modo').forEach(b => { const a = b.dataset.modo === modo; b.style.background = a ? '#374151' : '#e5e7eb'; b.style.color = a ? '#fff' : '#111827'; });
    m('#PCD_EnvioBuscarTexto').placeholder = modo === 'fun' ? 'Nombre o apellido…' : 'Nombre de la dependencia…';
    if (!comentarioTocado) area.value = CD7_COMENTARIOS_ENVIO[accion];
    const d = m('#PCD_EnvioDestino');
    d.innerHTML = destino ? `Destinatario: <b style="color:#111827;">${cd7Esc(destino.nombre)}</b> <span style="color:#9ca3af;">(ID ${cd7Esc(destino.idFuncionario)})</span>` : 'Aún no has elegido destinatario.';
  };
  const cerrar = () => modal.remove();
  m('#PCD_EnvioCerrar').onclick = cerrar;
  modal.addEventListener('mousedown', (e) => { if (e.target === modal) cerrar(); });
  modal.querySelectorAll('.cd7-env-acc').forEach(b => { b.onclick = () => { accion = b.dataset.acc; guardado = false; m('#PCD_EnvioGuardar').disabled = false; pintar(); }; });
  modal.querySelectorAll('.cd7-env-modo').forEach(b => { b.onclick = () => { modo = b.dataset.modo; pintar(); }; });
  area.addEventListener('input', () => { comentarioTocado = true; guardado = false; m('#PCD_EnvioGuardar').disabled = false; });
  const buscar = () => cd7BuscarEn(m('#PCD_EnvioResultados'), m('#PCD_EnvioBuscarTexto').value.trim(), modo, {
    etiqueta: '✔ Elegir', alElegir: (c) => { destino = { idFuncionario: c.idFuncionario, nombre: c.nombre }; guardado = false; m('#PCD_EnvioGuardar').disabled = false; pintar(); },
  });
  m('#PCD_EnvioBuscarBtn').onclick = buscar;
  m('#PCD_EnvioBuscarTexto').addEventListener('keydown', (e) => { if (e.key === 'Enter') buscar(); });
  m('#PCD_EnvioCopiarComentario').onclick = () => { cdCopiarTexto(area.value); estado.style.color = '#16a34a'; estado.textContent = '✅ Comentario copiado.'; };
  m('#PCD_EnvioCopiarNombre').onclick = () => {
    if (!destino) { estado.style.color = '#dc2626'; estado.textContent = 'Primero elige un destinatario.'; return; }
    cdCopiarTexto(destino.nombre); estado.style.color = '#16a34a'; estado.textContent = '✅ Nombre copiado.';
  };
  m('#PCD_EnvioGuardar').onclick = () => {
    const comentario = area.value.trim();
    if (!destino) { estado.style.color = '#dc2626'; estado.textContent = 'Elige un destinatario antes de guardar.'; return; }
    if (!comentario) { estado.style.color = '#dc2626'; estado.textContent = 'El comentario no puede quedar vacío.'; return; }
    if (guardado) return;
    CD7_MOVS.push({ ts: Date.now(), estado: 'PREPARADO', idTarea: fila.idTarea, idInicial: fila.idInicial, asunto: fila.asunto, listaOrigen: CD7_LISTA_ACTIVA === 'revisar' ? 'Por revisar' : 'Por aprobar', accion, destinatario: destino.nombre, idDestinatario: destino.idFuncionario, comentario, comentarioPreparado: comentario, fechaPaso: '', login: CD7_SESION.login || '', detalle: '' });
    cd7GuardarMovs(); guardado = true; m('#PCD_EnvioGuardar').disabled = true;
    estado.style.color = '#16a34a';
    estado.textContent = `✅ Guardado. Ahora envíalo en ControlDoc (Acción → ${accion === 'REVISAR' ? 'Revisar' : 'Aprobar'}), pega el nombre y el comentario, y luego pulsa 🔄 Actualizar para confirmarlo.`;
  };
  pintar();
}

// ── Buscadores (reutilizables: en la pestaña y en "Preparar envío") ──
async function cd7BuscarEn(cont, texto, modo, boton) {
  if (texto.replace(/\s+/g, '').length < 2) { cont.innerHTML = '<div style="color:#6b7280; font-size:11px;">Escribe al menos 2 letras.</div>'; return; }
  cont.innerHTML = '<div style="color:#6b7280; font-size:11px;">⏳ Buscando…</div>';
  const botonHtml = (id, nombre) => `<button class="cd7-elegir" data-id="${cd7Esc(id)}" data-nombre="${cd7Esc(nombre)}" style="padding:3px 8px; background:#ea580c; color:#fff; border:none; border-radius:4px; cursor:pointer; font-size:10px;">${boton.etiqueta}</button>`;
  try {
    if (modo === 'fun') {
      const lista = await cd3BuscarFuncionariosGlobal(texto);
      cont.innerHTML = lista.length ? lista.slice(0, 15).map(f => `
        <div style="border:1px solid #e5e7eb; border-radius:6px; padding:6px 8px; margin-top:5px; font-size:11px;">
          <b>${cd7Esc(f.nombre)}</b> <span style="color:#9ca3af;">(ID ${f.idFuncionario})</span><br>
          <span style="color:#6b7280;">${cd7Esc(f.cargo)}${f.oficina ? ' · ' + cd7Esc(f.oficina) : ''}</span>
          <div style="margin-top:4px; display:flex; gap:5px;">${botonHtml(f.idFuncionario, f.nombre)}</div>
        </div>`).join('') + (lista.length > 15 ? `<div style="font-size:10px; color:#9ca3af; margin-top:4px;">Se muestran 15 de ${lista.length}: afina la búsqueda.</div>` : '')
        : '<div style="color:#9ca3af; font-size:11px; margin-top:5px;">Sin coincidencias.</div>';
    } else {
      const oficinas = (await cdBuscarOficinaPorNombre(texto)).slice(0, 8);
      if (!oficinas.length) { cont.innerHTML = '<div style="color:#9ca3af; font-size:11px; margin-top:5px;">Sin coincidencias.</div>'; return; }
      cont.innerHTML = oficinas.map((o, i) => `
        <div style="border:1px solid #e5e7eb; border-radius:6px; padding:6px 8px; margin-top:5px; font-size:11px;">
          <b>${cd7Esc(o.NOMBRE)}</b><br>
          <span style="color:#9ca3af;">IDOFICINA ${o.IDOFICINAPRODUCTORA} · IDUNIDAD ${o.IDUNIDADADMINISTRATIVA}</span>
          <div data-jefes="${i}" style="margin-top:4px; color:#1e3a8a;">⏳ Buscando jefe…</div>
        </div>`).join('');
      await ejecutarConPool(oficinas.map((o, i) => ({ o, i })), 3, async ({ o, i }) => {
        const el = cont.querySelector(`[data-jefes="${i}"]`);
        try {
          const jefes = await cd7ListarJefes(o.IDOFICINAPRODUCTORA, o.IDUNIDADADMINISTRATIVA);
          el.innerHTML = jefes.length
            ? jefes.map(j => `<div style="margin-top:3px;">👤 <b>${cd7Esc(j.nombre)}</b> <span style="color:#9ca3af;">(ID ${j.idFuncionario}${j.cargo ? ' · ' + cd7Esc(j.cargo) : ''})</span> ${botonHtml(j.idFuncionario, j.nombre)}</div>`).join('')
            : '<span style="color:#9ca3af;">Sin jefe registrado para esta dependencia.</span>';
        } catch (e) { el.innerHTML = `<span style="color:#dc2626;">❌ ${cd7Esc(e.message)}</span>`; }
      }, () => {});
    }
  } catch (e) {
    cont.innerHTML = `<div style="color:#dc2626; font-size:11px;">❌ ${cd7Esc(e.message)}</div>`;
    return;
  }
  cont.querySelectorAll('.cd7-elegir').forEach(b => { b.onclick = () => boton.alElegir({ idFuncionario: b.dataset.id, nombre: b.dataset.nombre }); });
}

async function cd7Buscar() {
  await cd7BuscarEn(cd7Q('#PCD_SegResultadosBusqueda'), cd7Q('#PCD_SegBuscarTexto').value.trim(), CD7_MODO_BUSQUEDA,
    { etiqueta: '👁 Ver sus tareas', alElegir: (c) => cd7CambiarCuenta(c) });
}

function cd7Cablear() {
  cd7RenderAprobados();
  if (CD7_APROBADOS.some(a => a.fase === 'en-firma')) setTimeout(() => cd7RevisarFirmas(), 5000);
  cd7Q('#PCD_SegActualizar').onclick = () => { cd7CargarTodo(); cd7RevisarFirmas(); };
  document.querySelectorAll('.cd7-lista-btn').forEach(b => { b.onclick = () => { CD7_LISTA_ACTIVA = b.dataset.lista; cd7Render(); }; });
  cd7Q('#PCD_SegFiltro').addEventListener('input', cd7RenderLista);
  cd7Q('#PCD_SegOrden').addEventListener('change', cd7RenderLista);
  cd7Q('#PCD_SegTrazaTodas').onclick = cd7TrazaTodas;
  cd7Q('#PCD_SegExcel').onclick = cd7Excel;
  cd7Q('#PCD_SegMovsExcel').onclick = cd7ExcelMovimientos;
  document.querySelectorAll('.cd7-btn-copiar-primeros').forEach(b => { b.onclick = () => cd7CopiarPrimeros(Number(b.dataset.n)); });
  cd7Q('#PCD_SegCopiarNBtn').onclick = () => {
    const n = Number(cd7Q('#PCD_SegCopiarN').value);
    if (!n || n < 1) return alert('Escribe un número mayor a 0 en "Otro #".');
    cd7CopiarPrimeros(n);
  };
  document.querySelectorAll('.cd7-modo-btn').forEach(b => { b.onclick = () => { CD7_MODO_BUSQUEDA = b.dataset.modo; cd7PintarModo(); }; });
  cd7Q('#PCD_SegBuscarBtn').onclick = cd7Buscar;
  cd7Q('#PCD_SegBuscarTexto').addEventListener('keydown', (e) => { if (e.key === 'Enter') cd7Buscar(); });
  cd7PintarModo(); cd7Render();
}


const CD3_TABS = [
  { clave: 'cargar',       emoji: '🔄', etiqueta: 'Cargar',    titulo: 'Cargar y Clasificar',                         color: '#111827', cuerpoId: '#PCD_CuerpoSec2' },
  { clave: 'resultados',   emoji: '📊', etiqueta: 'Result.',   titulo: 'Resultados',                                  color: '#2563eb', cuerpoId: '#PCD_CuerpoSec3' },
  { clave: 'manual',       emoji: '📥', etiqueta: 'Manual',    titulo: 'Reasignación Manual (pegar IDs sueltos)',     color: '#16a34a', cuerpoId: '#PCD_CuerpoSec4' },
  { clave: 'buscador',     emoji: '🔎', etiqueta: 'Buscar',    titulo: 'Buscar dependencia / funcionario (fuera de tu lista)', color: '#7c3aed', cuerpoId: '#PCD_CuerpoSec5' },
  { clave: 'tareas',       emoji: '📋', etiqueta: 'Tareas',    titulo: 'Bandeja de Tareas (solo lectura)',            color: '#0891b2', cuerpoId: '#PCD_CuerpoSec6' },
  { clave: 'seguimiento',  emoji: '🧭', etiqueta: 'Seguim.',   titulo: 'Seguimiento y trazabilidad de tareas por revisar y por aprobar', color: '#ea580c', cuerpoId: '#PCD_CuerpoSec9' },
  { clave: 'detalleTarea', emoji: '🧾', etiqueta: 'Detalle',   titulo: 'Detalle de Tarea (flujo completo por IDTAREADOC)', color: '#b45309', cuerpoId: '#PCD_CuerpoSec7' },
  { clave: 'comentarios',  emoji: '💬', etiqueta: 'Coment.',   titulo: 'Comentarios de gestión',                      color: '#0d9488', cuerpoId: '#PCD_CuerpoComentarios' },
  { clave: 'palabras',     emoji: '⚙️', etiqueta: 'Palabras',  titulo: 'Configuración de Palabras Clave',             color: '#6b7280', cuerpoId: '#PCD_CuerpoSec1' },
  { clave: 'descargas',    emoji: '⬇️', etiqueta: 'Descargas', titulo: 'Descarga masiva (PDF, adjuntos, o ambos)',    color: '#be123c', cuerpoId: '#PCD_CuerpoSec8' },
  { clave: 'ia',           emoji: '🤖', etiqueta: 'IA',        titulo: 'Reasignación masiva desde tabla generada por IA', color: '#4f46e5', cuerpoId: '#PCD_CuerpoSec10' },
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
  // El seguimiento carga tablero y listas la primera vez que se entra (después, con 🔄 Actualizar).
  if (clave === 'seguimiento' && !CD7_YA_CARGO) { CD7_YA_CARGO = true; cd7CargarTodo(); }
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
        <div style="border:1px solid #e5e7eb; border-radius:8px; padding:8px; margin-bottom:10px; background:#f9fafb;">
          <label style="color:#374151; font-size:11px; font-weight:bold;">⚡ Envío masivo (reasignar / cerrar en lote)</label>
          <div style="display:flex; flex-wrap:wrap; align-items:center; gap:8px; margin-top:6px;">
            <label style="font-size:11px; color:#6b7280;">Modo
              <select id="PCD_ModoMasivo" style="padding:4px; border:1px solid #ccc; border-radius:4px; font-size:11px;">
                <option value="paquetes">📦 Por paquetes (salen juntos y se espera a todos)</option>
                <option value="continuo">🔁 Continuo (cada puesto toma el siguiente al terminar)</option>
              </select>
            </label>
            <label style="font-size:11px; color:#6b7280;">Documentos a la vez
              <input id="PCD_Concurrencia" type="number" min="1" max="${CONCURRENCIA_TOPE}" value="${CONCURRENCIA_MAXIMA}" style="width:65px; padding:4px; border:1px solid #ccc; border-radius:4px; font-size:12px; text-align:center;">
            </label>
            <label id="PCD_PausaWrap" style="font-size:11px; color:#6b7280;">Pausa entre paquetes (seg)
              <input id="PCD_PausaPaquetes" type="number" min="0" max="60" step="0.5" value="${PAUSA_ENTRE_PAQUETES_MS / 1000}" style="width:55px; padding:4px; border:1px solid #ccc; border-radius:4px; font-size:12px; text-align:center;">
            </label>
          </div>
          <div style="display:flex; flex-wrap:wrap; gap:4px; margin-top:6px;">
            ${[1, 5, 10, 25, 50, 100, 200, 400].map(n => `<button class="pcd-preset-conc" data-n="${n}" style="padding:3px 8px; font-size:10px; background:#e5e7eb; border:none; border-radius:4px; cursor:pointer; font-weight:bold;">${n}</button>`).join('')}
          </div>
          <div id="PCD_ConcAyuda" style="color:#6b7280; font-size:10px; margin-top:5px;"></div>
          <label style="display:flex; align-items:center; gap:6px; margin-top:8px; font-size:11px; color:#111827; font-weight:bold; cursor:pointer;">
            <input id="PCD_ModoRapido" type="checkbox" ${MODO_RAPIDO ? 'checked' : ''}> 🚀 Modo rápido (≈1 petición por documento en vez de ≈5)
          </label>
          <div style="display:flex; align-items:center; gap:6px; margin-top:6px; flex-wrap:wrap;">
            <button id="PCD_MedirSimultaneidad" style="padding:4px 10px; background:#374151; color:#fff; border:none; border-radius:4px; cursor:pointer; font-size:11px;">🧪 Medir simultaneidad real del servidor</button>
            <span id="PCD_MedirResultado" style="font-size:10px; color:#6b7280;"></span>
          </div>
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
        <select id="PCD_OrdenFecha" style="width:100%; padding:5px; border:1px solid #ccc; border-radius:4px; margin:3px 0 8px; font-size:11px; box-sizing:border-box;">
          <option value="ninguno">— Sin ordenar (como vienen) —</option>
          <option value="asignacion-desc">📤 Asignación: más reciente primero</option>
          <option value="asignacion-asc">📤 Asignación: más antigua primero</option>
          <option value="radicacion-asc">📅 Radicación: más antigua primero</option>
          <option value="radicacion-desc">📅 Radicación: más reciente primero</option>
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
        <label style="color:#6b7280; font-size:11px; font-weight:bold;">🏢 Buscar dependencia, dirección, subdirección u oficina por nombre (se le asigna a su jefe)</label>
        <div style="display:flex; gap:6px; margin:4px 0 8px;">
          <input id="PCD_BuscarOficinaTexto" type="text" placeholder="ej: SALUD MENTAL, FINANCIAMIENTO..." style="flex:1; padding:5px; border:1px solid #ccc; border-radius:4px; font-size:11px;">
          <button id="PCD_BuscarOficinaBtn" style="padding:5px 10px; background:#374151; color:#fff; border:none; border-radius:4px; cursor:pointer; font-size:11px;">Buscar</button>
        </div>
        <div id="PCD_ResultadosOficina" style="max-height:180px; overflow-y:auto; margin-bottom:10px;"></div>

        <label style="color:#6b7280; font-size:11px; font-weight:bold;">👤 O buscar un funcionario específico (se le asigna directamente a él/ella)</label>
        <div style="display:flex; gap:6px; margin:4px 0 8px;">
          <input id="PCD_BuscarFuncDestinoTexto" type="text" placeholder="ej: RICARDO LUQUE" style="flex:1; padding:5px; border:1px solid #ccc; border-radius:4px; font-size:11px;">
          <button id="PCD_BuscarFuncDestinoBtn" style="padding:5px 10px; background:#374151; color:#fff; border:none; border-radius:4px; cursor:pointer; font-size:11px;">Buscar</button>
        </div>
        <div id="PCD_ResultadosFuncDestino" style="max-height:180px; overflow-y:auto; margin-bottom:10px;"></div>

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

      <div id="PCD_CuerpoSec9" style="display:none;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
          <b style="font-size:12px;">🧭 Seguimiento y trazabilidad (solo lectura)</b>
          <button id="PCD_SegActualizar" style="padding:4px 10px; background:#e5e7eb; border:none; border-radius:4px; cursor:pointer; font-size:11px;">🔄 Actualizar</button>
        </div>
        <div id="PCD_SegContadores" style="display:grid; grid-template-columns:repeat(4, 1fr); gap:6px; margin-bottom:6px;"></div>
        <div id="PCD_SegCuenta" style="font-size:11px; color:#6b7280; margin-bottom:8px;"></div>

        <details style="margin-bottom:8px; border:1px solid #e5e7eb; border-radius:6px; padding:6px 8px;">
          <summary style="cursor:pointer; font-size:11px; font-weight:bold; color:#374151;">🔎 Buscar funcionario o dependencia (¿quién es el jefe?)</summary>
          <div style="display:flex; gap:4px; margin:6px 0;">
            <button class="cd7-modo-btn" data-modo="fun" style="padding:4px 10px; border:none; border-radius:4px; cursor:pointer; font-size:11px; font-weight:bold;">👤 Por funcionario</button>
            <button class="cd7-modo-btn" data-modo="dep" style="padding:4px 10px; border:none; border-radius:4px; cursor:pointer; font-size:11px; font-weight:bold;">🏢 Por dependencia</button>
          </div>
          <div style="display:flex; gap:6px;">
            <input id="PCD_SegBuscarTexto" type="text" style="flex:1; padding:5px; border:1px solid #ccc; border-radius:4px; font-size:11px;">
            <button id="PCD_SegBuscarBtn" style="padding:4px 12px; background:#374151; color:#fff; border:none; border-radius:4px; cursor:pointer; font-size:11px;">Buscar</button>
          </div>
          <div id="PCD_SegResultadosBusqueda"></div>
        </details>

        <div style="display:flex; align-items:center; gap:8px; flex-wrap:wrap; padding:6px 8px; background:#fff7ed; border:1px solid #fed7aa; border-radius:6px; margin-bottom:4px;">
          <b style="font-size:11px;">📒 Registro de movimientos: <span id="PCD_SegMovsN">0</span></b>
          <button id="PCD_SegMovsExcel" style="padding:4px 10px; background:#374151; color:#fff; border:none; border-radius:4px; cursor:pointer; font-size:11px;">📥 Excel de movimientos</button>
          <span style="font-size:10px; color:#9a3412;">Se guarda en este navegador. 🔄 Actualizar detecta los envíos que hagas en ControlDoc.</span>
        </div>
        <details style="margin-bottom:8px;"><summary style="cursor:pointer; font-size:10.5px; color:#6b7280;">Ver últimos movimientos</summary><div id="PCD_SegMovsLista" style="margin-top:4px;"></div></details>

        <div style="display:flex; gap:6px; margin-bottom:6px;">
          <button class="cd7-lista-btn" data-lista="revisar" style="flex:1; padding:7px; border:none; border-radius:6px; cursor:pointer; font-size:12px; font-weight:bold;">🔎 Por Revisar</button>
          <button class="cd7-lista-btn" data-lista="aprobar" style="flex:1; padding:7px; border:none; border-radius:6px; cursor:pointer; font-size:12px; font-weight:bold;">✍️ Por Aprobar</button>
        </div>
        <div style="display:flex; gap:6px; margin-bottom:6px; flex-wrap:wrap;">
          <input id="PCD_SegFiltro" type="text" placeholder="Filtrar por asunto, ID, persona…" style="flex:1; min-width:140px; padding:5px; border:1px solid #ccc; border-radius:4px; font-size:11px;">
          <select id="PCD_SegOrden" style="padding:4px; border:1px solid #ccc; border-radius:4px; font-size:11px;">
            <option value="antigua">Más antigua primero</option>
            <option value="reciente">Más reciente primero</option>
            <option value="vence">Vencimiento más próximo</option>
          </select>
          <button id="PCD_SegTrazaTodas" style="padding:4px 10px; background:#ea580c; color:#fff; border:none; border-radius:4px; cursor:pointer; font-size:11px;">📜 Trazabilidad de todas</button>
          <button id="PCD_SegExcel" style="padding:4px 10px; background:#374151; color:#fff; border:none; border-radius:4px; cursor:pointer; font-size:11px;">📥 Excel</button>
        </div>
        <div style="display:flex; align-items:center; gap:5px; flex-wrap:wrap; margin-bottom:2px;">
          <span style="font-size:11px; color:#6b7280;">📋 Copiar ID tarea de los primeros:</span>
          <button class="cd7-btn-copiar-primeros" data-n="5" style="padding:3px 9px; background:#e5e7eb; border:none; border-radius:4px; cursor:pointer; font-size:11px; font-weight:bold;">5</button>
          <button class="cd7-btn-copiar-primeros" data-n="10" style="padding:3px 9px; background:#e5e7eb; border:none; border-radius:4px; cursor:pointer; font-size:11px; font-weight:bold;">10</button>
          <button class="cd7-btn-copiar-primeros" data-n="20" style="padding:3px 9px; background:#e5e7eb; border:none; border-radius:4px; cursor:pointer; font-size:11px; font-weight:bold;">20</button>
          <button class="cd7-btn-copiar-primeros" data-n="25" style="padding:3px 9px; background:#e5e7eb; border:none; border-radius:4px; cursor:pointer; font-size:11px; font-weight:bold;">25</button>
          <input id="PCD_SegCopiarN" type="number" min="1" placeholder="Otro #" style="width:62px; padding:3px; border:1px solid #ccc; border-radius:4px; font-size:11px;">
          <button id="PCD_SegCopiarNBtn" style="padding:3px 9px; background:#2563eb; color:#fff; border:none; border-radius:4px; cursor:pointer; font-size:11px; font-weight:bold;">📋 Copiar</button>
        </div>
        <div id="PCD_SegCopiarEstado" style="font-size:11px; margin-bottom:4px; min-height:13px;"></div>
        <div style="display:flex; align-items:center; gap:6px; margin-bottom:6px; font-size:11px; color:#6b7280;">
          <label for="PCD_SegObsFirma">✍️ Observación al aprobar para firma:</label>
          <input id="PCD_SegObsFirma" type="text" value="VB" style="flex:1; max-width:260px; padding:4px; border:1px solid #ccc; border-radius:4px; font-size:11px;">
        </div>
        <div id="PCD_SegEstado" style="font-size:11px; color:#6b7280; margin-bottom:2px;">Abre esta pestaña para cargar tus tareas.</div>
        <div id="PCD_SegProgreso" style="font-size:11px; color:#ea580c; font-weight:bold; margin-bottom:6px; min-height:14px;"></div>
        <div id="PCD_SegAprobados" style="display:none; padding:7px 8px; margin-bottom:8px; background:#f0fdf4; border:1px solid #bbf7d0; border-radius:6px;"></div>
        <div id="PCD_SegLista"></div>
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
  cd7Cablear();
  cd8InyectarPestana(); // contenido de la pestaña 🤖 IA (sección más abajo)
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
  cd3CambiarTab(CD3_TAB_ACTIVA);
  document.querySelector('#TD_Buscar').onclick = tdEjecutarBusqueda;
  document.querySelector('#TD_Input').addEventListener('keydown', (e) => { if (e.key === 'Enter') tdEjecutarBusqueda(); });

  document.querySelector('#PCD_Clasificar').onclick = cd3EjecutarClasificacion;

  document.querySelector('#PCD_BandejaBuscar').onclick = cd3BuscarFuncionariosBandejaUI;
  document.querySelector('#PCD_BandejaBuscarGlobal').onclick = cd3BuscarFuncionariosGlobalUI;
  const pintarAyudaConc = () => {
    const ayuda = document.querySelector('#PCD_ConcAyuda');
    document.querySelector('#PCD_PausaWrap').style.display = MODO_MASIVO === 'paquetes' ? '' : 'none';
    document.querySelectorAll('.pcd-preset-conc').forEach(b => {
      const activo = Number(b.dataset.n) === CONCURRENCIA_MAXIMA;
      b.style.background = activo ? '#111827' : '#e5e7eb'; b.style.color = activo ? '#fff' : '#111827';
    });
    const base = MODO_MASIVO === 'paquetes'
      ? `Como ${CONCURRENCIA_MAXIMA} computador(es) a la vez: salen ${CONCURRENCIA_MAXIMA} documento(s) al mismo tiempo, se espera a que TODOS terminen y, tras ${PAUSA_ENTRE_PAQUETES_MS / 1000} s, salen los siguientes ${CONCURRENCIA_MAXIMA}.`
      : `Como ${CONCURRENCIA_MAXIMA} computador(es) a la vez: arrancan ${CONCURRENCIA_MAXIMA} documentos al mismo tiempo y cada computador toma el siguiente IDC apenas termina el suyo, sin esperar a los demás.`;
    const aviso = CONCURRENCIA_MAXIMA > 25 ? ' ⚠️ Con valores altos ControlDoc puede responder error 500; el script reintenta, pero si ves muchos fallos, baja el número.' : '';
    ayuda.textContent = base + aviso;
    ayuda.style.color = CONCURRENCIA_MAXIMA > 25 ? '#b45309' : '#6b7280';
  };
  const fijarConcurrencia = (valor) => {
    const n = Math.min(CONCURRENCIA_TOPE, Math.max(1, Math.round(Number(valor)) || 1));
    CONCURRENCIA_MAXIMA = n;
    document.querySelector('#PCD_Concurrencia').value = n;
    pintarAyudaConc();
  };
  document.querySelector('#PCD_Concurrencia').addEventListener('change', (e) => fijarConcurrencia(e.target.value));
  document.querySelectorAll('.pcd-preset-conc').forEach(b => { b.onclick = () => fijarConcurrencia(b.dataset.n); });
  document.querySelector('#PCD_ModoMasivo').value = MODO_MASIVO;
  document.querySelector('#PCD_ModoMasivo').onchange = (e) => { MODO_MASIVO = e.target.value; pintarAyudaConc(); };
  document.querySelector('#PCD_PausaPaquetes').addEventListener('change', (e) => {
    const seg = Math.min(60, Math.max(0, Number(e.target.value) || 0));
    PAUSA_ENTRE_PAQUETES_MS = Math.round(seg * 1000);
    e.target.value = seg;
    pintarAyudaConc();
  });
  pintarAyudaConc();
  document.querySelector('#PCD_ModoRapido').onchange = (e) => { MODO_RAPIDO = e.target.checked; cd2InvalidarCacheBandeja(); };
  document.querySelector('#PCD_MedirSimultaneidad').onclick = async (e) => {
    const btn = e.currentTarget, out = document.querySelector('#PCD_MedirResultado');
    const n = Math.max(5, Math.min(CONCURRENCIA_MAXIMA, 10));
    btn.disabled = true; out.style.color = '#6b7280'; out.textContent = `⏳ Midiendo con ${n} consultas de solo lectura…`;
    try {
      const r = await cd2MedirSimultaneidad(n);
      out.style.color = r.paralelo ? '#16a34a' : '#b45309';
      out.textContent = r.paralelo
        ? `✅ El servidor sí atiende en paralelo: 1 consulta ${r.tUna} ms, ${r.n} juntas ${r.tGrupo} ms.`
        : `⚠️ El servidor atiende tu sesión de a una: 1 consulta ${r.tUna} ms, ${r.n} juntas ${r.tGrupo} ms (≈${r.factor.toFixed(1)}×). Subir "a la vez" no acelerará mucho; el modo rápido sí.`;
    } catch (err) { out.style.color = '#dc2626'; out.textContent = '❌ No se pudo medir: ' + err.message; }
    finally { btn.disabled = false; }
  };
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
  document.querySelector('#PCD_FiltroRadicadoTerminacion').addEventListener('input', cd3RenderizarResultados);
  document.querySelector('#PCD_ExcluirIdc').addEventListener('input', cd3RenderizarResultados);
  document.querySelector('#PCD_OrdenFecha').addEventListener('change', cd3RenderizarResultados);
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
  document.querySelector('#PCD_BuscarFuncDestinoBtn').onclick = cd3BuscarFuncionarioDestinoUI;
  document.querySelector('#PCD_BuscarFuncDestinoTexto').addEventListener('keydown', (e) => { if (e.key === 'Enter') cd3BuscarFuncionarioDestinoUI(); });
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
const CD8_CONCURRENCIA_VALIDACION = 5; // validaciones simultáneas al cargar la tabla
const CD8_UMBRAL_AUTO = 0.85; // puntaje mínimo para aceptar el destino sin confirmación
const CD8_MARGEN_AUTO = 0.1; // ventaja mínima del primer candidato sobre el segundo
const CD8_PUNTAJE_MINIMO = 0.4; // por debajo de esto un candidato no se ofrece
const CD8_ESPERA_LIMPIEZA_MS = 2000; // los IDC reasignados con éxito salen de la lista tras 2 segundos
const CD8_PALABRAS_VACIAS = new Set(['DE', 'DEL', 'LA', 'LAS', 'LOS', 'EL', 'Y', 'E', 'EN', 'A', 'PARA', 'POR', 'CON', 'AL']);
const CD8_PALABRAS_TIPO = new Set(['DIRECCION', 'SUBDIRECCION', 'OFICINA', 'GRUPO', 'DESPACHO', 'VICEMINISTERIO', 'VICEMINISTRO', 'SECRETARIA', 'UNIDAD', 'COORDINACION', 'ASESORA']);
let CD8_FILAS = [];
let CD8_CATALOGO = null; // [{ idOficina, idUnidad, nombre, tipo:[], nucleo:[] }]
let CD8_EN_CURSO = false;
let CD8_SELECCIONADA = null; // idc de la tarjeta que estás revisando; se resalta en amarillo
// ── Utilidades ──
function cd8Esc(s) {
  return String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
}
// Normaliza igual que ControlDoc registra sus dependencias: sin tildes, en
// mayúsculas, sin signos, y sin palabras vacías (DE, LA, Y…).
function cd8Tokens(texto) {
  return cd3Normalizar(texto)
    .replace(/[^A-Z0-9 ]+/g, ' ')
    .split(/\s+/)
    .filter((t) => t && !CD8_PALABRAS_VACIAS.has(t));
}
function cd8Separar(tokens) {
  return { tipo: tokens.filter((t) => CD8_PALABRAS_TIPO.has(t)), nucleo: tokens.filter((t) => !CD8_PALABRAS_TIPO.has(t)) };
}
// Compara el núcleo del nombre (sin "Dirección/Subdirección/Oficina…").
// Tolera nombres truncados en ControlDoc: "TRANSMIS" coincide con "TRANSMISIBLES".
function cd8Puntaje(consulta, cand) {
  const q = consulta.nucleo,
    c = cand.nucleo;
  if (!q.length || !c.length) return 0;
  const coincide = (a, b) => a === b || (a.length >= 5 && b.length >= 5 && (a.startsWith(b) || b.startsWith(a)));
  const cobertura = q.filter((t) => c.some((x) => coincide(t, x))).length / q.length;
  const precision = c.filter((t) => q.some((x) => coincide(t, x))).length / c.length;
  let p = 0.65 * cobertura + 0.35 * precision;
  // "Subdirección" y "Dirección" con el mismo núcleo no son lo mismo.
  if (consulta.tipo.length && cand.tipo.length) p += consulta.tipo[0] === cand.tipo[0] ? 0.05 : -0.1;
  return Math.max(0, Math.min(1, p));
}
async function cd8CargarCatalogo() {
  if (CD8_CATALOGO) return CD8_CATALOGO;
  const resp = await cdFetchGet(CD_CONFIG.urlOficinas);
  const data = await resp.json();
  const vistos = new Set();
  CD8_CATALOGO = (data || [])
    .filter((o) => o.IDOFICINAPRODUCTORA != null && o.NOMBRE && String(o.ESTADO || 'SI').toUpperCase() !== 'NO')
    .map((o) => ({ idOficina: Number(o.IDOFICINAPRODUCTORA), idUnidad: Number(o.IDUNIDADADMINISTRATIVA), nombre: o.NOMBRE, ...cd8Separar(cd8Tokens(o.NOMBRE)) }))
    .filter((o) => {
      const k = `${o.idUnidad}-${o.idOficina}`;
      if (vistos.has(k)) return false;
      vistos.add(k);
      return true;
    });
  return CD8_CATALOGO;
}
// Candidatos ordenados por parecido. Las dependencias ya configuradas en
// CONFIG_DEPENDENCIAS reciben un pequeño empujón en caso de empate.
function cd8Candidatos(nombreDependencia, minimo = CD8_PUNTAJE_MINIMO) {
  const consulta = cd8Separar(cd8Tokens(nombreDependencia));
  const configuradas = new Set(
    Object.values(CONFIG_DEPENDENCIAS)
      .filter((d) => d.idOficina != null)
      .map((d) => `${d.idUnidad ?? CD2_IDUNIDAD}-${d.idOficina}`),
  );
  return (CD8_CATALOGO || [])
    .map((c) => {
      let p = cd8Puntaje(consulta, c);
      if (p > 0 && configuradas.has(`${c.idUnidad}-${c.idOficina}`)) p = Math.min(1, p + 0.05);
      return { ...c, puntaje: p };
    })
    .filter((c) => c.puntaje >= minimo)
    .sort((a, b) => b.puntaje - a.puntaje)
    .slice(0, 6);
}
// ── Lectura de la tabla ──
// Acepta: tabla Markdown (con "|"), tabla copiada desde el chat (columnas
// separadas por tabulador) o JSON [{idc, dependencia, comentario, justificacion}].
function cd8ParsearTexto(texto) {
  const t = texto.trim();
  if (!t) return [];
  const limpiar = (s) =>
    String(s ?? '')
      .replace(/\*\*/g, '')
      .trim();
  if (t.startsWith('[') || t.startsWith('{')) {
    let datos = JSON.parse(t);
    if (!Array.isArray(datos)) datos = [datos];
    return datos
      .map((o) => ({
        idc: String(o.idc ?? o.IDC ?? '').replace(/\D/g, ''),
        dependencia: limpiar(Array.isArray(o.dependencia) ? o.dependencia.join(' + ') : (o.dependencia ?? o.DEPENDENCIA)),
        comentario: limpiar(o.comentario ?? o.COMENTARIO),
        justificacion: limpiar(o.justificacion ?? o.JUSTIFICACION),
      }))
      .filter((f) => f.idc);
  }
  const filas = [];
  for (const linea of t.split(/\r?\n/)) {
    let celdas;
    if (linea.includes('|'))
      celdas = linea
        .replace(/^\s*\|/, '')
        .replace(/\|\s*$/, '')
        .split('|');
    else if (linea.includes('\t')) celdas = linea.split('\t');
    else continue;
    celdas = celdas.map(limpiar);
    if (celdas.every((c) => c === '' || /^:?-{2,}:?$/.test(c))) continue; // línea separadora
    const idc = (celdas[0] || '').replace(/\D/g, '');
    if (!idc) continue; // encabezado
    filas.push({ idc, dependencia: celdas[1] || '', comentario: celdas[2] || '', justificacion: celdas.slice(3).join(' | ') });
  }
  return filas;
}
// Varias dependencias en la misma celda: "Dirección X + Subdirección Y" o "X; Y".
function cd8DividirDependencias(texto) {
  return String(texto || '')
    .split(/\s*[+;]\s*/)
    .map((s) => s.trim())
    .filter(Boolean);
}
// ── Destinos de cada fila ──
// Cada destino: { texto, candidatos, sel, confianza, confirmado, jefe }
function cd8NuevoDestino(texto, minimo) {
  const candidatos = cd8Candidatos(texto, minimo);
  const [a, b] = candidatos;
  return {
    texto,
    candidatos,
    sel: candidatos.length ? 0 : -1,
    jefe: null,
    confirmado: false,
    confianza: a && a.puntaje >= CD8_UMBRAL_AUTO && (!b || a.puntaje - b.puntaje >= CD8_MARGEN_AUTO) ? 'alta' : a ? 'baja' : 'ninguna',
  };
}
function cd8Elegido(d) {
  return d.candidatos[d.sel] || null;
}
async function cd8ResolverJefe(d) {
  const o = cd8Elegido(d);
  d.jefe = null;
  if (!o) return;
  try {
    d.jefe = (await cd2ObtenerJefe(o.idOficina, o.idUnidad)).NOMBRESAPELLIDOS;
  } catch (e) {
    d.jefe = 'error';
  }
}
function cd8CalcularEstado(f) {
  if (f.estado === 'ok') return;
  if (f.enBandeja === false) {
    f.estado = 'error';
    f.mensaje = 'No está pendiente en tu bandeja (ya se tramitó o no está asignado a ti).';
    return;
  }
  if (!f.destinos.length) {
    f.estado = 'error';
    f.mensaje = 'Sin dependencia: agrega una con "➕ Agregar dependencia" o quita la fila.';
    return;
  }
  const sinCoincidencia = f.destinos.findIndex((d) => d.sel < 0);
  if (sinCoincidencia !== -1) {
    f.estado = 'error';
    f.mensaje = `Destino ${sinCoincidencia + 1}: no hay una dependencia parecida en ControlDoc. Búscala con 🔎.`;
    return;
  }
  const sinJefe = f.destinos.findIndex((d) => !d.jefe || d.jefe === 'error');
  if (sinJefe !== -1) {
    f.estado = 'error';
    f.mensaje = `Destino ${sinJefe + 1}: la dependencia no tiene jefe registrado. Elige otra.`;
    return;
  }
  const claves = f.destinos.map((d) => {
    const o = cd8Elegido(d);
    return `${o.idUnidad}-${o.idOficina}`;
  });
  if (new Set(claves).size !== claves.length) {
    f.estado = 'revisar';
    f.mensaje = 'Hay una dependencia repetida entre los destinos.';
    return;
  }
  if (!f.comentario.trim()) {
    f.estado = 'revisar';
    f.mensaje = 'El comentario está vacío.';
    return;
  }
  const porConfirmar = f.destinos.findIndex((d) => d.confianza !== 'alta' && !d.confirmado);
  if (porConfirmar !== -1) {
    f.estado = 'revisar';
    f.mensaje = `Destino ${porConfirmar + 1}: el nombre no coincide exacto, confirma la dependencia en la lista.`;
    return;
  }
  f.estado = 'listo';
  f.mensaje = '';
}
async function cd8Recalcular(f) {
  cd8CalcularEstado(f);
  cd8PintarFila(f);
  cd8PintarResumen();
}
async function cd8ValidarFila(f) {
  f.estado = 'validando';
  cd8PintarFila(f);
  f.destinos = cd8DividirDependencias(f.dependencia).map((t) => cd8NuevoDestino(t));
  try {
    const reg = await cd2BuscarEnBandeja(f.idc);
    f.enBandeja = true;
    f.radicado = reg.RADICADO || '';
    f.asunto = reg.DESCRIPCION || '';
  } catch (e) {
    f.enBandeja = false;
  }
  if (f.radicado == null) await cd8AsegurarDatos(f); // fuera de la bandeja: se busca igual para mostrar y copiar
  await Promise.all(f.destinos.map(cd8ResolverJefe));
  f.estado = 'pendiente';
  await cd8Recalcular(f);
}
async function cd8CargarTabla() {
  const estado = document.querySelector('#PCD8_Estado');
  let filas;
  try {
    filas = cd8ParsearTexto(document.querySelector('#PCD8_Texto').value);
  } catch (e) {
    estado.textContent = '❌ El texto parece JSON pero no es válido: ' + e.message;
    return;
  }
  if (!filas.length) {
    estado.textContent = 'No encontré filas con IDC. Pega la tabla completa, incluido el encabezado.';
    return;
  }
  const vistos = new Set(),
    duplicados = [];
  CD8_FILAS = filas
    .filter((f) => {
      if (vistos.has(f.idc)) {
        duplicados.push(f.idc);
        return false;
      }
      vistos.add(f.idc);
      return true;
    })
    .map((f) => ({
      ...f,
      incluirJust: document.querySelector('#PCD8_JustTodas').checked,
      seleccionado: true,
      destinos: [],
      enBandeja: null,
      radicado: null,
      asunto: null,
      estado: 'pendiente',
      mensaje: '',
    }));
  cd8PintarTodo();
  estado.textContent = '⏳ Cargando el catálogo de dependencias de ControlDoc…';
  try {
    await cd8CargarCatalogo();
  } catch (e) {
    estado.textContent = '❌ No se pudo cargar el catálogo de dependencias: ' + e.message;
    return;
  }
  estado.textContent = `⏳ Validando 0/${CD8_FILAS.length}…`;
  await ejecutarConPool(CD8_FILAS.slice(), CD8_CONCURRENCIA_VALIDACION, cd8ValidarFila, (hechos, total) => {
    estado.textContent = `⏳ Validando ${hechos}/${total}…`;
  });
  estado.textContent = `${CD8_FILAS.length} fila(s) cargadas.` + (duplicados.length ? ` Se omitieron IDC repetidos: ${duplicados.join(', ')}.` : '');
}
// Radicado y asunto del IDC, con el mismo buscador del panel de Seguimiento
// (se usa cuando el documento ya no está en la bandeja).
async function cd8AsegurarDatos(f) {
  if (f.radicado != null && f.asunto != null) return;
  try {
    const doc = await cdBuscarDocumento(String(f.idc));
    f.radicado = doc.RADICADO || '';
    f.asunto = doc.DESCRIPCION || '';
  } catch (e) {
    f.radicado = f.radicado ?? '';
    f.asunto = f.asunto ?? '';
  }
}
// Quita la fila de la lista (queda sin dependencia y no se reasigna).
function cd8QuitarFila(f) {
  if (['enviando'].includes(f.estado)) return;
  const idx = CD8_FILAS.indexOf(f);
  if (idx === -1) return;
  CD8_FILAS.splice(idx, 1);
  document.querySelector(`#cd8-fila-${f.idc}`)?.remove();
  if (!CD8_FILAS.length) cd8PintarTodo();
  else cd8PintarResumen();
  const estado = document.querySelector('#PCD8_Estado');
  if (estado) estado.textContent = `IDC ${f.idc} quitado de la lista.`;
}
// ── Comentario final que se envía ──
function cd8ComentarioFinal(f) {
  let c = f.comentario.trim();
  if (f.incluirJust && f.justificacion.trim()) c += ' ' + f.justificacion.trim();
  const idxSufijo = document.querySelector('#PCD8_Sufijo')?.value;
  if (idxSufijo !== '' && idxSufijo != null) c += ' ' + CD3_COMENTARIOS_REASIGNACION[Number(idxSufijo)].texto;
  if (document.querySelector('#PCD8_Mayus')?.checked) c = c.toUpperCase();
  return c;
}
function cd8NombresDestinos(f) {
  return f.destinos.map((d) => cd8Elegido(d)?.nombre || '?').join(' + ');
}
// Igual que en "📊 Result.": la tarjeta queda en verde un momento para que se
// vea el éxito y luego sale sola de la lista.
function cd8ProgramarLimpieza(f) {
  setTimeout(() => {
    if (f.estado !== 'ok' || !CD8_FILAS.includes(f)) return;
    const el = document.querySelector(`#cd8-fila-${f.idc}`);
    if (el) {
      el.style.transition = 'opacity 0.3s';
      el.style.opacity = '0';
    }
    setTimeout(() => {
      const idx = CD8_FILAS.indexOf(f);
      if (idx === -1 || f.estado !== 'ok') return;
      CD8_FILAS.splice(idx, 1);
      document.querySelector(`#cd8-fila-${f.idc}`)?.remove();
      if (!CD8_FILAS.length) cd8PintarTodo();
      else cd8PintarResumen();
    }, 300);
  }, CD8_ESPERA_LIMPIEZA_MS);
}
// ── Reasignación ──
async function cd8ReasignarFila(f) {
  if (!f.destinos.length || f.estado === 'enviando' || f.estado === 'ok') return;
  const destinos = f.destinos.map((d) => {
    const o = cd8Elegido(d);
    return { idOficina: o.idOficina, idUnidad: o.idUnidad, nombre: o.nombre };
  });
  const comentario = cd8ComentarioFinal(f);
  f.estado = 'enviando';
  cd8PintarFila(f);
  try {
    let movio, radicado, asunto, jefes;
    if (destinos.length === 1) {
      const r = await cd2ReasignarADestino(String(f.idc), destinos[0], comentario);
      movio = r.movioBandeja;
      radicado = r.radicado;
      asunto = r.asunto;
      jefes = r.jefe;
    } else {
      const r = await cd2ReasignarADestinos(String(f.idc), destinos, comentario);
      movio = r.movioBandeja;
      radicado = r.radicado;
      asunto = r.asunto;
      jefes = r.destinos.map((d) => d.jefe).join(' + ');
    }
    f.estado = movio ? 'ok' : 'fallo';
    f.mensaje = movio ? '' : 'Sigue en tu bandeja: el trámite no se completó.';
    cdBitacoraRegistrar({
      accion: destinos.length > 1 ? 'Reasignación multi-destino (tabla IA)' : 'Reasignación (tabla IA)',
      idc: f.idc,
      radicado,
      asunto,
      destino: destinos.map((d) => d.nombre).join(' + '),
      funcionario: jefes,
      comentario,
      resultado: movio ? 'OK' : 'ERROR',
      detalleResultado: f.mensaje,
    });
    cd3SincronizarTrasAccionExterna(f.idc, movio);
    if (movio) cd8ProgramarLimpieza(f);
  } catch (e) {
    f.estado = 'fallo';
    f.mensaje = e.message;
  }
  cd8PintarFila(f);
  cd8PintarResumen();
}
async function cd8ReasignarSeleccionados(soloFallidos = false) {
  if (CD8_EN_CURSO) return;
  const objetivo = CD8_FILAS.filter((f) => (soloFallidos ? f.estado === 'fallo' : f.seleccionado && f.estado === 'listo'));
  if (!objetivo.length) return alert(soloFallidos ? 'No hay filas fallidas para reintentar.' : 'No hay filas seleccionadas en estado "Listo".');
  const grupos = {};
  objetivo.forEach((f) => {
    const n = cd8NombresDestinos(f);
    grupos[n] = (grupos[n] || 0) + 1;
  });
  const resumen = Object.entries(grupos)
    .map(([n, k]) => `• ${n}: ${k}`)
    .join('\n');
  if (!confirm(`Se reasignarán ${objetivo.length} documento(s):\n\n${resumen}\n\n¿Continuar?`)) return;
  CD8_EN_CURSO = true;
  const estado = document.querySelector('#PCD8_Estado');
  await ejecutarMasivo(objetivo, cd8ReasignarFila, (hechos, total, paquete, totalPaquetes) => {
    estado.textContent = textoProgresoMasivo(hechos, total, paquete, totalPaquetes);
  });
  CD8_EN_CURSO = false;
  const ok = objetivo.filter((f) => f.estado === 'ok').length;
  estado.textContent = `🏁 ${ok} reasignado(s), ${objetivo.length - ok} con error.`;
}
// ── Interfaz ──
const CD8_ESTILOS_ESTADO = {
  pendiente: { texto: 'En espera', fondo: '#f3f4f6', color: '#6b7280', borde: '#d1d5db' },
  validando: { texto: 'Validando…', fondo: '#dbeafe', color: '#1e40af', borde: '#93c5fd' },
  listo: { texto: 'Listo', fondo: '#dcfce7', color: '#166534', borde: '#22c55e' },
  revisar: { texto: 'Revisar', fondo: '#fef3c7', color: '#92400e', borde: '#f59e0b' },
  error: { texto: 'No se puede reasignar', fondo: '#fee2e2', color: '#991b1b', borde: '#ef4444' },
  enviando: { texto: 'Reasignando…', fondo: '#ffedd5', color: '#9a3412', borde: '#f97316' },
  ok: { texto: 'Reasignado', fondo: '#16a34a', color: '#fff', borde: '#16a34a' },
  fallo: { texto: 'Falló', fondo: '#dc2626', color: '#fff', borde: '#dc2626' },
};
const CD8_ESTILO_AUX = 'padding:3px 7px; font-size:11px; border:none; border-radius:4px; cursor:pointer;';
// Acciones de los botones auxiliares (las mismas que en "📊 Result.").
async function cd8AccionAuxiliar(f, accion, btn) {
  const original = btn.textContent;
  const marcar = (t) => {
    btn.textContent = t;
    setTimeout(() => {
      btn.textContent = original;
    }, 1000);
  };
  if (accion.startsWith('copiar-')) {
    if (accion !== 'copiar-idc') await cd8AsegurarDatos(f);
    const valor = accion === 'copiar-idc' ? String(f.idc) : accion === 'copiar-rad' ? String(f.radicado || '') : String(f.asunto || '');
    if (!valor) return alert('Este documento no tiene ese dato disponible.');
    cdCopiarTexto(valor);
    return marcar('✓');
  }
  btn.disabled = true;
  btn.textContent = '⏳';
  try {
    if (accion === 'ver-pdf') await cdPrevisualizarPdf(f.idc);
    else if (accion === 'descargar-pdf') await cdDescargarPdf(f.idc);
    else if (accion === 'adjuntos') await cdDescargarAdjuntos(f.idc);
    else if (accion === 'pdf-adjuntos') await cd3DescargarPdfYAdjuntosZip(f.idc);
  } catch (e) {
    alert('No se pudo completar la acción: ' + e.message);
  } finally {
    btn.disabled = false;
    btn.textContent = original;
  }
}
function cd8PintarTodo() {
  const cont = document.querySelector('#PCD8_Lista');
  if (!cont) return;
  cont.innerHTML = CD8_FILAS.length
    ? CD8_FILAS.map((f) => `<div id="cd8-fila-${f.idc}"></div>`).join('')
    : '<div style="color:#9ca3af; font-size:12px; padding:10px 0;">Pega una tabla arriba y pulsa "Cargar y validar".</div>';
  CD8_FILAS.forEach(cd8PintarFila);
  cd8PintarResumen();
}
function cd8PintarResumen() {
  const cont = document.querySelector('#PCD8_Resumen');
  if (!cont) return;
  if (!CD8_FILAS.length) {
    cont.style.display = 'none';
    return;
  }
  cont.style.display = 'flex';
  const cuenta = (e) => CD8_FILAS.filter((f) => f.estado === e).length;
  const seleccionListos = CD8_FILAS.filter((f) => f.seleccionado && f.estado === 'listo').length;
  document.querySelector('#PCD8_Conteos').innerHTML =
    `${CD8_FILAS.length} en la lista: ✅ ${cuenta('listo')} listos · ⚠️ ${cuenta('revisar')} por revisar · ⛔ ${cuenta('error')} bloqueados · 🚀 ${cuenta('ok')} reasignados · ❌ ${cuenta('fallo')} fallidos`;
  document.querySelector('#PCD8_ReasignarSel').textContent = `🚀 Reasignar seleccionados (${seleccionListos})`;
}
function cd8HtmlDestino(f, d, k, bloqueada) {
  const opciones = d.candidatos.map((c, i) => `<option value="${i}">${cd8Esc(c.nombre)} (${Math.round(c.puntaje * 100)}%)</option>`).join('');
  const jefe = !cd8Elegido(d)
    ? ''
    : d.jefe === 'error'
      ? '<span style="color:#dc2626;">Sin jefe registrado</span>'
      : d.jefe
        ? `Jefe: ${cd8Esc(d.jefe)}`
        : '<span style="color:#9ca3af; font-weight:normal;">Buscando jefe…</span>';
  const aviso = d.confianza !== 'alta' && !d.confirmado && d.candidatos.length ? ' <span title="Coincidencia no exacta: confirma eligiendo en la lista" style="color:#d97706;">⚠️</span>' : '';
  return `
<div style="background:#f9fafb; border-radius:6px; padding:5px 6px; margin-top:5px;">
<div style="display:flex; gap:4px; align-items:center;">
<span style="font-size:10px; color:#6b7280; white-space:nowrap;">${f.destinos.length > 1 ? `Destino ${k + 1}` : 'Destino'}${aviso}</span>
<select class="cd8-destino" data-k="${k}" style="flex:1; min-width:0; padding:4px; font-size:11px; border:1px solid #ccc; border-radius:4px;" ${bloqueada || !d.candidatos.length ? 'disabled' : ''}>
${opciones || `<option>Sin coincidencias para "${cd8Esc(d.texto)}"</option>`}
</select>
<button class="cd8-buscar" data-k="${k}" title="Buscar esta dependencia por otro nombre" style="padding:3px 7px; font-size:11px; background:#ede9fe; color:#5b21b6; border:none; border-radius:4px; cursor:pointer;" ${bloqueada ? 'disabled' : ''}>🔎</button>
<button class="cd8-quitar-destino" data-k="${k}" title="${f.destinos.length > 1 ? 'Quitar este destino' : 'Dejar sin dependencia y quitar el IDC de la lista'}" style="padding:3px 7px; font-size:11px; background:#fee2e2; color:#991b1b; border:none; border-radius:4px; cursor:pointer;" ${bloqueada ? 'disabled' : ''}>✕</button>
</div>
<div style="font-size:11px; margin-top:3px; color:#1e3a8a; font-weight:bold;">${jefe}</div>
</div>`;
}
function cd8PintarFila(f) {
  const el = document.querySelector(`#cd8-fila-${f.idc}`);
  if (!el) return;
  const est = CD8_ESTILOS_ESTADO[f.estado] || CD8_ESTILOS_ESTADO.pendiente;
  const bloqueada = ['enviando', 'ok', 'validando'].includes(f.estado);
  const puedeEnviar = f.estado === 'listo' || f.estado === 'fallo';
  el.innerHTML = `
<div style="border:1px solid #e5e7eb; border-left:4px solid ${est.borde}; border-radius:8px; padding:9px; margin-bottom:8px; ${f.estado === 'ok' ? 'background:#f0fdf4;' : String(f.idc) === CD8_SELECCIONADA ? 'background:#fef9c3; box-shadow:0 0 0 2px #eab308;' : 'background:#fff;'}">
<div style="display:flex; justify-content:space-between; align-items:center; gap:8px;">
<label style="display:flex; align-items:center; gap:6px; font-weight:bold; font-size:13px; cursor:pointer;">
<input type="checkbox" class="cd8-sel" ${f.seleccionado ? 'checked' : ''} ${bloqueada ? 'disabled' : ''}> IDC ${cd8Esc(f.idc)}
</label>
<div style="display:flex; align-items:center; gap:6px;">
<span title="${cd8Esc(f.mensaje)}" style="padding:2px 9px; border-radius:10px; font-size:10px; font-weight:bold; background:${est.fondo}; color:${est.color}; white-space:nowrap;">${est.texto}</span>
<button class="cd8-quitar-fila" title="Dejar sin dependencia y quitar el IDC de la lista" style="padding:2px 7px; font-size:10px; background:#e5e7eb; color:#374151; border:none; border-radius:4px; cursor:pointer;" ${f.estado === 'enviando' ? 'disabled' : ''}>🧹 Quitar</button>
</div>
</div>
<div style="color:#6b7280; font-size:11px; margin-top:2px;">Radicado: ${f.radicado ? cd8Esc(f.radicado) : f.radicado === null ? '…' : '—'}</div>
${f.asunto ? `<div style="font-size:11.5px; margin-top:4px; word-break:break-word; color:#111827;">${cd8Esc(f.asunto)}</div>` : ''}
<div style="display:flex; flex-wrap:wrap; gap:4px; margin-top:6px;">
<button class="cd8-aux" data-accion="copiar-idc" title="Copiar IDC" style="${CD8_ESTILO_AUX} background:#e5e7eb;">📋 IDC</button>
<button class="cd8-aux" data-accion="copiar-rad" title="Copiar Radicado" style="${CD8_ESTILO_AUX} background:#e5e7eb;">📋 Rad</button>
<button class="cd8-aux" data-accion="copiar-asu" title="Copiar Asunto" style="${CD8_ESTILO_AUX} background:#e5e7eb;">📋 Asu</button>
<button class="cd8-aux" data-accion="ver-pdf" title="Previsualizar el PDF en una pestaña nueva" style="${CD8_ESTILO_AUX} background:#e5e7eb;">👁 Ver PDF</button>
<button class="cd8-aux" data-accion="descargar-pdf" title="Descargar solo el PDF del documento" style="${CD8_ESTILO_AUX} background:#e0e7ff; color:#3730a3;">⬇ PDF</button>
<button class="cd8-aux" data-accion="adjuntos" title="Descargar los adjuntos del documento" style="${CD8_ESTILO_AUX} background:#e0e7ff; color:#3730a3;">📎 Adjuntos</button>
<button class="cd8-aux" data-accion="pdf-adjuntos" title="Descargar el PDF + los adjuntos, juntos en un solo .zip" style="${CD8_ESTILO_AUX} background:#e0e7ff; color:#3730a3;">📦 PDF + Adj.</button>
</div>
<div style="color:#6b7280; font-size:10px; margin-top:6px;">Sugerido por la IA: ${cd8Esc(f.dependencia) || '—'}</div>
${f.destinos.map((d, k) => cd8HtmlDestino(f, d, k, bloqueada)).join('')}
<button class="cd8-agregar-destino" style="margin-top:5px; padding:4px 8px; font-size:11px; background:#eef2ff; color:#3730a3; border:1px dashed #a5b4fc; border-radius:4px; cursor:pointer;" ${bloqueada ? 'disabled' : ''}>➕ Agregar dependencia</button>
<textarea class="cd8-comentario" rows="2" style="width:100%; margin-top:5px; padding:4px; font-size:11px; border:1px solid #ccc; border-radius:4px; box-sizing:border-box;" ${bloqueada ? 'disabled' : ''}>${cd8Esc(f.comentario)}</textarea>
<div style="display:flex; justify-content:space-between; align-items:center; gap:6px; margin-top:4px; flex-wrap:wrap;">
<label title="${cd8Esc(f.justificacion || 'Sin justificación en la tabla')}" style="font-size:11px; color:#4b5563; cursor:pointer; display:flex; align-items:center; gap:4px;">
<input type="checkbox" class="cd8-just" ${f.incluirJust ? 'checked' : ''} ${bloqueada || !f.justificacion ? 'disabled' : ''}> Agregar justificación al comentario
</label>
<button class="cd8-enviar" style="padding:5px 10px; font-size:11px; font-weight:bold; background:#111827; color:#fff; border:none; border-radius:5px; cursor:${puedeEnviar ? 'pointer' : 'not-allowed'}; opacity:${puedeEnviar ? '1' : '0.4'};" ${puedeEnviar ? '' : 'disabled'}>🚀 Reasignar${f.destinos.length > 1 ? ` (${f.destinos.length} destinos)` : ''}</button>
</div>
${f.mensaje ? `<div style="font-size:10.5px; color:${est.color === '#fff' ? est.fondo : est.color}; margin-top:4px;">${cd8Esc(f.mensaje)}</div>` : ''}
</div>`;
  el.firstElementChild.addEventListener('click', () => {
    if (CD8_SELECCIONADA === String(f.idc)) return;
    const anterior = CD8_FILAS.find((x) => String(x.idc) === CD8_SELECCIONADA);
    CD8_SELECCIONADA = String(f.idc);
    if (anterior) cd8PintarFila(anterior);
    cd8PintarFila(f);
  });
  el.querySelectorAll('.cd8-destino').forEach((sel) => {
    const d = f.destinos[Number(sel.dataset.k)];
    if (d.candidatos.length) sel.value = String(d.sel);
    sel.onchange = async () => {
      d.sel = Number(sel.value);
      d.confirmado = true;
      d.jefe = null;
      cd8PintarFila(f);
      await cd8ResolverJefe(d);
      cd8Recalcular(f);
    };
  });
  el.querySelectorAll('.cd8-buscar').forEach((btn) => {
    btn.onclick = async () => {
      const k = Number(btn.dataset.k);
      const texto = prompt('Escribe parte del nombre de la dependencia (sin importar tildes):', f.destinos[k].texto);
      if (!texto || !texto.trim()) return;
      const nuevo = cd8NuevoDestino(texto.trim(), 0.2);
      if (!nuevo.candidatos.length) return alert('Sin coincidencias. Prueba con otra palabra clave del nombre.');
      f.destinos[k] = nuevo;
      cd8PintarFila(f);
      await cd8ResolverJefe(nuevo);
      cd8Recalcular(f);
    };
  });
  el.querySelectorAll('.cd8-quitar-destino').forEach((btn) => {
    btn.onclick = () => {
      if (f.destinos.length <= 1) return cd8QuitarFila(f); // sin dependencia → sale de la lista
      f.destinos.splice(Number(btn.dataset.k), 1);
      cd8Recalcular(f);
    };
  });
  el.querySelector('.cd8-agregar-destino').onclick = async () => {
    if (!CD8_CATALOGO) return alert('Primero carga la tabla para traer el catálogo de dependencias.');
    const texto = prompt(`Dependencia adicional para el IDC ${f.idc} (escribe parte del nombre, sin importar tildes):`, '');
    if (!texto || !texto.trim()) return;
    const nuevo = cd8NuevoDestino(texto.trim(), 0.2);
    if (!nuevo.candidatos.length) return alert('Sin coincidencias. Prueba con otra palabra clave del nombre.');
    nuevo.confirmado = true; // la eligió el usuario a mano
    f.destinos.push(nuevo);
    cd8PintarFila(f);
    await cd8ResolverJefe(nuevo);
    cd8Recalcular(f);
  };
  el.querySelectorAll('.cd8-aux').forEach((btn) => {
    btn.onclick = () => cd8AccionAuxiliar(f, btn.dataset.accion, btn);
  });
  el.querySelector('.cd8-quitar-fila').onclick = () => cd8QuitarFila(f);
  el.querySelector('.cd8-sel').onchange = (e) => {
    f.seleccionado = e.target.checked;
    cd8PintarResumen();
  };
  el.querySelector('.cd8-just').onchange = (e) => {
    f.incluirJust = e.target.checked;
  };
  el.querySelector('.cd8-comentario').addEventListener('input', (e) => {
    const estabaVacio = !f.comentario.trim();
    f.comentario = e.target.value;
    if (estabaVacio !== !f.comentario.trim()) {
      cd8CalcularEstado(f);
      cd8PintarResumen();
    }
  });
  el.querySelector('.cd8-enviar').onclick = () => {
    const detalle = f.destinos.map((d, k) => `${k + 1}. ${cd8Elegido(d).nombre} — Jefe: ${d.jefe}`).join('\n');
    if (!confirm(`Reasignar el IDC ${f.idc} a:\n\n${detalle}\n\nComentario:\n${cd8ComentarioFinal(f)}`)) return;
    cd8ReasignarFila(f);
  };
}
function cd8InyectarPestana() {
  const cuerpoGeneral = document.querySelector('#PCD_CuerpoGeneral');
  if (!cuerpoGeneral || document.querySelector('#PCD_CuerpoSec10')) return;
  const div = document.createElement('div');
  div.id = 'PCD_CuerpoSec10';
  div.style.display = 'none';
  div.innerHTML = `
<p style="color:#6b7280; font-size:11px; margin:0 0 6px;">Pega la tabla que generó la IA, tal cual: en Markdown o copiada directamente de la tabla del chat. Columnas: IDC, dependencia, comentario y justificación (opcional). Si un IDC va a varias dependencias, sepáralas con "+" o ";" en la misma celda. También acepta JSON.</p>
<textarea id="PCD8_Texto" rows="6" placeholder="| IDC | NOMBRE DEPENDENCIA COMPETENTE | COMENTARIO BREVE | JUSTIFICACIÓN |&#10;|---|---|---|---|&#10;| 2357356 | Subdirección de Salud Ambiental y Cambio Climático | ... | ... |" style="width:100%; padding:6px; border:1px solid #ccc; border-radius:6px; font-size:11px; box-sizing:border-box;"></textarea>
<div style="display:flex; gap:6px; margin:6px 0;">
<button id="PCD8_Cargar" style="flex:1; padding:8px; background:#4f46e5; color:#fff; border:none; border-radius:6px; cursor:pointer; font-weight:bold;">📥 Cargar y validar</button>
<button id="PCD8_Limpiar" style="padding:8px 12px; background:#e5e7eb; border:none; border-radius:6px; cursor:pointer; font-size:12px;">🗑 Limpiar</button>
</div>
<div style="display:flex; flex-wrap:wrap; gap:10px; align-items:center; font-size:11px; color:#4b5563; margin-bottom:6px;">
<label style="cursor:pointer;"><input type="checkbox" id="PCD8_Mayus" checked> Comentario en mayúsculas</label>
<label style="cursor:pointer;"><input type="checkbox" id="PCD8_JustTodas"> Agregar justificación en todas</label>
<label>Agregar al final:
<select id="PCD8_Sufijo" style="padding:3px; font-size:11px; border:1px solid #ccc; border-radius:4px; max-width:220px;">
<option value="">Nada</option>
${CD3_COMENTARIOS_REASIGNACION.map((c, i) => `<option value="${i}">${cd8Esc(cd3TruncarTexto(c.etiqueta, 45))}</option>`).join('')}
</select>
</label>
</div>
<div id="PCD8_Estado" style="font-size:12px; color:#6b7280; margin-bottom:6px;"></div>
<div id="PCD8_Resumen" style="display:none; flex-direction:column; gap:6px; padding:8px; background:#f9fafb; border-radius:6px; margin-bottom:8px;">
<div id="PCD8_Conteos" style="font-size:11px; color:#374151;"></div>
<div style="display:flex; gap:5px; flex-wrap:wrap;">
<button id="PCD8_SelListos" style="padding:4px 8px; font-size:11px; background:#e5e7eb; border:none; border-radius:4px; cursor:pointer;">☑ Solo los listos</button>
<button id="PCD8_SelNinguno" style="padding:4px 8px; font-size:11px; background:#e5e7eb; border:none; border-radius:4px; cursor:pointer;">☐ Ninguno</button>
<button id="PCD8_QuitarBloqueados" title="Quita de la lista los IDC que no se pueden reasignar" style="padding:4px 8px; font-size:11px; background:#e5e7eb; border:none; border-radius:4px; cursor:pointer;">🧹 Quitar bloqueados</button>
<button id="PCD8_QuitarReasignados" title="Quita de la lista los IDC ya reasignados" style="padding:4px 8px; font-size:11px; background:#e5e7eb; border:none; border-radius:4px; cursor:pointer;">🧹 Quitar reasignados</button>
<button id="PCD8_Reintentar" style="padding:4px 8px; font-size:11px; background:#e5e7eb; border:none; border-radius:4px; cursor:pointer;">🔁 Reintentar fallidos</button>
<button id="PCD8_CopiarPendientes" style="padding:4px 8px; font-size:11px; background:#e5e7eb; border:none; border-radius:4px; cursor:pointer;">📋 Copiar IDC no reasignados</button>
</div>
<button id="PCD8_ReasignarSel" style="padding:8px; background:#16a34a; color:#fff; border:none; border-radius:6px; cursor:pointer; font-weight:bold;">🚀 Reasignar seleccionados (0)</button>
</div>
<div id="PCD8_Lista" style="max-height:520px; overflow-y:auto;"></div>`;
  cuerpoGeneral.appendChild(div);
  const quitarPorEstado = (estadoObjetivo, etiqueta) => {
    if (CD8_EN_CURSO) return;
    const antes = CD8_FILAS.length;
    CD8_FILAS = CD8_FILAS.filter((f) => f.estado !== estadoObjetivo);
    cd8PintarTodo();
    document.querySelector('#PCD8_Estado').textContent = `${antes - CD8_FILAS.length} IDC ${etiqueta} quitados de la lista.`;
  };
  document.querySelector('#PCD8_Cargar').onclick = cd8CargarTabla;
  document.querySelector('#PCD8_Limpiar').onclick = () => {
    if (CD8_EN_CURSO) return;
    CD8_FILAS = [];
    CD8_SELECCIONADA = null;
    document.querySelector('#PCD8_Texto').value = '';
    document.querySelector('#PCD8_Estado').textContent = '';
    cd8PintarTodo();
  };
  document.querySelector('#PCD8_JustTodas').onchange = (e) => {
    CD8_FILAS.forEach((f) => {
      if (f.justificacion && !['ok', 'enviando'].includes(f.estado)) {
        f.incluirJust = e.target.checked;
        cd8PintarFila(f);
      }
    });
  };
  document.querySelector('#PCD8_SelListos').onclick = () => {
    CD8_FILAS.forEach((f) => {
      f.seleccionado = f.estado === 'listo';
      cd8PintarFila(f);
    });
    cd8PintarResumen();
  };
  document.querySelector('#PCD8_SelNinguno').onclick = () => {
    CD8_FILAS.forEach((f) => {
      f.seleccionado = false;
      cd8PintarFila(f);
    });
    cd8PintarResumen();
  };
  document.querySelector('#PCD8_QuitarBloqueados').onclick = () => quitarPorEstado('error', 'bloqueados');
  document.querySelector('#PCD8_QuitarReasignados').onclick = () => quitarPorEstado('ok', 'ya reasignados');
  document.querySelector('#PCD8_ReasignarSel').onclick = () => cd8ReasignarSeleccionados(false);
  document.querySelector('#PCD8_Reintentar').onclick = () => cd8ReasignarSeleccionados(true);
  document.querySelector('#PCD8_CopiarPendientes').onclick = () => {
    const ids = CD8_FILAS.filter((f) => f.estado !== 'ok').map((f) => f.idc);
    if (!ids.length) return alert('Todas las filas ya fueron reasignadas.');
    cdCopiarTexto(ids.join('\n'));
    document.querySelector('#PCD8_Estado').textContent = `📋 ${ids.length} IDC copiados.`;
  };
  cd8PintarTodo();
}

// ════════════════════════════════════════════════════════════════
// ═══ INICIALIZACIÓN ═══
// ════════════════════════════════════════════════════════════════
cdCrearPanel();
cd3CrearPanel();
