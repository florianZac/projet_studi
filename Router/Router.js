import Route from "./Route.js";
import { allRoutes, websiteName } from "./allRoutes.js";

// Route 404
const route404 = new Route("404", "Page introuvable", "/Pages/404.html");

// Fonction pour récupérer la route correspondant à l'URL
const getRouteByUrl = (url) => {
  // Rediriger /index.html ou vide vers /
  if (url === "/index.html" || url === "") url = "/";
  const currentRoute = allRoutes.find(route => route.url === url);
  return currentRoute || route404;
};

// Fonction pour charger le contenu dans <main>
const LoadContentPage = async () => {
  const path = window.location.pathname;
  const actualRoute = getRouteByUrl(path);

  try {
    const html = await fetch(actualRoute.pathHtml).then(res => res.text());
    document.getElementById("main-page").innerHTML = html;
  } catch (err) {
    console.error("Erreur chargement page :", err);
    document.getElementById("main-page").innerHTML = "<h2>Erreur chargement</h2>";
  }

  // Charger le JS spécifique si défini
  if (actualRoute.pathJS) {
    const scriptTag = document.createElement("script");
    scriptTag.type = "module";
    scriptTag.src = actualRoute.pathJS;
    document.body.appendChild(scriptTag);
  }

  document.title = `${actualRoute.title} - ${websiteName}`;
};

// Event delegation pour tous les liens SPA
document.addEventListener("click", (event) => {
  const link = event.target.closest('a[href^="/"]'); // lien interne
  if (!link) return;

  event.preventDefault();
  const href = link.getAttribute("href");
  window.history.pushState({}, "", href);
  LoadContentPage();
});

// Gestion du bouton "retour" du navigateur
window.onpopstate = LoadContentPage;

// Charger la page initiale
LoadContentPage();
