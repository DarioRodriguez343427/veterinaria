document.addEventListener('DOMContentLoaded', () => {
    const ruta = window.location.pathname;

    if (ruta === "/src/views/reservas.html") {
        document.querySelector("#fecha").setAttribute("min", fechaMinima());
        document.querySelector("#slcHora").innerHTML += cargarHorarios();
    }

    /**
     * traer la lista desde listadoAgenda aca, porque es cuando se inicia la pagina.
     */
});

//----------------MENU-----------------------//

  function mostrarMenu() {
    const nav = document.getElementById("nav");
    nav.classList.toggle("nav-abierto");
    nav.classList.toggle("nav-colapsado");
  }

  document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("#nav a").forEach(link => {
      link.addEventListener("click", () => {
        const nav = document.getElementById("nav");
        nav.classList.add("nav-colapsado");
        nav.classList.remove("nav-abierto");
      });
    });
  });

//----------------HEADER-----------------------//
const headerPath = location.pathname.includes("/src/views/")
  ? "header.html"
  : "src/views/header.html";

fetch(headerPath)
  .then(res => res.text())
  .then(html => {
    document.getElementById("header").innerHTML = html;
  })
  .catch(err => console.error("Error cargando header:", err));

//----------------LOGIN-----------------------//
const formLogin = document.querySelector("#login");

if (formLogin) {
    formLogin.addEventListener("submit", function (evento) {
        evento.preventDefault();

        const txtMensaje = document.querySelector("#txtMensajeLogin");
        let mensaje = "";

        if (formLogin.usuario.value === "" || formLogin.password.value === "") {
            txtMensaje.innerHTML = "Todos los campos son obligatorios";
            formLogin.reset();
            return;
        }

        const resultadoLogin = login(formLogin);

        if (resultadoLogin === null) {
            mensaje = "Datos incorrectos, intente nuevamente";
            formLogin.reset();
        }

        txtMensaje.innerHTML = mensaje;
    });
}

/**
 * listar reservas
 */

const tablaRegistros = document.querySelector("#tablaListaReservas");
const contenedorCards = document.querySelector("#contenedorCards");
const txtMensaje = document.querySelector("#txtMensajeListaReservas");

function renderVista() {

  const registros = importarRegistros();

  tablaRegistros.innerHTML = "";
  contenedorCards.innerHTML = "";
  txtMensaje.innerHTML = "";

  if (!registros || registros.length === 0) {
    txtMensaje.innerHTML = "No hay registros";
    return;
  }

  if (window.innerWidth <= 768) {

    registros.forEach(registro => {
      contenedorCards.innerHTML += `
        <div class="card-reserva">
          <details>
            <summary>
              <span>${registro[0]}</span>
              <span>${registro[6]} ${registro[7]}</span>
            </summary>

            <p><strong>Celular:</strong> ${registro[1]}</p>
            <p><strong>Email:</strong> ${registro[2]}</p>
            <p><strong>Mascota:</strong> ${registro[3]}</p>
            <p><strong>Servicio:</strong> ${registro[4]}</p>
            <p><strong>Profesional:</strong> ${registro[5]}</p>
          </details>
        </div>
      `;
    });

  } 
  else {

    let mensaje = `
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Celular</th>
          <th>Email</th>
          <th>Mascota</th>
          <th>Servicio</th>
          <th>Profesional</th>
          <th>Fecha</th>
          <th>Hora</th>
        </tr>
      </thead>
      <tbody>
    `;

    registros.forEach(registro => {
      mensaje += "<tr>";

      registro.forEach(valor => {
        mensaje += `<td>${valor}</td>`;
      });

      mensaje += "</tr>";
    });

    mensaje += "</tbody>";

    tablaRegistros.innerHTML = mensaje;
  }
}

window.addEventListener("load", renderVista);
window.addEventListener("resize", renderVista);



// Reservas
const formReservas = document.querySelector("#reservas");

if (formReservas) {
    const slcServicio = document.querySelector("#slcServicio");
    const slcHora = document.querySelector("#slcHora");

    if (slcServicio && slcHora) {
        slcServicio.addEventListener("change", function () {
            const servicioSeleccionado = slcServicio.value;

            if (servicioSeleccionado !== "0") {
                slcHora.innerHTML = cargarHorarios(servicioSeleccionado);

                let opcionesProfesionales = '<option value="0">- Seleccione un profesional -</option>';
                if (servicioSeleccionado == "Veterinaria") {
                    opcionesProfesionales += '<option value="JuanaAlvarez">Juana Alvárez</option>';
                } else if (servicioSeleccionado == "Banio") {
                    opcionesProfesionales += '<option value="PedroAcosta">Pedro Acosta</option>';
                } else {
                    opcionesProfesionales += '<option value="SofiaPerez">Sofia Pérez</option>';
                }
                document.querySelector("#slcProfesional").innerHTML = opcionesProfesionales

            } else {
                slcHora.innerHTML = '<option value="0">- Seleccione una hora -</option>';
            }
        });
    }

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
                errores = "- El nombre del cliente solo puede contener letras.<br><br>";
            }
            if (!celularValido(celular)) {
                errores += "- El celular del cliente no es válido.<br>Recuerde que solo puede contener 9 dígitos con el formato: 09*******<br><br>";
            }
            if (!tieneSoloLetras(nombreMascota)) {
                errores += "- El nombre de la mascota solo puede contener letras.<br><br>";
            }
            if (!esDiaHabil(fecha)) {
                errores += "- La veterinaria atiende únicamente días hábiles.";
                document.querySelector("#fecha").value = "";
            }

            if (errores !== "") {
                document.querySelector("#pResultado").style.color = "red";
                document.querySelector("#pResultado").innerHTML = errores;
            } else {
                let reservas = JSON.parse(localStorage.getItem('reservas')) || [];

                if(opcionServicio == "Banio"){
                    opcionServicio = "Baño";
                }else if(opcionServicio == "Estetica"){
                    opcionServicio = "Estética";
                }

                if(opcionProfesional == "JuanaAlvarez"){
                    opcionProfesional = "Juana Alvárez";
                }else if(opcionProfesional == "PedroAcosta"){
                    opcionProfesional = "Pedro Acosta";
                }else {
                    opcionProfesional = "Sofia Pérez";
                }
                
                const nuevaReserva = [nombreCliente, celular, correo, nombreMascota, opcionServicio, opcionProfesional, fecha, opcionHora];
                reservas.push(nuevaReserva);

                localStorage.setItem('reservas', JSON.stringify(reservas));

                document.querySelector("#pResultado").style.color = "black";
                document.querySelector("#pResultado").innerHTML = "Reserva realizada con éxito.";
            }
        }
    }
    );
}