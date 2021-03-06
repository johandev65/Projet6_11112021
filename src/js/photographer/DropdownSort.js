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
    
    const dropdownButton = document.getElementById("dropdown-button");
    const dropdownSelected = document.getElementById("dropdown-selected");
    const dropdownList = document.getElementById("dropdown-list");
    const dropdownPopularity = document.getElementById("dropdown-list-popularity");
    const dropdownDate = document.getElementById("dropdown-list-date");
    const dropdownTitle = document.getElementById("dropdown-list-title");
    
    const photographer = data.photographers.find((x) => x.id == id);
    console.log(photographer);
    const pictures = data.media.filter((x) => x.photographerId == id);
    console.log(pictures);
    let sortValue = "popularity";
    let picturesSorted = sortPictures(pictures, sortValue);
    
 

    function toggleDropdown() {
        if (dropdownList.classList.contains("hide")) {
            dropdownList.classList.remove("hide");
            renderDropdown(sortValue);
        } else {
            dropdownList.classList.add("hide");
        }
    }
 

    function renderPictures(picturesSorted) {
        picturesSorted = sortPictures(pictures, sortValue);
        console.log(picturesSorted);
    }

    
    
    function renderDropdown(sortValue) {
        switch (sortValue) {
        case "popularity":
            dropdownPopularity.classList.add("hide");
            dropdownDate.classList.remove("hide");
            dropdownTitle.classList.remove("hide");
            break;
        case "date":
            dropdownDate.classList.add("hide");
            dropdownPopularity.classList.remove("hide");
            dropdownTitle.classList.remove("hide");
            break;
        case "title":
            dropdownTitle.classList.add("hide");
            dropdownDate.classList.remove("hide");
            dropdownPopularity.classList.remove("hide");
            break;
        default:
            dropdownPopularity.classList.add("hide");
            dropdownDate.classList.remove("hide");
            dropdownTitle.classList.remove("hide");
            break;
        }
    }

    function sortPictures(sortValue) {
        //create a Array with the desired order and use this are to call the createGallery Method
        if (sortValue === "Popularity") {
            pictures.sort((a, b) => (a.likes < b.likes ? 1 : -1));
        } else if (sortValue === "Date") {
            pictures.sort((a, b) => (a.date < b.date ? 1 : -1));
        } else if (sortValue === "Title") {
            pictures.sort((a, b) => (a.title > b.title ? 1 : -1));
        }
    }
    sortPictures(sortValue)

    /* Event Listeners */
    dropdownButton.addEventListener("click", (e) => {
        e.preventDefault();
        toggleDropdown();
    });
    
    dropdownPopularity.addEventListener("click", (e) => {
        e.preventDefault();
        sortValue = "popularity";
        dropdownSelected.innerHTML = "Popularit??";
        toggleDropdown();
        renderPictures(picturesSorted);
    });
    
    dropdownDate.addEventListener("click", (e) => {
        e.preventDefault();
        sortValue = "date";
        dropdownSelected.innerHTML = "Date";
        toggleDropdown();
        renderPictures(picturesSorted);
    });
    
    dropdownTitle.addEventListener("click", (e) => {
        e.preventDefault();
        sortValue = "title";
        dropdownSelected.innerHTML = "Titre";
        toggleDropdown();
        renderPictures(picturesSorted);
    });
}

createContent();


