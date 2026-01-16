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

afficherPoids();
