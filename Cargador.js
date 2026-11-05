// ════════════════════════════════════════════════════════════════
// Cargador del script cifrado de ControlDoc.
// Pide la clave DE INMEDIATO; mientras usted la escribe, descarga en segundo plano el script cifrado
// y el interruptor (estado.json). Luego descifra en el navegador y arranca el panel.
// La clave se pide SIEMPRE, cada vez que se ejecuta el cargador (no se guarda en ningún lado).
// Se lee por la API de GitHub: siempre llega la versión recién subida (sin la caché de raw.githubusercontent).
// ════════════════════════════════════════════════════════════════
(async () => {
  const URL_SCRIPT = 'https://api.github.com/repos/7h7h5crdgh-ctrl/ControlDoc/contents/script.enc.json?ref=main';
  const URL_ESTADO = 'https://api.github.com/repos/7h7h5crdgh-ctrl/ControlDoc/contents/estado.json?ref=main';
  const CRUDO = { headers: { Accept: 'application/vnd.github.raw' }, cache: 'no-store' };
  const b64 = (s) => Uint8Array.from(atob(s), (c) => c.charCodeAt(0));
  try { sessionStorage.removeItem('CD_CLAVE_SCRIPT'); } catch (e) { /* limpia la clave que guardaban versiones anteriores */ }

  // 1) Descargas en paralelo (empiezan ya, antes de pedir la clave).
  const pEstado = fetch(URL_ESTADO, CRUDO).then(r => (r.ok ? r.json() : null)).catch(() => null);
  const pScript = fetch(URL_SCRIPT, CRUDO).then(r => { if (!r.ok) throw new Error('HTTP ' + r.status); return r.json(); });
  pScript.catch(() => {});   // el error se informa más abajo

  // 2) Clave (sale de una vez).
  const clave = prompt('Clave del script de ControlDoc:');
  if (!clave) return;

  // Aviso mientras termina la descarga y el descifrado.
  const aviso = document.createElement('div');
  aviso.textContent = '⏳ Abriendo el panel…';
  aviso.style.cssText = 'position:fixed; top:16px; left:50%; transform:translateX(-50%); z-index:2147483647; padding:10px 18px; border-radius:999px; background:#0f766e; color:#fff; font:600 13px system-ui, sans-serif; box-shadow:0 10px 25px -8px rgba(0,0,0,.4);';
  document.body.appendChild(aviso);
  const fin = () => aviso.remove();

  // 3) Interruptor remoto: si estado.json dice false (activo / habilitado / estado / enabled), no arranca.
  const e = await pEstado;
  if (e != null) {
    const valor = typeof e === 'boolean' ? e : [e.activo, e.habilitado, e.estado, e.enabled, e.active].find(v => typeof v === 'boolean' || v === 'true' || v === 'false');
    if (valor === false || valor === 'false') { fin(); alert((e && (e.mensaje || e.message)) || 'El script está deshabilitado temporalmente por actualización. Intente más tarde.'); return; }
  }

  // 4) Script cifrado.
  let paquete;
  try { paquete = await pScript; }
  catch (err) { fin(); alert('No se pudo descargar el script: ' + err.message); return; }
  if (!paquete || !paquete.data || paquete.data.length < 1000) { fin(); alert('El archivo cifrado está incompleto (pesa muy poco). Vuelva a cifrar ControlDoc_script_v_final.js y súbalo de nuevo.'); return; }

  // 5) Descifrar y arrancar.
  try {
    const base = await crypto.subtle.importKey('raw', new TextEncoder().encode(clave), 'PBKDF2', false, ['deriveKey']);
    const llave = await crypto.subtle.deriveKey(
      { name: 'PBKDF2', salt: b64(paquete.salt), iterations: paquete.iter, hash: 'SHA-256' },
      base, { name: 'AES-GCM', length: 256 }, false, ['decrypt']);
    const codigo = new TextDecoder().decode(await crypto.subtle.decrypt({ name: 'AES-GCM', iv: b64(paquete.iv) }, llave, b64(paquete.data)));
    fin();
    (0, eval)(codigo);
  } catch (err) {
    fin();
    alert('Clave incorrecta o archivo dañado.');
  }
})();
