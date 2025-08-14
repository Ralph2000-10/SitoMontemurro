// ===== Service Worker Registration =====
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("sw.js")
      .catch(err => console.error("SW registration failed:", err));
  });
}

document.addEventListener("DOMContentLoaded", () => {
  function isPWAMode() {
    return window.matchMedia("(display-mode: standalone)").matches
      || window.navigator.standalone === true;
  }

  function enablePWAMode() {
    document.body.classList.add("pwa-mode");

    // ===== Create header bar ONLY in PWA mode =====
    const headerBar = document.createElement("div");
    headerBar.className = "header-bar";

    // Hamburger button
    const menuToggle = document.createElement("button");
    menuToggle.id = "menu-toggle";
    menuToggle.className = "hamburger";
    menuToggle.textContent = "☰";

    // Title text
    const title = document.createElement("span");
    title.className = "header-title";
    title.textContent = "Montemurro";

    headerBar.appendChild(menuToggle);
    headerBar.appendChild(title);

    document.body.insertBefore(headerBar, document.body.firstChild);
    document.body.classList.add("has-header");

    // Sidebar toggle
    const sidebar = document.querySelector(".sidebar");
    menuToggle.addEventListener("click", () => {
      sidebar.classList.toggle("open");
    });
  }

  // Run only if we are in PWA mode
  if (isPWAMode()) {
    enablePWAMode();
  }

  // Detect change to standalone mode
  window.matchMedia("(display-mode: standalone)").addEventListener("change", (e) => {
    if (e.matches) {
      enablePWAMode();
    }
  });
});
