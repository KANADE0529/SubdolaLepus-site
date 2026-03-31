const backBtn = document.getElementById('backBtn');
const fileIcons = document.querySelectorAll('.icon');

backBtn?.addEventListener('click', () => {
  if (window.history.length > 1) {
    window.history.back();
  } else {
    window.location.href = 'records.html';
  }
});

function playLockedAnimation() {
  const panel = document.querySelector('.window');
  panel?.classList.add('locked');

  setTimeout(() => {
    panel?.classList.remove('locked');
  }, 400);
}

fileIcons.forEach((icon) => {
  icon.addEventListener('click', (event) => {
    const isSelected = icon.classList.contains('selected');
    const isLocked = icon.hasAttribute('data-locked');

    // 第一次點：只選中
    if (!isSelected) {
      event.preventDefault();

      fileIcons.forEach((item) => item.classList.remove('selected'));
      icon.classList.add('selected');

      // 鎖定區第一次點就先播一次封鎖動畫
      if (isLocked) {
        playLockedAnimation();
      }

      return;
    }

    // 第二次點：鎖定區不進頁，只播放封鎖動畫
    if (isLocked) {
      event.preventDefault();
      playLockedAnimation();
    }
    // 非鎖定區第二次點就照 href 正常進頁，不用寫別的
  });
});

// 點空白處取消選中
document.addEventListener('click', (event) => {
  if (!event.target.closest('.icon')) {
    fileIcons.forEach((item) => item.classList.remove('selected'));
  }
});