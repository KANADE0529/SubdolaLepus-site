if (!localStorage.getItem("loggedIn")) {
  window.location.href = "index.html";
}
const characterGrid = document.getElementById('characterGrid');
    window.addEventListener('load', () => {
      if (!characterGrid) return;
      const maxScroll = characterGrid.scrollWidth - characterGrid.clientWidth;
      if (maxScroll > 0) {
        characterGrid.scrollTo({ left: maxScroll, behavior: 'smooth' });
      }
    });