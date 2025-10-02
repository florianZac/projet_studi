import Route from "./Route.js";

//Définir ici vos routes
export const allRoutes = [
    new Route("/", "Accueil", "/Pages/home.html"),
    new Route("/galerie", "Galerie", "/Pages/galerie.html"),
    new Route("/login", "Login", "/Pages/Auth/login.html"),
    new Route("/inscription", "Inscription", "/Pages/Auth/inscription.html"),
    new Route("/compte", "Mon compte", "/Pages/Auth/compte.html"),
    new Route("/editPassword", "Modification mot de passe", "/Pages/Auth/editPassword.html"),
];

//Le titre s'affiche comme ceci : Route.titre - websitename
export const websiteName = "Quai Antique";