// ════════════════════════════════════════════════════════════════
// Cargador del script cifrado de ControlDoc (pegar en la consola de ControlDoc o usar como marcador).
// 1) Cambie URL_SCRIPT por la dirección "raw" de script.enc.json en su repositorio de GitHub.
// 2) Al ejecutarlo pide la clave, descifra el script en el navegador y lo arranca.
// La clave se recuerda solo mientras la pestaña esté abierta (sessionStorage).
// ════════════════════════════════════════════════════════════════
(async () => {
  const URL_SCRIPT = 'https://raw.githubusercontent.com/7h7h5crdgh-ctrl/ControlDoc/refs/heads/main/script.enc.json';
  const URL_ESTADO = 'https://raw.githubusercontent.com/7h7h5crdgh-ctrl/ControlDoc/refs/heads/main/estado.json';
  const b64 = (s) => Uint8Array.from(atob(s), (c) => c.charCodeAt(0));
  // 🔌 Interruptor remoto: si estado.json dice false (activo / habilitado / estado / enabled), el script no arranca.
  try {
    const re = await fetch(URL_ESTADO + '?t=' + Date.now(), { cache: 'no-store' });
    if (re.ok) {
      const e = await re.json();
      const valor = typeof e === 'boolean' ? e : [e.activo, e.habilitado, e.estado, e.enabled, e.active].find(v => typeof v === 'boolean' || v === 'true' || v === 'false');
      if (valor === false || valor === 'false') { alert((e && (e.mensaje || e.message)) || 'El script está deshabilitado temporalmente por actualización. Intente más tarde.'); return; }
    }
  } catch (e) { /* sin estado.json: continúa */ }
  let paquete;
  try {
    const r = await fetch(URL_SCRIPT + '?t=' + Date.now(), { cache: 'no-store' });
    if (!r.ok) throw new Error('HTTP ' + r.status);
    paquete = await r.json();
    if (!paquete || !paquete.data || paquete.data.length < 1000) { alert('El archivo cifrado está incompleto (pesa muy poco). Vuelva a cifrar ControlDoc_script_v_final.js y súbalo de nuevo.'); return; }
  } catch (e) { alert('No se pudo descargar el script: ' + e.message); return; }

  let clave = sessionStorage.getItem('CD_CLAVE_SCRIPT') || prompt('Clave del script de ControlDoc:');
  if (!clave) return;
  try {
    const base = await crypto.subtle.importKey('raw', new TextEncoder().encode(clave), 'PBKDF2', false, ['deriveKey']);
    const llave = await crypto.subtle.deriveKey(
      { name: 'PBKDF2', salt: b64(paquete.salt), iterations: paquete.iter, hash: 'SHA-256' },
      base, { name: 'AES-GCM', length: 256 }, false, ['decrypt']);
    const codigo = new TextDecoder().decode(await crypto.subtle.decrypt({ name: 'AES-GCM', iv: b64(paquete.iv) }, llave, b64(paquete.data)));
    sessionStorage.setItem('CD_CLAVE_SCRIPT', clave);
    (0, eval)(codigo);
  } catch (e) {
    sessionStorage.removeItem('CD_CLAVE_SCRIPT');
    alert('Clave incorrecta o archivo dañado.');
  }
})();
