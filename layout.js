// ===== Service Worker Registration =====
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("sw.js")
      .catch(err => console.error("SW registration failed:", err));
  });
}

document.addEventListener("DOMContentLoaded", () => {
  // Ensure viewport meta exists
  if (!document.querySelector('meta[name="viewport"]')) {
    const viewportMeta = document.createElement("meta");
    viewportMeta.name = "viewport";
    viewportMeta.content = "width=device-width, initial-scale=1.0";
    document.head.appendChild(viewportMeta);
  }

  // ===== Create header bar if missing =====
  let headerBar = document.querySelector(".header-bar");
  if (!headerBar) {
    headerBar = document.createElement("div");
    headerBar.className = "header-bar";

    // Hamburger button
    const menuToggle = document.createElement("button");
    menuToggle.id = "menu-toggle";
    menuToggle.className = "hamburger";
    menuToggle.textContent = "☰";

    // Title text
    const title = document.createElement("div");
    title.textContent = "Montemurro";

    headerBar.appendChild(menuToggle);
    headerBar.appendChild(title);

    document.body.insertBefore(headerBar, document.body.firstChild);
    document.body.classList.add("has-header");
  }

  const menuToggle = document.getElementById("menu-toggle");
  const sidebar = document.querySelector(".sidebar");

  // ===== PWA mode adjustments =====
  function enablePWAMode() {
    document.body.classList.add("pwa-mode");
    menuToggle.addEventListener("click", () => {
      sidebar.classList.toggle("open");
    });
  }

  if (window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone) {
    enablePWAMode();
  }

  window.matchMedia("(display-mode: standalone)").addEventListener("change", (e) => {
    if (e.matches) {
      enablePWAMode();
    }
  });
});
