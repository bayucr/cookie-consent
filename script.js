const COOKIE_NAME = "cookie_consent";
const MAX_AGE = 60 * 60 * 24 * 365; // 1 tahun dalam detik

// ---------- Ambil elemen ----------
const banner = document.querySelector("#cookie-banner");
const settingsPanel = document.querySelector("#cookie-settings");
const acceptBtn = document.querySelector("#accept-btn");
const rejectBtn = document.querySelector("#reject-btn");
const settingsBtn = document.querySelector("#settings-btn");
const saveBtn = document.querySelector("#save-btn");
const prefPreferences = document.querySelector("#pref-preferences");
const prefAnalytics = document.querySelector("#pref-analytics");
const prefMarketing = document.querySelector("#pref-marketing");

// ---------- Fungsi bantu cookie ----------
function setCookie(name, value, maxAge) {
  document.cookie = `${name}=${encodeURIComponent(value)}; max-age=${maxAge}; path=/; SameSite=Lax`;
}

function getCookie(name) {
  const cookies = document.cookie.split("; ");
  for (const cookie of cookies) {
    const [key, value] = cookie.split("=");
    if (key === name) return decodeURIComponent(value);
  }
  return null;
}

// ---------- Fungsi consent ----------
function getConsent() {
  const saved = getCookie(COOKIE_NAME);
  if (!saved) return null;
  try {
    return JSON.parse(saved);
  } catch {
    return null; // cookie rusak, anggap belum ada
  }
}

function applyConsent(consent) {
  // Di website sungguhan, di sinilah script pihak ketiga dimuat.
  if (consent.preferences) console.log("✅ Preferences aktif");
  if (consent.analytics)
    console.log("✅ Analytics aktif (misal: muat Google Analytics)");
  if (consent.marketing)
    console.log("✅ Marketing aktif (misal: muat Meta Pixel)");
}

function saveConsent(consent) {
  setCookie(COOKIE_NAME, JSON.stringify(consent), MAX_AGE);
  banner.classList.add("hidden");
  applyConsent(consent);
}

// ---------- Event listener ----------
acceptBtn.addEventListener("click", function () {
  saveConsent({
    necessary: true,
    preferences: true,
    analytics: true,
    marketing: true,
  });
});

rejectBtn.addEventListener("click", function () {
  saveConsent({
    necessary: true,
    preferences: false,
    analytics: false,
    marketing: false,
  });
});

settingsBtn.addEventListener("click", function () {
  settingsPanel.classList.toggle("hidden");
});

saveBtn.addEventListener("click", function () {
  saveConsent({
    necessary: true,
    preferences: prefPreferences.checked,
    analytics: prefAnalytics.checked,
    marketing: prefMarketing.checked,
  });
});

// ---------- Saat halaman dibuka ----------
const existingConsent = getConsent();
if (existingConsent) {
  banner.classList.add("hidden");
  applyConsent(existingConsent);
}
