// Variable qui va afficher la page de chaque photographe
const showPhotographerProfil = () => {
    // Obtenir la bonne URL et injecter le pamamètre ID
    const urlParams = new URLSearchParams(window.location.search);
    const idParam = urlParams.get('id');
    // On recupère le fichier data.json
    fetch('data/data.json')
        .then((response) => {
            if (!response.ok) {
                throw new Error('HTTP error ' + response.status);
            }
            return response.json();
        })

        // On filtre le bon photographe et on affiche la cible
        .then((data) => {
            let filteredPhotographer;
            // s'il y a les paramètres ID dans l'URL, trouver ensuite le premier photographe qui aura le même ID dans le data.json
            if (idParam) {
                filteredPhotographer = data.photographers.find((photographer) => photographer.id == idParam);
            } else {
                console.log('No photographer found');
            }
            let filteredMedia;
            // s'il y a les bons paramètres ID, on trouve ensuite le media qui a l'ID correspondant
            if (idParam) {
                filteredMedia = data.media.filter((media) => media.photographerId == filteredPhotographer.id);
            } else {
                console.log('No media found');
            }
            displayGallery(filteredMedia, filteredPhotographer.name.split(' ')[0]);
        
        })
};
showPhotographerProfil();
  

// Function in order to display the right gallery of media, corresponding to the called photographer
const displayGallery = (media, folderName) => {
    let gallery = document.querySelector('.medias-list');
    gallery.innerHTML = '';
    let totalLikes = 0;
    media.forEach((elt, i) => {
        totalLikes += elt.likes;
        // Set the HTML common to neither video or picture
        let structureMediaHTML = 
        `
        <figure class='media-card'>
            <figcaption class="media-card-infos">
                <span class="media-card__title">${elt.title}</span>
                <span class="media-card__price">${elt.price}€</span>
                <div class="media-card__likes">
                    <span class="like-text">${elt.likes}</span>
                    <i class="far fa-heart heart-btn" role="button" tabindex="0"></i>
                </div>
            </figcaption>
        </figure>
        `;

        // Set HTML of the specific media 
        let specificMediaHTML;

        if (elt.image) {
            specificMediaHTML = 
            `
            <a class="media-card__picture" href='#' tabindex='0' onclick="openMedia()">
                <img src='./assets/portfolios/${folderName}/${elt.image}' alt="${elt.alt}"/>
            </a>
            `;

        } else if (elt.video) {
            specificMediaHTML = 
            `
            <a class="media-card__picture" href='#' title="${elt.title}" tabindex='0' onclick="openMedia()">
                <video src='./assets/portfolios/${folderName}/${elt.video}' alt="${elt.alt}" id="${elt.id}" label="Français" kind="subtitles" srclang="fr" controls autoplay loop>
            </a>        
            `;
        } 

        // Add it to gallery section
        gallery.insertAdjacentHTML('beforeend', structureMediaHTML);
        document.getElementsByClassName('media-card')[i].insertAdjacentHTML('afterbegin', specificMediaHTML)
    })
}
