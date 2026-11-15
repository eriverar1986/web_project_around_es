import { openModal } from "./utils.js";

export default class Card {
  constructor(name, link, templateSelector) {
    this._name = name;
    this._link = link;
    this._templateSelector = templateSelector;
  }

  _getTemplate() {
    //  toma el marcado de HTML y copia el elemento
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    // devuelve el elemento DOM de la tarjeta
    return cardElement;
  }

  _setEventListeners(cardElement) {
    const cardImage = cardElement.querySelector(".card__image");
    const cardDeleteButton = cardElement.querySelector(".card__delete-button");
    const cardLikeButton = cardElement.querySelector(".card__like-button");
    const imagePopup = document.querySelector("#image-popup");
    const popUpImage = imagePopup.querySelector(".popup__image");
    const popUpCaption = imagePopup.querySelector(".popup__caption");

    cardDeleteButton.addEventListener("click", () => {
      cardElement.remove();
    });

    cardLikeButton.addEventListener("click", () => {
      cardLikeButton.classList.toggle("card__like-button_is-active");
    });

    cardImage.addEventListener("click", () => {
      popUpImage.src = this._link;
      popUpImage.alt = this._name;
      popUpCaption.textContent = this._name;
      openModal(imagePopup);
    });
  }
  generateCard() {
    const cardElement = this._getTemplate();

    // Asignar datos a los elementos de la tarjeta
    const cardImage = cardElement.querySelector(".card__image");
    cardImage.src = this._link;
    cardImage.alt = this._name;
    cardElement.querySelector(".card__title").textContent = this._name;

    this._setEventListeners(cardElement);
    return cardElement;
  }
}
