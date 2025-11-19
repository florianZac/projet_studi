// --- RÉCUPÉRATION DES CHAMPS DU FORMULAIRE ---
const Inputnom = document.getElementById("nomInput"); // champ Nom
const Inputprenom = document.getElementById("prenomInput"); // champ Prénom
const Inputemail = document.getElementById("EmailInput"); // champ Email
const Inputpassword = document.getElementById("PasswordInput"); // champ Mot de passe
const Inputvalidatepassword = document.getElementById("ValidatePaswordInput"); // champ Confirmation mot de passe
const Inputnumero = document.getElementById("NumberInput"); // champ Numéro de téléphone
const form = document.querySelector("form"); // le formulaire entier
const submitBtn = document.getElementById("btn-validation-integration"); // bouton "Envoyer"
const formulaireinscription = document.getElementById("formulaireinscription");

// --- ÉCOUTEUR SUR BOUTON SUBMIT ---

submitBtn.addEventListener("click", inscriptionUser);

// --- INIT : bouton désactivé par défaut ---
submitBtn.disabled = true;

// --- AJOUT DES ÉCOUTEURS SUR TOUS LES CHAMPS ---
[Inputnom, Inputprenom, Inputemail, Inputpassword, Inputvalidatepassword, Inputnumero].forEach(input => {
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
  validateName(Inputnom, "rule-name-notempty", "rule-name-letters");        // Vérifie le nom
  validateName(Inputprenom, "rule-prenom-notempty", "rule-prenom-letters"); // Vérifie le prénom
  validateEmail(Inputemail);                                                // Vérifie l’email
  validatePassword(Inputpassword);                                          // Vérifie le mot de passe
  validatePasswordMatch(Inputpassword, Inputvalidatepassword);              // Vérifie la confirmation
  validatePhone(Inputnumero);                                               // Vérifie le numéro
}

// --- VALIDATIONS DE BASE ---
// Vérification des noms et prénoms
function validateName(input, ruleNotEmptyId, ruleLettersId) {
  const regex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s-]+$/; // lettres, accents, espaces et tirets autorisés
  let allValid = true;

  // Règle 1 : non vide
  if (input.value.trim() !== "") {
    setRuleValid(document.getElementById(ruleNotEmptyId));
  } else {
    setRuleNeutral(document.getElementById(ruleNotEmptyId));
    allValid = false;
  }

  // Règle 2 : uniquement lettres
  if (regex.test(input.value.trim())) {
    setRuleValid(document.getElementById(ruleLettersId));
  } else {
    setRuleNeutral(document.getElementById(ruleLettersId));
    allValid = false;
  }

  // Donne la couleur au champ (vert ou rouge)
  if (allValid) {
    setValid(input);
  } else {
    setInvalid(input);
  }
}

// Vérification de l’email
function validateEmail(input) {
  const value = input.value.trim();
  let allValid = true;

  // Vérifie la présence d’un "."
  if (/[.]/.test(value)) {
    setRuleValid(document.getElementById("rule-special-PointEmail"));
  } else {
    setRuleNeutral(document.getElementById("rule-special-PointEmail"));
    allValid = false;
  }

  // Vérifie qu’il n’est pas vide
  if (value !== "") {
    setRuleValid(document.getElementById("notempty"));
  } else {
    setRuleNeutral(document.getElementById("notempty"));
    allValid = false;
  }

  // Vérifie la présence du "@"
  if (/[@]/.test(value)) {
    setRuleValid(document.getElementById("rule-special-Email"));
  } else {
    setRuleNeutral(document.getElementById("rule-special-Email"));
    allValid = false;
  }

  // Couleur champ
  if (allValid) {
    setValid(input);
  } else {
    setInvalid(input);
  }
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

function inscriptionUser() {
  // Fonction d'inscription utilisateur à implémenter

  //recupération des données du formulaire
  let dataForm = new FormData(formulaireinscription);
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  let name = dataForm.get("nom");
  let prenom = dataForm.get("prenom");
  let email = dataForm.get("email");
  let password = dataForm.get("mdp");
  let number = dataForm.get("telephone");
  
  const raw = JSON.stringify({
    "firstName": name,
    "lastName": prenom,
    "email": email,
    "password": password,
    "phone": number
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };

  fetch("http://127.0.0.1:8000/api/registration", requestOptions)
    .then((response) => {
      if (response.ok) {
        // La réponse est correcte (200-299)
        return response.json();
      } else if (response.status >= 400 && response.status < 500) {
        // Erreur côté client
        throw new Error(`Erreur client (${response.status}): ${response.statusText}`);
      } else if (response.status >= 500 && response.status < 600) {
        // Erreur côté serveur
        throw new Error(`Erreur serveur (${response.status}): ${response.statusText}`);
      } else {
        // Autre type d'erreur (redirection, etc.)
        throw new Error(`Erreur inconnue (${response.status}): ${response.statusText}`);
      }
    })
    .then((result) =>{
      alert("Inscription réussie "+name+" ! Vous allez être redirigé vers la page de connexion.");
      document.location.href = "login";

    } )
    .catch((error) => console.error(error));


}