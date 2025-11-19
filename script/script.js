// =======================
// Gestion des cookies et rôle
// =======================

const tokenCookieName = "accesstoken";
const roleCookieName = "role";
getInfosUser();
// Récupérer un cookie
export function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
}

// Vérifie si l'utilisateur est connecté
export function isConnected() {
    return !!getCookie(tokenCookieName);
}

// Récupérer le rôle
export function getRole() {
    return getCookie(roleCookieName);
}

// Créer un cookie
export function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + days*24*60*60*1000);
        expires = "; expires=" + date.toUTCString();
    }
    // Toujours définir path=/ pour éviter les cookies fantômes
    document.cookie = `${name}=${value || ""}${expires}; path=/; SameSite=Lax`;
}

// Supprimer un cookie
export function eraseCookie(name) {
    // Supprime toutes les variantes de path possibles
    const paths = ["/", "/Pages/Auth", "/script"];
    for (const path of paths) {
        document.cookie = `${name}=; path=${path}; expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
    }
}

// =======================
// Affichage dynamique de la navbar
// =======================
export function showAndHideElementsForRole() {
    const userConnected = isConnected();
    const role = getRole();
    const allElements = document.querySelectorAll('[data-show]');

    for (const el of allElements) {
        el.classList.remove("d-none"); // reset
        switch(el.dataset.show) {
            case 'disconnected':
                if(userConnected){
                  el.classList.add("d-none");  
                } 
                break;
            case 'connected':
                if(!userConnected){
                  el.classList.add("d-none");  
                } 
                break;
            case 'admin':
                if(!userConnected || role !== "admin"){
                  el.classList.add("d-none");  
                } 
                break;
            case 'client':
                if(!userConnected || role !== "client"){
                  el.classList.add("d-none");  
                } 
                break;
        }
    }
}

// =======================
// Déconnexion
// =======================
export function signout() {
    // Supprimer les cookies connus
    eraseCookie(tokenCookieName);
    eraseCookie(roleCookieName);

    // Supprimer tous les cookies résiduels, y compris ceux sans nom
    const cookies = document.cookie.split(";");
    for (const c of cookies) {
        const eqPos = c.indexOf("=");
        const name = eqPos > -1 ? c.slice(0, eqPos).trim() : c.trim();
        if(name) { 
            document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
        }
    };

    // Mettre à jour la navbar
    showAndHideElementsForRole();

    // Recharger la page principale du SPA
    globalThis.history.pushState({}, "", "/");
    globalThis.dispatchEvent(new Event('popstate'));
}

// =======================
// Initialisation globale
// =======================
document.addEventListener("DOMContentLoaded", () => {
    // Bouton de déconnexion
    const signoutBtn = document.getElementById("signout-btn");
    if(signoutBtn) signoutBtn.addEventListener("click", () => signout());

    // Mise à jour navbar au chargement de la page
    showAndHideElementsForRole();
});

function getInfosUser(){
    //let myHeaders = new Headers();
    //myHeaders.append("X-AUTH-TOKEN", getToken());
    console.log("myHeaders");
}