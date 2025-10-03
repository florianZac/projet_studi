import { setCookie, showAndHideElementsForRole } from "../script.js";

// =======================
// Fonction login
// =======================
export function checkCredentials(mailInput, passwordInput){
    if(mailInput.value === "test@gmail.com" && passwordInput.value === "Azerty123+") {
        // Nettoyer tous les cookies existants/fantômes
        document.cookie.split(";").forEach(c => {
            const eqPos = c.indexOf("=");
            const name = eqPos > -1 ? c.substr(0, eqPos).trim() : c.trim();
            if(name) { 
                document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
            }
        });

        // Création des cookies token et role
        setCookie("accesstoken", "dummyToken123", 7);
        setCookie("role", "client", 7);

        // Mettre à jour la navbar
        showAndHideElementsForRole();

        // Popup de confirmation
        alert("Vous êtes connecté !");

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
// Exposer pour console/debug
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
        // Supprime l’ancien listener si présent en clonant le bouton
        const newBtn = btnLogin.cloneNode(true);
        btnLogin.replaceWith(newBtn);
        // Attacher le listener au bouton cloné
        newBtn.addEventListener("click", (e) => {
            e.preventDefault();
            checkCredentials(mailInput, passwordInput);
        });
    }
}
