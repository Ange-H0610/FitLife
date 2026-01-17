/* ================================
   FITLIFE — SCRIPT PRINCIPAL
   CLEAN & SAFE (NO LINK BLOCK)
================================ */

// ===== MENU BURGER RESPONSIVE =====
document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menuToggle");
  const navMenu = document.getElementById("navMenu");

  if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
      navMenu.classList.toggle("active");
      document.body.classList.toggle("menu-open");
    });

    // Fermer menu après clic lien
    navMenu.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("active");
        document.body.classList.remove("menu-open");
      });
    });
  }
});

// ===== CONTACT FORM (FRONT-END) =====
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("contactName").value.trim();
    const email = document.getElementById("contactEmail").value.trim();
    const message = document.getElementById("contactMessage").value.trim();

    if (!name || !email || !message) {
      formStatus.style.color = "#ef4444";
      formStatus.textContent = "Veuillez remplir tous les champs.";
      return;
    }

    // Simulation envoi (frontend only)
    formStatus.style.color = "#22c55e";
    formStatus.textContent = "Message envoyé avec succès ✅";

    contactForm.reset();
  });
}
