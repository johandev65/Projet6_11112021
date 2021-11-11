function createContent () {
    fetch('data/data.json')
        .then((response) => {
            if (response.ok) {
                return response.json()
            } else {
                alert("N'a pas pu charger l'API FishEye");
            }
        })
        .then((data) => displayPhotographerNameInModal(data))
}


// éléments du DOM concernant la modale
const modalBg = document.querySelector(".modal-bground"); // background de la fenêtre modale
const modalBtn = document.querySelector(".photographer-banner-button"); // bouton "contactez-moi"
const closeBtnForm = document.querySelector(".close-icon-form"); // bouton croix de la fenêtre modale
const closeBtnSuccess = document.querySelector(".close-icon-success"); // bouton croix de la fenêtre modale
const modalBody = document.querySelector(".contact-modal"); // fenêtre modale du formulaire
const divForm = document.querySelector('.contact-form-wrapper'); // contenu de la fenêtre modale du formulaire
const modalSuccess= document.querySelector(".contact-success"); // contenu de la fenêtre modale de confirmation d'envoi

// éléments du DOM concernant le formulaire
const formData = document.querySelectorAll(".formData"); // Chaque champ du formulaire
const textControl = document.querySelectorAll(".text-control") // Input du formulaire
const firstName = document.getElementById("first-name"); // Input prénom
const lastName = document.getElementById("last-name"); // Input nom
const email = document.getElementById("email"); // Input e-mail
const message = document.getElementById("message"); // Input message
const btnSubmit = document.querySelector('.form-submit'); // Bouton Submit

// Éléments du DOM concernant les messages d'erreur à afficher
const error1= document.getElementById("error1"); // Erreur prénom
const error2 = document.getElementById("error2"); // Erreur nom
const error3 = document.getElementById("error3"); // Erreur e-mail
const error4 = document.getElementById("error4"); // Erreur date de naissance
const errorSubmit = document.getElementById("error-submit"); // Erreur submit


// évènements
closeBtnForm.addEventListener("click", closeModalForm);
closeBtnSuccess.addEventListener("click", closeModalSuccess);
formData[0].addEventListener("change", firstNameValidation); // Validation Prénom
formData[1].addEventListener("change", lastNameValidation); // Validation nom
formData[2].addEventListener("change", emailValidation); // Validation email
formData[3].addEventListener("change", messageValidation); // Validation message
btnSubmit.addEventListener("click", formValidation); // Clic sur le bouton submit




// fonction pour le lancement de la fenêtre modale
function launchModal() {
    modalBody.style.display = "block";
    modalBg.style.display = "block";
    modalSuccess.style.display = "none";
}

// fermeture de la fenêtre modale avec un clic en dehors de la zone (amélioration accessibilité)
window.onclick = function(event) {
    if (event.target == modalBg) {
        modalBody.style.display = "none";
        modalBg.style.display = "none";
        modalSuccess.style.display = "none";
        resetForm();
    }
}

// fermeture de la fenêtre modale avec la touche echap (amélioration accessibilité)
document.addEventListener('keydown', function(event) {
	if(event.key === "Escape"){
		modalBody.style.display = "none";
    	modalBg.style.display = "none";
		resetForm();
	}
});

// fonction pour la fermeture de la fenêtre modale + reset du formulaire
function closeModalForm() {
    modalBody.style.display = "none";
    modalBg.style.display = "none";
    resetForm();
}

// fonction pour la fermeture de la fenêtre modale + reset du formulaire
function closeModalSuccess() {
    modalSuccess.style.display = "none";
    modalBg.style.display = "none";
    resetForm();
}

// fonction pour la réinitialisation du formulaire lorsqu'on le quitte
function resetForm() {
    document.querySelector("#contact-form").reset();
}




// Validation "Prénom"
function firstNameValidation() {
  if (firstName.value.length >= 2) { // Si le nombre de caractères est au moins supérieur ou égal à 2
    error1.style.display = "none";
    firstName.style.border = "3px solid #279E7A"; // La bordure devient verte
    return true // Input valide
  } else {
        error1.style.display = "block";
        firstName.style.border = "3px solid crimson"; // La bordure devient rouge
        return false; // Input toujours invalide
  } 
}

// Validation "Nom"
function lastNameValidation() {
  if (lastName.value.length >= 2) {
    error2.style.display = "none";
    lastName.style.border = "3px solid #279E7A";
    return true;
  } else {
    error2.style.display = "block";
    lastName.style.border = "3px solid crimson";
    return false;
  } 
}

// Validation "E-mail"
function emailValidation() {
  const emailRegex = new RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
  if (emailRegex.test(email.value)) {
    error3.style.display = "none";
    email.style.border = "3px solid #279E7A";
    return true;
  } else {
    error3.style.display = "block";
    email.style.border = "3px solid crimson";
    return false;
  }
}

// Validation "Message"
function messageValidation() {
    if (message.value.length >= 10) {
        error4.style.display = "none";
        message.style.border = "3px solid #279E7A";
        return true;
      } else {
        error4.style.display = "block";
        message.style.border = "3px solid crimson";
        return false;
      } 
}

// Validation du formulaire
function formValidation(e) {
    let prenomValide = firstNameValidation();
    let nomValide = lastNameValidation();
    let mailValide = emailValidation();
    let messageValide = messageValidation();
    let formulaireValide = prenomValide && nomValide && mailValide && messageValide;
  
    if (formulaireValide) {
        resetForm();
        modalBody.style.display = "none";
        modalSuccess.style.display = "block";
        // setTimeout("location.reload(true);",5000);
    } else {
        errorSubmit.style.display = "block";
        return false;
        
    }
}



function displayPhotographerNameInModal(data) {
    let photographersData = data.photographers;
    let id = window.location.search.split('id=')[1];
    let photographers = !id ? photographersData : photographersData.filter(photographer => photographer.id == id);

    let modalTitle = document.querySelector(".contact-modal-title");
    let templateNameModal = // je construis le template
      `
          <span>Contactez-moi</span><br>
          <span>${photographers[0].name}</span>
      `;
    modalTitle.innerHTML = templateNameModal; // j'injecte le template ci-dessus dans le titre de la modale

    let photographerContacted = document.querySelector(".photographer-contacted");
    let templatePhotographerContacted = // je construis le template
    `
        ${photographers[0].name}
    `;
    photographerContacted.innerHTML = templatePhotographerContacted; // j'injecte le template ci-dessus dans le titre de la modale
}

createContent();


