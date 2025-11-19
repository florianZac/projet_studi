import Route from "./Route.js";

//Définir ici vos routes
export const allRoutes = [
    new Route("/", "Accueil", "/Pages/home.html","/", [] , false ),
    new Route("/galerie", "Galerie", "/Pages/galerie.html", "/script/galerie.js", [] , false ),
    new Route("/login", "Login", "/Pages/Auth/login.html","/script/Auth/login.js", ["disconnected"] , false ),
    new Route("/inscription", "Inscription", "/Pages/Auth/inscription.html","/script/Auth/inscription.js", ["disconnected"] , false),
    new Route("/compte", "Mon compte", "/Pages/Auth/compte.html","/", ["client","admin"] , false),
    new Route("/editPassword", "Modification mot de passe", "/Pages/Auth/editPassword.html","/script/Auth/editPassword.js",["client","admin"],true),
    new Route("/reservation", "Afficher les reservations", "/Pages/Reservations/reservation.html", "/",["client"],true),
    new Route("/reserver", "Réserver des plats", "/Pages/Reservations/reserver.html","/",["client"],true),
    new Route("/carte", "Choix de la carte", "/Pages/menu/carte.html","/",["client","admin"],true),
    new Route("/contact", "Contactez Nous", "/Pages/contact.html","/",["client","admin"],true),
];

//Le titre s'affiche comme ceci : Route.titre - websitename
export const websiteName = "Quai Antique";