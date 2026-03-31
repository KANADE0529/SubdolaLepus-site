if (!localStorage.getItem("loggedIn")) {
  window.location.href = "index.html";
}

 let time = 3600;
    const el = document.getElementById('countdown');
    const authOverlay = document.getElementById('authOverlay');
    const authInput = document.getElementById('authInput');
    const authLog = document.getElementById('authLog');
    let restrictedFailCount = 0;
    let restrictedLocked = false;

    function update() {
      const h = String(Math.floor(time / 3600)).padStart(2, '0');
      const m = String(Math.floor((time % 3600) / 60)).padStart(2, '0');
      const s = String(time % 60).padStart(2, '0');
      el.textContent = `${h}:${m}:${s}`;
      if (time > 0) time--;
    }

    setInterval(update, 1000);
    update();

    function setAuthLog(lines) {
      authLog.innerHTML = lines.map(line => `<div>${line}</div>`).join('');
    }

    function openRestricted() {
      authOverlay.classList.add('show');
      authInput.value = '';
      authInput.focus();
      if (restrictedLocked) {
        setAuthLog([
          '> WARNING / ACCESS TEMPORARILY LOCKED',
          '> COOLDOWN IN PROGRESS . . .'
        ]);
      } else {
        setAuthLog([
          '> WAITING FOR AUTHORIZATION . . .'
        ]);
      }
    }

    function closeRestricted() {
      authOverlay.classList.remove('show');
    }

    function submitRestricted() {
      if (restrictedLocked) return;

      const pass = authInput.value;
      setAuthLog([
        '> READING INPUT . . .',
        '> VERIFYING ACCESS KEY . . .'
      ]);

      setTimeout(() => {
        if (pass === 'R18') {
          setAuthLog([
            '> READING INPUT . . .',
            '> VERIFYING ACCESS KEY . . .',
            '> ACCESS GRANTED',
            '> FORWARDING TO RESTRICTED ARCHIVE . . .'
          ]);
localStorage.setItem("restrictedAccess", "true");
          restrictedFailCount = 0;
          setTimeout(() => {
  setAuthLog([
    '> ACCESS GRANTED',
    '> ENTERING RESTRICTED ARCHIVE . . .'
  ]);
}, 300);

setTimeout(() => {
  window.location.href = 'restricted.html';
}, 900);
        } else {
          restrictedFailCount += 1;
          setAuthLog([
            '> READING INPUT . . .',
            '> VERIFYING ACCESS KEY . . .',
            '> ACCESS DENIED',
            `> FAILED ATTEMPTS / ${restrictedFailCount}`
          ]);

          if (restrictedFailCount >= 3) {
            restrictedLocked = true;
            setTimeout(() => {
              setAuthLog([
                '> WARNING / ACCESS TEMPORARILY LOCKED',
                '> TRACE MASK ENABLED',
                '> RETRY AFTER COOLDOWN . . .'
              ]);
            }, 500);

            setTimeout(() => {
              restrictedLocked = false;
              restrictedFailCount = 0;
              setAuthLog([
                '> LOCKDOWN RELEASED',
                '> WAITING FOR AUTHORIZATION . . .'
              ]);
            }, 5000);
          }
        }
      }, 700);
    }

    authInput?.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') submitRestricted();
      if (e.key === 'Escape') closeRestricted();
    });

    authOverlay?.addEventListener('click', (e) => {
      if (e.target === authOverlay) closeRestricted();
    });

function logout() {
  localStorage.clear();
  window.location.href = "index.html";
}