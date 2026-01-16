let poidsData = JSON.parse(localStorage.getItem("poidsData")) || [];

function sauverProfil() {
  const profil = {
    nom: nom.value,
    age: age.value,
    taille: taille.value
  };
  localStorage.setItem("profil", JSON.stringify(profil));
  alert("Profil sauvegardé");
}

function calculIMC() {
  const poids = parseFloat(document.getElementById("poids").value);
  const taille = JSON.parse(localStorage.getItem("profil"))?.taille / 100;
  if (!poids || !taille) return;

  const imc = (poids / (taille * taille)).toFixed(1);
  imcResult.textContent = "IMC: " + imc;
}

function ajouterPoids() {
  const date = datePoids.value;
  const poids = poidsJour.value;
  if (!date || !poids) return;

  poidsData.push({ date, poids });
  localStorage.setItem("poidsData", JSON.stringify(poidsData));
  afficherPoids();
}

function afficherPoids() {
  listePoids.innerHTML = "";
  poidsData.forEach(p => {
    const li = document.createElement("li");
    li.textContent = `${p.date} : ${p.poids} kg`;
    listePoids.appendChild(li);
  });
}

if (document.getElementById("poidsJour")) {
  afficherPoids();
}

// Scroll intelligent pour CTA
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});
// ===== MENU BURGER RESPONSIVE =====
document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menuToggle");
  const navMenu = document.getElementById("navMenu");

  if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
      navMenu.classList.toggle("active");
      document.body.classList.toggle("menu-open");
    });

    // Fermer le menu après clic sur un lien
    navMenu.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("active");
        document.body.classList.remove("menu-open");
      });
    });
  }
});
// ===== FORMULAIRE CONTACT =====
const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", function(e) {
    e.preventDefault(); // Empêche le rechargement de page

    // Récupère les valeurs
    const name = document.getElementById("contactName").value.trim();
    const email = document.getElementById("contactEmail").value.trim();
    const message = document.getElementById("contactMessage").value.trim();

    // Vérification simple
    if (!name || !email || !message) {
      alert("Merci de remplir tous les champs.");
      return;
    }

    // Ici tu peux envoyer les données à un serveur si tu veux (AJAX/fetch)
    // Pour l’instant, on simule juste l’envoi
    alert(`Merci ${name}, votre message a été envoyé !`);

    // Reset du formulaire
    contactForm.reset();
  });
}
