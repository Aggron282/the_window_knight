function InitForm(btn_query,form_query){
  console.log(btn_query,form_query)
  var btn = document.querySelector(btn_query);
  var form = document.querySelector(form_query);

  btn.addEventListener("click",(e)=>{
      e.preventDefault(true);
      ToggleModal(true)
  });

  form.addEventListener("submit",(e)=>{
      e.preventDefault();
      ToggleModal(true)
  });

}
