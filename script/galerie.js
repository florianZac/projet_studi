
const galerieImage = document.getElementById("allImages");

let titreSecurise = sanitizeHtml("Titre <script>alert('XSS')</script> exemple");
let descriptionSecurise = sanitizeHtml("Description <img src=x onerror=alert('XSS')> exemple");
let urlSecurise = sanitizeHtml("../images/chef.jpg");
let monImage = getImages(titreSecurise, descriptionSecurise, urlSecurise);

galerieImage.innerHTML = monImage;

function getImages(titre, description, url){

    return `    <div class="col p-3">
      <div class="image-card text-white">
        <img src="${url}" class="rounded w-100" alt="${description}">
        <p class="titre-image">${titre}</p>
        <div class="action-image-buttons" data-show="admin">
          <button title="édition" type="button" class="btn btn-outline-light" data-bs-toggle="modal" data-bs-target="#EditionPhotoModal"><i class="bi bi-pencil-square"></i></button>
          <button title="corbeille" type="button" class="btn btn-outline-light" data-bs-toggle="modal" data-bs-target="#supressionPhotoModal"><i class="bi bi-trash"></i></button>
        </div>
      </div>
    </div>`;
}

// =======================
// Permet d'éviter les attaque XSS en échappant les balises HTML
// =======================
function sanitizeHtml(text){
    // Créez un élément HTML temporaire de type "div"
    const tempHtml = document.createElement('div');
    
    // Affectez le texte reçu en tant que contenu texte de l'élément "tempHtml"
    tempHtml.textContent = text;
    
    // Utilisez .innerHTML pour récupérer le contenu de "tempHtml"
    // Cela va "neutraliser" ou "échapper" tout code HTML potentiellement malveillant
    return tempHtml.innerHTML;
}