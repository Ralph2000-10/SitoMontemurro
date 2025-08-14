// Register service worker
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js");
  });
}

document.addEventListener("DOMContentLoaded", () => {
  function enablePWAMode() {
    document.body.classList.add("pwa-mode", "has-header");

    // Create header bar dynamically so it only exists in PWA
    const headerBar = document.createElement("div");
    headerBar.classList.add("header-bar");

    // Create hamburger button
    const menuToggle = document.createElement("button");
    menuToggle.id = "menu-toggle";
    menuToggle.classList.add("hamburger");
    menuToggle.innerHTML = "&#9776;"; // three lines

    // Create title
    const title = document.createElement("div");
    title.classList.add("header-title");
    title.textContent = "Montemurro";

    // Add to header
    headerBar.appendChild(menuToggle);
    headerBar.appendChild(title);

    // Insert at top of body
    document.body.insertBefore(headerBar, document.body.firstChild);

    // Sidebar toggle
    const sidebar = document.querySelector(".sidebar");
    menuToggle.addEventListener("click", () => {
      sidebar.classList.toggle("open");
    });
  }

  // Detect PWA mode
  if (window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone) {
    enablePWAMode();
  }

  window.matchMedia("(display-mode: standalone)").addEventListener("change", (e) => {
    if (e.matches) {
      enablePWAMode();
    }
  });
});
