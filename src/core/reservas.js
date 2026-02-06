let sesion = sessionStorage.getItem("usuarioLogueado");

if(!sesion) {
    console.log("usuario no autorizado");
    window.location.href = "/";
}