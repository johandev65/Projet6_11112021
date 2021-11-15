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
            console.log(tags)
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
    const photographers = document.getElementById("photographers-list");
    const tags = document.getElementsByClassName("tag");
    const cards = document.getElementsByClassName("photographer-card");
    let selectedTag = "";



    // fonction qui affiche chaque photographe
    function filterPhotographers(selectedTag) {

        let filteredPhotographers = data.photographers.filter((x) =>
            x.tags.includes(selectedTag)
        );
        console.log(filteredPhotographers);
        Array.from(cards).forEach((el) => {
            el.classList.add("hide");
            if (filteredPhotographers.length == 0) {
                el.classList.remove("hide");
            } else {
                for (let k in filteredPhotographers) {
                    if (filteredPhotographers[k].id == el.id || selectedTag == "") {
                        el.classList.remove("hide");
                    }
                }
            }
        });
    }
    renderPhotographers("");
    filterPhotographers(selectedTag);


    // je mets un écouteurs d'évènements sur chaque tag
    Array.from(tags).forEach((el) => {
        el.addEventListener("click", (e) => {
            e.preventDefault();
            if (el.classList.contains("selected")) {
                el.classList.remove("selected");
                filterPhotographers("");
            } else {
                Array.from(tags).forEach((elem) => {
                    elem.classList.remove("selected");
            });

            el.classList.add("selected");
            selectedTag = el.innerHTML
                .replace(/\s/g, "")
                .replace(/#/, "")
            filterPhotographers(selectedTag);
            }
        });
    });

}

createContent();