test("Deve entrar e sair um carro do estacionamento, calculando um valor da tarifa, 10 reais por hora de permanencia", async () => {
    //Given
    const parkingService = new ParkingService();
    const plate = "AAA1111";

    //When
    await parkingService.checkin(plate);

    //Then
    const ticket = await parkingService.checkout(plate);
    expect(ticket.price).toBe(20);
});