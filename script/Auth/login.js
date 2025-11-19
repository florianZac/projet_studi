import { setCookie, showAndHideElementsForRole } from "../script.js";

const tokenCookieName = "accesstoken";

function setToken(token){

    setCookie(tokenCookieName, token, 7);
}

function getToken(){
    return getCookie(tokenCookieName);

}

const loginForm = document.getElementById("loginForm");

// =======================
// Fonction qui gère la connexion pour clients et admins
// =======================
export function checkCredentials(mailInput, passwordInput) {


    let dataForm = new FormData(loginForm);
  // Fonction de connexion

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  let email = dataForm.get("email");
  let password = dataForm.get("mdp");
  
  const raw = JSON.stringify({
    "username": email,
    "password": password,
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };

  fetch("http://127.0.0.1:8000/api/login", requestOptions)
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
        // throw new Error(`Erreur inconnue (${response.status}): ${response.statusText}`);
        mailInput.classList.add("is-invalid");
        passwordInput.classList.add("is-setInvalid");
      }
        
    })
    .then((result) =>{
      //alert("Inscription réussie "+name+" ! Vous allez être redirigé vers la page de connexion.");
          // Vérifier les identifiants client
          /*
        if (mailInput.value === "test@gmail.com" && passwordInput.value === "Azerty123+") {
            role = "client";
        } 
        else if (mailInput.value === "admin@gmail.com" && passwordInput.value === "Admin123!") {
            role = "admin";
        }
        */
        //Il faudra récuperer le vrai token
        const token = result.apiToken;
        setToken(token);
        let role = null; // Variable pour stocker le rôle détecté
        // Vérifier les identifiants admin
        if (role) {
            // Supprimer tous les cookies existants/fantômes
            document.cookie.split(";").forEach(c => {
                const eqPos = c.indexOf("=");
                const name = eqPos > -1 ? c.substr(0, eqPos).trim() : c.trim();
                if(name) { 
                    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
                }
            });

            // Créer les cookies token et rôle
            setCookie("accesstoken", "dummyToken123", 7);
            setCookie("role", result.roles[0], 7);

            // Mettre à jour la navbar selon le rôle
            showAndHideElementsForRole();

            // Message de confirmation
            alert(`Connecté en tant que ${result.roles[0]} !`);

            // SPA navigation vers l'accueil
            window.history.pushState({}, "", "/");
            window.dispatchEvent(new Event('popstate'));
        } else {
        // Marquer les champs comme invalides si mauvaise combinaison
        mailInput.classList.add("is-invalid");
        passwordInput.classList.add("is-setInvalid");
        }        
    } )
    .catch((error) => console.error(error));


}




// =======================
// Exposer la fonction pour la console/debug
// =======================
window.checkCredentials = checkCredentials;

// =======================
// Initialisation du bouton login
// =======================
export function initLoginPage() {
    const mailInput = document.getElementById("EmailInput");
    const passwordInput = document.getElementById("PasswordInput");
    const btnLogin = document.getElementById("btnLogin");

    if (btnLogin && mailInput && passwordInput) {
        // Supprimer un ancien listener pour éviter les doublons
        const newBtn = btnLogin.cloneNode(true);
        btnLogin.replaceWith(newBtn);

        // Attacher le listener au bouton cloné
        newBtn.addEventListener("click", (e) => {
            e.preventDefault();
            checkCredentials(mailInput, passwordInput);
        });
    }
}

