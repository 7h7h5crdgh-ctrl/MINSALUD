// ==========================================
// CIERRE MASIVO POR COMENTARIO (sin simular clics de Trámite Masivo)
// 1. Trae el listado "Sin iniciar trámite" para mapear Id Control -> IDDOCUMENTOGESTION
// 2. Llama directamente al endpoint que ejecuta el cierre por cada IDC
// ==========================================

const CONFIG_CIERRE = {
  urlListado: 'https://controldoc.minsalud.gov.co/Controldoc//Documentos/DOCUMENTOSGESTIONObtenerbyESTADOFLUJOeIDUSUARIOASIGNO',
  urlActualizar: 'https://controldoc.minsalud.gov.co/Controldoc//Gestion/DOCUMENTOSGESTIONActualizarAlTramitarByGESTION/',
  idAccionGestionExitosa: 4,
  estadoFlujoDestino: 'GESTION EXITOSA',
  comentarioDefault: 'SE RECIBE EL RESPECTIVO REPORTE, POR LO QUE SE PROCEDE A ARCHIVAR Y CERRAR LA PRESENTE COMUNICACIÓN POR COMENTARIO.',
};

// Trae el listado completo "Sin iniciar trámite" y arma un mapa IDC -> IDDOCUMENTOGESTION
async function obtenerMapaIdcAGestion() {
  const body = new URLSearchParams({
    sort: '', group: '', filter: '',
    ESTADOFLUJO: 'SIN INICIAR TRAMITE',
    TRAMITADO: 'NO',
    ANIO: '', MES: '', DIA: '',
    IDTIPOLOGIADOCUMENTAL: '0',
    PRIORIDAD: '',
    IDCLASE: '2',
    IDCONTROL: '0',
    RADICADO: '',
    TIPOPROCESO: '',
    IDMODALIDADCONTRATACION: '0',
    IDREGIONAL: '0',
    IDCENTRO: '0',
    NUMPROCESO: '',
    CHCKFECHVENC: 'false',
    IDFUNCIONARIO_VBG: '0',
    DESCRIPCION: '',
    ASUNTO: '',
    FILTROPQR: 'NO',
  });

  const resp = await fetch(CONFIG_CIERRE.urlListado, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'X-Requested-With': 'XMLHttpRequest',
    },
    body: body.toString(),
  });

  const data = await resp.json();
  const mapa = {};
  (data.Data || []).forEach(fila => {
    mapa[fila.IDDOCUMENTO] = fila.IDDOCUMENTOGESTION;
  });
  console.log(`📋 Listado cargado: ${data.Total ?? (data.Data || []).length} documentos totales, ${Object.keys(mapa).length} mapeados.`);
  return mapa;
}

// Ejecuta el cierre por comentario para un solo IDC ya resuelto a su IDDOCUMENTOGESTION
async function cerrarPorComentarioGestion(idc, idGestion, comentario) {
  const body = new URLSearchParams({
    'actualizarTramite[DOCUMENTOGESTION][IDDOCUMENTO]': idc,
    'actualizarTramite[DOCUMENTOGESTION][IDACCION]': CONFIG_CIERRE.idAccionGestionExitosa,
    'actualizarTramite[DOCUMENTOGESTION][ESTADOFLUJO]': CONFIG_CIERRE.estadoFlujoDestino,
    'actualizarTramite[DOCUMENTOGESTION][COMENTARIO]': comentario,
    'actualizarTramite[DOCUMENTOGESTION][DOCGESGENERO]': '',
    'actualizarTramite[DOCUMENTOGESTION][TRAMITADO]': 'SI',
    'actualizarTramite[DOCUMENTOGESTION][strIDDOCUMENTOSGESTION]': idGestion,
  });

  try {
    const resp = await fetch(CONFIG_CIERRE.urlActualizar, {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'X-Requested-With': 'XMLHttpRequest',
      },
      body: body.toString(),
    });
    const data = await resp.json();
    return data === true;
  } catch (err) {
    console.log(`❌ IDC ${idc}: error en la petición ->`, err.message);
    return false;
  }
}

// Procesa una lista de IDC: resuelve cada uno contra el mapa y ejecuta el cierre
async function cerrarPorComentarioLote(listaIdc, comentario, onResultado, onResumen, pausaMs = 1200) {
  const mapa = await obtenerMapaIdcAGestion();
  const fallidos = [];

  for (const idcRaw of listaIdc) {
    const idc = idcRaw.toString().trim();
    const idGestion = mapa[idc];

    if (!idGestion) {
      console.log(`ℹ️ IDC ${idc}: no encontrado en "Sin iniciar trámite" (ya tramitado o no existe).`);
      fallidos.push(idc);
      if (onResultado) onResultado(idc, false);
      continue;
    }

    const ok = await cerrarPorComentarioGestion(idc, idGestion, comentario);
    console.log(ok ? `✅ IDC ${idc}: cerrado correctamente.` : `❌ IDC ${idc}: la gestión no se confirmó.`);
    if (!ok) fallidos.push(idc);
    if (onResultado) onResultado(idc, ok);
    await new Promise(r => setTimeout(r, pausaMs));
  }

  console.log('🏁 Lote finalizado.');
  if (fallidos.length) {
    const msg = `⚠️ ${fallidos.length} IDC sin cerrar (revisar si ya estaban tramitados): ${fallidos.join(', ')}`;
    console.log(msg);
    if (onResumen) onResumen(false, msg);
  } else {
    const msg = '✅ Todos los IDC se cerraron correctamente.';
    console.log(msg);
    if (onResumen) onResumen(true, msg);
  }
}

// ==========================================
// UI flotante y arrastrable
// ==========================================
function crearUICierrePorComentario() {
  const existente = document.querySelector('#ContenedorCierreComentario');
  if (existente) existente.remove();

  const cont = document.createElement('div');
  cont.id = 'ContenedorCierreComentario';
  cont.style.cssText = 'position:fixed; bottom:20px; right:20px; z-index:99999; background:#fff; border:1px solid #ccc; border-radius:8px; padding:10px; box-shadow:0 2px 10px rgba(0,0,0,0.3); width:300px; font-family:sans-serif;';

  cont.innerHTML = `
    <div id="EncabezadoCierreComentario" style="display:flex; justify-content:space-between; align-items:center; font-weight:bold; margin-bottom:6px; cursor:grab; user-select:none;">
      <span>🗂️ Cierre masivo por comentario</span>
      <button id="btnCerrarCierreComentario" title="Cerrar panel" style="background:none; border:none; color:#666; font-size:16px; font-weight:bold; cursor:pointer; line-height:1; padding:0 4px;">✕</button>
    </div>
    <textarea id="txtIdcCierre" placeholder="IDC (uno por línea o separados por coma)" style="width:100%; height:55px; margin-bottom:6px;"></textarea>
    <textarea id="txtComentarioCierre" style="width:100%; height:70px; margin-bottom:6px; font-size:12px;">${CONFIG_CIERRE.comentarioDefault}</textarea>
    <button id="btnCerrarComentario" style="width:100%; padding:8px; background:#2563eb; color:#fff; border:none; border-radius:6px; cursor:pointer; font-weight:bold;">🗂️ Cerrar por Comentario</button>
    <div id="ResumenCierreComentario" style="display:none; margin-top:8px; padding:6px 8px; border-radius:6px; font-size:12px; font-weight:bold;"></div>
    <div id="EstadoCierreComentario" style="margin-top:8px; max-height:120px; overflow-y:auto; font-size:12px; line-height:1.6;"></div>
  `;
  document.body.appendChild(cont);
  habilitarArrastreCierre(cont, document.querySelector('#EncabezadoCierreComentario'));

  document.querySelector('#btnCerrarCierreComentario').onclick = (e) => {
    e.stopPropagation();
    cont.remove();
  };
  document.querySelector('#btnCerrarCierreComentario').addEventListener('mousedown', (e) => e.stopPropagation());

  const mostrarResultado = (idc, exito) => {
    const contEstado = document.querySelector('#EstadoCierreComentario');
    const linea = document.createElement('div');
    if (exito) {
      linea.style.color = '#16a34a';
      linea.textContent = `✔ Documento ${idc} se cerró`;
    } else {
      linea.style.color = '#ea580c';
      linea.textContent = `✖ Documento ${idc} no se pudo cerrar`;
    }
    contEstado.prepend(linea);
  };

  const mostrarResumen = (todoOk, mensaje) => {
    const resumen = document.querySelector('#ResumenCierreComentario');
    resumen.style.display = 'block';
    resumen.textContent = mensaje;
    resumen.style.background = todoOk ? '#dcfce7' : '#ffedd5';
    resumen.style.color = todoOk ? '#16a34a' : '#ea580c';
  };

  document.querySelector('#btnCerrarComentario').onclick = () => {
    const btn = document.querySelector('#btnCerrarComentario');
    if (btn.disabled) return;

    const txtIdc = document.querySelector('#txtIdcCierre');
    const lista = txtIdc.value.split(/[\n,]+/).map(v => v.trim()).filter(Boolean);
    if (!lista.length) return console.log('⚠️ No hay IDC para procesar.');

    const comentario = document.querySelector('#txtComentarioCierre').value.trim();
    if (!comentario) return console.log('⚠️ El comentario no puede estar vacío.');

    txtIdc.value = '';
    document.querySelector('#ResumenCierreComentario').style.display = 'none';

    btn.disabled = true;
    btn.style.opacity = '0.6';
    btn.style.cursor = 'not-allowed';
    btn.textContent = '⏳ Procesando...';

    cerrarPorComentarioLote(lista, comentario, mostrarResultado, (todoOk, mensaje) => {
      mostrarResumen(todoOk, mensaje);
      btn.disabled = false;
      btn.style.opacity = '1';
      btn.style.cursor = 'pointer';
      btn.textContent = '🗂️ Cerrar por Comentario';
    });
  };
}

function habilitarArrastreCierre(contenedor, agarre) {
  let arrastrando = false;
  let offsetX = 0;
  let offsetY = 0;

  agarre.addEventListener('mousedown', (e) => {
    arrastrando = true;
    agarre.style.cursor = 'grabbing';
    const rect = contenedor.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;
    contenedor.style.right = 'auto';
    contenedor.style.bottom = 'auto';
    contenedor.style.left = rect.left + 'px';
    contenedor.style.top = rect.top + 'px';
  });

  document.addEventListener('mousemove', (e) => {
    if (!arrastrando) return;
    let nuevoX = e.clientX - offsetX;
    let nuevoY = e.clientY - offsetY;
    const maxX = window.innerWidth - contenedor.offsetWidth;
    const maxY = window.innerHeight - contenedor.offsetHeight;
    nuevoX = Math.min(Math.max(0, nuevoX), maxX);
    nuevoY = Math.min(Math.max(0, nuevoY), maxY);
    contenedor.style.left = nuevoX + 'px';
    contenedor.style.top = nuevoY + 'px';
  });

  document.addEventListener('mouseup', () => {
    if (arrastrando) {
      arrastrando = false;
      agarre.style.cursor = 'grab';
    }
  });
}

crearUICierrePorComentario();
