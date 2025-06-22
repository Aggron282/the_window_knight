let fireworks;

const subscribe_button = document.querySelector(".subscribe-btn");
const form_element = document.querySelector("#subscribe--contact");

subscribe_button.addEventListener("click", SubmitSubscription);
form_element.addEventListener("submit", SubmitSubscription);

async function SubmitSubscription(e) {
  e.preventDefault();

  const form_data = new FormData(form_element);
  const form_obj = Object.fromEntries(form_data.entries());

  try {
    const { data } = await axios.post("/api/subscribe", form_obj);
    console.log(data);
    if (!data.err) {
      showThankYouModal();
    } else {
      console.error(data.err);
      alert("Could not submit request at this moment");
    }
  } catch (err) {
    console.error(err);
    alert("Could not submit request at this moment");
  }
}

function showThankYouModal() {
  const modal = document.getElementById('thankYouModal');
  modal.classList.add('show');
  modal.classList.remove('hidden');

  // const container = document.getElementById('fireworksContainer');
  // fireworks = new Fireworks(container, {
  //   rocketsPoint: { min: 0.3, max: 0.7 },
  //   intensity: 20,
  //   sound: { enabled: false },
  // });
  // fireworks.start();
}

function closeThankYouModal() {
  const modal = document.getElementById('thankYouModal');
  modal.classList.remove('show');
  modal.classList.add('hidden');
  if (fireworks) {
    fireworks.stop();
  }
}
