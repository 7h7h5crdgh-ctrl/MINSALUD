// ════════════════════════════════════════════════════════════════
// Cargador del script cifrado de ControlDoc (pegar en la consola de ControlDoc o usar como marcador).
// 1) Cambie URL_SCRIPT por la dirección "raw" de script.enc.json en su repositorio de GitHub.
// 2) Al ejecutarlo pide la clave, descifra el script en el navegador y lo arranca.
// La clave se pide SIEMPRE, cada vez que se ejecuta el cargador (no se guarda en ningún lado).
// ════════════════════════════════════════════════════════════════
(async () => {
  // Se lee por la API de GitHub (no por raw.githubusercontent): así siempre llega la versión recién subida, sin la caché de 5 minutos.
  const URL_SCRIPT = 'https://api.github.com/repos/7h7h5crdgh-ctrl/ControlDoc/contents/script.enc.json?ref=main';
  const URL_ESTADO = 'https://api.github.com/repos/7h7h5crdgh-ctrl/ControlDoc/contents/estado.json?ref=main';
  const CRUDO = { headers: { Accept: 'application/vnd.github.raw' }, cache: 'no-store' };
  const b64 = (s) => Uint8Array.from(atob(s), (c) => c.charCodeAt(0));
  // 🔌 Interruptor remoto: si estado.json dice false (activo / habilitado / estado / enabled), el script no arranca.
  try {
    const re = await fetch(URL_ESTADO, CRUDO);
    if (re.ok) {
      const e = await re.json();
      const valor = typeof e === 'boolean' ? e : [e.activo, e.habilitado, e.estado, e.enabled, e.active].find(v => typeof v === 'boolean' || v === 'true' || v === 'false');
      if (valor === false || valor === 'false') { alert((e && (e.mensaje || e.message)) || 'El script está deshabilitado temporalmente por actualización. Intente más tarde.'); return; }
    }
  } catch (e) { /* sin estado.json: continúa */ }
  let paquete;
  try {
    const r = await fetch(URL_SCRIPT, CRUDO);
    if (!r.ok) throw new Error('HTTP ' + r.status);
    paquete = await r.json();
    if (!paquete || !paquete.data || paquete.data.length < 1000) { alert('El archivo cifrado está incompleto (pesa muy poco). Vuelva a cifrar ControlDoc_script_v_final.js y súbalo de nuevo.'); return; }
  } catch (e) { alert('No se pudo descargar el script: ' + e.message); return; }

  try { sessionStorage.removeItem('CD_CLAVE_SCRIPT'); } catch (e) { /* limpia la clave que guardaban versiones anteriores */ }
  const clave = prompt('Clave del script de ControlDoc:');
  if (!clave) return;
  try {
    const base = await crypto.subtle.importKey('raw', new TextEncoder().encode(clave), 'PBKDF2', false, ['deriveKey']);
    const llave = await crypto.subtle.deriveKey(
      { name: 'PBKDF2', salt: b64(paquete.salt), iterations: paquete.iter, hash: 'SHA-256' },
      base, { name: 'AES-GCM', length: 256 }, false, ['decrypt']);
    const codigo = new TextDecoder().decode(await crypto.subtle.decrypt({ name: 'AES-GCM', iv: b64(paquete.iv) }, llave, b64(paquete.data)));
    (0, eval)(codigo);
  } catch (e) {
    alert('Clave incorrecta o archivo dañado.');
  }
})();
