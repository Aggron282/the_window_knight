// function InitForm(btn_query,form_query){
//
//   var btn = document.querySelector(btn_query);
//   var form = document.querySelector(form_query);
//
//   btn.addEventListener("click",async (e)=>{
//
//     e.preventDefault();
//
//     var form_data = CreateFormData(form);
//
//     var {data} = await axios.post("/admin/subscribe_user", form_data);
//
//     if(data.feedback){
//       ToggleModal(true)
//     }
//
//   });
//
//   form.addEventListener("submit",async (e)=>{
//       e.preventDefault();
//
//       var form_data = CreateFormData(form);
//
//       var {data} = await axios.post("/admin/subscribe_user", form_data);
//
//       if(data.feedback){
//         ToggleModal(true)
//       }
//
//   });
//
//
//
// }
