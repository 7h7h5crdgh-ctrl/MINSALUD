// ════════════════════════════════════════════════════════════════
// CARGADOR — esto es lo único que se comparte y se pega en la consola.
// Revisa el interruptor remoto, pide la contraseña, descarga el script
// cifrado y lo descifra EN MEMORIA del navegador antes de ejecutarlo.
// Cambia solo las 3 líneas marcadas con "👉" por tus URLs reales de GitHub.
// ════════════════════════════════════════════════════════════════
(async () => {
  const URL_ESTADO = 'https://raw.githubusercontent.com/7h7h5crdgh-ctrl/ControlDoc/main/estado.json';   // 👉 interruptor
  const URL_SCRIPT = 'https://raw.githubusercontent.com/7h7h5crdgh-ctrl/ControlDoc/main/script.enc.json'; // 👉 script cifrado
  // El intervalo de revisión y esta URL ya NO se los pasamos al script (ver
  // nota abajo): el propio script.js cifrado trae su copia fija de la URL y
  // revisa cada 10 s por su cuenta. Esta consulta de aquí es solo un filtro
  // rápido para no pedir la contraseña si ya se sabe que está desactivado.

  const sinCache = (u) => u + (u.includes('?') ? '&' : '?') + 't=' + Date.now();
  const d = (b64) => Uint8Array.from(atob(b64), (c) => c.charCodeAt(0));

  async function leerEstado() {
    const r = await fetch(sinCache(URL_ESTADO), { cache: 'no-store' });
    if (!r.ok) throw new Error('No se pudo consultar el interruptor (HTTP ' + r.status + ')');
    return r.json();
  }

  async function descifrar(paquete, clave) {
    const claveBase = await crypto.subtle.importKey('raw', new TextEncoder().encode(clave), 'PBKDF2', false, ['deriveKey']);
    const claveAES = await crypto.subtle.deriveKey(
      { name: 'PBKDF2', salt: d(paquete.salt), iterations: paquete.iter, hash: 'SHA-256' },
      claveBase, { name: 'AES-GCM', length: 256 }, false, ['decrypt']
    );
    const bin = await crypto.subtle.decrypt({ name: 'AES-GCM', iv: d(paquete.iv) }, claveAES, d(paquete.datos));
    return new TextDecoder().decode(bin);
  }

  console.log('⏳ Verificando disponibilidad…');
  let estado;
  try { estado = await leerEstado(); }
  catch (e) { alert('No se pudo conectar para verificar el script. Revisa tu conexión e inténtalo de nuevo.\n' + e.message); return; }

  if (!estado.activo) { alert('🔒 El script está desactivado temporalmente.' + (estado.mensaje ? '\n\n' + estado.mensaje : '')); return; }

  const clave = prompt('🔑 Contraseña del script:');
  if (!clave) return;

  console.log('⏳ Descargando…');
  let paquete;
  try { paquete = await (await fetch(sinCache(URL_SCRIPT), { cache: 'no-store' })).json(); }
  catch (e) { alert('No se pudo descargar el script: ' + e.message); return; }

  let codigo;
  try { codigo = await descifrar(paquete, clave); }
  catch (e) { alert('❌ Contraseña incorrecta.'); return; }

  // El script descifrado ya trae su propia URL e intervalo fijos para seguir
  // vigilando el interruptor mientras está abierto, no solo al arrancar.
  try { eval(codigo); }
  catch (e) { alert('❌ El script se descifró pero no se pudo ejecutar: ' + e.message); }
})();
