// layout.js

// Registo service worker per trasformare sito web in una PWA (Progressive Web App)
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker.register("sw.js");
      });
    }


// Detect if we’re in PWA mode and enable hamburger menu functionality
document.addEventListener("DOMContentLoaded", () => {
  function enablePWAMode() {
    document.body.classList.add('pwa-mode');

    const menuToggle = document.getElementById("menu-toggle");
    const sidebar = document.querySelector(".sidebar");

    menuToggle.addEventListener("click", () => {
      sidebar.classList.toggle("open");
    });
  }

  if (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone) {
    enablePWAMode();
  }

  window.matchMedia('(display-mode: standalone)').addEventListener('change', (e) => {
    if (e.matches) {
      enablePWAMode();
    }
  });
});

