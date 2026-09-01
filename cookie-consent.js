/*!
 * Maccor Cookie Consent
 * ---------------------------------------------------------------------------
 * Lightweight, dependency-free consent banner that matches the Maccor site.
 *
 * The Site uses strictly-necessary cookies plus Google Analytics. Google
 * Analytics is gated behind consent using the API below: it loads ONLY after
 * the visitor accepts, and never if they decline. Any additional analytics or
 * marketing script must be gated the same way (see MaccorConsent.onAccept).
 *
 * HOW TO ADD ANALYTICS LATER (example, Google Analytics):
 *   MaccorConsent.onAccept(function () {
 *     var s = document.createElement('script');
 *     s.async = true;
 *     s.src = 'https://www.googletagmanager.com/gtag/js?id=G-XXXXXXX';
 *     document.head.appendChild(s);
 *     window.dataLayer = window.dataLayer || [];
 *     function gtag(){ dataLayer.push(arguments); }
 *     gtag('js', new Date());
 *     gtag('config', 'G-XXXXXXX');
 *   });
 *
 * PUBLIC API (window.MaccorConsent):
 *   .status()            -> 'accepted' | 'rejected' | null (not yet chosen)
 *   .hasConsent()        -> true only if analytics/optional cookies accepted
 *   .onAccept(fn)        -> run fn now if already accepted, and on future accept
 *   .accept() / .reject()-> programmatically set the choice
 *   .reset()             -> clear the choice and show the banner again
 *
 * USAGE: add ONE line before </body> on each page. Set the privacy path to
 * match the page's depth relative to the site root:
 *   root pages:            <script src="cookie-consent.js" data-privacy="privacy.html"></script>
 *   /software/ pages:      <script src="../cookie-consent.js" data-privacy="../privacy.html"></script>
 *   KC subpages (2 deep):  <script src="../../cookie-consent.js" data-privacy="../../privacy.html"></script>
 * If data-privacy is omitted it defaults to "privacy.html".
 * ---------------------------------------------------------------------------
 */
(function () {
  "use strict";

  var STORAGE_KEY = "maccor_cookie_consent";     // 'accepted' | 'rejected'
  var STORAGE_TS_KEY = "maccor_cookie_consent_ts";
  var MAX_AGE_DAYS = 180;                         // re-ask after ~6 months (EU best practice)
  var acceptCallbacks = [];

  // Resolve the privacy link path from the script tag's data attribute.
  function privacyHref() {
    var el = document.currentScript ||
      (function () {
        var s = document.querySelectorAll('script[src*="cookie-consent.js"]');
        return s.length ? s[s.length - 1] : null;
      })();
    return (el && el.getAttribute("data-privacy")) || "privacy.html";
  }
  var PRIVACY_HREF = privacyHref();

  function read() {
    try {
      var val = localStorage.getItem(STORAGE_KEY);
      if (!val) return null;
      // Expire the stored choice after MAX_AGE_DAYS so we re-ask (GDPR best practice).
      var ts = localStorage.getItem(STORAGE_TS_KEY);
      if (ts) {
        var ageMs = Date.now() - new Date(ts).getTime();
        if (ageMs > MAX_AGE_DAYS * 864e5) {
          localStorage.removeItem(STORAGE_KEY);
          localStorage.removeItem(STORAGE_TS_KEY);
          return null;
        }
      }
      return val;
    } catch (e) { return null; }
  }
  function write(val) {
    try {
      localStorage.setItem(STORAGE_KEY, val);
      localStorage.setItem(STORAGE_TS_KEY, new Date().toISOString());
    } catch (e) { /* storage unavailable; banner will simply reappear */ }
  }

  function runAcceptCallbacks() {
    while (acceptCallbacks.length) {
      var fn = acceptCallbacks.shift();
      try { fn(); } catch (e) { /* keep going */ }
    }
  }

  // ---- Public API --------------------------------------------------------
  var API = {
    status: function () { return read(); },
    hasConsent: function () { return read() === "accepted"; },
    onAccept: function (fn) {
      if (typeof fn !== "function") return;
      if (read() === "accepted") { try { fn(); } catch (e) {} }
      else { acceptCallbacks.push(fn); }
    },
    accept: function () {
      write("accepted");
      hideBanner();
      runAcceptCallbacks();
      document.dispatchEvent(new CustomEvent("maccor:consent", { detail: "accepted" }));
    },
    reject: function () {
      write("rejected");
      hideBanner();
      document.dispatchEvent(new CustomEvent("maccor:consent", { detail: "rejected" }));
    },
    reset: function () {
      try {
        localStorage.removeItem(STORAGE_KEY);
        localStorage.removeItem(STORAGE_TS_KEY);
      } catch (e) {}
      showBanner();
    }
  };
  window.MaccorConsent = API;

  // ---- Styles (injected; uses site CSS variables with safe fallbacks) ----
  var CSS =
    '.mcc-banner{position:fixed;left:1rem;right:1rem;bottom:1rem;z-index:1000;' +
    'max-width:760px;margin:0 auto;background:rgba(16,20,32,.97);' +
    'border:1px solid rgba(0,217,255,.18);border-radius:14px;' +
    'box-shadow:0 18px 50px rgba(0,0,0,.55);backdrop-filter:blur(12px);' +
    '-webkit-backdrop-filter:blur(12px);color:var(--light-grey,#CBD5E1);' +
    "font-family:'Barlow',system-ui,-apple-system,Segoe UI,Roboto,sans-serif;" +
    'padding:1.35rem 1.5rem;transform:translateY(140%);opacity:0;' +
    'transition:transform .45s cubic-bezier(.16,1,.3,1),opacity .45s ease;}' +
    '.mcc-banner.mcc-show{transform:translateY(0);opacity:1;}' +
    '.mcc-inner{display:flex;gap:1.25rem;align-items:center;flex-wrap:wrap;}' +
    '.mcc-text{flex:1 1 320px;min-width:260px;font-weight:300;font-size:.95rem;line-height:1.6;}' +
    '.mcc-text strong{display:block;color:var(--off-white,#F8FAFC);font-weight:600;' +
    'font-size:1.02rem;margin-bottom:.3rem;letter-spacing:-.01em;}' +
    '.mcc-text a{color:var(--bright-cyan,#00E5FF);text-decoration:none;}' +
    '.mcc-text a:hover{text-decoration:underline;}' +
    '.mcc-actions{display:flex;gap:.6rem;flex:0 0 auto;flex-wrap:wrap;}' +
    '.mcc-btn{font-family:inherit;font-size:.9rem;font-weight:600;cursor:pointer;' +
    'border-radius:999px;padding:.6rem 1.4rem;border:1px solid transparent;' +
    'transition:background .2s ease,border-color .2s ease,color .2s ease,transform .1s ease;}' +
    '.mcc-btn:active{transform:translateY(1px);}' +
    '.mcc-accept{background:var(--primary,#2563EB);color:#fff;}' +
    '.mcc-accept:hover{background:var(--primary-dark,#1D4ED8);}' +
    '.mcc-reject{background:transparent;color:var(--light-grey,#CBD5E1);' +
    'border-color:rgba(139,157,195,.4);}' +
    '.mcc-reject:hover{border-color:var(--accent,#00D9FF);color:var(--off-white,#F8FAFC);}' +
    '.mcc-note{flex-basis:100%;margin-top:.85rem;font-size:.8rem;color:var(--steel-gray,#8B9DC3);' +
    "font-family:'JetBrains Mono',ui-monospace,monospace;letter-spacing:.02em;}" +
    '@media (max-width:640px){.mcc-banner{padding:1.15rem 1.15rem;}' +
    '.mcc-actions{width:100%;}.mcc-btn{flex:1 1 auto;text-align:center;}}' +
    '@media (prefers-reduced-motion:reduce){.mcc-banner{transition:opacity .3s ease;transform:none;}}';

  var bannerEl = null;

  function injectStyles() {
    if (document.getElementById("mcc-styles")) return;
    var st = document.createElement("style");
    st.id = "mcc-styles";
    st.appendChild(document.createTextNode(CSS));
    document.head.appendChild(st);
  }

  function buildBanner() {
    var b = document.createElement("div");
    b.className = "mcc-banner";
    b.setAttribute("role", "dialog");
    b.setAttribute("aria-live", "polite");
    b.setAttribute("aria-label", "Cookie consent");
    b.innerHTML =
      '<div class="mcc-inner">' +
        '<div class="mcc-text">' +
          "<strong>We value your privacy</strong>" +
          "This site uses strictly necessary cookies to function and stay secure, and " +
          "&mdash; only if you accept &mdash; Google Analytics cookies that help us understand " +
          "how the site is used. We do not use advertising or cross-site tracking cookies. See our " +
          '<a href="' + PRIVACY_HREF + '">Privacy Statement</a>.' +
        "</div>" +
        '<div class="mcc-actions">' +
          '<button type="button" class="mcc-btn mcc-reject">Reject Optional</button>' +
          '<button type="button" class="mcc-btn mcc-accept">Accept</button>' +
        "</div>" +
        '<div class="mcc-note">Necessary cookies are always on.</div>' +
      "</div>";

    b.querySelector(".mcc-accept").addEventListener("click", API.accept);
    b.querySelector(".mcc-reject").addEventListener("click", API.reject);
    return b;
  }

  function showBanner() {
    injectStyles();
    if (!bannerEl) {
      bannerEl = buildBanner();
      document.body.appendChild(bannerEl);
    }
    // force reflow so the transition plays
    void bannerEl.offsetWidth;
    requestAnimationFrame(function () {
      bannerEl.classList.add("mcc-show");
    });
  }

  function hideBanner() {
    if (!bannerEl) return;
    bannerEl.classList.remove("mcc-show");
    var el = bannerEl;
    setTimeout(function () { if (el && el.parentNode) el.parentNode.removeChild(el); }, 500);
    bannerEl = null;
  }

  // Any element with [data-cookie-settings] (e.g. a footer "Cookie Settings"
  // link) reopens the banner so visitors can change or withdraw consent —
  // required under GDPR to be as easy as giving consent.
  function wireSettingsLinks() {
    document.addEventListener("click", function (e) {
      var t = e.target;
      while (t && t !== document) {
        if (t.hasAttribute && t.hasAttribute("data-cookie-settings")) {
          e.preventDefault();
          API.reset();
          return;
        }
        t = t.parentNode;
      }
    });
  }

  function init() {
    wireSettingsLinks();
    var choice = read();
    if (choice === "accepted") { runAcceptCallbacks(); return; }
    if (choice === "rejected") { return; }
    showBanner();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
