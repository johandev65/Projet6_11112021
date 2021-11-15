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



const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const urlEntries = urlParams.entries();
for (const entry of urlEntries) {
    if (entry[0] == "id") {
        var id = entry[1];
    }
}

function sortByCategories(data) {
    
    const $dropdownButton = document.getElementById("dropdown-button");
    const $dropdownSelected = document.getElementById("dropdown-selected");
    const $dropdownList = document.getElementById("dropdown-list");
    const $dropdownPopularity = document.getElementById("dropdown-list-popularity");
    const $dropdownDate = document.getElementById("dropdown-list-date");
    const $dropdownTitle = document.getElementById("dropdown-list-title");
    
    const photographer = data.photographers.find((x) => x.id == id);
    console.log(photographer);
    const pictures = data.media.filter((x) => x.photographerId == id);
    console.log(pictures);
    let sortValue = "popularity";
    let picturesSorted = sortPictures(pictures, sortValue);
    

    function convertDate(date) {
        return parseInt(date.split("-").join());
    }


    function toggleDropdown() {
        if ($dropdownList.classList.contains("hide")) {
            $dropdownList.classList.remove("hide");
            renderDropdown(sortValue);
        } else {
            $dropdownList.classList.add("hide");
        }
    }


    function renderPictures() {
        picturesSorted = sortPictures(pictures, sortValue);
        console.log(picturesSorted);
    }


    function sortPictures(pictures, sortValue) {
        switch (sortValue) {
            case "popularity":
                return pictures
                .sort((a, b) => a.likes - b.likes)
                .reverse();
            case "date":
                return pictures
                .sort((a, b) => convertDate(a.date) - convertDate(b.date))
                .reverse();
            case "title":
                return pictures.sort(function (a, b) {
                    if (a.image != undefined) {
                        var titleA = a.image.toUpperCase();
                    } else if (a.video != undefined) {
                        var titleA = a.video.toUpperCase();
                    }
                    if (b.image != undefined) {
                        var titleB = b.image.toUpperCase();
                    } else if (b.video != undefined) {
                        var titleB = b.video.toUpperCase();
                    }
                    if (titleA < titleB) {
                        return -1;
                    }
                    if (titleA > titleB) {
                        return 1;
                    }
                    return 0;
                });
            default:
            return pictures
            .sort((a, b) => a.likes - b.likes)
            .reverse();
        }
      }
      
    
    function renderDropdown(sortValue) {
        switch (sortValue) {
        case "popularity":
            $dropdownPopularity.classList.add("hide");
            $dropdownDate.classList.remove("hide");
            $dropdownTitle.classList.remove("hide");
            break;
        case "date":
            $dropdownDate.classList.add("hide");
            $dropdownPopularity.classList.remove("hide");
            $dropdownTitle.classList.remove("hide");
            break;
        case "title":
            $dropdownTitle.classList.add("hide");
            $dropdownDate.classList.remove("hide");
            $dropdownPopularity.classList.remove("hide");
            break;
        default:
            $dropdownPopularity.classList.add("hide");
            $dropdownDate.classList.remove("hide");
            $dropdownTitle.classList.remove("hide");
            break;
        }
    }

    /* Event Listeners */
    $dropdownButton.addEventListener("click", (e) => {
        e.preventDefault();
        toggleDropdown();
    });
    
    $dropdownPopularity.addEventListener("click", (e) => {
        e.preventDefault();
        sortValue = "popularity";
        $dropdownSelected.innerHTML = "Popularité";
        toggleDropdown();
        renderPictures(picturesSorted);
    });
    
    $dropdownDate.addEventListener("click", (e) => {
        e.preventDefault();
        sortValue = "date";
        $dropdownSelected.innerHTML = "Date";
        toggleDropdown();
        renderPictures(picturesSorted);
    });
    
    $dropdownTitle.addEventListener("click", (e) => {
        e.preventDefault();
        sortValue = "title";
        $dropdownSelected.innerHTML = "Titre";
        toggleDropdown();
        renderPictures(picturesSorted);
    });
}

createContent();