// ==========================================
// DESCARGA DIRECTA DE ADJUNTOS (sin simular clics)
// Llama directamente al endpoint que usa el botón "Descargar Adjuntos"
// ==========================================

const CONFIG_DIRECTO = {
  urlGuardarZip: 'https://controldoc.minsalud.gov.co/Controldoc//Gestion/GuardarAdjuntosZIP',
  diligenciados: 'NO', // valor visto en el payload capturado
};

async function descargarAdjuntosPorIDC(idc, onResultado) {
  const body = new URLSearchParams({
    IDDOCUMENTO: idc,
    DILIGENCIADOS: CONFIG_DIRECTO.diligenciados,
  });

  try {
    const resp = await fetch(CONFIG_DIRECTO.urlGuardarZip, {
      method: 'POST',
      credentials: 'same-origin', // reutiliza la cookie de sesión ya activa
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'X-Requested-With': 'XMLHttpRequest',
      },
      body: body.toString(),
    });

    const data = await resp.json();

    if (data && data.RESPUESTA === true && data.VALORESPUESTA) {
      console.log(`✅ IDC ${idc}: ${data.MENSAJE} -> ${data.OBJETOS}`);
      // Dispara la descarga del archivo sin abrir pestaña nueva
      const a = document.createElement('a');
      a.href = data.VALORESPUESTA;
      a.download = data.OBJETOS || `AdjuntosDoc_${idc}.zip`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      if (onResultado) onResultado(idc, true);
      return true;
    } else {
      console.log(`ℹ️ IDC ${idc}: sin adjuntos o respuesta negativa ->`, data.MENSAJE || data);
      if (onResultado) onResultado(idc, false);
      return false;
    }
  } catch (err) {
    console.log(`❌ IDC ${idc}: error en la petición ->`, err.message);
    if (onResultado) onResultado(idc, false);
    return false;
  }
}

// Procesa una lista de IDC uno tras otro, con pausa entre cada descarga
async function descargarAdjuntosLote(listaIdc, onResultado, onResumen, pausaMs = 1500) {
  const fallidos = [];

  for (const idcRaw of listaIdc) {
    const idc = idcRaw.toString().trim();
    const ok = await descargarAdjuntosPorIDC(idc, onResultado);
    if (!ok) fallidos.push(idc);
    await new Promise(r => setTimeout(r, pausaMs));
  }

  console.log('🏁 Lote finalizado.');
  if (fallidos.length) {
    const msg = `⚠️ ${fallidos.length} IDC sin descarga (probablemente sin adjuntos): ${fallidos.join(', ')}`;
    console.log(msg);
    if (onResumen) onResumen(false, msg);
  } else {
    const msg = '✅ Todos los IDC se descargaron correctamente.';
    console.log(msg);
    if (onResumen) onResumen(true, msg);
  }
}

// ==========================================
// UI flotante: un campo de texto (uno o varios IDC separados por coma/salto de línea) + botón
// ==========================================
function crearUIDescargaDirecta() {
  const existente = document.querySelector('#ContenedorDescargaDirecta');
  if (existente) existente.remove();

  const cont = document.createElement('div');
  cont.id = 'ContenedorDescargaDirecta';
  cont.style.cssText = 'position:fixed; bottom:20px; left:20px; z-index:99999; background:#fff; border:1px solid #ccc; border-radius:8px; padding:10px; box-shadow:0 2px 10px rgba(0,0,0,0.3); width:260px; font-family:sans-serif;';

  cont.innerHTML = `
    <div id="EncabezadoDescargaDirecta" style="display:flex; justify-content:space-between; align-items:center; font-weight:bold; margin-bottom:6px; cursor:grab; user-select:none;">
      <span>📎 Descarga directa de adjuntos</span>
      <button id="btnCerrarDescargaDirecta" title="Cerrar panel" style="background:none; border:none; color:#666; font-size:16px; font-weight:bold; cursor:pointer; line-height:1; padding:0 4px;">✕</button>
    </div>
    <textarea id="txtIdcLote" placeholder="IDC (uno por línea o separados por coma)" style="width:100%; height:60px; margin-bottom:6px;"></textarea>
    <button id="btnDescargaDirecta" style="width:100%; padding:8px; background:#2563eb; color:#fff; border:none; border-radius:6px; cursor:pointer; font-weight:bold;">📎 Descargar</button>
    <div id="ResumenDescargaDirecta" style="display:none; margin-top:8px; padding:6px 8px; border-radius:6px; font-size:12px; font-weight:bold;"></div>
    <div id="EstadoDescargaDirecta" style="margin-top:8px; max-height:120px; overflow-y:auto; font-size:12px; line-height:1.6;"></div>
  `;
  document.body.appendChild(cont);
  habilitarArrastreDirecto(cont, document.querySelector('#EncabezadoDescargaDirecta'));

  document.querySelector('#btnCerrarDescargaDirecta').onclick = (e) => {
    e.stopPropagation();
    cont.remove();
  };
  document.querySelector('#btnCerrarDescargaDirecta').addEventListener('mousedown', (e) => e.stopPropagation());

  const mostrarResultado = (idc, exito) => {
    const contEstado = document.querySelector('#EstadoDescargaDirecta');
    const linea = document.createElement('div');
    if (exito) {
      linea.style.color = '#16a34a'; // verde
      linea.textContent = `✔ Documento ${idc} se descargó`;
    } else {
      linea.style.color = '#ea580c'; // naranja
      linea.textContent = `✖ Documento ${idc} probablemente no tiene adjuntos`;
    }
    contEstado.prepend(linea);
  };

  const mostrarResumen = (todoOk, mensaje) => {
    const resumen = document.querySelector('#ResumenDescargaDirecta');
    resumen.style.display = 'block';
    resumen.textContent = mensaje;
    resumen.style.background = todoOk ? '#dcfce7' : '#ffedd5';
    resumen.style.color = todoOk ? '#16a34a' : '#ea580c';
  };

  document.querySelector('#btnDescargaDirecta').onclick = () => {
    const btn = document.querySelector('#btnDescargaDirecta');
    if (btn.disabled) return; // evita doble clic mientras procesa

    const txtArea = document.querySelector('#txtIdcLote');
    const lista = txtArea.value.split(/[\n,]+/).map(v => v.trim()).filter(Boolean);
    if (!lista.length) return console.log('⚠️ No hay IDC para procesar.');
    txtArea.value = '';

    const resumen = document.querySelector('#ResumenDescargaDirecta');
    resumen.style.display = 'none';

    btn.disabled = true;
    btn.style.opacity = '0.6';
    btn.style.cursor = 'not-allowed';
    btn.textContent = '⏳ Procesando...';

    descargarAdjuntosLote(lista, mostrarResultado, (todoOk, mensaje) => {
      mostrarResumen(todoOk, mensaje);
      btn.disabled = false;
      btn.style.opacity = '1';
      btn.style.cursor = 'pointer';
      btn.textContent = '📎 Descargar';
    });
  };
}

// ==========================================
// Permitir arrastrar el contenedor tomándolo por el encabezado
// ==========================================
function habilitarArrastreDirecto(contenedor, agarre) {
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

crearUIDescargaDirecta();
