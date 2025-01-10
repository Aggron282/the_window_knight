const images = [
  'photo_1.png',
  'photo_2.png',
  'what_we_do_4.png',
  'what_we_do_3.png',
  'what_we_do_2.png',
  'photo_3.png',
  'photo_4.png',
  'frrr.jpg',
  'knight_clean--3.png',
  'what_we_do_1.png',
  'after_1.png',
  'what_we_do_new.png',
  'knight_clean--1.png',
];

// Get the gallery container
const gallery = document.getElementById('gallery');

// Check if layout is saved in local storage
let savedLayout = localStorage.getItem('galleryLayout');
// savedLayout = null; // Remove this line to enable persistent layout

if (savedLayout) {
  // Load the saved layout
  savedLayout = JSON.parse(savedLayout);
} else {
  // Generate a new layout
  savedLayout = images.map(image => {
    // Generate consistent proportions for row and column spans
    const rowSpan = Math.floor(Math.random() * 2) + 2; // 1 or 2
    const colSpan = rowSpan === 1 ? 1 : 2; // Maintain proportionality

    return {
      image,
      rowSpan,
      colSpan,
    };
  });

  // Save the layout to local storage
  localStorage.setItem('galleryLayout', JSON.stringify(savedLayout));
}

// Render the gallery items
savedLayout.forEach(item => {
  const galleryItem = document.createElement('div');
  galleryItem.classList.add('gallery-item');
  galleryItem.style.backgroundImage = `url('./assets/images/${item.image}')`;
  galleryItem.style.gridRow = `span ${item.rowSpan}`;
  galleryItem.style.gridColumn = `span ${item.colSpan}`;
  gallery.appendChild(galleryItem);
});
