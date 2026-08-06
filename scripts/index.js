let initialCards = [
  {
    name: "Valle de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
  },

  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
  },

  {
    name: "Montañas Calvas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
  },

  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
  },

  {
    name: "Parque Nacional de la Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
  },

  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
  },
];

initialCards.forEach(function (initialCard) {
  console.log(initialCard.name);
});

const editProfileBtn = document.querySelector(".profile__edit-button");
const modalPopup = document.querySelector("#edit-popup");
const modalCloseBtn = modalPopup.querySelector(".popup__close");

function openModal(modal) {
  modal.classList.add("popup_is-opened");
}

function closeModal(modal) {
  modal.classList.remove("popup_is-opened");
}

function fillProfileForm() {
  nameInput.value = profileTitle.textContent;
  descriptionInput.value = profileDescription.textContent;
}

function handleOpenEditModal() {
  fillProfileForm();
  openModal(modalPopup);
}

editProfileBtn.addEventListener("click", () => {
  handleOpenEditModal();
});

modalCloseBtn.addEventListener("click", () => {
  closeModal(modalPopup);
});

const nameInput = modalPopup.querySelector(
  ".popup__input.popup__input_type_name",
);
const descriptionInput = modalPopup.querySelector(
  ".popup__input.popup__input_type_description",
);

const profileTitle = document.querySelector(".profile__title");

const profileDescription = document.querySelector(".profile__description");

// Vamos a buscar el formulario en el DOM
let formElement = document.querySelector(".popup"); // Utiliza el método querySelector()

// Lo siguiente es el controlador (handler) para el envío de formularios, aunque
// no se enviará a ningún sitio todavía

// Observa que el nombre de la función comienza con un verbo
// y describe exactamente lo que hace la función
function handleProfileFormSubmit(evt) {
  // Esta línea impide que el navegador
  // envíe el formulario en su forma predeterminada.
  evt.preventDefault();
  // Una vez hecho esto, podemos definir nuestra propia forma de enviar el formulario.
  // Lo explicaremos todo con más detalle después.

  // Vamos a buscar los campos del formulario en el DOM
  // let nameInput = // Utiliza querySelector()
  //let jobInput = // Utiliza querySelector()

  // Obtén los valores de cada campo desde la correspondiente propiedad value
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  // Selecciona los elementos donde se introducirán los valores de los campos

  // Inserta nuevos valores utilizando la propiedad textContent
  // de los elementos seleccionados
}

// Conecta el controlador (handler) al formulario:
// se observará el evento submit
formElement.addEventListener("submit", handleProfileFormSubmit);
