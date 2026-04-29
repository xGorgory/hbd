/* ─── Estrellas ─── */
(function() {
  const bg = document.getElementById('stars-bg');
  if (!bg) return;
  const count = 120;
  for (let i = 0; i < count; i++) {
    const star = document.createElement('div');
    const size = Math.random() * 2.5 + 0.5;
    star.className = 'star';
    star.style.cssText = `
      width:${size}px;height:${size}px;
      top:${Math.random()*100}%;left:${Math.random()*100}%;
      --dur:${(Math.random()*4+2).toFixed(1)}s;
      --delay:-${(Math.random()*5).toFixed(1)}s;
      --min-op:${(Math.random()*0.1).toFixed(2)};
      --max-op:${(Math.random()*0.6+0.2).toFixed(2)};
    `;
    bg.appendChild(star);
  }
})();

/* ─── Modal ─── */
function closeModal() {
  const overlay = document.getElementById('modal-overlay');
  if (!overlay) return;
  overlay.style.opacity = '0';
  overlay.style.transition = 'opacity 0.5s ease';
  setTimeout(() => { overlay.classList.add('hidden'); }, 500);
}

// Animación staggered de los items
window.addEventListener('load', function() {
  const items = document.querySelectorAll('.reason-item');
  items.forEach((item, i) => {
    setTimeout(() => {
      item.classList.add('visible');
    }, 300 + i * 120);
  });
});

/* ─── AOS ─── */
if (typeof AOS !== 'undefined') {
  AOS.init({
    duration: 800,
    easing: 'ease-out-cubic',
    once: true,
    offset: 80,
  });
}

/* ─── GSAP Hero ─── */
if (typeof gsap !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);

  gsap.from('#hero h1', {
    opacity: 0,
    y: 60,
    duration: 1.4,
    ease: 'power3.out',
    delay: 0.2,
  });
  gsap.from('.shimmer-text', {
    opacity: 0,
    y: 30,
    duration: 1.2,
    ease: 'power3.out',
    delay: 0.7,
  });

  // Parallax orbes en hero
  gsap.to('.hero-glow-orb:first-child', {
    y: -60,
    scrollTrigger: {
      trigger: '#hero',
      start: 'top top',
      end: 'bottom top',
      scrub: true,
    }
  });
}

/* ─── Surprise Modal ─── */
function launchCelebration() {
  launchConfetti();
  setTimeout(() => openSurprise(), 600);
}

function openSurprise() {
  const overlay = document.getElementById('surprise-overlay');
  const box = document.getElementById('surprise-box');
  if (!overlay || !box) return;
  
  overlay.style.opacity = '1';
  overlay.style.visibility = 'visible';
  setTimeout(() => {
    box.style.transform = 'scale(1) translateY(0)';
  }, 50);
  
  // Animar emoji
  let emojis = ['🎁','🎉','💜','✨','🎂','💫','🥳'];
  let i = 0;
  const emojiInterval = setInterval(() => {
    const emojiEl = document.getElementById('surprise-emoji');
    if (!emojiEl) {
        clearInterval(emojiInterval);
        return;
    }
    emojiEl.textContent = emojis[i % emojis.length];
    i++;
    if (i > emojis.length * 2) clearInterval(emojiInterval);
  }, 180);
}

function closeSurprise() {
  const overlay = document.getElementById('surprise-overlay');
  const box = document.getElementById('surprise-box');
  if (!overlay || !box) return;
  
  box.style.transform = 'scale(0.9) translateY(20px)';
  overlay.style.opacity = '0';
  setTimeout(() => { overlay.style.visibility = 'hidden'; }, 500);
}

// Cerrar al hacer click fuera del box
const surpriseOverlay = document.getElementById('surprise-overlay');
if (surpriseOverlay) {
  surpriseOverlay.addEventListener('click', function(e) {
    if (e.target === this) closeSurprise();
  });
}

/* ─── Confetti ─── */
function launchConfetti() {
  if (typeof confetti !== 'function') return;
  
  const colors = ['#7c3aed', '#3b82f6', '#a855f7', '#60a5fa', '#c4b5fd', '#ddd6fe', '#e0e7ff'];

  function fire(particleRatio, opts) {
    confetti(Object.assign({}, {
      origin: { y: 0.6 },
      colors: colors,
    }, opts, {
      particleCount: Math.floor(200 * particleRatio),
    }));
  }

  fire(0.25, { spread: 26, startVelocity: 55 });
  fire(0.2, { spread: 60 });
  fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
  fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
  fire(0.1, { spread: 120, startVelocity: 45 });

  // Segunda ola
  setTimeout(() => {
    confetti({
      particleCount: 80,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: colors,
    });
    confetti({
      particleCount: 80,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: colors,
    });
  }, 300);
}

/* ─── Smooth scroll desde navegación ─── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});
