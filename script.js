const revealItems = document.querySelectorAll("[data-reveal]");

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
