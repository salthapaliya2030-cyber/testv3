/* Load the local particle configuration and start the lightweight canvas effect. */
window.addEventListener("DOMContentLoaded", () => {
  if (window.particlesJS && document.getElementById("particles-background")) {
    window.particlesJS.load("particles-background", "/stuff/json/embed.json", () => {
      console.info("background particle config loaded");
    });
  }
});
