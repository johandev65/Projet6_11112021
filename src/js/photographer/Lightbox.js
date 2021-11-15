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
    .then((data) => createLightboxItems(data));
}

createContent();