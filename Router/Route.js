export default class Route {
  constructor(url, title, pathHtml, pathJS = "",authorize, reloadJS = false) {
    this.url = url;
    this.title = title;
    this.pathHtml = pathHtml;
    this.pathJS = pathJS;
    this.authorize = authorize; // Autorisation d'accès au page
    //this.reloadJS = reloadJS; // rechargement rapide
  }
}

/** authorize Tableau de chaine de charactere 
 * tout le monde peut y acceder 
 * ['disconnected'] -> Réserver aux utilisateurs deconnectée
 * ['client'] -> Réserver aux utilisateurs ayant le role client
 * ['admin] -> Réserver aux utilisateurs ayant le role admin
 * ['disconnected] -> Réserver aux utilisateurs admin et client
 */