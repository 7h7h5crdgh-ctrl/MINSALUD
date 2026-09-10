// ==========================================
// DESCARGA DIRECTA DEL PDF (IMAGEN) DE UN DOCUMENTO
// Llama directamente al endpoint que devuelve el PDF en base64
// ==========================================

const CONFIG_PDF = {
  urlImagenB64: 'https://controldoc.minsalud.gov.co/Controldoc//Documentos/IMAGENB64byIDDOCUMENTO/',
};

// Convierte un string base64 en un Blob de tipo PDF
function base64APdfBlob(base64) {
  const binario = atob(base64);
  const bytes = new Uint8Array(binario.length);
  for (let i = 0; i < binario.length; i++) {
    bytes[i] = binario.charCodeAt(i);
  }
  return new Blob([bytes], { type: 'application/pdf' });
}

async function descargarPdfPorIDC(idc, onResultado) {
  const body = new URLSearchParams({ IDDOCUMENTO: idc });

  try {
    const resp = await fetch(CONFIG_PDF.urlImagenB64, {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'X-Requested-With': 'XMLHttpRequest',
      },
      body: body.toString(),
    });

    let texto = await resp.text();

    // Extrae la porción más larga de texto que luzca como base64 válido,
    // sin importar si viene envuelta en comillas, JSON, o cualquier otro formato.
    const coincidencia = texto.match(/[A-Za-z0-9+/=]{200,}/);
    const base64 = coincidencia ? coincidencia[0] : null;

    if (!base64 || !base64.startsWith('JVBERi0')) {
      console.log(`ℹ️ IDC ${idc}: no se encontró un PDF válido (probablemente sin imagen asociada).`);
      if (onResultado) onResultado(idc, false);
      return false;
    }

    const blob = base64APdfBlob(base64);
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Documento_${idc}.pdf`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);

    console.log(`✅ IDC ${idc}: PDF descargado.`);
    if (onResultado) onResultado(idc, true);
    return true;
  } catch (err) {
    console.log(`❌ IDC ${idc}: error en la petición ->`, err.message);
    if (onResultado) onResultado(idc, false);
    return false;
  }
}

async function descargarPdfLote(listaIdc, onResultado, onResumen, pausaMs = 1200) {
  const fallidos = [];

  for (const idcRaw of listaIdc) {
    const idc = idcRaw.toString().trim();
    const ok = await descargarPdfPorIDC(idc, onResultado);
    if (!ok) fallidos.push(idc);
    await new Promise(r => setTimeout(r, pausaMs));
  }

  console.log('🏁 Lote finalizado.');
  if (fallidos.length) {
    const msg = `⚠️ ${fallidos.length} IDC sin PDF (probablemente sin imagen asociada): ${fallidos.join(', ')}`;
    console.log(msg);
    if (onResumen) onResumen(false, msg);
  } else {
    const msg = '✅ Todos los PDF se descargaron correctamente.';
    console.log(msg);
    if (onResumen) onResumen(true, msg);
  }
}

// ==========================================
// UI flotante y arrastrable
// ==========================================
function crearUIDescargaPdf() {
  const existente = document.querySelector('#ContenedorDescargaPdf');
  if (existente) existente.remove();

  const cont = document.createElement('div');
  cont.id = 'ContenedorDescargaPdf';
  cont.style.cssText = 'position:fixed; top:20px; right:20px; z-index:99999; background:#fff; border:1px solid #ccc; border-radius:8px; padding:10px; box-shadow:0 2px 10px rgba(0,0,0,0.3); width:260px; font-family:sans-serif;';

  cont.innerHTML = `
    <div id="EncabezadoDescargaPdf" style="font-weight:bold; margin-bottom:6px; cursor:grab; user-select:none;">📄 Descarga directa de PDF</div>
    <textarea id="txtIdcPdf" placeholder="IDC (uno por línea o separados por coma)" style="width:100%; height:60px; margin-bottom:6px;"></textarea>
    <button id="btnDescargaPdf" style="width:100%; padding:8px; background:#2563eb; color:#fff; border:none; border-radius:6px; cursor:pointer; font-weight:bold;">📄 Descargar PDF</button>
    <div id="ResumenDescargaPdf" style="display:none; margin-top:8px; padding:6px 8px; border-radius:6px; font-size:12px; font-weight:bold;"></div>
    <div id="EstadoDescargaPdf" style="margin-top:8px; max-height:120px; overflow-y:auto; font-size:12px; line-height:1.6;"></div>
  `;
  document.body.appendChild(cont);
  habilitarArrastrePdf(cont, document.querySelector('#EncabezadoDescargaPdf'));

  const mostrarResultado = (idc, exito) => {
    const contEstado = document.querySelector('#EstadoDescargaPdf');
    const linea = document.createElement('div');
    if (exito) {
      linea.style.color = '#16a34a';
      linea.textContent = `✔ Documento ${idc} se descargó`;
    } else {
      linea.style.color = '#ea580c';
      linea.textContent = `✖ Documento ${idc} sin PDF disponible`;
    }
    contEstado.prepend(linea);
  };

  const mostrarResumen = (todoOk, mensaje) => {
    const resumen = document.querySelector('#ResumenDescargaPdf');
    resumen.style.display = 'block';
    resumen.textContent = mensaje;
    resumen.style.background = todoOk ? '#dcfce7' : '#ffedd5';
    resumen.style.color = todoOk ? '#16a34a' : '#ea580c';
  };

  document.querySelector('#btnDescargaPdf').onclick = () => {
    const btn = document.querySelector('#btnDescargaPdf');
    if (btn.disabled) return;

    const txtArea = document.querySelector('#txtIdcPdf');
    const lista = txtArea.value.split(/[\n,]+/).map(v => v.trim()).filter(Boolean);
    if (!lista.length) return console.log('⚠️ No hay IDC para procesar.');
    txtArea.value = '';

    document.querySelector('#ResumenDescargaPdf').style.display = 'none';

    btn.disabled = true;
    btn.style.opacity = '0.6';
    btn.style.cursor = 'not-allowed';
    btn.textContent = '⏳ Procesando...';

    descargarPdfLote(lista, mostrarResultado, (todoOk, mensaje) => {
      mostrarResumen(todoOk, mensaje);
      btn.disabled = false;
      btn.style.opacity = '1';
      btn.style.cursor = 'pointer';
      btn.textContent = '📄 Descargar PDF';
    });
  };
}

function habilitarArrastrePdf(contenedor, agarre) {
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

crearUIDescargaPdf();

