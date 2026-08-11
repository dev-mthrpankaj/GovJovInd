(function () {
  "use strict";

  function fixTypingChromePaths() {
    const logoImg = document.querySelector("header .logo-img");
    const logoLink = document.querySelector("header .logo");
    const homeLinks = document.querySelectorAll('header a[href="index.html"], header a[href="Assets/Home%20Page/favicon-96x96.png"]');

    if (logoImg) {
      logoImg.src = "../Assets/Home%20Page/favicon-96x96.png";
      logoImg.onerror = function () {
        this.onerror = null;
        this.src = "../Assets/Home%20Page/favicon-32x32.png";
      };
    }

    if (logoLink) logoLink.href = "../index.html";

    homeLinks.forEach((link) => {
      if (link.classList.contains("logo") || /index\.html$/i.test(link.getAttribute("href") || "")) {
        link.href = "../index.html";
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", fixTypingChromePaths);
  } else {
    fixTypingChromePaths();
  }

  window.addEventListener("pageshow", fixTypingChromePaths);
})();
