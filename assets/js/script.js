/* ===== SETTINGS YOU MAY EDIT ===== */
const SITE = {
  name: "Rayglobal Digital World",
  whatsapp: "2349064326182",
  showForex: true,
  phone: "+2349064326182",
  email: "rayglobaldigitalworld@gmail.com",
  street: "No 3 Old UNTH Road",
  city: "Enugu",
  region: "Enugu State",
  country: "NG"
};

document.addEventListener("DOMContentLoaded", () => {
  const wa = (text) => "https://wa.me/" + SITE.whatsapp + "?text=" + encodeURIComponent(text);

  // FIXED: Remove .no-js (added in HTML) and add .js-ready
  document.documentElement.classList.remove("no-js");
  document.documentElement.classList.add("js-ready");

  // Set year
  document.querySelectorAll("[data-year]").forEach(e => e.textContent = new Date().getFullYear());

  // Toggle Forex
  if (SITE.showForex) document.querySelectorAll("[data-fx]").forEach(e => e.hidden = false);

  // Mobile menu
  const btn = document.querySelector(".menu-btn"), nav = document.getElementById("nav");
  if (btn && nav) {
    const setMenu = (open) => { nav.classList.toggle("open", open); btn.setAttribute("aria-expanded", open); };
    btn.addEventListener("click", () => setMenu(!nav.classList.contains("open")));
    document.addEventListener("keydown", e => {
      if (e.key === "Escape" && nav.classList.contains("open")) { setMenu(false); btn.focus(); }
    });
    nav.addEventListener("click", e => { if (e.target.tagName === "A") setMenu(false); });
  }

  // WhatsApp links (with service prefill)
  document.querySelectorAll("a[data-wa]").forEach(a => {
    const s = a.dataset.service;
    a.href = wa(s
      ? "Hello " + SITE.name + ", I would like to enquire about your " + s + " service. Please let me know the requirements and pricing."
      : "Hello " + SITE.name + ", I would like to make an enquiry.");
    a.target = "_blank";
    a.rel = "noopener noreferrer";
  });

  // Animations (progressive enhancement)
  if ("IntersectionObserver" in window) {
    const observerOptions = { threshold: 0.15, rootMargin: "0px 0px -10% 0px" };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(en => {
        if (en.isIntersecting) {
          en.target.classList.add("is-visible");
          observer.unobserve(en.target);
        }
      });
    }, observerOptions);

    document.querySelectorAll(".services-grid .card.reveal, .reveal-step, .reveal-about").forEach(el => {
      observer.observe(el);
    });
  }

  // Enquiry form
  const f = document.getElementById("enq");
  if (!f) return;
  const err = (id, msg) => {
    const el = document.getElementById("e-" + id), inp = document.getElementById(id);
    el.textContent = msg;
    inp.setAttribute("aria-invalid", msg ? "true" : "false");
    if (msg) inp.setAttribute("aria-describedby", "e-" + id);
    return !msg;
  };
  f.addEventListener("submit", e => {
    e.preventDefault();
    const v = id => f.elements[id].value.trim();
    const ok = [
      err("name", v("name") ? "" : "Enter your full name."),
      err("email", !v("email") || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v("email")) ? "" : "Enter a valid email address, or leave it blank."),
      err("service", v("service") ? "" : "Choose a service."),
      err("msg", v("msg").length >= 10 ? "" : "Describe your request in at least 10 characters.")
    ].every(Boolean);
    if (!ok) { f.querySelector("[aria-invalid=true]").focus(); return; }

    const text = "Hello " + SITE.name + ", my name is " + v("name") +
      ". I would like to enquire about: " + v("service") + ".\n\n" + v("msg") +
      "\n\nPreferred contact: " + v("pref") + (v("email") ? "\nEmail: " + v("email") : "");
    const ok_el = document.getElementById("ok");

    // FIXED: window.open returns WindowProxy|null. Popup blocked = null.
    let w = null;
    try { w = window.open(wa(text), "_blank", "noopener"); } catch { w = null; }

    if (!w) {
      ok_el.textContent = "Could not open WhatsApp automatically. Tap any WhatsApp button on this page, or message us directly on " + SITE.phone + ".";
      ok_el.style.color = "#B42318";
    } else {
      f.reset();
      ok_el.style.color = "";
      ok_el.textContent = "WhatsApp is opening with your message. Please review and press Send there to deliver it.";
    }
  });
});