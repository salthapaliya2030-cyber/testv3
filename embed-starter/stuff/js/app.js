(() => {
  "use strict";
  const frame = document.getElementById("embedframe");
  const reloadButton = document.getElementById("reload-preview");
  const message = document.getElementById("message-box");
  let hideMessageTimer;

  function notify(text) {
    if (!message) return;
    message.textContent = text;
    message.classList.add("is-visible");
    window.clearTimeout(hideMessageTimer);
    hideMessageTimer = window.setTimeout(() => message.classList.remove("is-visible"), 2600);
  }

  reloadButton?.addEventListener("click", () => {
    if (!frame) return;
    frame.src = "/preview.html?refresh=" + Date.now();
    notify("local preview reloaded");
  });
})();
