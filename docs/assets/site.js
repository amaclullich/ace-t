// Progressive enhancement only: all clinical content and navigation work without JS.
document.querySelectorAll('[data-print]').forEach((button) => {
  button.hidden = false;
  button.addEventListener('click', () => window.print());
});
