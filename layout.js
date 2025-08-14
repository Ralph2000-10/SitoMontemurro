// Register service worker for PWA
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js");
  });
}

// Detect if we’re in PWA mode and enable hamburger menu functionality
document.addEventListener("DOMContentLoaded", () => {
  function enablePWAMode() {
    document.body.classList.add('pwa-mode', 'has-header');

    // Create the header bar only in PWA mode
    const headerBar = document.createElement('div');
    headerBar.classList.add('header-bar');

    const menuButton = document.createElement('button');
    menuButton.id = 'menu-toggle';
    menuButton.classList.add('hamburger');
    menuButton.innerHTML = '&#9776;';

    const title = document.createElement('span');
    title.classList.add('header-title');
    title.textContent = 'Montemurro';

    headerBar.appendChild(menuButton);
    headerBar.appendChild(title);

    // Insert at the top of the body
    document.body.insertBefore(headerBar, document.body.firstChild);

    // Hamburger functionality
    const sidebar = document.querySelector(".sidebar");
    menuButton.addEventListener("click", () => {
      sidebar.classList.toggle("open");
    });
  }

  // Detect standalone mode
  if (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone) {
    enablePWAMode();
  }

  // Listen for changes to display mode
  window.matchMedia('(display-mode: standalone)').addEventListener('change', (e) => {
    if (e.matches) {
      enablePWAMode();
    }
  });
});
