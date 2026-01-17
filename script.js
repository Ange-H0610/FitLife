/* ================================
   FITLIFE — SCRIPT PRINCIPAL
   CONTACT FORM SAFE & LOCALSTORAGE
================================ */

document.addEventListener("DOMContentLoaded", () => {

  // ===== MENU BURGER =====
  const menuToggle = document.getElementById("menuToggle");
  const navMenu = document.getElementById("navMenu");

  if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
      navMenu.classList.toggle("active");
      document.body.classList.toggle("menu-open");
    });

    navMenu.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("active");
        document.body.classList.remove("menu-open");
      });
    });
  }

  // ===== CONTACT FORM =====
  const form = document.getElementById("contactForm");
  const saveBtn = document.getElementById("saveBtn");
  const formStatus = document.getElementById("formStatus");
  const savedMessages = document.getElementById("savedMessages");

  // Fonction pour afficher les messages
  const renderMessages = () => {
    const data = JSON.parse(localStorage.getItem("fitlifeMessages")) || [];
    savedMessages.innerHTML = "";

    data.forEach((msg, index) => {
      const div = document.createElement("div");
      div.classList.add("saved-message");
      div.innerHTML = `
        <strong>${msg.name} - ${msg.email}</strong>
        <p>${msg.message}</p>
        <button class="delete-btn" data-index="${index}">Supprimer</button>
      `;
      savedMessages.appendChild(div);

      // Bouton Supprimer
      const btn = div.querySelector(".delete-btn");
      btn.addEventListener("click", (e) => {
        e.stopPropagation(); // empêche la modification
        const data = JSON.parse(localStorage.getItem("fitlifeMessages")) || [];
        data.splice(index, 1);
        localStorage.setItem("fitlifeMessages", JSON.stringify(data));
        renderMessages(); // rafraîchir la liste
        formStatus.style.color = "#f97316";
        formStatus.textContent = "Message supprimé.";
        setTimeout(() => formStatus.textContent = "", 2500);
      });

      // Cliquer sur le message pour modifier
      div.addEventListener("click", (e) => {
        if (!e.target.classList.contains("delete-btn")) {
          const data = JSON.parse(localStorage.getItem("fitlifeMessages")) || [];
          form.contactName.value = data[index].name;
          form.contactEmail.value = data[index].email;
          form.contactMessage.value = data[index].message;
          formStatus.style.color = "#f97316";
          formStatus.textContent = "Vous pouvez modifier ce message puis re-sauvegarder.";
          setTimeout(() => formStatus.textContent = "", 3500);
        }
      });
    });
  };

  // Charger au début
  renderMessages();

  // Sauvegarder
  saveBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const name = form.contactName.value.trim();
    const email = form.contactEmail.value.trim();
    const message = form.contactMessage.value.trim();

    if (!name || !email || !message) {
      formStatus.style.color = "#ef4444"; // rouge
      formStatus.textContent = "Veuillez remplir tous les champs.";
      setTimeout(() => formStatus.textContent = "", 2500);
      return;
    }

    const data = JSON.parse(localStorage.getItem("fitlifeMessages")) || [];
    data.push({ name, email, message });
    localStorage.setItem("fitlifeMessages", JSON.stringify(data));

    formStatus.style.color = "#f97316"; // orange
    formStatus.textContent = "Message sauvegardé !";
    setTimeout(() => formStatus.textContent = "", 2500);

    form.reset();
    renderMessages();
  });

  // Envoyer
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = form.contactName.value.trim();
    const email = form.contactEmail.value.trim();
    const message = form.contactMessage.value.trim();

    if (!name || !email || !message) {
      formStatus.style.color = "#ef4444";
      formStatus.textContent = "Veuillez remplir tous les champs.";
      setTimeout(() => formStatus.textContent = "", 2500);
      return;
    }

    let data = JSON.parse(localStorage.getItem("fitlifeMessages")) || [];
    data = data.filter(m => !(m.name === name && m.email === email && m.message === message));
    localStorage.setItem("fitlifeMessages", JSON.stringify(data));

    form.reset();
    renderMessages();
    formStatus.style.color = "#22c55e"; // vert
    formStatus.textContent = "Message envoyé avec succès ✅";
    setTimeout(() => formStatus.textContent = "", 2500);
  });

}); // fin DOMContentLoaded
