function createContent () {
    fetch('data/data.json')
        .then((response) => {
            if (response.ok) {
                return response.json()
            } else {
                alert("N'a pas pu charger l'API FishEye");
            }
        })
        .then((data) => displayMediaPictureAndName(data))
        .then(() => openMedia())
        .then(() => closeMedia())
}


// Variables
const lightboxModal = document.querySelector(".lightbox-modal");
const lightboxBody = document.querySelector(".lightbox-body");
const openBtn = document.querySelectorAll(".media-card__picture");
const closeBtn = document.querySelector(".close-btn");


function displayMediaPictureAndName(data) {
    let photographers = data.photographers;
    console.log(photographers);
    let medias = data.media;
    console.log(medias);

    medias.map((media) => {
        let lightboxBodyHTML = "";
        lightboxBodyHTML += 
        ` 
            <button class="close-lightbox" title="close lightbox">
                <img class="close-btn" src="assets/icons/close.png" alt="icône pour fermer la lightbox" onclick="closeMedia()">
            </button>
            <button class="previous-media" title="previous media">
                <img class="previous-btn" src="assets/icons/arrowleft.png" alt="icône pour aller au media précédent">
            </button>
            <button class="next-media" title="next media">
                <img class="next-btn" src="assets/icons/arrowright.png" alt="icône pour aller au media suivant">
            </button>      
            <img class="lightbox__media" src="assets/portfolios/${photographers[1].linkname}/${media.image}" alt="${media.alt}" role="button">
            <h2 class="lightbox__media__name">${media.title}</h2>          
        `;
        lightboxBody.innerHTML = lightboxBodyHTML; 
    });
}


// fonction qui ouvre la lightbox
function openMedia() {
    lightboxModal.style.display = "block";
}

// fonction qui ferme la lightbox
function closeMedia(){
    lightboxModal.style.display = "none";
}
   

// fonction qui affiche le média suivant
function previousMedia() {
  
}

// fonction qui affiche le média précédent
function nextMedia() {
    
}

createContent();