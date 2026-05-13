(function () {
  "use strict";

  function fixUpServicesHomeLinks() {
    const isUpServicesPage = /\/HTML\/up-certificate-services\.html$/i.test(window.location.pathname);
    if (!isUpServicesPage) return;

    document.querySelectorAll('a[href="index.html"], a[href="HTML/index.html"], a[href="/HTML/index.html"]').forEach((link) => {
      link.setAttribute("href", "../index.html");
    });

    document.querySelectorAll('header .logo, header nav a').forEach((link) => {
      const text = (link.textContent || "").trim().toLowerCase();
      const href = link.getAttribute("href") || "";
      if (text === "home" || /index\.html$/i.test(href)) {
        link.setAttribute("href", "../index.html");
      }
    });

    document.querySelectorAll('.candidate-bottom-nav a[aria-label="Home"]').forEach((link) => {
      link.setAttribute("href", "../index.html");
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", fixUpServicesHomeLinks);
  } else {
    fixUpServicesHomeLinks();
  }

  window.setTimeout(fixUpServicesHomeLinks, 250);
  window.setTimeout(fixUpServicesHomeLinks, 750);
  window.setTimeout(fixUpServicesHomeLinks, 1500);
}());
