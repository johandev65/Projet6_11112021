// Fonction qui va chercher le fichier data.json
function createContent () {
    fetch('data/data.json')
        .then((response) => {
            if (response.ok) {
                return response.json()
            } else {
                alert("N'a pas pu charger l'API FishEye");
            }
        })
        .then((data) => displayPhotographerBanner(data))
}


function displayPhotographerBanner(data) {
    let photographersData = data.photographers; // la variable photographers contient les données de tous les photographes
    let id = window.location.search.split('id=')[1];
    let photographers = !id ? photographersData : photographersData.filter(photographer => photographer.id == id);
    let photographerBannerSection = document.querySelector(".photographer-banner"); // la variable "sectionBannerPhotographers" contient la classe "banner-photographer"
    let photographerBannerTemplate = // je construis le template de chaque bannière de photographe
        `
            <div class="photographer-banner-infos">   
                <h1 class="photographer-banner__name" title="photo de ${photographers[0].name}">${photographers[0].name}</h1>
                <span class="photographer-banner__location">${photographers[0].city}, ${photographers[0].country}</span>
                <span class="photographer-banner__tagline">${photographers[0].tagline}</span>
                <ul class="photographer-banner__tags">
                    ${photographers[0].tags.map
                        (tag => `<li>
                                     <a class="tag" href="index.html?tag=${tag}" data-filter="${tag}">#${tag}</a>
                                     <span class="sr-only">portrait de ${photographers[0].name}</span>
                                 </li>`)
                        .join(" ")
                    }
                </ul>
            </div>
            <button class="photographer-banner-button btn" type="button" tabindex="0" onclick="launchModal()">Contactez-moi</button>
            <div class="photographer-banner-portrait">
                <img class="photographer-banner__image" src="./assets/photographers/${photographers[0].portrait}" alt="${photographers[0].alt}"></img>
            </div>
        `;

        photographerBannerSection.innerHTML = photographerBannerTemplate; // j'injecte mon template ci-dessus dans chaque carte de photographe
}

createContent();




    
