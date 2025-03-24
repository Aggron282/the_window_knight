const btn = document.getElementById('cleanBtn');
const label = document.getElementById('label');
const afterImages = document.querySelectorAll('.after');
const beforeImages = document.querySelectorAll('.before');

let isBefore = true;

btn.addEventListener('click', () => {
  // Animate label out
  label.style.transform = 'rotateX(90deg)';
  label.style.opacity = '0';

  setTimeout(() => {
    // Toggle label text
    var d = !isBefore ? 'after' : 'before';
    var b = isBefore ? 'after' : 'before';

    label.classList.remove(`label--${b}`);
    label.classList.add(`label--${d}`);
    label.style.transform = 'rotateX(0deg)';
    label.style.opacity = '1';
  }, 600);
  isBefore = !isBefore;

  if (!isBefore) {
    // Show AFTER images
    afterImages.forEach((img, i) => {
      setTimeout(() => {
        img.style.opacity = '1';
        img.style.transform = 'translateY(0)';
      }, i * 150);
    });

    // Hide BEFORE images
    beforeImages.forEach(img => {
      img.style.opacity = '0';
      img.style.transform = 'translateY(50px)';
    });

    btn.innerHTML = "See Before";
    btn.classList.remove("clean-btn--before");
    btn.classList.add("clean-btn--after");
  } else {
    // Show BEFORE images
    beforeImages.forEach((img, i) => {
      setTimeout(() => {
        img.style.opacity = '1';
        img.style.transform = 'translateY(0)';
      }, i * 150);
    });

    // Hide AFTER images
    afterImages.forEach(img => {
      img.style.opacity = '0';
      img.style.transform = 'translateY(50px)';
    });

    btn.innerHTML = "Clean Me!";
    btn.classList.remove("clean-btn--after");
    btn.classList.add("clean-btn--before");
  }

});
