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
        .then((data) => filterByTags(data))
        
}


// fonction qui trie les photographes par tags
function filterByTags(data) {
    const photographers = data.photographers;
    console.log(photographers);
    let tagsList = Array.from(document.querySelectorAll('.header-nav .tag')); // variable qui englobe le tableau renfermant chaque tag
    console.log(tagsList);
    let cards = document.querySelectorAll('.photographer-card'); // variable qui englobe toutes les cartes de photographes
    console.log(cards);

    // j'ajoute une classe "selected" au moment du clic sur chaque tag
    tagsList.map(item => { // pour chaque élément du tableau de tags
        item.addEventListener('click', function (e) { // lorsque je clique sur le tag
            let targetClass = e.target.classList; // cette variable contient l'ajout d'une une classe à la cible

            if (-1 === targetClass.value.indexOf('selected')) { // si aucun tag est sélectionné
                targetClass.add('selected') // le tag cliqué passe donc en classe "selected" (fond rouge)

            } else { // sinon
                targetClass.remove('selected') // la "classe selected" est supprimée s'il n'y a aucun clic sur le tag
            }
            filterPhotographers(cards); // j'appelle la fonction (créée plus bas) qui permet d'afficher ou cacher les cartes de photographes filtrées
        });
    });

    // fonction qui ajoute les tags sélectionnés dans un nouveau tableau
    function getActiveFilters() {
        let currentFilters = document.querySelectorAll('.selected'); // variable "currentFilters" (filtres actifs) qui contient tous les tags qui auront la classe "selected" 
        let activedFiltersArray = []; // je crée un nouveau tableau qui contiendra les filtres actifs

        currentFilters.forEach(currentFilter => { // pour chaque filtre avec la classe selected
            activedFiltersArray.push(currentFilter.getAttribute('data-filter')); // j'ajoute mes filtres actifs dans mon tableau qui auront l'attribut "data-filter"
        });

        return activedFiltersArray; // je retourne le tableau contenant les filtres actifs
        console.log(activedFiltersArray);
    }


    // fonction qui compare les tags sélectionnés du tableau avec les tags des photographes 
    function checkFilters(card) {
        let activeFilters = getActiveFilters();
        console.log(activeFilters);
        let cardValue = card.dataset.filter.value; // la variable "cardClassValue" contient la valeur de la clé dataset.filter de chaque carte photographe
        console.log(cardValue);
        if (activeFilters === card.dataset.filter.value) {
            return true;
        } else {
            return false
        }
        
    }


    // fonction qui affiche ou je cache les cartes des photographes filtrées
    function filterPhotographers(cards) {
        cards.forEach((card) => { // pour chacune des cartes
            if (checkFilters(card)) { // si la fonction "checkFilters" est vérifiée
                card.style.display = 'block'; // j'affiche la carte du photographe
            } else { // sinon
                card.style.display = 'none'; // la carte est masquée 
            }
        });
    }
}

createContent();

