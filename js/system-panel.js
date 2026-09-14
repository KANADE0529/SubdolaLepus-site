/* The taskbar icon opens the existing empty panel; no resizing or added features. */
(() => {
  const panel=document.getElementById('reservedSystemPanel');
  const launcher=document.getElementById('systemPanelLauncher');
  const toggle=document.getElementById('systemPanelToggle');
  const body=document.getElementById('systemPanelBody');
  if(!panel || !launcher || !toggle || !body)return;
  function setOpen(open) {
    panel.hidden=!open;
    body.hidden=!open;
    panel.classList.toggle('expanded',open);
    launcher.setAttribute('aria-expanded',String(open));
    toggle.setAttribute('aria-expanded',String(open));
  }
  launcher.addEventListener('click',()=>setOpen(panel.hidden));
  toggle.addEventListener('click',()=>{
    setOpen(false);
    launcher.focus();
  });
  setOpen(false);
})();
