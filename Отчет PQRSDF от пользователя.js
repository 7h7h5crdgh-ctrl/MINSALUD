// ==========================================
// REPORTE DE CONTADORES (Sin Tramitar / En Tránsito / Gestión Exitosa) POR USUARIO
// Usa el endpoint CONSULTARESTADOCUANTOS, que sí acepta filtro por año (ANO)
// ==========================================

const CONFIG_REPORTE = {
  urlContadores: 'https://controldoc.minsalud.gov.co/Controldoc/Gestion/CONSULTARESTADOCUANTOS',
  pausaMs: 1200,
};

// ⚠️ EDITA ESTE ARRAY con los usuarios que quieres monitorear.
// idFuncionario es el ID que viste en la URL (ej. 734 para Ricardo Luque).
const USUARIOS_A_MONITOREAR = [
  { nombre: 'Aura Alejandra', idFuncionario: 23505 },
  { nombre: 'Carlos Mauro', idFuncionario: 725 },
  { nombre: 'Danilo', idFuncionario: 12323 },
  { nombre: 'Deivy', idFuncionario: 24034 },
  { nombre: 'Diego Alejandro', idFuncionario: 727 },
  { nombre: 'Elizabeth', idFuncionario: 728 },
  { nombre: 'Jenny Liliana', idFuncionario: 730 },
  { nombre: 'Jhonny Alexander', idFuncionario: 2096 },
  { nombre: 'Juan David', idFuncionario: 24569 },
  { nombre: 'Julieta Isabel', idFuncionario: 731 },
  { nombre: 'Lilian Andrea', idFuncionario: 24277 },
  { nombre: 'Maria Camila', idFuncionario: 732 },
  { nombre: 'Miguel Angel', idFuncionario: 2095 },
  { nombre: 'Pablo Andres', idFuncionario: 733 },
  { nombre: 'Roberto', idFuncionario: 734 },
  { nombre: 'Sara Paola', idFuncionario: 23588 },
  { nombre: 'Sidia', idFuncionario: 735 },
  { nombre: 'Viviana Andrea', idFuncionario: 23734 },
];

// Consulta CONSULTARESTADOCUANTOS para un funcionario y año específicos.
// Respuesta esperada: un string JSON con formato "*N*N*N*N*N*"
// (Sin Tramitar / En Tránsito / Gestión Exitosa / (sin uso) / (sin uso))
async function obtenerContadoresPorFuncionario(idFuncionario, anio) {
  const params = new URLSearchParams({
    ESTADO: 'TODOS',
    TRAMITADO: 'NO',
    ANO: anio,
    MES: '',
    DIA: '',
    IDTIPOLOGIADOCUMENTAL: '0',
    PRIORIDAD: '',
    IDCLASE: '0',
    IDCONTROL: '0',
    RADICADO: '',
    TIPOPROCESO: '',
    IDMODALIDADCONTRATACION: '0',
    IDREGIONAL: '0',
    IDCENTRO: '0',
    NUMPROCESO: '',
    IDFUNCIONARIO_VBG: idFuncionario,
  });

  try {
    const resp = await fetch(`${CONFIG_REPORTE.urlContadores}?${params.toString()}`, {
      method: 'GET',
      credentials: 'same-origin',
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
      },
    });

    if (!resp.ok) {
      console.log(`❌ idFuncionario ${idFuncionario}: HTTP ${resp.status}`);
      return null;
    }

    // La respuesta es un string JSON, ej: "*0*0*18*0*0*"
    const cadena = await resp.json();

    if (typeof cadena !== 'string' || !cadena.includes('*')) {
      console.log(`⚠️ idFuncionario ${idFuncionario}: respuesta inesperada ->`, cadena);
      return null;
    }

    const partes = cadena.split('*').filter(v => v !== '');

    return {
      sinTramitar: parseInt(partes[0], 10) || 0,
      enTransito: parseInt(partes[1], 10) || 0,
      gestionExitosa: parseInt(partes[2], 10) || 0,
    };
  } catch (err) {
    console.log(`❌ idFuncionario ${idFuncionario}: error de red ->`, err.message);
    return null;
  }
}

// Procesa la lista completa de usuarios, uno a la vez, con pausa entre cada petición
async function generarReporteCompleto(usuarios, anio, onResultado, onResumen, pausaMs = CONFIG_REPORTE.pausaMs) {
  const resultados = [];
  const fallidos = [];

  for (let i = 0; i < usuarios.length; i++) {
    const usuario = usuarios[i];
    const numero = i + 1;
    const contadores = await obtenerContadoresPorFuncionario(usuario.idFuncionario, anio);
    if (contadores) {
      const fila = { ...usuario, ...contadores };
      resultados.push(fila);
      if (onResultado) onResultado(fila, true, numero);
    } else {
      fallidos.push(usuario);
      if (onResultado) onResultado(usuario, false, numero);
    }
    await new Promise(r => setTimeout(r, pausaMs));
  }

  console.log('🏁 Reporte finalizado.');
  const msg = fallidos.length
    ? `⚠️ ${fallidos.length} usuario(s) sin datos: ${fallidos.map(u => u.nombre).join(', ')}`
    : `✅ Todos los usuarios se consultaron correctamente (año ${anio}).`;
  console.log(msg);
  if (onResumen) onResumen(!fallidos.length, msg, resultados);

  return resultados;
}

// ==========================================
// UI flotante y arrastrable
// ==========================================
function crearUIReporteContadores() {
  const existente = document.querySelector('#ContenedorReporteContadores');
  if (existente) existente.remove();

  const cont = document.createElement('div');
  cont.id = 'ContenedorReporteContadores';
  cont.style.cssText = 'position:fixed; top:20px; left:20px; z-index:99999; background:#fff; border:1px solid #ccc; border-radius:8px; padding:10px; box-shadow:0 2px 10px rgba(0,0,0,0.3); width:480px; font-family:sans-serif;';

  cont.innerHTML = `
    <div id="EncabezadoReporteContadores" style="font-weight:bold; margin-bottom:8px; cursor:grab; user-select:none;">📊 Reporte de contadores por usuario</div>
    <div style="display:flex; gap:8px; align-items:center; margin-bottom:8px;">
      <label for="inputAnioReporte" style="font-size:12px; white-space:nowrap;">Año:</label>
      <input id="inputAnioReporte" type="number" value="${new Date().getFullYear()}" style="width:80px; padding:4px;">
      <button id="btnGenerarReporte" style="flex:1; padding:8px; background:#2563eb; color:#fff; border:none; border-radius:6px; cursor:pointer; font-weight:bold;">📊 Generar Reporte</button>
    </div>
    <div id="ResumenReporteContadores" style="display:none; margin-bottom:4px; padding:6px 8px; border-radius:6px; font-size:12px; font-weight:bold;"></div>
    <div id="FechaReporteContadores" style="display:none; margin-bottom:8px; font-size:11px; color:#666; font-style:italic;"></div>
    <table id="TablaReporteContadores" style="width:100%; border-collapse:collapse; font-size:12px; display:none;">
      <thead>
        <tr style="text-align:left; border-bottom:2px solid #ccc;">
          <th style="padding:4px; text-align:center; width:24px;">#</th>
          <th style="padding:4px;">Usuario</th>
          <th style="padding:4px; text-align:center; color:#dc2626;">Sin Tram.</th>
          <th style="padding:4px; text-align:center; color:#ca8a04;">En Tránsito</th>
          <th style="padding:4px; text-align:center; color:#16a34a;">Gest. Exitosa</th>
        </tr>
      </thead>
      <tbody id="CuerpoTablaReporteContadores"></tbody>
    </table>
    <div id="EstadoReporteContadores" style="margin-top:8px; max-height:100px; overflow-y:auto; font-size:11px; line-height:1.5;"></div>
  `;
  document.body.appendChild(cont);
  habilitarArrastreReporte(cont, document.querySelector('#EncabezadoReporteContadores'));

  const mostrarResultado = (item, exito, indice) => {
    const contEstado = document.querySelector('#EstadoReporteContadores');
    const linea = document.createElement('div');
    if (exito) {
      linea.style.color = '#16a34a';
      linea.textContent = `${indice}. ✔ ${item.nombre}: ST=${item.sinTramitar} / ET=${item.enTransito} / GE=${item.gestionExitosa}`;
    } else {
      linea.style.color = '#ea580c';
      linea.textContent = `${indice}. ✖ ${item.nombre}: no se pudo consultar`;
    }
    contEstado.prepend(linea);
  };

  const mostrarResumen = (todoOk, mensaje, resultados) => {
    const resumen = document.querySelector('#ResumenReporteContadores');
    resumen.style.display = 'block';
    resumen.textContent = mensaje;
    resumen.style.background = todoOk ? '#dcfce7' : '#ffedd5';
    resumen.style.color = todoOk ? '#16a34a' : '#ea580c';

    // Muestra la fecha y hora exacta en que se generó el reporte
    const fechaDiv = document.querySelector('#FechaReporteContadores');
    const ahora = new Date();
    const fechaFormateada = ahora.toLocaleString('es-CO', {
      day: '2-digit', month: '2-digit', year: 'numeric',
      hour: '2-digit', minute: '2-digit', second: '2-digit',
    });
    fechaDiv.style.display = 'block';
    fechaDiv.textContent = `🕒 Reporte generado el: ${fechaFormateada}`;

    // Pinta la tabla con los resultados exitosos
    const tabla = document.querySelector('#TablaReporteContadores');
    const cuerpo = document.querySelector('#CuerpoTablaReporteContadores');
    cuerpo.innerHTML = '';
    resultados.forEach((r, i) => {
      const fila = document.createElement('tr');
      fila.style.borderBottom = '1px solid #eee';
      fila.innerHTML = `
        <td style="padding:4px; text-align:center; color:#666;">${i + 1}</td>
        <td style="padding:4px;">${r.nombre}</td>
        <td style="padding:4px; text-align:center;">${r.sinTramitar}</td>
        <td style="padding:4px; text-align:center;">${r.enTransito}</td>
        <td style="padding:4px; text-align:center;">${r.gestionExitosa}</td>
      `;
      cuerpo.appendChild(fila);
    });
    tabla.style.display = resultados.length ? 'table' : 'none';
  };

  document.querySelector('#btnGenerarReporte').onclick = () => {
    const btn = document.querySelector('#btnGenerarReporte');
    if (btn.disabled) return;

    const anio = document.querySelector('#inputAnioReporte').value.trim();
    if (!anio) return console.log('⚠️ Debe indicar un año.');

    document.querySelector('#ResumenReporteContadores').style.display = 'none';
    document.querySelector('#FechaReporteContadores').style.display = 'none';
    document.querySelector('#EstadoReporteContadores').innerHTML = '';

    btn.disabled = true;
    btn.style.opacity = '0.6';
    btn.style.cursor = 'not-allowed';
    btn.textContent = '⏳ Consultando...';

    generarReporteCompleto(USUARIOS_A_MONITOREAR, anio, mostrarResultado, (todoOk, mensaje, resultados) => {
      mostrarResumen(todoOk, mensaje, resultados);
      btn.disabled = false;
      btn.style.opacity = '1';
      btn.style.cursor = 'pointer';
      btn.textContent = '📊 Generar Reporte';
    });
  };
}

function habilitarArrastreReporte(contenedor, agarre) {
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

crearUIReporteContadores();
