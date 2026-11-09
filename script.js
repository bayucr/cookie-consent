const banner = document.querySelector("#cookie-banner");
const acceptBtn = document.querySelector("#accept-btn");

acceptBtn.addEventListener("click", function () {
  banner.classList.add("hidden");
});
