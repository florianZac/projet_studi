export default class Route {
  constructor(url, title, pathHtml, pathJS = "", reloadJS = false) {
    this.url = url;
    this.title = title;
    this.pathHtml = pathHtml;
    this.pathJS = pathJS;
    this.reloadJS = reloadJS; // rechargement rapide
  }
}