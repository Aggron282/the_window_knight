var mission_title = document.querySelector(".mission_text--title");
var mission_description = document.querySelector(".mission_text--description");
const el_title = document.querySelector(".what-we-do--title");
const el_desc = document.querySelector(".what-we-do--desc");
const el_quote = document.querySelector(".link-btn--quote");
const el_contact = document.querySelector(".link-btn--contact");
const el_work = document.querySelector(".link-btn--work");

const owner_title = document.querySelector(".meet-owner-title");
const owner_subtitle = document.querySelector(".meet-owner-subtitle");
const owner_quote = document.querySelector(".meet-owner-btn--quote");
const owner_contact = document.querySelector(".meet-owner-btn--email");
const owner_desc = document.querySelector(".meet-owner-desc");
const owner_picture_big = document.querySelector(".meet-owner-picture--big");
const owner_picture_small = document.querySelector(".meet-owner-picture--small");

const map_section = document.querySelector(".map-container");

const clean_section = document.querySelector(".knight-clean-section");


animate_elements(clean_section, "knight-clean-section--active", 1000);


animate_elements(el_title, "what-we-do--title--active", 200);
animate_elements(el_desc, "what-we-do--desc--active", 400);
animate_elements(el_quote, "link-btn--active", 600);
animate_elements(el_contact, "link-btn--active", 800);
animate_elements(el_work, "link-btn--active", 1000);
animate_elements(mission_title,"mission_text--active",500);
animate_elements(mission_description,"mission_text--active",1200);

animate_elements(owner_title, "meet-owner-title--active", 200);
animate_elements(owner_subtitle, "meet-owner-subtitle--active", 400);
animate_elements(owner_contact, "meet-owner-btn--active", 600);
animate_elements(owner_quote, "meet-owner-btn--active", 800);
animate_elements(owner_desc, "meet-owner-desc--active", 1000);
animate_elements(owner_picture_big,"meet-owner-picture--active",500);
animate_elements(owner_picture_small,"meet-owner-picture--active",1200);
animate_elements(map_section,"map-container--active",900);



//
// window.addEventListener("scroll", checkAndAnimate);
// window.addEventListener("load", checkAndAnimate);
