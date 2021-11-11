function createContent () {
    fetch('data/data.json')
        .then((response) => {
            if (response.ok) {
                return response.json()
            } else {
                alert("N'a pas pu charger l'API FishEye");
            }
        })
        .then((data) => displayLikesAndPriceInBox(data))
        .then(() => getTotalLike())
        .then(() => displayTotalLike())
        .then(() => heartListener())

}

// fonction qui va afficher la box de bas de page contenant le nombre total de likes de chaque photographe et leur tarif journalier
function displayLikesAndPriceInBox(data) {
    let photographersData = data.photographers;
    let id = window.location.search.split('id=')[1];
    let photographers = !id ? photographersData : photographersData.filter(photographer => photographer.id == id);
    let likeAndPriceBoxSection = document.querySelector(".likes-price-box");
    let likeAndPriceBoxTemplate = // je construis le template
            `
            <span class="total-likes" data-sumlikes="totalLikes"></span>
            <span>${photographers[0].price}€/jour</span>
            `;
            
    likeAndPriceBoxSection.innerHTML = likeAndPriceBoxTemplate; 
}


// fonction qui va me calculer le nombre total de like
function getTotalLike() {
    const totalLikeText = document.querySelectorAll('.like-text');
    let totalLike = 0;
    totalLikeText.forEach(span => {
        totalLike += parseInt(span.innerHTML);
    })
    return totalLike
};


// fonction qui affiche le nombre total de likes
function displayTotalLike() {
    const likeCounter = document.querySelector('.total-likes');
    likeCounter.innerHTML = getTotalLike() + ' ❤';
}


// fonction qui écoute un évènement sur le coeur 
function heartListener() {
    displayTotalLike(); // j'éxécute d'abord la fonction displayTotalLike qui affiche le nombre total de likes dans la box
    const hearts = document.querySelectorAll('.heart-btn'); // j'englobe tous mes boutons like dans la variable "hearts"
    hearts.forEach(heart => { // pour chacun des boutons "j'aime"
        
        heart.addEventListener('click', () => { // je mets l"écouteur d'évènement du "clic souris" sur chacun des coeurs
            const like = heart.parentElement.querySelector('.like-text'); // je sélectionne le parent de la classe .like-text qui est une div renfermant le texte ainsi que le coeur

            if (heart.classList.contains('fas')) { // si la classe est déjà "fas" (coeur rempli en rouge)
               like.innerHTML = parseInt(like.innerHTML) - 1; // je décrémente de 1 le nombre de likes et l'affiche dans la carte du photographe
               heart.classList.remove('fas'); // ceci supprime la classe "fas" pour revenir en class "far" (coeur revient en fond transparent)
            } else { // sinon
               like.innerHTML = parseInt(like.innerHTML) + 1; // j'incrémente de 1 le nombre de likes et l'affiche dans la carte du photographe
               heart.classList.add('fas'); // ceci ajoute la classe "fas" (coeur rempli en rouge)
            }
            displayTotalLike(); // j'appelle de nouveau la fonction qui affiche le nombre total de likes
        })

        // j'incrémente ou décrémente le nombre de likes pour chaque carte de photographe à chaque fois que je clique sur le bouton entrée (accessibilité)
        heart.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                const like = heart.parentElement.querySelector('.like-text');

                if (heart.classList.contains('fas')) {
                    like.innerHTML = parseInt(like.innerHTML) - 1;
                    heart.classList.remove('fas');
                } else {
                    like.innerHTML = parseInt(like.innerHTML) + 1;
                    heart.classList.add('fas');
                }
                displayTotalLike();
            }
        });
    })
}


createContent()