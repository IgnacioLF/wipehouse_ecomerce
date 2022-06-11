/* eslint-disable prefer-regex-literals */
export const emailValidator = email => {
  if (!email) {
    return "Email es requerido";
  } else if (!new RegExp(/\S+@\S+\.\S+/).test(email)) {
    return "Email con formato incorrecto";
  }
  return "";
};

export const passwordValidator = password => {
  if (!password) {
    return "Contraseña es requerida";
  } else if (password.length < 8) {
    return "Contraseña tiene que ser mayor que 8 caracteres";
  }
  return "";
};

export const confirmPasswordValidator = (confirmPassword, form) => {
  if (!confirmPassword) {
    return "Repetir contraseña es requerida";
  } else if (confirmPassword.length < 8) {
    return "Repetir contraseña tiene que ser mayor que 8 caracteres";
  } else if (confirmPassword !== form.password) {
    return "Repetir contrasela no coincide con contraseña";
  }
  return "";
};

export const nombreValidator = nombre => {
  if(!nombre){
    return "Nombre es requerido";
  } else if (nombre.length < 4){
    return "Nombre tiene que ser mayor que 4 caracteres";
  }
  return "";
}

export const notEmpty = value => {
  if (!value){
    return "Debe rellenar el campo";
  }
  return "";
}

export const apellidosValidator = apellidos => {
  if(!apellidos){
    return "Apellidos son requeridos";
  } else if (apellidos.length < 6){
    return "Apellidos tiene que ser mayor que 4 caracteres";
  }
  return "";
}

export const dniValidator = dni => {
  if (!dni) {
    return "DNI es requerido";
  } else if (!new RegExp(/[0-9]{7,8}[A-Z]/).test(dni)) {
    return "DNI con formato incorrecto";
  }
  return "";
};

export const cpValidator = cp => {
  if (!cp) {
    return "Código Postal es requerido";
  } else if (!new RegExp(/^(?:0[1-9]|[1-4]\d|5[0-2])\d{3}$/).test(cp)) {
    return "Código Postal con formato incorrecto";
  }
  return "";
};

export const telefonoValidator = telefono => {
  if (!telefono) {
    return "Teléfono es requerido";
  } else if (!new RegExp(/(\+34|0034|34)?[ -]*(6|7)[ -]*([0-9][ -]*){8}/).test(telefono)) {
    return "Teléfono con formato incorrecto";
  }
  return "";
};

export const tarjetaValidator = tarjeta => {
  if (!tarjeta) {
    return "Número de la tarjeta es requerido";
  // eslint-disable-next-line no-useless-escape
  } else if (!new RegExp(/^(?:4\d([\- ])?\d{6}\1\d{5}|(?:4\d{3}|5[1-5]\d{2}|6011)([\- ])?\d{4}\2\d{4}\2\d{4})$/).test(tarjeta)) {
    return "Número de la tarjeta con formato incorrecto";
  }
  return "";
};

export const ccvValidator = ccv => {
  if (!ccv) {
    return "CCV es requerido";
  } else if (!new RegExp(/^[0-9]{3,4}$/).test(ccv)) {
    return "CCV con formato incorrecto";
  }
  return "";
};

export const expiryMMValidator = expiryMM => {
  if(!expiryMM){
    return "Fecha de caducidad es requerida";
  } else if (expiryMM < 1 || expiryMM > 12){
    return "El mes introducido es incorrecto";
  }
  return "";
}

export const expiryYYValidator = expiryYY => {
  if(!expiryYY){
    return "Fecha de caducidad es requerida";
  } else if (expiryYY < 1 || expiryYY > 99){
    return "El año introducido es incorrecto";
  }
  return "";
}