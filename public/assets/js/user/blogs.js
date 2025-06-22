axios.get('/api/blogs')
  .then(response => {
    const data = response.data;
    const blogs = data.blogs;
    const blogsContainer = document.getElementById("blogs");
    console.log(blogs)
    blogs.forEach(blog => {
      const card = document.createElement("div");
      card.className = "blog-card";
      card.innerHTML = `
        <img src="/uploads/${blog.coverImage}" alt="${blog.title}">
        <div class="blog-content">
          <div class="blog-title">${blog.title}</div>
          <div class="blog-subtitle">${blog.subtitle}</div>
          <div class="blog-preview">${blog.body.slice(0, 120)}...</div>
        </div>
      `;
      blogsContainer.appendChild(card);
    });
  })
  .catch(error => {
    console.error("Failed to load blogs:", error);
    document.getElementById("blogs").innerHTML = `<p style="color:red;">Failed to load blog posts.</p>`;
  });
