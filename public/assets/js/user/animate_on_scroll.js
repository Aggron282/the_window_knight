function animate_elements(element, ani_class,time) {
  console.log(element,ani_class,time);
  const observer = new IntersectionObserver((entries) => {

    entries.forEach((entry) => {

      if (entry.isIntersecting) {
        setTimeout(()=>{
        entry.target.classList.add(ani_class);
      },time)
      }

    });

  });

  observer.observe(element, ani_class);

}
