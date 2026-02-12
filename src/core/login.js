const usuario = "Veterinaria32";
const contrasena = "1234";

function existeUsuario(form) {
  return form.usuario.value === usuario && form.password.value === contrasena;
}

module.exports = {
  existeUsuario
};