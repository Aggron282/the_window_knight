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

    <div class="nav_row row">
      <div class="col-4">
        <img class = "logo_new" src = "./assets/images/new_logo.png" />
         <p class="link_nav link_nav--title"> The Window Knight</p>
      </div>

      <div class="col-1 no_col"></div>
      <div class="col-5">
      <div class="row">
        <a class="col-3 nav_col nav_col--home" href="/">
          <p class="link_nav margin-left-5">Home</p>
        </a>

        <a class="col-3 nav_col  nav_col--about" href="/about">
          <p class="link_nav">About Us</p>
        </a>

        <a class="col-3 nav_col nav_col--contact" href="/contact_us">
          <p class="link_nav">Contact Us</p>
        </a>

        <a class="col-3  nav_col sc_col nav_col--schedule" href="/#subhere">
          <p class="link_nav">Free Quote</p>
        </a>

        </div>
        </div>
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
                <a href="/schedule" ><p class="link_nav medium-font">Schedule Quote</p> </a>
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
