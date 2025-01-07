document.addEventListener("scroll", () => {
  const parallax = document.getElementById("parallax");
  const scrollPosition = window.scrollY;
  parallax.style.transform = `translateY(${scrollPosition * 0.05}px)`;
});
var sparkles = [];
var limit = 3;
function ReturnSparkleHTML(x,y){
  return `<img src = "./assets/images/sparkle.png" class="sparkle" style="left:${x}%;top:${y}px;animation-duration:${Math.random() * 2 + .5}s"/>`
}
var sparkle_container = document.querySelector(".sparkle_container");
const Delay = (ms) => {
return new Promise(resolve => setTimeout(resolve, ms));
}
console.log("S")
var counter =0
setInterval(async ()=>{

  sparkle_container.innerHTML = ""

  sparkle_container.innerHTML+= ReturnSparkleHTML(Math.random() * 50 + 20, Math.random() * 40 + 20);
  counter ++;
},2000);
