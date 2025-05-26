async function handleLogin() {
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();
  const overlay = document.getElementById('loginOverlay');
  const errorPopup = document.getElementById('errorPopup');

  overlay.classList.add('active');

  try{
  var {data} = await axios.post("/auth/login",{username:username,key:password});
  console.log(data);
  if(data.err){
    console.log(data.err);
    alert("Cannot Login");
    overlay.classList.remove("active");
  }else{
    overlay.classList.remove("active");
    window.location.assign("/admin");
  }
}catch(err){
  console.log(err);
  alert("Cannot Login");
  overlay.classList.remove('active');

}

}
