document.getElementById('year').textContent=new Date().getFullYear();
gsap.registerPlugin(ScrollTrigger);
gsap.from(".headline", { y: 30, opacity: 0, duration: 1.2, ease: "power3.out" });
gsap.from(".sub", { y: 18, opacity: 0, duration: 1, delay: 0.2 });
gsap.from(".actions .btn", { y: 14, opacity: 0, duration: 0.9, delay: 0.4, stagger: 0.08 });
gsap.utils.toArray(".panel-title, .panel-lead, .skills li, .process li, .glass-card").forEach((el, i) => {
  gsap.from(el, {
    scrollTrigger: { trigger: el, start: "top 86%" },
    opacity: 0, y: 24, duration: 0.9, delay: i * 0.05, ease: "power2.out"
  });
});
(()=>{
    const canvas=document.getElementById("bg-canvas");
    const ctx=canvas.getContext('2d', {alpha: true});
    let w= canvas.width = innerWidth;
    let h= canvas.height = innerHeight;
    const cfg={
        count: Math.round((w*h)/70000)+30,
        maxDist: 160,
        baseSpeed: 0.2,
        glow: true
};
const mouse = { x: w / 2, y: h / 2, mx: 0, my: 0, active: false };
window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX; mouse.y = e.clientY;
    mouse.active = true;
  });
   window.addEventListener('mouseleave', () => mouse.active = false);
  window.addEventListener('resize', () => {
    w = canvas.width = innerWidth;
    h = canvas.height = innerHeight;
  });
  function rand(min, max) { return Math.random() * (max - min) + min; }
  const pts = new Array(cfg.count).fill().map(() => ({
    x: rand(0, w),
    y: rand(0, h),
    vx: rand(-cfg.baseSpeed, cfg.baseSpeed),
    vy: rand(-cfg.baseSpeed, cfg.baseSpeed),
    r: rand(0.6, 2.1),
    hue: rand(0, 360)
  }));
  function step() {
    ctx.clearRect(0, 0, w, h);
    mouse.mx += (mouse.x - mouse.mx) * 0.06;
    mouse.my += (mouse.y - mouse.my) * 0.06;
    for (let i = 0; i < pts.length; i++) {
      const p = pts[i];
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < -20) p.x = w + 20;
      if (p.x > w + 20) p.x = -20;
      if (p.y < -20) p.y = h + 20;
      if (p.y > h + 20) p.y = -20;
      if (cfg.glow) {
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 12);
        g.addColorStop(0, `rgba(168,85,247,0.14)`);
        g.addColorStop(0.35, `rgba(6,182,212,0.10)`);
        g.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = g;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r * 12, 0, Math.PI * 2); ctx.fill();
      }
       ctx.fillStyle = `rgba(255,255,255,0.9)`;
      ctx.globalCompositeOperation = 'lighter';
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      ctx.globalCompositeOperation = 'source-over';
    }
     for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        const a = pts[i], b = pts[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < cfg.maxDist) {
          const alpha = 1 - (d / cfg.maxDist);
          const t = (mouse.mx / w);
          const r = Math.round(168*(1-t) + 6*t);
          const g = Math.round(85*(1-t) + 182*t);
          const bcol = Math.round(247*(1-t) + 212*t);
          ctx.strokeStyle = `rgba(${r},${g},${bcol},${0.08 * alpha})`;
          ctx.lineWidth = 1 * alpha;
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
        }
      }
    }

    requestAnimationFrame(step);
  }

  step();
})();
(() => {
  const hero = document.querySelector('.hero-inner');
  const hint = document.querySelector('.mouse-hint');
window.addEventListener('mousemove', (e) => {
    const cx = innerWidth / 2;
    const cy = innerHeight / 2;
    const dx = (e.clientX - cx) / cx;
    const dy = (e.clientY - cy) / cy;
 gsap.to(hero, { x: dx * 18, y: dy * 8, rotation: dx * 0.6, duration: 0.9, ease: "power3.out" });
 if (hint) gsap.to(hint, { opacity: 0, duration: 0.9, ease: "power2.out" , delay: 0.8});
  });
    document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (href.length > 1) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          gsap.to(window, { duration: 1.1, scrollTo: { y: target, offsetY: 80 }, ease: "power2.out" });
        }
      }
    });
  });
})();

