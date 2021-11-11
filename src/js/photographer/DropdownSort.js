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
    let photographers = data.media; // la variable photographers contient les données de tous les photographes
    let array = [];
    const chevron = document.querySelector('.sort .sort-list .chevron');
    const sortList = document.querySelector('.sort .sort-list');
    const sort = [...document.querySelectorAll('.sort .sort-list .sort-list-item')];
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
    sortList.addEventListener('change', function (e) {
      e.target.value;

      if (e.target.value == 'popularite') {
        array.sort((a, b) => (a.likes < b.likes ? 1 : -1));
      } else if (e.target.value == 'date') {
        array.sort((a, b) => (a.date > b.date ? 1 : -1));
      } else if (e.target.value == 'titre') {
        array.sort((a, b) => (a.title > b.title ? 1 : -1));
      }
      array.forEach((tab) => {
        displayPhotographersList(tab);
      });
    });

    getTotalLike();

}
createContent();