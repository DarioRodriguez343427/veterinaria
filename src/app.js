
document.addEventListener('DOMContentLoaded', () => {
    const ruta = window.location.pathname;

    console.log(ruta);

    if(ruta === "/src/views/reservas.html"){
        document.querySelector("#fecha").setAttribute("min", fechaMinima());
        document.querySelector("#slcHora").innerHTML += cargarHorarios();
    }

    /**
     * traer la lista desde listadoAgenda aca, porque es cuando se inicia la pagina.
     */
});



//Login

const formLogin = document.querySelector("#login");

formLogin.addEventListener("submit", function (evento) {
    evento.preventDefault();

    const usuarioIngresado = document.querySelector("#usuario").value;
    const contrasenaIngresada = document.querySelector("#contrasena").value;

    login(usuarioIngresado, contrasenaIngresada);
    }
);

// Reservas
const formReservas = document.querySelector("#reservas");


formReservas.addEventListener("submit", function (evento) {
    evento.preventDefault();

    let nombreCliente = document.querySelector("#nombreCliente").value;
    let celular = document.querySelector("#celular").value;
    let correo = document.querySelector("#correo").value;
    let nombreMascota = document.querySelector("#nombreMascota").value;
    let opcionServicio = document.querySelector("#slcServicio").value;
    let opcionProfesional = document.querySelector("#slcProfesional").value;
    let fecha = document.querySelector("#fecha").value;
    let opcionHora = document.querySelector("#slcHora").value;

    if (textoNulo(nombreCliente) || textoNulo(celular) || textoNulo(correo) || textoNulo(nombreMascota) || textoNulo(fecha) || opcionServicio == 0 || opcionProfesional == 0 || opcionHora == 0) {
        document.querySelector("#pResultado").style.color = "red";
        document.querySelector("#pResultado").innerHTML = "Todos los campos son obligatorios";
        } else {
            let errores = "";
            if (!tieneSoloLetras(nombreCliente)) {
                errores = "- El nombre del cliente solo puede contener letras.<br>";
            }
            if (!celularValido(celular)) {
                errores += "- El celular del cliente no es válido.<br>Recuerde que:<br>->Solo puede contener números<br>->Debe tener el formato: 09*******<br>->Debe contener 9 dígitos";
            }
            if (!tieneSoloLetras(nombreMascota)) {
                errores += "- El nombre de la mascota solo puede contener letras.<br>";
            }
            if (!esDiaHabil(fecha)) {
                errores += "- La veterinaria atiende unicamente días hábiles.<br>";
                document.querySelector("#fecha").value = "";
            }

            if (errores !== "") {
                document.querySelector("#pResultado").style.color = "red";
                document.querySelector("#pResultado").innerHTML = errores;
            } else {            
                let reservas = JSON.parse(localStorage.getItem('reservas')) || [];
                
                const nuevaReserva = [nombreCliente, celular, correo, nombreMascota, opcionServicio, opcionProfesional, fecha, opcionHora];
                reservas.push(nuevaReserva);
                
                localStorage.setItem('reservas', JSON.stringify(reservas));

                document.querySelector("#pResultado").style.color = "black";
                document.querySelector("#pResultado").innerHTML = "Reserva realizada con éxito.";
            }
        }
    }
);
