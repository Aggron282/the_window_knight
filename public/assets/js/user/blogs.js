axios.get('/api/blogs')
  .then(response => {
    const data = response.data;
    const blogs = data.blogs;
    const blogsContainer = document.getElementById("blogs");


    blogs.forEach(blog => {
      const card = document.createElement("div");
      card.className = "blog-card";
      card.setAttribute("_id",blog._id);
      card.innerHTML = `
        <img src="/uploads/${blog.coverImage}" alt="${blog.title}" _id = ${blog._id}>
        <div class="blog-content" _id = ${blog._id}>
          <div class="blog-title" _id = ${blog._id}>${blog.title}</div>
          <div class="blog-subtitle" _id = ${blog._id}>${blog.subtitle}</div>
          <div class="blog-preview" _id = ${blog._id}>${blog.body.slice(0, 120)}...</div>
        </div>
      `;

      card.addEventListener("click",(e)=>{
          var target = e.target;
          var _id = target.getAttribute("_id");
          console.log(_id)
          window.open(`/blog/${_id}`);
      });

      blogsContainer.appendChild(card);

    });

  })
  .catch(error => {
    console.error("Failed to load blogs:", error);
    document.getElementById("blogs").innerHTML = `<p style="color:red;">Failed to load blog posts.</p>`;
  });
