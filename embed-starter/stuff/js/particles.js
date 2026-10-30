/* Small, dependency-free particle background. Exposes particlesJS.load for this starter. */
(() => {
  "use strict";

  function start(container, config) {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    container.replaceChildren(canvas);

    const p = config?.particles || {};
    const count = Math.max(0, Math.min(140, Number(p.number?.value) || 48));
    const size = Number(p.size?.value) || 2;
    const speed = Number(p.move?.speed) || 0.5;
    const colors = Array.isArray(p.color?.value) ? p.color.value : [p.color?.value || "#a78bfa"];
    const link = p.line_linked || {};
    const distance = Number(link.distance) || 130;
    const dots = [];
    let width = 0, height = 0, raf = 0;
    const reducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    function resize() {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = container.clientWidth;
      height = container.clientHeight;
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      if (!dots.length) {
        for (let i = 0; i < count; i++) dots.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - .5) * speed,
          vy: (Math.random() - .5) * speed,
          r: Math.max(.7, Math.random() * size),
          color: colors[i % colors.length]
        });
      } else {
        dots.forEach(d => { d.x = Math.min(d.x, width); d.y = Math.min(d.y, height); });
      }
      draw(false);
    }

    function draw(advance) {
      ctx.clearRect(0, 0, width, height);
      for (let i = 0; i < dots.length; i++) {
        const a = dots[i];
        if (advance && !reducedMotion) {
          a.x += a.vx; a.y += a.vy;
          if (a.x < 0 || a.x > width) a.vx *= -1;
          if (a.y < 0 || a.y > height) a.vy *= -1;
        }
        ctx.beginPath(); ctx.arc(a.x, a.y, a.r, 0, Math.PI * 2);
        ctx.fillStyle = a.color; ctx.globalAlpha = Number(p.opacity?.value) || .3; ctx.fill();
        if (link.enable) {
          for (let j = i + 1; j < dots.length; j++) {
            const b = dots[j], dx = a.x - b.x, dy = a.y - b.y;
            const d = Math.hypot(dx, dy);
            if (d < distance) {
              ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y);
              ctx.strokeStyle = link.color || "#8c78e8";
              ctx.globalAlpha = (Number(link.opacity) || .15) * (1 - d / distance);
              ctx.lineWidth = Number(link.width) || 1; ctx.stroke();
            }
          }
        }
      }
      ctx.globalAlpha = 1;
      if (advance && !reducedMotion) raf = requestAnimationFrame(() => draw(true));
    }
    const observer = new ResizeObserver(resize);
    observer.observe(container);
    resize();
    if (!reducedMotion) raf = requestAnimationFrame(() => draw(true));
    window.addEventListener("pagehide", () => { cancelAnimationFrame(raf); observer.disconnect(); }, { once: true });
  }

  window.particlesJS = {
    load: async (domId, path, callback) => {
      const container = document.getElementById(domId);
      if (!container) return;
      try {
        const response = await fetch(path);
        if (!response.ok) throw new Error(`config request failed (${response.status})`);
        const config = await response.json();
        start(container, config);
        if (typeof callback === "function") callback();
      } catch (error) {
        console.warn("particle background could not load:", error);
      }
    }
  };
})();
