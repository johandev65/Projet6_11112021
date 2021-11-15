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
         .then((data) => displayPhotographersList(data))
    }

function displayPhotographersList(data) {
    let photographers = data.photographers; // la variable photographers contient les données de tous les photographes

    photographers.map((photographer) => {
        let photographersSection = document.getElementById("photographers-list"); // la variable "sectionPhotographers" contient l'ID "photographers"
        let photographerCard = document.createElement("figure"); // la variable "photographerCard" contient la création de la balise HTML "figure"
        photographerCard.className = "photographer-card"; // j'attribue  la classe "photographer-card" à la balise HTML "figure"
        photographerCard.setAttribute("data-id", photographer.id); // j'ajoute un attribut data-id à la balise HTML "figure" qui affichera l'ID du photographe
        photographerCard.setAttribute("data-filter", photographer.tags); // j'ajoute un attribut data-filter à la balise HTML "figure" qui affichera les tags du photographe
        let photographerTemplate = // je construis le template de chaque carte de photographe dans la variable "photographerTemplate" 
        `
            <a class="photographer-card-preview" href="photographer.html?id=${photographer.id}" role="link">   
                <img class="photographer-card__portrait" src="assets/photographers/${photographer.portrait}" alt="${photographer.alt}">
                <h2 class="photographer-card__name">${photographer.name}</h2>
            </a>
            <figcaption class="photographer-card-infos">
                <p class="photographer-card__location">${photographer.city}, ${photographer.country}</p>
                <p class="photographer-card__tagline">${photographer.tagline}</p>
                <p class="photographer-card__price">${photographer.price}€/jour</p>
            </figcaption>
            <ul class="photographer-card-tags" id="tags">
                ${photographer.tags.map(tag =>
                    `<li>
                        <a class="tag" id=${tag} href="#${tag}" role="link" data-filter="${tag}">#${tag}</a>
                        <span class="sr-only">portrait de ${photographer.name}</span>
                    </li>`)
                    .join(' ')
                }
            </ul>
        `;

        photographersSection.appendChild(photographerCard); // La variable "photographerCard" (qui correspond à l'élement "figure") sera l'enfant de la variable "photographersSection" (qui correspond à l'ID "photographers")
        photographerCard.innerHTML = photographerTemplate; // j'injecte mon template ci-dessus dans la variable "photographerCard" (qui correspond à chaque carte de photographe)
    });
}

createContent();