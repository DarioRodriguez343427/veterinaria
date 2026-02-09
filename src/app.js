-/**
 * lOGIN
 */
const form = document.querySelector("#login");

form.addEventListener("submit", function (evento) {
  evento.preventDefault();

  const usuarioIngresado = document.querySelector("#usuario").value;
  const contrasenaIngresada = document.querySelector("#contrasena").value;

  login(usuarioIngresado, contrasenaIngresada);
});