
    const logBox = document.getElementById('logBox');
    const progressBar = document.getElementById('progressBar');
    const progressText = document.getElementById('progressText');
    const statusMain = document.getElementById('statusMain');
    const statusError = document.getElementById('statusError');

    const steps = [
      { delay: 120, text: '<span class="prompt">&gt;</span> RECEIVING LOGIN PAYLOAD . . .', progress: 6, status: 'receiving' },
      { delay: 420, text: '<span class="prompt">&gt;</span> VERIFYING GUEST ROUTE . . .', progress: 15, status: 'verifying' },
      { delay: 760, text: '<span class="prompt">&gt;</span> OPENING ARCHIVE TRANSFER LAYER', progress: 27, status: 'opening route' },
      { delay: 1110, text: '<span class="warn">&gt;</span> LOADING INDEX / CHARACTER FILES / EVENT LOGS', progress: 38, status: 'loading records' },
      { delay: 1480, text: '<span class="danger">&gt;</span> ERROR / MIRROR TRACE RESPONSE DETECTED', progress: 51, status: 'error detected', error: 'mirror trace' },
      { delay: 1860, text: '<span class="warn">&gt;</span> ATTEMPTING RECOVERY . . .', progress: 59, status: 'recovering' },
      { delay: 2260, text: '<span class="ok">&gt;</span> RECOVERY SUCCESS / TRACE MASK APPLIED', progress: 73, status: 'recovered', error: 'cleared' },
      { delay: 2660, text: '<span class="prompt">&gt;</span> REBUILDING DASHBOARD PATHWAY . . .', progress: 84, status: 'rebuilding route' },
      { delay: 3080, text: '<span class="ok">&gt;</span> SECURE LINK STABILIZED', progress: 93, status: 'stabilized' },
      { delay: 3480, text: '<span class="ok typing">&gt;</span> CONNECTED / FORWARDING TO DASHBOARD', progress: 100, status: 'connected' }
    ];

    function addLog(html) {
      const line = document.createElement('div');
      line.className = 'line';
      line.innerHTML = html;
      logBox.appendChild(line);
      logBox.scrollTop = logBox.scrollHeight;
    }

    steps.forEach(step => {
      setTimeout(() => {
        addLog(step.text);
        progressBar.style.width = step.progress + '%';
        progressText.textContent = step.progress + '%';
        if (step.status) statusMain.textContent = step.status;
        if (step.error) statusError.textContent = step.error;
      }, step.delay);
    });

    setTimeout(() => {
      window.location.href = 'dashboard.html';
    }, 4600);