function RenderCarouselNew() {
  const config = [
  {
    name: "Pita Jungle",
    logo: "pj.png",
    review: `
    Window Knight exceeded our expectations! From the initial consultation to the flawless installation, their team was professional, punctual, and detail-oriented. Our restaurant’s new windows look stunning and enhance the ambiance perfectly. They truly bring in more natural light, creating a warm, inviting atmosphere for our guests. We couldn’t be happier with the results. Highly recommend Window Knight for top-notch service and craftsmanship.
    `,
    background: "pitaa.jpg", // Light gray background color
    photo: "pita_photo.jpg", // Associated photo
  },
  {
    name: "Rachel's Art Studio",
    logo: "art.png",
    review: `Window Knight transformed my art studio with their amazing windows! The natural light now floods the space beautifully, enhancing every detail of my work and creating a bright, inspiring environment. Their team was professional, efficient, and truly understood the aesthetic I wanted to achieve. The quality of their craftsmanship is unmatched. I’m beyond thrilled with the results and highly recommend them to anyone`,
    background: "art__.jpeg", // Light pink background color
    photo: "what_we_do_4.png", // Associated photo
  },
  {
    name: "U.S Egg",
    logo: "f45.png",
    review: `Window Knight did an incredible job upgrading our windows! The improved natural light has made our restaurant feel brighter and more welcoming, and the quality of their work is outstanding. Their team was professional, efficient, and made the entire process seamless. We’ve received so many compliments from our guests already. Highly recommend Window Knight for exceptional service and results!`,
    background: "egg.jpg", // Light yellow background color
    photo: "slant.png", // Associated photo
  },
  {
    name: "Breakfast & Bar",
    logo: "bkb.png",
    review: `Window Knight exceeded all expectations! Their team installed stunning, high-quality windows that completely transformed our space. The natural light now creates a fresh, inviting atmosphere that our customers love. From start to finish, their professionalism and attention to detail were remarkable. We couldn’t be happier with their work and would recommend them to anyone looking for top-tier window services.`,
    background: "bkb1.jpg", // Light blue background color
    photo: "photo_6.png", // Associated photo
  },
  {
    name: "Sims Business Systems",
    logo: "sims.png",
    review: `Window Knight delivered outstanding service! Their high-quality windows have enhanced our office space, bringing in more natural light and creating a modern, professional look. The installation process was smooth, and their team was punctual, efficient, and meticulous. We’ve noticed a significant improvement in energy efficiency, too. Highly recommend Window Knight for their expertise and exceptional craftsmanship`,
    background: "simss.jpg", // Light green background color
    photo: "/promises/2.png", // Associated photo
  },
  {
    name: "F45",
    logo: "f45.png",
    review: `Window Knight completely transformed our gym! The new windows let in an abundance of natural light, creating an energetic and motivating atmosphere for our members. Their team was professional, quick, and ensured every detail was perfect. The quality of their work is second to none, and we couldn’t be happier with the results. Thank you, Window Knight, for an incredible job!`,
    background: "wiwi.jpg", // Light purple background color
    photo: "what_we_do_3.png", // Associated photo
  },
  {
    name: "Residential Homes",
    logo: "pop.png",
    review: `Window Knight did an amazing job replacing the windows in our home! The new windows look stunning and have made a huge difference in energy efficiency and curb appeal. The team was professional, friendly, and completed the work quickly with great attention to detail. From start to finish, the entire process was smooth and stress-free. We’re thrilled with the results and highly recommend them to anyone!`,
    background: "silver.png", // Beige background color
    photo: "what_we_do_new.png", // Associated photo
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
        ${slide.review}
        </p>
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
