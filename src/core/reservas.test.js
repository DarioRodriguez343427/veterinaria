const {
    textoNulo,
    tieneSoloLetras,
    celularValido,
    esDiaHabil,
    fechaMinima,
    cargarHorarios
} = require('./reservas');


describe('Validador de texto nulo', function () {
    test('valores vacios', function () {
        expect(textoNulo("")).toBeTruthy();
    });

    test('valores no vacios', function () {
        expect(textoNulo("prueba")).toBeFalsy();
    });
});

describe('Validador de valores solo con texto', function () {
    test('valores solo con texto', function () {
        expect(tieneSoloLetras("prueba")).toBeTruthy();
    });

    test('valores con texto y cualquier cosa', function () {
        expect(tieneSoloLetras("prueba@2025")).toBeFalsy();
    });
});

describe('Validador de celular', function () {
    test('celular con texto', function () {
        expect(celularValido("099678306yhg")).toBeFalsy();
    });

    test('celular con menos de 9 digitos', function () {
        expect(celularValido("09967830")).toBeFalsy();
    });

    test('celular con mas de 9 digitos', function () {
        expect(celularValido("0996783067")).toBeFalsy();
    });

    test('celular con 9 digitos', function () {
        expect(celularValido("099678306")).toBeTruthy();
    });

    test('celular comenzando con valor distinto de 0', function () {
        expect(celularValido("909678306")).toBeFalsy();
    });

    test('celular con el segundo digito distinto de 9', function () {
        expect(celularValido("999678306")).toBeFalsy();
    });
});

describe('Validador de fechas habiles', function () {
    test('fecha de sabado', function () {
        let fecha = new Date("2026-02-07");
        expect(esDiaHabil(fecha)).toBeFalsy();
    });

    test('fecha de domingo', function () {
        let fecha = new Date("2026-02-08");
        expect(esDiaHabil(fecha)).toBeFalsy();
    });
    
    test('fecha habil', function () {
        let fecha = new Date("2026-02-09");
        expect(esDiaHabil(fecha)).toBeTruthy();
    });
});