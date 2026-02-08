const usuario = "Veterinaria32";
const contrasena = "1234";

function login(usu, pass) {
  if (usu === usuario && pass === contrasena) {
    let logueado = {
        usuario : usu,
        password : pass
    }
    sessionStorage.setItem("usuarioLogueado", JSON.stringify(logueado));
    console.log("login exitoso");
    window.location.href = "/";
    
  } else {
    console.log("todo mal");
  }
}