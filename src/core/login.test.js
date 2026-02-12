const {
    existeUsuario
} = require('./login');


test('alguna credencial vacia', function () {
    const credenciales = {
        usuario: { value: "" },
        password: { value: "contra" }
    };
    expect(existeUsuario(credenciales)).toBeFalsy();
});

test('credencialas incorrectas', function () {
    const credenciales = {
        usuario: { value: "prueba" },
        password: { value: "contra" }
    };
    expect(existeUsuario(credenciales)).toBeFalsy();
});

test('usuario incorrecto', function () {
    const credenciales = {
        usuario: { value: "prueba" },
        password: { value: "1234" }
    };
    expect(existeUsuario(credenciales)).toBeFalsy();
});

test('contraseña incorrecta', function () {
    const credenciales = {
        usuario: { value: "Veterinaria32" },
        password: { value: "contra" }
    };
    expect(existeUsuario(credenciales)).toBeFalsy();
});

test('login correcto', function () {
    const credenciales = {
        usuario: { value: "Veterinaria32" },
        password: { value: "1234" }
    };
    expect(existeUsuario(credenciales)).toBeTruthy();
});