document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  if (!menuBtn || !mobileMenu) return;

  let isOpen = false;
  menuBtn.addEventListener('click', () => {
    isOpen = !isOpen;
    mobileMenu.classList.toggle('hidden');
    menuBtn.textContent = isOpen ? '✖' : '☰';
  });
});
