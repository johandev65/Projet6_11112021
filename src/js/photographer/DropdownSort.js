function createContent () {
    fetch('data/data.json')
        .then((response) => {
            if (response.ok) {
                return response.json()
            } else {
                alert("N'a pas pu charger l'API FishEye");
            }
        })
        .then((data) => sortByCategories(data))
}


function sortByCategories (data) {
    let photographers = data.photographers; // la variable photographers contient les données de tous les photographes
    console.log(photographers);
    let media = data.media; // la variable photographers contient les données de tous les photographes
    console.log(media);
    const chevron = document.querySelector('.sort .sort-list .chevron');
    const sortList = document.querySelector('.sort .sort-list');
    const sortItem = document.querySelector('.sort .sort-list .sort-item');
    const mediasList = document.querySelector('.medias-list');

    // comportements du dropdown au clic souris et à la touche TAB 
    sortList.addEventListener('click', () => {
        sortList.classList.toggle('selected');
        chevron.classList.toggle('reversed');
    })
    sortList.addEventListener('focus', () => {
        sortList.classList.toggle('selected');
        chevron.classList.toggle('reversed');
    })
    sortList.addEventListener('keyup', (event) => {
        let key = event.key;
        if (key === 'Enter' || key === 'Space') {
            sortList.classList.toggle('selected');
            chevron.classList.toggle('reversed');
        }
    })



    // tri des cartes medias en fonction de la catégorie sélectionnée sur le dropdown
    const popular = document.querySelector("#popular");
    const date = document.querySelector("#date");
    const title = document.querySelector("#title");
    console.log(media[0].date);
    console.log(media[0].likes);
    console.log(media[0].title);

    popular.addEventListener("click", () => {
        let sortingByPopularity = media[0].likes.sort(function (a, b) {
            return b.likes - a.likes;
        });
        sortingByPopularity;
    });

    date.addEventListener("click", () => {
        let sortingByDate = media[0].date.sort(function (a, b) {
            return new Date(b.date) - new Date(a.date);
        });
        sortingByDate;
    });

    title.addEventListener("click", () => {
        let sortingByTitle = media[0].title.sort(function (a, b) {
            if (a.title < b.title) {
                return -1;
            }
            if (a.title > b.title) {
                return 1;
            }
                return 0;
        });
        sortingByTitle;
    });   
}
createContent();