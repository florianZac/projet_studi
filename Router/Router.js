import Route from "../Router/Route.js";
import { allRoutes, websiteName } from "../Router/allRoutes.js";
import { showAndHideElementsForRole } from "../script/script.js";

// Mode debug → afficher les logs navigation
const debug = true;

// Route 404 par défaut si l'URL ne correspond à aucune route
const route404 = new Route("404", "Page introuvable", "/Pages/404.html");

// Cache pour les scripts déjà injectés
const loadedScripts = new Set();

// =======================
// Récupérer la route correspondant à l'URL
// =======================
const getRouteByUrl = (url) => {
    if (url === "/index.html" || url === "") url = "/";
    return allRoutes.find(route => route.url === url) || route404;
};

// =======================
// Formater l'heure pour le log
// =======================
const getFormattedTime = () => {
    const now = new Date();
    return now.toLocaleTimeString("fr-FR", { hour12: false });
};

// =======================
// Charger le contenu HTML et initialiser la page SPA
// =======================
export const LoadContentPage = async () => {
    const path = window.location.pathname;
    const actualRoute = getRouteByUrl(path);

    try {
        // Charger le HTML de la page
        const res = await fetch(actualRoute.pathHtml);
        if (!res.ok) throw new Error(`Erreur HTTP ${res.status}`);
        const html = await res.text();
        document.getElementById("main-page").innerHTML = html;
    } catch (err) {
        console.error("Erreur chargement page :", err);
        document.getElementById("main-page").innerHTML = "<h2>Erreur chargement</h2>";
    }

    // =======================
    // Initialiser tous les modals de la page injectée
    // =======================
    document.querySelectorAll('#main-page .modal').forEach(modalEl => {
        new bootstrap.Modal(modalEl);
    });

    // =======================
    // Charger le JS spécifique à la page si défini
    // =======================
    if (actualRoute.pathJS && actualRoute.pathJS.trim() !== "") {
        const loadScript = () => {
            import(actualRoute.pathJS + (actualRoute.reloadJS ? `?v=${Date.now()}` : ""))
                .then(mod => {
                    // Appeler initLoginPage si défini
                    if (mod.initLoginPage) mod.initLoginPage();
                })
                .catch(err => console.error("Erreur import module JS:", err));
        };

        if (actualRoute.reloadJS || !loadedScripts.has(actualRoute.pathJS)) {
            loadScript();
            if (!actualRoute.reloadJS) loadedScripts.add(actualRoute.pathJS);
        } else {
            // Script déjà chargé → ré-exécuter init
            loadScript();
        }
    }

    // Mettre à jour le titre
    document.title = `${actualRoute.title} - ${websiteName}`;

    if (debug) console.log(`[SPA Router] Navigué vers ${path} à ${getFormattedTime()}`);

    // Mettre à jour la navbar pour les rôles admin/client
    if (typeof showAndHideElementsForRole === "function") {
        showAndHideElementsForRole();
    }
};

// =======================
// Navigation SPA
// =======================
export const navigate = (url) => {
    window.history.pushState({}, "", url);
    LoadContentPage();
};

// =======================
// Event delegation pour les liens internes SPA
// =======================
document.addEventListener("click", (event) => {
    const link = event.target.closest('a[href^="/"]');
    if (!link) return;

    event.preventDefault();
    navigate(link.getAttribute("href"));
});

// =======================
// Gestion du bouton retour du navigateur
// =======================
window.onpopstate = LoadContentPage;

// Charger la page initiale
LoadContentPage();
