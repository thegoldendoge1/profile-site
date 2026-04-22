// ===== LIGHT PARALLAX =====

window.addEventListener("mousemove", (e) => {
  const x = (e.clientX / window.innerWidth - 0.5) * 20;
  const y = (e.clientY / window.innerHeight - 0.5) * 20;

  document.querySelector(".nebula").style.transform =
    `translate(${x}px,${y}px)`;
});

// ===== BREATHING NEBULA =====
setInterval(() => {
  const n = document.querySelector(".nebula");
  n.style.filter = `blur(${100 + Math.sin(Date.now()/1000)*10}px)`;
}, 50);
