if (!sessionStorage.getItem("usuarioLogueado")) {
  window.location.href = "/";
}

function importarRegistros() {
    let registros = JSON.parse(localStorage.getItem("reservas"));
    console.log(registros);
    return registros;
}