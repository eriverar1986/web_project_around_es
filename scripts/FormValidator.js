export default class FormValidator {
  constructor(config, form) {
    this._config = config;
    this._form = form;
    this._inputs = this._form.querySelectorAll(this._config.inputSelector);
    this._submitButton = this._form.querySelector(
      this._config.submitButtonSelector,
    );
  }

  _hideInputError(inputElement) {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._config.inputTypeError);
    errorElement.textContent = "";
    errorElement.classList.remove(this._config.errorClassVisible);
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._config.inputTypeError);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._config.errorClassVisible);
  }

  _toggleButtonState() {
    const isInvalid = !this._form.checkValidity();
    console.log("isInvalid:", isInvalid);
    this._submitButton.disabled = isInvalid;
    this._submitButton.classList.toggle(
      this._config.inactiveButtonClass,
      isInvalid,
    );
  }

  enableValidation() {
    this._inputs.forEach((input) => {
      input.addEventListener("input", () => {
        if (!input.validity.valid) {
          this._showInputError(input, input.validationMessage);
        } else {
          this._hideInputError(input);
        }
        this._toggleButtonState();
      });
    });

    this._form.addEventListener("submit", (event) => {
      event.preventDefault();
      let formValid = true;

      this._inputs.forEach((input) => {
        if (!input.validity.valid) {
          this._showInputError(input, input.validationMessage);
          formValid = false;
        }
      });
      this._toggleButtonState();
    });
  }
}
