export function openModal(modal) {
  modal.classList.add("popup_is-opened");
  document.addEventListener("keydown", handleEscClose);
}

export function closeModal(modal) {
  modal.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", handleEscClose);
}

export function setupClosePopupByOverlay(modal) {
  modal.addEventListener("click", function (event) {
    if (event.target === event.currentTarget) {
      closeModal(modal);
    }
  });
}

export function handleEscClose(event) {
  const whichPopupIsOpened = document.querySelector(".popup_is-opened");
  if (event.key === "Escape") {
    closeModal(whichPopupIsOpened);
  }
}
