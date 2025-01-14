import ParkedCar from "../../src/domain/ParkedCar"

test("Deve testar um carro estacionado", () => {
    
    const parkedCar = new ParkedCar("AAA1111", new Date("2025-01-14T10:00:00"));
    parkedCar.checkout(new Date("2025-01-14T12:00:00"));
    expect(parkedCar.price).toBe(20)

})