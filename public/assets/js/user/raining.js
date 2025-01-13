const canvas = document.getElementById('rainCanvas');
   const ctx = canvas.getContext('2d');
   canvas.width = window.innerWidth;
   canvas.height = window.innerHeight;

   const raindrops = [];
   const numberOfRaindrops = 20; // Adjust for more/less rain
   const windSpeed = -1.5; // Wind moving rain to the left

   // Create Raindrop
   class Raindrop {
     constructor() {
       this.x = Math.random() * canvas.width;
       this.y = Math.random() * canvas.height;
       this.length = Math.random() * 5 + 10; // Length of the raindrop
       this.width = Math.random() * .5 + 0.5; // Width of the raindrop
       this.speed = Math.random() * 2 + 1; // Fall speed
       this.opacity = Math.random() * 0.5 + 0.5; // Transparency
     }

     update() {
       // this.x += windSpeed; // Horizontal motion due to wind
       this.y += this.speed;

       // Reset if raindrop moves out of bounds
       if (this.y > canvas.height || this.x < 0) {
         this.x = Math.random() * canvas.width;
         this.y = -10;
       }
     }

     draw() {
       ctx.beginPath();
       ctx.moveTo(this.x, this.y);
       ctx.lineTo(this.x + windSpeed, this.y + this.length);
       ctx.strokeStyle = `rgba(173, 216, 230, ${this.opacity})`; // Light blue rain
       ctx.lineWidth = this.width;
       ctx.stroke();
     }
   }

   // Initialize Raindrops
   for (let i = 0; i < numberOfRaindrops; i++) {
     raindrops.push(new Raindrop());
   }

   // Animation Loop
   function animate() {
     ctx.clearRect(0, 0, canvas.width, canvas.height);

     raindrops.forEach((raindrop) => {
       raindrop.update();
       raindrop.draw();
     });

     requestAnimationFrame(animate);
   }

   animate();

   // Handle window resize
   window.addEventListener('resize', () => {
     canvas.width = window.innerWidth;
     canvas.height = window.innerHeight;
     raindrops.length = 0;
     for (let i = 0; i < numberOfRaindrops; i++) {
       raindrops.push(new Raindrop());
     }
   });
