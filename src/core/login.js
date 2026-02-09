if (sessionStorage.getItem("usuarioLogueado")) {
  window.location.href = "./listadoAgenda.html";
}

const usuario = "Veterinaria32";
const contrasena = "1234";

function login(form) {
  if (form.usuario.value === usuario && form.password.value === contrasena) {
    const logueado = {
      usuario,
      password: contrasena
    };

    sessionStorage.setItem("usuarioLogueado", JSON.stringify(logueado));
    window.location.href = "./listadoAgenda.html";
    return logueado;
  }

  return null;
}