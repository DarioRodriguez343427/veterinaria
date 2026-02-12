function textoNulo(texto) {
    if (texto.length == 0) {
        return true;
    }
}

function tieneSoloLetras(texto) {
    let resp = true;
    let minus = "qwertyuiopasdfghjklñzxcvbnm ";
    texto = texto.toLowerCase();
    for (let i = 0; i < texto.length; i++) {
        let caracterActual = texto.charAt(i);
        if (!minus.includes(caracterActual)) {
            resp = false;
        }
    }
    return resp;
}

function celularValido(cel) {
    let resp = true;

    if (cel.length != 9) {
        resp = false;
    }

    let numeros = "0123456789";
    for (let i = 0; i < cel.length; i++) {
        let caracterActual = cel.charAt(i);
        if (!numeros.includes(caracterActual)) {
            resp = false;
        }
        if (i == 0 && caracterActual != "0") {
            resp = false;
        }
        if (i == 1 && caracterActual != "9") {
            resp = false;
        }
    }

    return resp;
}

function esDiaHabil(fecha) {
    fecha = new Date(fecha);
    const diaSemana = fecha.getUTCDay();

    // 0 es Domingo, 6 es Sábado

    if (diaSemana === 0 || diaSemana === 6) {
        return false;
    }

    return true;
}

function fechaMinima() {
    const hoy = new Date();

    // Formatear la fecha como YYYY-MM-DD
    const dd = String(hoy.getDate()).padStart(2, '0');
    const mm = String(hoy.getMonth() + 1).padStart(2, '0'); // Enero es 0
    const yyyy = hoy.getFullYear();
    const fechaMinima = `${yyyy}-${mm}-${dd}`;

    return fechaMinima;
}

function cargarHorarios(servicio) {
    let horaInicio = 9;
    let horaFin = 18;
    let intervalo = 60; // Intervalo por defecto en minutos

    if (servicio === "Veterinaria") {
        intervalo = 30; // Consultas médicas más largas
    }

    let opciones = '<option value="0">- Seleccione una hora -</option>';

    for (let hora = horaInicio; hora < horaFin; hora++) {
        for (let minutos = 0; minutos < 60; minutos += intervalo) {
            let horaFormateada = String(hora).padStart(2, '0');
            let minFormateado = String(minutos).padStart(2, '0');
            let tiempo = `${horaFormateada}:${minFormateado}`;
            opciones += `<option value="${tiempo}">${tiempo}</option>`;            
        }
    }
    return opciones;
}

module.exports = {
    textoNulo,
    tieneSoloLetras,
    celularValido,
    esDiaHabil,
    fechaMinima,
    cargarHorarios
};