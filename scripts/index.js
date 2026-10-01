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

const cardTemplate = document
  .querySelector("#cards-template")
  .content.querySelector(".card");

function getCardElement(
  name = "Sin título",
  link = "./images/placeholder.jpg",
) {
  // 1. Selecciona el elemento template de tu HTML (usando su ID o clase)
  // y clona su contenido (content) de forma profunda (true).
  const cardTemplate = document.querySelector("#cards-template").content;
  const cardElement = cardTemplate.cloneNode(true);

  // 2. Selecciona los elementos title e image dentro del clon.
  // Nota: Ajusta las clases (".card__image", ".card__title") según tu HTML real.
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");
  const cardLikeButton = cardElement.querySelector(".card__like-button");
  const card = cardElement.querySelector(".card");

  cardDeleteButton.addEventListener("click", function () {
    card.remove();
  });

  cardLikeButton.addEventListener("click", function () {
    // 1. Apuntas al elemento: cardLikeButton
    // 2. Accedes a su lista de clases: .classList
    // 3. Usas el método: .toggle()
    // 4. Pasas la clase real entre comillas: "card__like-button_is-active"
    cardLikeButton.classList.toggle("card__like-button_is-active");
  });

  cardImage.addEventListener("click", function () {
    // 1. Asigna el enlace de la tarjeta a la propiedad src de la imagen del popup
    popUpImage.src = link;

    // 2. Asigna el nombre como texto alternativo (alt) por accesibilidad
    popUpImage.alt = name;

    // 3. Asigna el nombre de la tarjeta al texto del pie de foto (caption) del popup
    popUpCaption.textContent = name;

    // 4. Finalmente, abres el modal ahora que ya tiene la información correcta
    openModal(imagePopup);
  });

  // 3. Asigna el valor del parámetro link a la propiedad src de la imagen.
  cardImage.src = link;

  // 4. Asigna el valor del parámetro name a la propiedad alt de la imagen.
  cardImage.alt = name;

  // 5. Asigna el valor del parámetro name a la propiedad textContent del título.
  cardTitle.textContent = name;

  // 6. Devuelve el elemento de la tarjeta clonado y modificado.
  return card;
}

function renderCard(name, link, cardsContainer) {
  cardsContainer.prepend(getCardElement(name, link));
}

// Asegúrate de tener seleccionado tu contenedor del DOM
const cardsContainer = document.querySelector(".cards__list"); // Usa la clase real de tu contenedor

// El bucle forEach recorre cada objeto (cardData) del array initialCards
initialCards.forEach((cardData) => {
  // Llamamos a renderCard pasando el nombre, el enlace y el contenedor
  renderCard(cardData.name, cardData.link, cardsContainer);
});

const cardPopup = document.querySelector("#new-card-popup");
const cardAddBtn = document.querySelector(".profile__add-button");
const cardCloseBtn = cardPopup.querySelector(".popup__close");
const cardCreateBtn = cardPopup.querySelector(".button.popup__button");
let formCard = cardPopup.querySelector(".popup__form"); // Utiliza el método querySelector()

const cardNameInput = cardPopup.querySelector(
  ".popup__input.popup__input_type_card-name",
);
const cardLinkInput = cardPopup.querySelector(
  ".popup__input.popup__input_type_url",
);

function handleCardFormSubmit(evt) {
  // Impide que la página se recargue al enviar el formulario
  evt.preventDefault();

  // 1. Tomamos los valores actuales de tus inputs de la tarjeta
  const name = cardNameInput.value;
  const link = cardLinkInput.value;

  // 2. Llamamos a renderCard con los valores del formulario y tu contenedor
  // Nota: Asegúrate de tener la variable 'cardsContainer' declarada globalmente en tu archivo.
  renderCard(name, link, cardsContainer);

  // 3. (Opcional pero recomendado) Cierra el popup y limpia el formulario
  closeModal(cardPopup);
  evt.target.reset();
}

cardCloseBtn.addEventListener("click", () => {
  closeModal(cardPopup);
});

cardAddBtn.addEventListener("click", () => {
  openModal(cardPopup);
});

formCard.addEventListener("submit", handleCardFormSubmit);

const imagePopup = document.querySelector("#image-popup");
const popUpImage = imagePopup.querySelector(".popup__image");
const popUpCaption = imagePopup.querySelector(".popup__caption");
const popUpCloseBtn = imagePopup.querySelector(".popup__close");

popUpCloseBtn.addEventListener("click", function () {
  closeModal(imagePopup);
});
