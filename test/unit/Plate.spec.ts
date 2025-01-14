import Plate from "../../src/domain/Plate";

test("Deve criar uma placa válida", () => {
    const plate = new Plate("AAA1111");
    expect(plate.value).toBe("AAA1111")
});

test("Deve retornar um erro quando a placa for inválida", () => {
    expect(() => new Plate("AA11")).toThrow(new Error("Invalid plate"))
});