class Particle {
  constructor(x, y, velocity) {
    this.x = x;
    this.y = y;
    this.alpha = 1; // Transparency for fading effect
    this.radius = Math.random() * 2 + 1; // Random radius between 1 and 3
    this.color = `hsl(${Math.random() * 360}, 50%, 50%)`; // Random vibrant color
    this.velocity = velocity;
  }

  draw(c) {
    c.save();
    c.globalAlpha = this.alpha; // Apply transparency
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
    c.closePath();
    c.restore();
  }

  update(gravity, friction) {
    // Update particle position and fade out
    this.velocity.x *= friction;
    this.velocity.y += gravity;
    this.alpha -= 0.01;

    this.x += this.velocity.x;
    this.y += this.velocity.y;

    if (this.radius > 0.1) {
      this.radius -= 0.02; // Gradually shrink radius
    } else {
      this.radius = 0;
    }
  }
}

function CreateCanvas(query) {
  const canvas = document.querySelector(query);
  const c = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  // Configuration variables
  var particles = [];
  const gravity = 0.02;
  const friction = 0.98;

  function cancel(){
    particles = [];
    c.clearRect(0, 0, canvas.width, canvas.height);

  }
  // Create new particles at a given position
  function createParticles(x, y, count = 30) {
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2; // Random angle in radians
      const speed = Math.random() * 4 + 1; // Random speed between 1 and 5
      const velocity = {
        x: Math.cos(angle) * speed,
        y: Math.sin(angle) * speed,
      };
      particles.push(new Particle(x, y, velocity));
    }
  }

  // Animation loop
  function animation() {
    requestAnimationFrame(animation);
    const gradient = c.createLinearGradient(0, 0, canvas.width, 0);
    gradient.addColorStop(0, "rgba(0, 20, 30, .1)");
    gradient.addColorStop(0.5, "rgba(0, 35, 50, .1)");
    gradient.addColorStop(1, "rgba(0, 50, 70, .1)");
    // c.fillStyle = "rgba(0, 0, 0, 0.1)"; // Subtle trail effect
    c.fillRect(0, 0, canvas.width, canvas.height);
      c.fillStyle=`rgba(0, 35, 50, .2)`;
    for (let i = particles.length - 1; i >= 0; i--) {
      const particle = particles[i];
      if (particle.alpha > 0) {
        particle.update(gravity, friction);
        particle.draw(c);
      } else {
        particles.splice(i, 1); // Remove faded particles
      }
    }
  }

  // Handle resizing
  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });

  return {
    canvas,
    cancel,
    createParticles,
    particles,
    animation,
  };
}

var firework_interval= null;
var fireworks = null;

function InitFireworks(){

  fireworks = CreateCanvas("#fireworkCanvas");

  fireworks.animation();

  var limit = 10;

  var t = 0;
  // Example to trigger fireworks on click
  firework_interval = setInterval(()=>{

    t ++;

    if(t >= limit){
      t = 0;
      fireworks.cancel();
    }
    if(fireworks){
      if(fireworks.createParticles){
        fireworks.createParticles(Math.random() *1000 + 5 , Math.random() * 505+ 5);
      }
    }
  },1000);

}


function CancelFireworks(){
  firework_interval= null;
  fireworks = null;
}
