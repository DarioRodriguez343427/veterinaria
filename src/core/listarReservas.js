if (!sessionStorage.getItem("usuarioLogueado")) {
  window.location.href = "/";
}

function importarRegistros() {
  let registros = JSON.parse(localStorage.getItem("reservas"));
  let soloRegistrosFuturos = [];
  const hoy = new Date().toISOString().split("T")[0];

  if (registros != null) {
    registros.forEach(reg => {
      if (reg[6] >= hoy) {
        soloRegistrosFuturos.push(reg);
      }
    });
    soloRegistrosFuturos.sort((a, b) => a[6].localeCompare(b[6]));
  }

  return soloRegistrosFuturos;
}