
const toggleBtn = document.getElementById('toggleBtn');
const buttonText = document.getElementById('buttonText');
const canvas = document.getElementById('effectCanvas');
const labelText = document.getElementById('beforelabel');
const ctx = canvas.getContext('2d');
let cleaned = false;

// Load images dynamically from ./assets/images/before_1.png, before_2.png, etc.
const beforeImgs = Array.from(document.querySelectorAll('.img-tile:not(.glow-box)'));
const afterImgs = beforeImgs.map((_, i) => `./assets/images/after_${i + 1}.png`);
const beforeSrcs = beforeImgs.map((_, i) => `./assets/images/before_${i + 1}.png`);

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

async function animateClean() {
  const sparkleImg = await loadImage('./assets/images/sparkle.png');

  const particles = [];
  for (let i = 0; i < 20; i++) {
    particles.push({
      type: 'sparkle',
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: 30 + Math.random() * 20,
      opacity: 1,
      angle: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.01
    });
  }
  for (let i = 0; i < 20; i++) {
    particles.push({
      type: 'bubble',
      x: Math.random() * canvas.width,
      y: canvas.height + Math.random() * 100,
      r: 1 + Math.random() * 10,
      opacity: 1,
      speed: 0.5 + Math.random()
    });
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      ctx.globalAlpha = p.opacity;
      if (p.type === 'sparkle') {
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);
        ctx.drawImage(sparkleImg, -p.size / 2, -p.size / 2, p.size, p.size);
        ctx.restore();
        p.angle += p.rotationSpeed;
        p.opacity -= 0.003;
        p.size += 0.05;
      } else if (p.type === 'bubble') {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.fill();
        p.y -= p.speed;
        p.opacity -= 0.004;
      }
    });
    ctx.globalAlpha = 1;
    if (particles.some(p => p.opacity > 0)) {
      requestAnimationFrame(animate);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }

  animate();
}

async function animateDirty() {
  const smokeImg = await loadImage('./assets/images/smoke.png');

  const particles = [];
  for (let i = 0; i < 35; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: 100 + Math.random() * 100,
      opacity: 0,
      angle: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.01,
      grow: 0.5 + Math.random() * 0.1,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      phase: 0
    });
  }

  const start = performance.now();
  const duration = 1500;

  function animate(now) {
    const elapsed = now - start;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
      const t = (Math.sin(p.phase += 0.04) + 1) / 2;
      p.opacity = t * 0.2;

      ctx.globalAlpha = p.opacity;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.angle);
      ctx.drawImage(smokeImg, -p.size / 2, -p.size / 2, p.size, p.size);
      ctx.restore();

      p.x += p.vx;
      p.y += p.vy;
      p.angle += p.rotationSpeed;
      p.size += p.grow * 0.3;
    });

    ctx.globalAlpha = 1;
    if (elapsed < duration) requestAnimationFrame(animate);
    else ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  requestAnimationFrame(animate);
}

function bounceTransition(imgs, newSrcs) {
  imgs.forEach((img, i) => {
    const wrapper = img.closest('.img-wrapper');
    const overlay = wrapper.querySelector('.black-overlay');

    const delay = i * 150; // 150ms delay between each tile

    setTimeout(() => {
      overlay.style.opacity = 1; // Fade to black

      setTimeout(() => {
        img.src = newSrcs[i];

        setTimeout(() => {
          overlay.style.opacity = 0; // Fade back in
        }, 100); // Short pause before revealing
      }, 300); // Wait while blacked out

    }, delay); // Stagger blackout
  });
}


toggleBtn.addEventListener('click', async () => {
  if (!cleaned) {
    await animateClean();
    bounceTransition(beforeImgs, afterImgs);
    buttonText.textContent = "MAKE DIRTY";
    labelText.textContent = "AFTER";
    toggleBtn.classList.add('dirty');
  } else {
    await animateDirty();
    bounceTransition(beforeImgs, beforeSrcs);
    buttonText.textContent = "CLEAN ME";
    labelText.textContent = "BEFORE";
    toggleBtn.classList.remove('dirty');
  }
  cleaned = !cleaned;
});
