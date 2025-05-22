var navbar_element = document.querySelector(".navbar_container");
var nav_button = document.getElementById("button_navbar");

const NavClick = () => {

    var nav_container = document.getElementById("navbarToggleExternalContent");
    var toggle = "inactive";

    if(nav_container.getAttribute("status") == "inactive"){
      toggle = "active";
    }
    else{
      toggle = "inactive";
    }

    nav_container.setAttribute("status",toggle);

    if(nav_container.getAttribute("status") == "inactive"){
      nav_container.classList.add("active-navbar");
      nav_container.classList.remove("collapse");
    }
    else{
      nav_container.classList.add("collapse");
      nav_container.classList.remove("active-navbar");
    }

}

const Init_Navbar = () => {



    navbar_element.innerHTML = `
    <div class="navbar_custom n-desktop">
    <div class="banner">Reliable & Affordable Window Cleaning!</div>

    <div class="navbar_home">

      <div class="logo-title-container">
        <img class="logo_new" src="./assets/images/new_logo.png" alt="Logo">
        <p class="link_nav--title">The Window Knight</p>
      </div>
      <ul class="nav_links">
        <li><a href="/" class="link_nav">Home</a></li>
        <li><a href="https://www.quotes.thewindowknight.com" target="_blank" class="link_nav">Window Washing 101</a></li>
        <li><a href="/about" class="link_nav">About Us</a></li>
        <li><a href="/contact_us" class="link_nav">Contact Us</a></li>
        <li class="q-btn"><a href="https://www.quotes.thewindowknight.com" target="_blank" class="link_nav">Free Quote</a></li>
      </ul>
      </div>


    </div>

    <div class="pos-f-t navbar_custom n-mobile">

      <nav class="navbar navbar_custom">

        <button id="button_navbar" class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
          <img class="button_img" style="height:1rem;width:1rem"src="./assets/images/menu.svg" type="button" data-toggle="collapse" data-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent"/>
        </button>

      </nav>

      <div class="collapse active_n" id="navbarToggleExternalContent" status="inactive">

        <div class="row navbar_home_mobile mt2_5">

          <div class="col-1 "></div>

          <div class="col-10">
            <div class="row">

              <div class="col-12">
                <a href="/"><p class="link_nav medium-font">Home</p></a>
              </div>

              <div class="col-12">
                <a href = "/about"><p class="link_nav medium-font">About Us</p></a>
              </div>

              <div class="col-12">
                <a href="/contact_us"><p class="link_nav medium-font">Contact Us</p></a>
              </div>

              <div class="col-12">
                <a href="https://www.quotes.thewindowknight.com" target="_blank" ><p class="link_nav medium-font">Schedule Quote</p> </a>
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>

    `;


  nav_button = document.getElementById("button_navbar");

  if(nav_button){

    nav_button.addEventListener("click",()=>{
      NavClick();
    });

  }
}
Init_Navbar();

let scrollTimer;
let scrollActive = false;

let scrollStartTimer;
let scrollStopTimer;
const contactFloat = document.getElementById("contactFloat");



// window.addEventListener("scroll", () => {
//   // At top of page, reset everything
//   if (window.scrollY === 0) {
//     clearTimeout(scrollStartTimer);
//     clearTimeout(scrollStopTimer);
//     contactFloat.classList.remove("scrolling");
//     scrollActive = false;
//     return;
//   }
//
//   // Clear stop timer to prevent premature class re-add
//   clearTimeout(scrollStopTimer);
//   clearTimeout(scrollStartTimer);
//   // If scrolling just started
//   if (!scrollActive) {
//     scrollStartTimer = setTimeout(() => {
//
//     scrollActive = true;
//     contactFloat.classList.remove("scrolling");
//   },1000);
// }else{
//
//   // Set a stop timer to re-add class after scroll ends
//   scrollStopTimer = setTimeout(() => {
//     contactFloat.classList.add("scrolling");
//     scrollActive = false;
//   }, 200);
// }
// });
