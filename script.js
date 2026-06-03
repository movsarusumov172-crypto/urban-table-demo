const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");

if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    document.body.classList.toggle("menu-open", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      document.body.classList.remove("menu-open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

const filterButtons = document.querySelectorAll("[data-filter]");
const dishes = document.querySelectorAll("[data-category]");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;

    filterButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");

    dishes.forEach((dish) => {
      const shouldShow = filter === "all" || dish.dataset.category === filter;
      dish.hidden = !shouldShow;
    });
  });
});

document.querySelectorAll(".faq-question").forEach((button) => {
  button.addEventListener("click", () => {
    button.closest(".faq-item").classList.toggle("open");
  });
});

document.querySelectorAll(".request-form").forEach((form) => {
  const deliveryButton = form.querySelector(".delivery-toggle");
  const addressField = form.querySelector(".address-field");
  const addressInput = addressField?.querySelector("input");
  const status = form.querySelector(".form-status");

  deliveryButton?.addEventListener("click", () => {
    const isOpen = addressField.hasAttribute("hidden");
    addressField.hidden = !isOpen;
    deliveryButton.classList.toggle("active", isOpen);
    deliveryButton.setAttribute("aria-expanded", String(isOpen));

    if (addressInput) {
      addressInput.required = isOpen;
      if (isOpen) addressInput.focus();
      if (!isOpen) addressInput.value = "";
    }
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (status) status.textContent = "Заявка принята. Мы свяжемся с вами в ближайшее время.";
    form.reset();
    addressField.hidden = true;
    deliveryButton.classList.remove("active");
    deliveryButton.setAttribute("aria-expanded", "false");
    if (addressInput) addressInput.required = false;
  });
});
