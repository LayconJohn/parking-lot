import ParkingService from "../src/ParkingService";

test("Deve entrar e sair um carro do estacionamento, calculando um valor da tarifa, 10 reais por hora de permanencia", async () => {
    //Given
    const parkingService = new ParkingService();
    const plate = "AAA1111";

    //When
    const checkinDate = new Date("2025-01-13T10:00:00");
    await parkingService.checkin(plate, checkinDate);

    //Then
    const checkoutDate = new Date("2025-01-13T12:00:00")
    const ticket = await parkingService.checkout(plate, checkoutDate);

    expect(ticket.price).toBe(20);
});

test("Deve lançar um erro quando o carro não for encontrado tentar sair", async () => {
    const parkingService = new ParkingService();
    expect(() => parkingService.checkout("ABA1212", new Date("2025-01-14T14:00:00"))).rejects.toThrow(new Error(`ABA1212 not parked`))

});