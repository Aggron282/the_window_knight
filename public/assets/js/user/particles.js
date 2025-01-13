class Particle{

  constructor(x,y,velocity,color){
      this.x = x;
      this.color = `hsl(${Math.floor(Math.random() * 360)},50%,50%)`;
      this.y = y;
      this.alpha = 1;
      this.radius = (Math.floor(Math.random() * .2)) + .5;
      this.velocity = velocity;
  }

  draw(){

    c.save()

    this.globalAlpha = this.alpha;
    c.beginPath();
    c.arc(this.x,this.y,this.radius,0,Math.PI * 2,false)
    c.fillStyle = this.color;
    c.strokeStyle = this.color;
    c.stroke();
    c.fill();
    c.closePath();
    c.restore();

  }

  update(){

    this.velocity.x = this.velocity.x * friction
    this.velocity.y = this.velocity.y + gravity;

    this.alpha -= (Math.random() * .001) + .002;

    this.x += this.velocity.x;
    this.y += this.velocity.y;

    if(this.radius > 0){
      this.radius -= .002;
    }
    else{
      this.radius = 0;
    }

    this.draw();

  }

}

function CreateCanvas(query){

  var canvas = document.querySelector(query);

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  var colors = ["lightblue","limegreen"];
  var c = canvas.getContext("2d");
  var count = 3;
  var particles = [];
  var gravity = .01;
  var friction = .999;
  var isAni = false;
  var speed = 5;

  function animation(){

    requestAnimationFrame(animation);
    c.fillStyle = "rgba(0,0,0,.05)";
    c.fillRect(0,0,canvas.width,canvas.height);

    for(var i =0; i < particles.length;i++){

      if(particles[i].alpha > 0){
        particles[i].update();
      }
      else{
        particles.splice(i,1);
      }

    }

  }

  return {
    colors:colors,
    c:c,
    count:count,
    particles:particles,
    gracity:gravity,
    friction:friction,
    isAn:isAni,
    speed:speed,
    canvas:canvas,
    animation:animation
  }

}
