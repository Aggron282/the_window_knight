const btn = document.getElementById('cleanBtn');
   const label = document.querySelector('.label-b');
   const afterImages = document.querySelectorAll('.after');
   const beforeImages = document.querySelectorAll('.before');

   let isBefore = true;
   let effectCooldown = false;
   let dirtyAnimationFrameId = null;

   btn.addEventListener('click', () => {
     if (effectCooldown) return;
     effectCooldown = true;
     setTimeout(() => effectCooldown = false, 1200);

     label.style.transform = 'rotateX(90deg)';
     label.style.opacity = '0';

     setTimeout(() => {
       label.setAttribute('data-label', isBefore ? 'After' : 'Before');
       label.classList.toggle('label--before', isBefore);
       label.classList.toggle('label--after', !isBefore);
       label.style.transform = 'rotateX(0deg)';
       label.style.opacity = '1';
     }, 600);

     isBefore = !isBefore;

     if (!isBefore) {
       createCleanEffect();
       afterImages.forEach((img, i) => {
         setTimeout(() => {
           img.style.opacity = '1';
           img.style.transform = 'translateY(0)';
         }, i * 100);
       });
       beforeImages.forEach(img => {
         img.style.opacity = '0';
         img.style.transform = 'translateY(50px)';
       });
       btn.innerHTML = "See Before";
       btn.classList.remove("clean-btn--before");
       btn.classList.add("clean-btn--after");
     } else {
       createDirtyEffect();
       beforeImages.forEach((img, i) => {
         setTimeout(() => {
           img.style.opacity = '1';
           img.style.transform = "translateY(0)";
         }, i * 100);
       });
       afterImages.forEach(img => {
         img.style.opacity = '0';
         img.style.transform = "translateY(50px)";
       });
       btn.innerHTML = "Clean Me!";
       btn.classList.remove("clean-btn--after");
       btn.classList.add("clean-btn--before");
     }
   });

   function createCleanEffect() {
     const canvas = document.getElementById("effectCanvas");
     const ctx = canvas.getContext("2d");
     canvas.width = window.innerWidth;
     canvas.height = window.innerHeight;

     const bubbles = [];
     for (let i = 0; i < 80; i++) {
       bubbles.push({
         x: Math.random() * canvas.width,
         y: canvas.height + Math.random() * 200,
         r: Math.random() * 6 + 2,
         speed: Math.random() * 1 + 0.5,
         opacity: Math.random() * 0.5 + 0.5,
         shrink: Math.random() * 0.007 + 0.002
       });
     }

     function animate() {
       ctx.clearRect(0, 0, canvas.width, canvas.height);
       for (let i = bubbles.length - 1; i >= 0; i--) {
         const b = bubbles[i];
         ctx.beginPath();
         ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
         ctx.fillStyle = `rgba(255,255,255,${b.opacity})`;
         ctx.fill();

         b.y -= b.speed;
         b.r -= b.shrink;
         b.opacity -= 0.005;

         if (b.y < -100 || b.r <= 0.1 || b.opacity <= 0) {
           bubbles.splice(i, 1);
         }
       }

       if (bubbles.length > 0) {
         requestAnimationFrame(animate);
       } else {
         ctx.clearRect(0, 0, canvas.width, canvas.height);
       }
     }

     animate();
   }

   function createDirtyEffect() {
     const canvas = document.getElementById("effectCanvas");
     const ctx = canvas.getContext("2d");
     canvas.width = window.innerWidth;
     canvas.height = window.innerHeight;

     if (dirtyAnimationFrameId) {
       cancelAnimationFrame(dirtyAnimationFrameId);
       dirtyAnimationFrameId = null;
     }

     const particles = [];
     for (let i = 0; i < 80; i++) {
       particles.push({
         x: Math.random() * canvas.width,
         y: -Math.random() * 200,
         r: Math.random() * 4 + 2,
         speed: Math.random() * 1.2 + 0.8,
         opacity: Math.random() * 0.5 + 0.5,
         shrink: Math.random() * 0.008 + 0.003
       });
     }

     function animate() {
       ctx.clearRect(0, 0, canvas.width, canvas.height);
       for (let i = particles.length - 1; i >= 0; i--) {
         const p = particles[i];
         ctx.beginPath();
         ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
         ctx.fillStyle = `rgba(120,70,30,${p.opacity})`;
         ctx.fill();

         p.y += p.speed;
         p.r -= p.shrink;
         p.opacity -= 0.004;

         if (p.y > canvas.height + 100 || p.r <= 0.1 || p.opacity <= 0) {
           particles.splice(i, 1);
         }
       }

       if (particles.length > 0) {
         dirtyAnimationFrameId = requestAnimationFrame(animate);
       } else {
         ctx.clearRect(0, 0, canvas.width, canvas.height);
         dirtyAnimationFrameId = null;
       }
     }

     animate();
   }
