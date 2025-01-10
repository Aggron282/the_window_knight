function RenderCarouselNew() {
  const config = [
  {
    name: "Pita Jungle",
    logo: "pj.png",
    review: "Great service and fantastic support!",
    background: "pitaa.jpg", // Light gray background color
    photo: "pita_photo.jpg", // Associated photo
  },
  {
    name: "Rachel's Art Studio",
    logo: "art.png",
    review: "Beautiful designs, highly recommend!",
    background: "art__.jpeg", // Light pink background color
    photo: "what_we_do_4.jpg", // Associated photo
  },
  {
    name: "U.S Egg",
    logo: "f45.png",
    review: "Delicious and wholesome breakfasts.",
    background: "egg.jpg", // Light yellow background color
    photo: "what_we_do_1.png", // Associated photo
  },
  {
    name: "Breakfast & Bar",
    logo: "bkb.png",
    review: "Amazing ambiance and food!",
    background: "bkb1.png", // Light blue background color
    photo: "what_we_do_2.png", // Associated photo
  },
  {
    name: "Sims Business Systems",
    logo: "sims.png",
    review: "Efficient systems, very reliable!",
    background: "simss.jpg", // Light green background color
    photo: "what_we_do_4.jpg", // Associated photo
  },
  {
    name: "F45",
    logo: "f45.png",
    review: "Highly effective workouts and great trainers!",
    background: "wiwi.jpg", // Light purple background color
    photo: "frrr.jpg", // Associated photo
  },
  {
    name: "Residential Homes",
    logo: "homes.png",
    review: "Beautiful designs and great service!",
    background: "silver.png", // Beige background color
    photo: "what_we_do_3.jpg", // Associated photo
  },
];

  const container = document.querySelector(".client_carousel");

  // Create clones for seamless looping
  const clones = [
    { ...config[config.length - 1] }, // Last slide clone
    ...config,
    { ...config[0] }, // First slide clone
  ];

  // Render slides
  for (const slide of clones) {
    container.innerHTML += `
      <div class="client_slide_box">
      <div class="client_background"
       style="background: linear-gradient(to right bottom, rgba(238, 130, 58, .5), rgba(44, 73, 119,.5), rgba(0, 105, 164, 0)), url('./assets/images/${slide.background}') no-repeat center center / cover;"></div>
        <div class="content">
        <div class="slide-grid">
        <div>
        <p class="title">${slide.name}</p>
        </div>
        <div>
          <img src="./assets/images/${slide.logo}" class="client--logo" />
      </div>
        </div>
          <div class="review-grid">
          <div>
        <p class="review">
        I cannot recommend [Business Name] enough! Their attention to detail, exceptional customer service, and commitment to quality are unmatched. From the initial consultation to the final delivery, every step was smooth and professional. The team went above and beyond to ensure my needs were met and exceeded my expectations. The quality of their work is outstanding, and the results speak for themselves. It's rare to find a business that truly cares about its clients, but [Business Name] does just that. I will definitely be using their services again and recommending them to everyone I know. Truly a 5-star experience!
        </p>
        </div>
        <div class="photo-grid">

          <img src="./assets/images/${slide.photo}" class="width-100" />


        </div>

        </div>
        </div>
      </div>
    `;
  }
}

RenderCarouselNew();

const slides = document.querySelectorAll(".client_slide_box");
const leftArrow = document.querySelector(".left--arrow--c");
const rightArrow = document.querySelector(".right--arrow--c");
const totalSlides = slides.length;
let currentIndex = 1; // Start with the first actual slide

// Highlight the center slide
function highlightCenterSlide() {
  slides.forEach((slide, index) => {
    if (index === currentIndex) {
      slide.classList.add("center-slide");
    } else {
      slide.classList.remove("center-slide");
    }
    slide.style.opacity = index === currentIndex ? "1" : "0.5";
    slide.style.transform = index === currentIndex ? "scale(1)" : "scale(0.8)";
  });
}

// Update slide positions
function updateSlides() {
  slides.forEach((slide, index) => {
    const offset = (index - currentIndex) * 100; // Position each slide
    slide.style.transform = `translateX(${offset}%) scale(${index === currentIndex ? 1.2 : 0.8})`;
  });
}

// Handle infinite looping
function handleTransitionEnd() {
  if (currentIndex === 0) {
    currentIndex = totalSlides - 2;
    slides.forEach((slide) => (slide.style.transition = "none"));
    updateSlides();
  } else if (currentIndex === totalSlides - 1) {
    currentIndex = 1;
    slides.forEach((slide) => (slide.style.transition = "none"));
    updateSlides();
  }
  highlightCenterSlide();
}

// Navigation
rightArrow.addEventListener("click", () => {
  currentIndex++;
  slides.forEach((slide) => (slide.style.transition = "transform 0.5s ease-in-out"));
  updateSlides();
  highlightCenterSlide();
});

leftArrow.addEventListener("click", () => {
  currentIndex--;
  slides.forEach((slide) => (slide.style.transition = "transform 0.5s ease-in-out"));
  updateSlides();
  highlightCenterSlide();
});

// Initialize
updateSlides();
highlightCenterSlide();
document.querySelector(".client_carousel").addEventListener("transitionend", handleTransitionEnd);
