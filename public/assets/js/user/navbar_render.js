const Init_Navbar = () => {


  const openSidebar = document.getElementById("openSidebar");
  const closeSidebar = document.getElementById("closeSidebar");
  const sidebar = document.getElementById("mobileSidebar");

  openSidebar.addEventListener("click", () => {
    sidebar.classList.add("active");
  });

  closeSidebar.addEventListener("click", () => {
    sidebar.classList.remove("active");
  });
}

Init_Navbar();
