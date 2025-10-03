// --- RÉCUPÉRATION DES CHAMPS DU FORMULAIRE ---
const Inputpassword = document.getElementById("PasswordInput"); // champ Mot de passe
const Inputvalidatepassword = document.getElementById("ValidatePaswordInput"); // champ Confirmation mot de passe
const form = document.querySelector("form"); // le formulaire entier
const submitBtn = form.querySelector("button[type='submit']"); // bouton "Envoyer"

// --- INIT : bouton désactivé par défaut ---
submitBtn.disabled = true;

// --- AJOUT DES ÉCOUTEURS SUR TOUS LES CHAMPS ---
[Inputpassword, Inputvalidatepassword].forEach(input => {
  // A chaque saisie dans un champ on vérifie le formulaire
  input.addEventListener("input", () => {
    validateForm();   // lance toutes les validations
    toggleSubmit();   // active/désactive le bouton submit
  });

  // Gestion de l'aide dynamique (ul/li avec les règles) pour Afficher ou ne pas afficher a la séléction
  const helpBlock = input.closest(".mb-3").querySelector("ul, li");
  if (helpBlock) {
    helpBlock.style.display = "none"; // caché par défaut
    input.addEventListener("focus", () => helpBlock.style.display = "block"); // s’affiche au focus
    input.addEventListener("blur", () => helpBlock.style.display = "none");  // disparaît au blur
  }
});

// --- FONCTION PRINCIPALE DE VALIDATION ---
function validateForm() {
  validatePassword(Inputpassword);                                          // Vérifie le mot de passe
  validatePasswordMatch(Inputpassword, Inputvalidatepassword);              // Vérifie la confirmation

}

// Vérification du mot de passe
function validatePassword(input) {
  const value = input.value;
  let allValid = true;

  // Longueur min. 6 caractères
  if (value.length >= 6) {
    setRuleValid(document.getElementById("rule-length"));
  } else {
    setRuleNeutral(document.getElementById("rule-length"));
    allValid = false;
  }

  // Contient une majuscule
  if (/[A-Z]/.test(value)) {
    setRuleValid(document.getElementById("rule-upper"));
  } else {
    setRuleNeutral(document.getElementById("rule-upper"));
    allValid = false;
  }

  // Contient un chiffre
  if (/\d/.test(value)) {
    setRuleValid(document.getElementById("rule-digit"));
  } else {
    setRuleNeutral(document.getElementById("rule-digit"));
    allValid = false;
  }

  // Contient un caractère spécial
  if (/[!@#$%^&*+\-]/.test(value)) {
    setRuleValid(document.getElementById("rule-special"));
  } else {
    setRuleNeutral(document.getElementById("rule-special"));
    allValid = false;
  }

  // Couleur champ
  if (allValid) {
    setValid(input);
  } else {
    setInvalid(input);
  }
}

// Vérification de la confirmation du mot de passe
function validatePasswordMatch(pass1, pass2) {
  if (pass2.value.trim() !== "" && pass1.value === pass2.value) {
    setRuleValid(document.getElementById("rule-validationPasword"));
    setValid(pass2);
  } else {
    setRuleNeutral(document.getElementById("rule-validationPasword"));
    setInvalid(pass2);
  }
}

// Vérification du numéro de téléphone
function validatePhone(input) {
  const value = input.value.trim();
  const regex = /^0[1-9]\d{8}$/; // Format FR : commence par 0, puis 9 chiffres
  if (regex.test(value)) {
    setRuleValid(document.getElementById("rule-number-notempty"));
    setValid(input);
  } else {
    setRuleNeutral(document.getElementById("rule-number-notempty"));
    setInvalid(input);
  }
}

// --- UTILITAIRES D’AFFICHAGE ---
// Marque un champ comme valide (bordure verte)
function setValid(input) {
  input.classList.add("is-valid");
  input.classList.remove("is-invalid");
}

// Marque un champ comme invalide (bordure rouge)
function setInvalid(input) {
  input.classList.add("is-invalid");
  input.classList.remove("is-valid");
}

// Colore une règle en vert
function setRuleValid(el) {
  el.classList.remove("text-secondary");
  el.classList.add("text-success");
}

// Colore une règle en gris (neutre)
function setRuleNeutral(el) {
  el.classList.remove("text-success");
  el.classList.add("text-secondary");
}

// --- GESTION DU SUBMIT ---
// Active ou désactive le bouton "Envoyer"
function toggleSubmit() {
  const invalid = form.querySelector(".is-invalid"); // s’il reste un champ invalide
  const empty = [...form.querySelectorAll("input")].some(input => input.value.trim() === ""); // ou vide
  submitBtn.disabled = invalid || empty; // alors bouton désactivé
}

// Au moment d’envoyer le formulaire
form.addEventListener("submit", function (e) {
  validateForm();    // revalide tout
  toggleSubmit();    // recontrôle bouton
  const invalid = form.querySelector(".is-invalid");
  if (invalid) {
    e.preventDefault(); // bloque l’envoi si erreur
    alert("Veuillez corriger les erreurs avant de soumettre.");
  }
});
