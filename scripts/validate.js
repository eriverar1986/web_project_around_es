const validationConfig = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".button.popup__button",
  inputTypeError: "popup__input_type_error",
  errorClassVisible: "popup__error_visible",
  inactiveButtonClass: "popup__button_disabled",
  formSelector: ".popup__form",
};

function enableValidation(config) {
  const elementos = document.querySelectorAll(config.formSelector);

  elementos.forEach((form) => {
    const showInputError = (inputElement, errorMessage) => {
      const errorElement = form.querySelector(`.${inputElement.id}-error`);
      inputElement.classList.add(config.inputTypeError);
      errorElement.textContent = errorMessage;
      errorElement.classList.add(config.errorClassVisible);
    };

    const hideInputError = (inputElement) => {
      const errorElement = form.querySelector(`.${inputElement.id}-error`);
      inputElement.classList.remove(config.inputTypeError);
      errorElement.textContent = "";
      errorElement.classList.remove(config.errorClassVisible);
    };

    /*function toggleButtonState(form, submitButton) {
      // 1. Evaluamos si el formulario NO es válido
      const isInvalid = !form.checkValidity();

      // 2. Modificamos la propiedad nativa del botón
      submitButton.disabled = isInvalid;

      // 3. Si isInvalid es true, añade la clase. Si es false, la quita.
      submitButton.classList.toggle(config.inactiveButtonClass, isInvalid);
    }*/

    const inputs = form.querySelectorAll(config.inputSelector);
    const submitButton = form.querySelector(config.submitButtonSelector);

    inputs.forEach((input) => {
      input.addEventListener("input", () => {
        if (!input.validity.valid) {
          showInputError(input, input.validationMessage);
        } else {
          hideInputError(input);
        }
        toggleButtonState(form, submitButton);
      });
    });

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      let formValid = true;

      inputs.forEach((input) => {
        if (!input.validity.valid) {
          showInputError(input, input.validationMessage);
          formValid = false;
        }
      });
      toggleButtonState(form, submitButton);
    });
  });

  function toggleButtonState(form, submitButton) {
    const isInvalid = !form.checkValidity();
    console.log("isInvalid:", isInvalid);
    submitButton.disabled = isInvalid;
    submitButton.classList.toggle(config.inactiveButtonClass, isInvalid);
  }
}
