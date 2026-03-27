const revealItems = document.querySelectorAll("[data-reveal]");
const menuToggle = document.querySelector(".menu-toggle");
const navPanel = document.querySelector("#nav-panel");
const navLinks = document.querySelectorAll(".nav-links a");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.16,
      rootMargin: "0px 0px -40px 0px",
    },
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

const setNavState = (isOpen) => {
  if (!menuToggle || !navPanel) return;

  menuToggle.setAttribute("aria-expanded", String(isOpen));
  document.body.classList.toggle("nav-open", isOpen);
};

if (menuToggle && navPanel) {
  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    setNavState(!isOpen);
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => setNavState(false));
  });

  document.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof Node)) return;
    if (menuToggle.contains(target) || navPanel.contains(target)) return;
    setNavState(false);
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 820) {
      setNavState(false);
    }
  });

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      setNavState(false);
    }
  });
}

const enquiryForm = document.querySelector("#enquiry-form");

if (enquiryForm) {
  enquiryForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.querySelector("#name")?.value.trim() ?? "";
    const phone = document.querySelector("#phone")?.value.trim() ?? "";
    const message = document.querySelector("#message")?.value.trim() ?? "";

    const whatsappMessage = [
      "Hello Crystal Clear,",
      "",
      `Name: ${name}`,
      `Phone: ${phone}`,
      `Requirement: ${message}`,
    ].join("\n");

    const url = `https://wa.me/917892045190?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  });
}

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js").catch(() => {
      // Ignore registration failures in unsupported or local file contexts.
    });
  });
}
