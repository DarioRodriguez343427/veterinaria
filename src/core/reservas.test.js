const {
    textoNulo
} = require("../core/reservas");

test('descripción de la prueba', function () {
    expect(textoNulo("")).toBeTruthy();
});

test('la suma de 2+2 debe ser 4', function () {
    const resultado = 2 + 2;
    expect(resultado).toBe(4);
});

