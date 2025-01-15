var hours_container = document.querySelector(".hours-container")
var reach_container = document.querySelector(".reach-container")
var hero_hours = document.querySelector(".hero-hours")

var gate_title = document.querySelector(".gate-title");
var gate = document.querySelector("#gates-unique");
var icon_s_1 = document.querySelector(".icon-s-1");
var icon_s_2 = document.querySelector(".icon-s-2");
var icon_s_3 = document.querySelector(".icon-s-3");
var icon_s_4 = document.querySelector(".icon-s-4");

var social_title1 = document.querySelector(".social_title1");
var social_title2 = document.querySelector(".social_title2");
var social_title3 = document.querySelector(".social_title3");
var social_title4 = document.querySelector(".social_title4");

var rain_text_container = document.querySelector(".rain-text-container");
var city = document.querySelector(".city");
var spotcircle = document.querySelector(".circle-light");
var spotlight = document.querySelector(".spotlight");
var box_f = document.querySelector(".box-f");

animate_elements(hours_container,"hours-container--active",100);
animate_elements(reach_container,"reach-container--active",300);
animate_elements(hero_hours,"hero-hours--active",500);

animate_elements(gate_title, "gate-title--active",500);
animate_elements(gate, "open",1000);
animate_elements(icon_s_2,"icon-s-1--active",500 + 1000)
animate_elements(icon_s_1,"icon-s-2--active",700 + 1000)
animate_elements(icon_s_3,"icon-s-3--active",900 + 1000)
animate_elements(icon_s_4,"icon-s-4--active",1100 + 1000);

animate_elements(social_title1,"social_title1--active",500+ 1000)
animate_elements(social_title2,"social_title2--active",700+ 1000)
animate_elements(social_title3,"social_title3--active",900+ 1000)
animate_elements(social_title4,"social_title5--active",1100+ 1000)

animate_elements(rain_text_container, "rain-text-container--active",800);
animate_elements(spotcircle, "circle-light--active",600);
animate_elements(city, "city--active",100);
animate_elements(spotlight, "spotlight--active",300);

animate_elements(box_f, "box-f--active",500);
