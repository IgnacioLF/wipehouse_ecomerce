export const emailValidator = email => {
  if (!email) {
    return "Email es requerido";
  // eslint-disable-next-line prefer-regex-literals
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
    return "Nombre es requerido"
  } else if (nombre.length < 4){
    return "Nombre tiene que ser mayor que 4 caracteres"
  }
  return "";
}