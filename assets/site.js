/* ============================================================
   EDIT YOUR DETAILS HERE — every page reads from this one place
   ============================================================ */
const SITE = {
  brand: "JAMUI FIT",            // short brand name shown in the logo
  trainerName: "Raaz",
  phone: "918862821060",          // WhatsApp number WITH country code, digits only
  phoneDisplay: "+91 88628 21060",
  email: "kraazft@gmail.com",
  instagram: "https://www.instagram.com/jamuifit/",
  facebook: "https://www.facebook.com/share/1Gr4uFY1y3/",
  address: "Jamui, Bihar – 811307",
  hours: "Mon–Sat · 5:30 AM – 9:00 PM",
  languages: "Hindi & English",
  femaleTrainer: "Female trainer for female clients"
};
/* Hindi versions of the details above (used when the site is switched to हिंदी) */
const SITE_HI = {
  trainerName: "राज़",
  address: "जमुई, बिहार – 811307",
  hours: "सोम–शनि · सुबह 5:30 – रात 9:00",
  languages: "हिंदी और अंग्रेज़ी",
  femaleTrainer: "महिला क्लाइंट के लिए महिला ट्रेनर"
};
/* ============================================================ */

/* ---------- Language (English / हिंदी) ---------- */
let LANG = (() => { try { return localStorage.getItem("lang") === "hi" ? "hi" : "en"; } catch (e) { return "en"; } })();
function t(en, hi){ return LANG === "hi" ? hi : en; }
function site(k){ return (LANG === "hi" && SITE_HI[k]) || SITE[k]; }

/* Swap every element that has a data-hi (innerHTML) or data-hi-ph (placeholder) attribute */
function applyLang(){
  document.documentElement.lang = LANG;
  document.querySelectorAll("[data-hi]").forEach(el => {
    if (el.dataset.en === undefined) el.dataset.en = el.innerHTML;
    el.innerHTML = LANG === "hi" ? el.dataset.hi : el.dataset.en;
  });
  document.querySelectorAll("[data-hi-ph]").forEach(el => {
    if (el.dataset.enPh === undefined) el.dataset.enPh = el.placeholder;
    el.placeholder = LANG === "hi" ? el.dataset.hiPh : el.dataset.enPh;
  });
}

function setLang(l){
  LANG = l;
  try { localStorage.setItem("lang", l); } catch (e) {}
  document.querySelectorAll(".site-header,.site-footer,.wa-float").forEach(e => e.remove());
  buildHeader(); buildFooter(); applyLang(); fillPlaceholders();
  document.dispatchEvent(new Event("langchange"));
}

const WA_ICON = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21c5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2Zm5.8 14.13c-.25.69-1.44 1.32-2 1.36-.51.05-1 .24-3.37-.7-2.84-1.12-4.65-4.03-4.79-4.22-.14-.19-1.15-1.53-1.15-2.92s.73-2.07.99-2.36c.25-.28.55-.35.74-.35l.53.01c.17.01.4-.06.62.48.25.6.85 2.07.92 2.22.08.15.13.32.03.51-.1.19-.15.31-.29.48-.15.17-.31.38-.44.51-.15.15-.3.31-.13.6.17.3.76 1.25 1.63 2.03 1.12 1 2.07 1.31 2.36 1.46.3.15.47.12.64-.07.17-.2.74-.86.94-1.16.2-.3.39-.25.66-.15.27.1 1.72.81 2.01.96.3.15.49.22.57.34.07.13.07.72-.18 1.41Z"/></svg>';

function waLink(msg){
  return "https://wa.me/" + SITE.phone + "?text=" + encodeURIComponent(msg || "Namaste! I found your website and want to know about personal training.");
}

const PAGES = [
  ["index.html","Home","होम"],
  ["services.html","Services","सेवाएँ"],
  ["body-type.html","Body Type","बॉडी टाइप"],
  ["diet.html","Diet Plans","डाइट प्लान"],
  ["about.html","About","मेरे बारे में"]
];

function buildHeader(){
  const here = (location.pathname.split("/").pop() || "index.html");
  const links = PAGES.map(([href,en,hi]) =>
    `<li><a href="${href}" class="${here===href?"active":""}">${t(en,hi)}</a></li>`).join("");
  const h = document.createElement("header");
  h.className = "site-header";
  h.innerHTML = `
    <nav class="nav wrap" aria-label="Main">
      <a class="brand" href="index.html">
        <img class="brand-logo" src="assets/logo.svg" width="40" height="40" alt="">
        <span class="brand-text">${SITE.brand}<small>${t("Personal Training · Jamui","पर्सनल ट्रेनिंग · जमुई")}</small></span>
      </a>
      <ul class="nav-links">${links}
        <li><a href="contact.html" class="nav-cta ${here==="contact.html"?"active":""}">${t("Contact Me","संपर्क करें")}</a></li>
      </ul>
      <div class="nav-tools">
        <div class="lang-toggle" role="group" aria-label="Language / भाषा">
          <button type="button" data-lang="en" aria-pressed="${LANG==="en"}">EN</button>
          <button type="button" data-lang="hi" aria-pressed="${LANG==="hi"}" lang="hi">हिंदी</button>
        </div>
        <button class="menu-btn" aria-label="Open menu" aria-expanded="false">☰</button>
      </div>
    </nav>`;
  document.body.prepend(h);
  const btn = h.querySelector(".menu-btn"), ul = h.querySelector(".nav-links");
  btn.addEventListener("click", () => {
    const open = ul.classList.toggle("open");
    btn.setAttribute("aria-expanded", open);
    btn.textContent = open ? "✕" : "☰";
  });
  h.querySelectorAll("[data-lang]").forEach(b => b.addEventListener("click", () => {
    if (b.dataset.lang !== LANG) setLang(b.dataset.lang);
  }));
}

function buildFooter(){
  const f = document.createElement("footer");
  f.className = "site-footer";
  f.innerHTML = `
    <div class="wrap">
      <div class="foot-grid">
        <div>
          <h4>${SITE.brand}</h4>
          <p>${t("Weight loss, body transformation and diet plans built around your body type and your daily routine. In-person training in Jamui, online coaching anywhere.",
                 "आपके बॉडी टाइप और दिनचर्या के हिसाब से वेट लॉस, बॉडी ट्रांसफ़ॉर्मेशन और डाइट प्लान। जमुई में आमने-सामने ट्रेनिंग, कहीं से भी ऑनलाइन कोचिंग।")}</p>
          <p class="hi" style="margin-top:10px;color:#e8dfd2">आपका शरीर, आपकी दिनचर्या, आपका प्लान।</p>
        </div>
        <div>
          <h4>${t("Pages","पेज")}</h4>
          <ul>${PAGES.map(([h,en,hi])=>`<li><a href="${h}">${t(en,hi)}</a></li>`).join("")}<li><a href="contact.html">${t("Contact","संपर्क")}</a></li></ul>
        </div>
        <div>
          <h4>${t("Reach Me","संपर्क करें")}</h4>
          <ul>
            <li><a href="${waLink()}" target="_blank" rel="noopener">WhatsApp: ${SITE.phoneDisplay}</a></li>
            <li><a href="mailto:${SITE.email}">${SITE.email}</a></li>
            <li><a href="${SITE.instagram}" target="_blank" rel="noopener me">Instagram: @jamuifit</a></li>
            <li><a href="${SITE.facebook}" target="_blank" rel="noopener me">Facebook: Jamui Fit</a></li>
            <li>${site("address")}</li>
            <li>${site("hours")}</li>
            <li>${t("Languages","भाषा")}: ${site("languages")}</li>
            <li>${site("femaleTrainer")}</li>
          </ul>
        </div>
      </div>
      <div class="foot-bottom">
        <span>© ${new Date().getFullYear()} ${SITE.trainerName} · ${SITE.brand}</span>
        <span>${t("Training advice here is general. Please consult a doctor before starting if you have a medical condition.",
                  "यहाँ दी गई ट्रेनिंग सलाह सामान्य है। कोई बीमारी हो तो शुरू करने से पहले डॉक्टर से सलाह लें।")}</span>
      </div>
    </div>`;
  document.body.append(f);

  const wa = document.createElement("a");
  wa.className = "wa-float";
  wa.href = waLink();
  wa.target = "_blank"; wa.rel = "noopener";
  wa.setAttribute("aria-label", t("Chat on WhatsApp","WhatsApp पर बात करें"));
  wa.innerHTML = WA_ICON;
  document.body.append(wa);
}

function fillPlaceholders(){
  document.querySelectorAll("[data-site]").forEach(el => {
    const v = site(el.dataset.site);
    if (v) el.textContent = v;
  });
  document.querySelectorAll("[data-wa]").forEach(el => {
    el.href = waLink(el.dataset.wa || undefined);
    el.target = "_blank"; el.rel = "noopener";
    if (!el.querySelector("svg") && el.classList.contains("btn-wa")) el.insertAdjacentHTML("afterbegin", WA_ICON);
  });
  document.querySelectorAll("[data-tel]").forEach(el => { el.href = "tel:+" + SITE.phone; });
  document.querySelectorAll("[data-mail]").forEach(el => { el.href = "mailto:" + SITE.email; });
  document.querySelectorAll("[data-insta]").forEach(el => { el.href = SITE.instagram; el.target="_blank"; el.rel="noopener"; });
  document.querySelectorAll("[data-fb]").forEach(el => { el.href = SITE.facebook; el.target="_blank"; el.rel="noopener"; });
}

function reveal(){
  const els = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) { els.forEach(e=>e.classList.add("in")); return; }
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting){ e.target.classList.add("in"); io.unobserve(e.target); }
  }), {threshold:.12});
  els.forEach(e => io.observe(e));
}

document.addEventListener("DOMContentLoaded", () => {
  buildHeader(); buildFooter(); applyLang(); fillPlaceholders(); reveal();
});
