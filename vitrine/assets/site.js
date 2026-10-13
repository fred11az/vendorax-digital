const header = document.querySelector(".site-header");
const menu = document.querySelector(".menu");
const copy = document.body.dataset;
const labelMenu = copy.menu || "Menu";
const labelClose = copy.close || "Fermer";
menu.addEventListener("click", () => {
  const open = header.classList.toggle("is-open");
  menu.setAttribute("aria-expanded", open ? "true" : "false");
  menu.textContent = open ? labelClose : labelMenu;
});
document.querySelectorAll("#nav a").forEach((a) => {
  a.addEventListener("click", () => {
    header.classList.remove("is-open");
    menu.setAttribute("aria-expanded", "false");
    menu.textContent = labelMenu;
  });
});

document.querySelectorAll(".filters button").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".filters button").forEach((b) => b.classList.remove("on"));
    button.classList.add("on");
    const kind = button.dataset.filter;
    document.querySelectorAll(".gallery figure").forEach((figure) => {
      figure.classList.toggle("is-hidden", kind !== "tous" && figure.dataset.kind !== kind);
    });
  });
});

const lang = document.getElementById("lang");
if (lang) {
  lang.addEventListener("change", () => {
    const code = lang.selectedOptions[0].dataset.code;
    document.cookie = "vxlang=" + code + ";path=/;max-age=31536000;SameSite=Lax";
    location.href = lang.value;
  });
}

const form = document.getElementById("projet");
const error = document.getElementById("form-error");
const hint = document.getElementById("form-hint");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  error.textContent = "";
  hint.textContent = "";
  if (form.site.value) return;
  const nom = form.nom.value.trim();
  const email = form.email.value.trim();
  const service = form.service.value;
  const message = form.message.value.trim();
  if (!nom || !email || !service || !message || !form.email.checkValidity()) {
    error.textContent = copy.err || "Indiquez votre nom, un e-mail valide, un service et une description.";
    return;
  }
  const body = [
    "Nom : " + nom,
    "Entreprise : " + form.entreprise.value.trim(),
    "E-mail : " + email,
    "Téléphone : " + form.telephone.value.trim(),
    "Service : " + service,
    "Budget : " + form.budget.value.trim(),
    "",
    message
  ].join("\n");
  hint.textContent = copy.hint || "Votre messagerie va s’ouvrir. Le message part vers contact@vendoraxdigital.com.";
  window.location.href = "mailto:contact@vendoraxdigital.com?subject=" + encodeURIComponent(copy.subject || "Projet Vendorax Digital") + "&body=" + encodeURIComponent(body);
});
