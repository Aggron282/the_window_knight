let currentStep = 1;
const totalSteps = 4;

function nextStep(step) {
  const current = document.querySelector(`.step[data-step='${step}']`);
  const inputs = current.querySelectorAll("input, select");
  for (let input of inputs) {
    if (!input.value) {
      alert("Please fill out all fields.");
      return;
    }
  }
  current.classList.remove("active");
  currentStep++;
  document.querySelector(`.step[data-step='${currentStep}']`).classList.add("active");
  document.getElementById("progress").style.width = `${(currentStep - 1) / (totalSteps - 1) * 100}%`;
}

document.getElementById("quoteForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const loader = document.getElementById("loader");
  const successContainer = document.getElementById("success");
  const formData = {
  name: document.getElementById("userName").value,
  email: document.getElementById("userEmail").value,
  phone: document.getElementById("userPhone").value,
  screenCount: document.getElementById("screenCount").value,
  largePanes: document.getElementById("largePanes").value,
  mediumPanes: document.getElementById("mediumPanes").value,
  smallPanes: document.getElementById("smallPanes").value,
  secondStory: document.getElementById("secondStory").value,
  includeInterior: document.getElementById("interiorExterior").value,
  deepTrackClean: document.getElementById("deepTracks").value,
  address: document.getElementById("address").value
};

  loader.style.display = "flex";

  axios.post("/api/quoter", formData)
    .then(res => {
      loader.style.display = "none";
      if (res.data.success) {
        successContainer.style.display = "flex";
        setTimeout(() => window.location.href = "/", 3000);
      } else {
        throw new Error("Invalid server response");
      }
    })
    .catch(err => {
      loader.style.display = "none";
      const popup = document.createElement("div");
      popup.classList.add("error-popup");
      popup.innerText = err.response?.data?.message || "Something went wrong.";
      document.body.appendChild(popup);
      setTimeout(() => popup.remove(), 3000);
    });
});
