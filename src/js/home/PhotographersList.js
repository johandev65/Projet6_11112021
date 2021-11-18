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
        .then((data) => displayHomePage(data))
        
}


// fonction qui va afficher la homepage, à savoir la liste des photographes et le tri par catégorie (tag)
function displayHomePage(data) {

    // fonction qui affiche les photographes
    function renderPhotographers() {
        let photographersHTML = "";

        // Rendu HTML des tags
        for (let i in data.photographers) {
            let tags = data.photographers[i].tags;
            console.log(tags);

            let tagsHTML = "";
            for (let e in tags) {
                // je construis le template des tags dans le carte de photographe
                tagsHTML += 
                `
                    <a href="#${tags[e]}" class="photographer-tag tag" aria-label="tag">#${tags[e]}</a>
                `;
            }

            // je construis le template de chaque carte de photographe
            photographersHTML += 
            ` 
                <figure class="photographer-card hide" id="${data.photographers[i].id}">
                    <a class="photographer-card-preview" href="photographer.html?id=${data.photographers[i].id}" class="photographer-link" role="link">   
                        <img class="photographer-card__portrait" src="assets/photographers/${data.photographers[i].portrait}" alt="${data.photographers[i].name}">
                        <h2 class="photographer-card__name">${data.photographers[i].name}</h2>
                    </a>
                    <figcaption class="photographer-card-infos">
                        <p class="photographer-card__location">${data.photographers[i].city}, ${data.photographers[i].country}</p>
                        <p class="photographer-card__tagline">${data.photographers[i].tagline}</p>
                        <p class="photographer-card__price">${data.photographers[i].price}€/jour</p>
                    </figcaption>
                    <ul class="photographer-card-tags" id="tags">
                        ${tagsHTML}
                    </ul>
                </figure>
            `;
        }

        photographers.innerHTML = photographersHTML; 
        filterPhotographers(selectedTag);
    }




    // Je déclare des variables
    const photographers = document.getElementById("photographers-list"); // variable qui contient la liste de tous les photographes
    const tags = document.getElementsByClassName("tag"); // variable qui contient le bouton-lien ayant la classe tag
    const cards = document.getElementsByClassName("photographer-card"); // variable qui contient la carte du photographe
    let selectedTag = "";



    // fonction qui filtre les photographes
    function filterPhotographers(selectedTag) {

        let filteredPhotographers = data.photographers.filter((x) => // je crée et retourne un nouveau tableau des photographes
            x.tags.includes(selectedTag) // qui contiendra la variable "selectedTag"
        );
        console.log(filteredPhotographers);
        Array.from(cards).forEach((el) => { // je crée une nouvelle instance de carte de photographe
            el.classList.add("hide"); // j'ajoute la classe "hide" à la carte (servant à cacher)
            if (filteredPhotographers.length == 0) { // si le nouveau tableau des photographes ne contient pas de "selectedTag"
                el.classList.remove("hide"); //  je retire la classe "hide" à la carte ce qui adffichera toutes les cartes par défaut
            } else { 
                for (let k in filteredPhotographers) { 
                    if (filteredPhotographers[k].id == el.id || selectedTag == "") { 
                        el.classList.remove("hide");
                    }
                }
            }
        });
    }
    
    renderPhotographers(""); // j'appelle la fonction qui va afficher les photographes
    filterPhotographers(selectedTag); // j'appelle la fonction qui filtre les photographes


    // je mets un écouteurs d'évènements sur chaque tag
    Array.from(tags).forEach((el) => { // je crée une nouvelle instance de bouton-lien "tag"
        el.addEventListener("click", (e) => { // à chaque fois qu'on cliquera sur un tag
            e.preventDefault(); 
            if (el.classList.contains("selected")) { // si le tag contient déja la classe "selected"
                filterPhotographers(""); // j'appelle la fonction qui filtre les photographes
            } else { // sinon 
                Array.from(tags).forEach((elem) => { 
                    elem.classList.remove("selected"); // cela retire la classe selected à l'élément
            });

            el.classList.add("selected");
            selectedTag = el.innerHTML 
                .replace(/\s/g, "")
                .replace(/#/, "")
            filterPhotographers(selectedTag); // j'appelle la fonction qui filtre les photographes
            }
        });
    });

}

createContent();

