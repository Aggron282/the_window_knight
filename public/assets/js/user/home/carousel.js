//
// const slides = [
//   {
//     name: "Pita Jungle",
//     logo: "pj.png",
//     review: `
//     Window Knight exceeded our expectations! From the initial consultation to the flawless installation, their team was professional, punctual, and detail-oriented. Our restaurant’s new windows look stunning and enhance the ambiance perfectly. They truly bring in more natural light, creating a warm, inviting atmosphere for our guests. We couldn’t be happier with the results. Highly recommend Window Knight for top-notch service and craftsmanship.
//     `,
//     background: "pitaa.jpg", // Light gray background color
//     leftImage: "what_we_do_new.png", // Associated photo
//     rightImage: "what_we_do_3.png" // Associated photo
//   },
//   {
//     name: "Rachel's Art Studio",
//     logo: "art.png",
//     review: `Window Knight transformed my art studio with their amazing windows! The natural light now floods the space beautifully, enhancing every detail of my work and creating a bright, inspiring environment. Their team was professional, efficient, and truly understood the aesthetic I wanted to achieve. The quality of their craftsmanship is unmatched. I’m beyond thrilled with the results and highly recommend them to anyone`,
//     leftImage: "what_we_do_new.png", // Associated photo
//     rightImage: "what_we_do_2.png" // Associated photo
//   },
//   {
//     name: "U.S Egg",
//     logo: "f45.png",
//     review: `Window Knight did an incredible job upgrading our windows! The improved natural light has made our restaurant feel brighter and more welcoming, and the quality of their work is outstanding. Their team was professional, efficient, and made the entire process seamless. We’ve received so many compliments from our guests already. Highly recommend Window Knight for exceptional service and results!`,
//     leftImage: "photo_4.png", // Associated photo
//     rightImage: "what_we_do_new.png" // Associated photo
//   },
//   {
//     name: "Breakfast & Bar",
//     logo: "bkb.png",
//     review: `Window Knight exceeded all expectations! Their team installed stunning, high-quality windows that completely transformed our space. The natural light now creates a fresh, inviting atmosphere that our customers love. From start to finish, their professionalism and attention to detail were remarkable. We couldn’t be happier with their work and would recommend them to anyone looking for top-tier window services.`,
//     leftImage: "what_we_do_new.png", // Associated photo
//     rightImage: "what_we_do_new.png" // Associated photo
//   },
//   {
//     name: "Sims Business Systems",
//     logo: "sims.png",
//     review: `Window Knight delivered outstanding service! Their high-quality windows have enhanced our office space, bringing in more natural light and creating a modern, professional look. The installation process was smooth, and their team was punctual, efficient, and meticulous. We’ve noticed a significant improvement in energy efficiency, too. Highly recommend Window Knight for their expertise and exceptional craftsmanship`,
//     leftImage: "what_we_do_new.png", // Associated photo
//     rightImage: "photo_1.png" // Associated photo
//   },
//   {
//     name: "F45",
//     logo: "f45.png",
//     review: `Window Knight completely transformed our gym! The new windows let in an abundance of natural light, creating an energetic and motivating atmosphere for our members. Their team was professional, quick, and ensured every detail was perfect. The quality of their work is second to none, and we couldn’t be happier with the results. Thank you, Window Knight, for an incredible job!`,
//     background: "wiwi.jpg", // Light purple background color
//     leftImage: "what_we_do_new.png", // Associated photo
//     rightImage: "what_we_do_3.png" // Associated photo
//
//   },
//   {
//     name: "Residential Homes",
//     logo: "pop.png",
//     review: `Window Knight did an amazing job replacing the windows in our home! The new windows look stunning and have made a huge difference in energy efficiency and curb appeal. The team was professional, friendly, and completed the work quickly with great attention to detail. From start to finish, the entire process was smooth and stress-free. We’re thrilled with the results and highly recommend them to anyone!`,
//     background: "silver.png", // Beige background color
//     leftImage: "what_we_do_new.png", // Associated photo
//     rightImage: "what_we_do_3.png" // Associated photo
//
//   },
// ];
//
// let currentIndex = 0;
//
// let slideInterval;
//
// function populateSlide(index) {
//   const slide = slides[index];
//
//   const titleEl = document.getElementById('slideTitle');
//   const descEl = document.getElementById('slideDescription');
//   const leftImg = document.getElementById('leftImage');
//   const rightImg = document.getElementById('rightImage');
//   const centerContent = document.querySelector('.center-content');
//   const root = "./assets/images/"
//   // Remove active classes for transition out
//   // leftImg.classList.remove('left-image--active');
//   // rightImg.classList.remove('right-image--active');
//   // document.getElementById("slideDescription").classList.remove('p--active');
//   // document.getElementById("slideTitle").classList.remove('h2--active');
//   //
//   // setTimeout(() => {
//     document.getElementById('slideTitle').textContent = slide.name;
//     document.getElementById('slideDescription').textContent = slide.review;
//     document.getElementById('leftImage').src = root + slide.leftImage;
//     document.getElementById('rightImage').src = root + slide.rightImage;
//     document.getElementById('logo-ss').src = root + slide.logo;
//   //
//   //   // Trigger transition in
//   //   leftImg.classList.add('left-image--active');
//   //   rightImg.classList.add('right-image--active');
//   //   document.getElementById("slideDescription").classList.add('p--active');
//   //   document.getElementById("slideTitle").classList.add('h2--active');
//   //
//   // }, 300);
// }
//
// function nextSlide() {
//   currentIndex = (currentIndex + 1) % slides.length;
//   if(currentIndex > slides.length){
//     currentIndex = 0;
//   }
//   populateSlide(currentIndex);
//   resetInterval();
// }
//
// function prevSlide() {
//   currentIndex = (currentIndex - 1 + slides.length) % slides.length;
//   if(currentIndex < 0){
//     currentIndex = slides.length - 1;
//   }
//   populateSlide(currentIndex);
//   resetInterval();
// }
//
// function resetInterval() {
//   clearInterval(slideInterval);
//   slideInterval = setInterval(nextSlide, 5000);
// }
//
// // Attach click events
// document.getElementById('nextSlide').addEventListener('click', nextSlide);
// document.getElementById('prevSlide').addEventListener('click', prevSlide);
//
// // Start it off
// // populateSlide(currentIndex);
//
// // slideInterval = setInterval(nextSlide, 5000);
//
//
// // function populateSlide(index) {
// //   const slide = slides[index];
// //   const root = "./assets/images/"
// //   document.getElementById('slideTitle').textContent = slide.name;
// //   document.getElementById('slideDescription').textContent = slide.review;
// //   document.getElementById('leftImage').src = root + slide.leftImage;
// //   document.getElementById('rightImage').src = root + slide.rightImage;
// //   document.getElementById('logo-ss').src = root + slide.logo;
// //
// // }
//
// populateSlide(currentIndex);
