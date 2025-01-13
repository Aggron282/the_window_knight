const modalWrapper = document.getElementById('modalWrapper');
const closeModalBtn = document.getElementById('closeBtn');
var isModalOn = null


closeModalBtn.addEventListener('click', () => {
  ToggleModal(false)
});

modalWrapper.addEventListener('click', (e) => {
  if (e.target === modalWrapper && isModalOn) {
    ToggleModal(false);
  }
});

function ToggleModal(isOn){
  console.log(isOn)
  isModalOn = isOn;

  if(isOn){
    modalWrapper.classList.add('active');
    document.body.style.overflow = 'hidden';
    InitFireworks();
  }
  else{
    modalWrapper.classList.remove('active');
    document.body.style.overflow = '';
    CancelFireworks();
  }

}
