const banner = document.querySelector("#cookie-banner");
const acceptBtn = document.querySelector("#accept-btn");

// Saat halaman dibuka: cek apakah pengguna sudah pernah menerima
if (localStorage.getItem("cookieConsent") === "accepted") {
  banner.classList.add("hidden");
}

// Saat tombol diklik: simpan pilihan, lalu sembunyikan popup
acceptBtn.addEventListener("click", function () {
  localStorage.setItem("cookieConsent", "accepted");
  banner.classList.add("hidden");
});
