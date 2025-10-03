import { setCookie, showAndHideElementsForRole } from "../script.js";

const tokenCookieName = "accesstoken";

function setToken(token){

    setCookie(tokenCookieName, token, 7);
}

function getToken(){
    return getCookie(tokenCookieName);

}

// =======================
// Fonction qui gère la connexion pour clients et admins
// =======================
export function checkCredentials(mailInput, passwordInput) {
    let role = null; // Variable pour stocker le rôle détecté

    // Vérifier les identifiants client
    if (mailInput.value === "test@gmail.com" && passwordInput.value === "Azerty123+") {
        role = "client";
    } 
    else if (mailInput.value === "admin@gmail.com" && passwordInput.value === "Admin123!") {
        role = "admin";
    }
    //Il faudra récuperer le vrai token
    const token = "dfkdfjdkfmdfdmsmfsmfmsfjmsfj";
    setToken(token);

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
        setCookie("role", role, 7);

        // Mettre à jour la navbar selon le rôle
        showAndHideElementsForRole();

        // Message de confirmation
        alert(`Connecté en tant que ${role} !`);

        // SPA navigation vers l'accueil
        window.history.pushState({}, "", "/");
        window.dispatchEvent(new Event('popstate'));
    } else {
        // Marquer les champs comme invalides si mauvaise combinaison
        mailInput.classList.add("is-invalid");
        passwordInput.classList.add("is-setInvalid");
    }
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

