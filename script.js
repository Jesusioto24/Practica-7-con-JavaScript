const radioInputs = document.querySelectorAll(".queryType");

radioInputs.forEach((radioInput) => {
  const radioContainer1 = document.querySelector(`.radio1`);
  const radioContainer2 = document.querySelector(`.radio2`);
  radioInput.addEventListener("change", function () {
    const value = radioInput.value;
    if (this.checked && value == 1) {
      radioContainer1.classList.add("selected");
      radioContainer2.classList.remove("selected");
    } else {
      radioContainer2.classList.add("selected");
      radioContainer1.classList.remove("selected");
    }
  });
});

const $form = document.querySelector("form");

$form.addEventListener("submit", (e) => {
  e.preventDefault();
  const firstName = $form["firstName"];
  const lastName = $form["lastName"];
  const emailAddress = $form["emailAddress"];
  const queryType = $form["queryType"];
  const message = $form["message"];
  const terms = $form["terms"];

  let nombreValido = comprobarVacio(firstName);
  let apellidoValido = comprobarVacio(lastName);
  let emailValido = emailCorrecto(emailAddress);
  let queryCorrecto = comprobarQuery(queryType);
  let mensajeCorrecto = comprobarVacio(message);
  let terminosAceptados = comprobarTerms(terms);
  if (
    nombreValido &&
    apellidoValido &&
    emailValido &&
    queryCorrecto &&
    mensajeCorrecto &&
    terminosAceptados
  ) {
    mostrarMensaje();
  }
});

function mostrarMensaje() {
  const $mensaje = document.querySelector(".success");
  $mensaje.classList.add("mostrar");
}

function comprobarVacio(input) {
  const errorMessage = document.querySelector(`#${input.name}Error`);
  if (input.value == "") {
    input.style.borderColor = "red";
    errorMessage.classList.add("error");
    return false;
  } else {
    if (errorMessage.classList.contains("error")) {
      errorMessage.classList.remove("error");
      input.style.borderColor = "hsl(186, 15%, 59%)";
    }
    return true;
  }
}

function comprobarQuery(input) {
  const errorMessage = document.querySelector("#queryTypeError");
  if (input.value == "") {
    errorMessage.classList.add("error");
    return false;
  } else {
    if (errorMessage.classList.contains("error")) {
      errorMessage.classList.remove("error");
    }
    return true;
  }
}

function comprobarTerms(input) {
  const errorMessage = document.querySelector("#termsError");
  if (!input.checked) {
    errorMessage.classList.add("error");
    return false;
  } else {
    if (errorMessage.classList.contains("error")) {
      errorMessage.classList.remove("error");
    }
    return true;
  }
}

function emailCorrecto(input) {
  const errorMessage = document.querySelector(`#emailAddressError`);
  const errorMessage2 = document.querySelector("#emailAddressInvalid");
  const reg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  let emailExiste = false;
  let emailSinError = false;
  if (input.value == "") {
    input.style.borderColor = "red";
    errorMessage.classList.add("error");
  } else {
    if (errorMessage.classList.contains("error")) {
      errorMessage.classList.remove("error");
      input.style.borderColor = "hsl(186, 15%, 59%)";
    }
    emailExiste = true;
  }

  if (!reg.test(input.value) && emailExiste) {
    errorMessage2.classList.add("error");
    input.style.borderColor = "red";
  } else {
    if (errorMessage2.classList.contains("error")) {
      errorMessage2.classList.remove("error");
      input.style.borderColor = "hsl(186, 15%, 59%)";
    }
    emailSinError = true;
  }

  return emailExiste && emailSinError;
}
