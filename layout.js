// ===== Service Worker Registration =====
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("sw.js")
      .catch(err => console.error("SW registration failed:", err));
  });
}

// ===== DOM Ready =====
document.addEventListener("DOMContentLoaded", () => {

  // 1. Ensure proper viewport meta tag
  if (!document.querySelector('meta[name="viewport"]')) {
    const viewportMeta = document.createElement("meta");
    viewportMeta.name = "viewport";
    viewportMeta.content = "width=device-width, initial-scale=1.0";
    document.head.appendChild(viewportMeta);
  }

  // 2. Ensure hamburger button exists
  let menuToggle = document.getElementById("menu-toggle");
  if (!menuToggle) {
    menuToggle = document.createElement("button");
    menuToggle.id = "menu-toggle";
    menuToggle.className = "hamburger";
    menuToggle.textContent = "☰";
    document.body.insertBefore(menuToggle, document.body.firstChild);
  }

  // 3. Ensure sidebar exists
  let sidebar = document.querySelector(".sidebar");
  if (!sidebar) {
    sidebar = document.createElement("aside");
    sidebar.className = "sidebar";
    sidebar.innerHTML = "<h1>Menu</h1>";
    document.body.insertBefore(sidebar, document.querySelector(".content") || null);
  }

  // 4. Enable PWA Mode (mobile layout)
  function enablePWAMode() {
    document.body.classList.add("pwa-mode");
    menuToggle.addEventListener("click", () => {
      sidebar.classList.toggle("open");
    });
  }

  // Detect PWA mode immediately
  if (window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone) {
    enablePWAMode();
  }

  // Also detect mode changes (important for Android)
  window.matchMedia("(display-mode: standalone)").addEventListener("change", (e) => {
    if (e.matches) {
      enablePWAMode();
    }
  });
});
