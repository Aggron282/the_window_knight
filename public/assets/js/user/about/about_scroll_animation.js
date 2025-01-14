var mission_title = document.querySelector(".mission_text--title")
var mission_description = document.querySelector(".mission_text--description")
var what_we_do_description = document.querySelector(".what_we_do_description")

var what_we_do_title = document.querySelector(".what_we_do_title")
var blanket_grid = document.querySelector(".blanket-grid");
var header_banner = document.querySelector(".header-banner");
var glow_k = document.querySelector(".k-glow");
var icon_1 = document.querySelector(".service--icon--1");
var icon_2 = document.querySelector(".service--icon--2");
var cutout = document.querySelector(".team_cutout");

var meet_team_container_banner = document.querySelector(".meet_team_container--banner");

animate_elements(mission_title, "mission_text--title--active",500);
animate_elements(mission_description, "mission_text--description--active",1500);
animate_elements(what_we_do_title, "what_we_do_title--active",0);
animate_elements(what_we_do_description, "what_we_do_description--active",1000);

animate_elements(blanket_grid, "blanket-grid--active",0);
animate_elements(header_banner, "header-banner--active",100);
animate_elements(glow_k, "k-glow--active",1000);
animate_elements(icon_1, "service-icon--1--active",0);
animate_elements(icon_2, "service-icon--2--active",500);
animate_elements(cutout, "team_cutout--active",500);
animate_elements(meet_team_container_banner, "meet_team_container--banner--active",500);
