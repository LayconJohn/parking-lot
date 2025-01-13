import FakeClock from "../src/FakeClock";
import ParkingService from "../src/ParkingService";

test("Deve entrar e sair um carro do estacionamento, calculando um valor da tarifa, 10 reais por hora de permanencia", async () => {
    //Given
    const clock = new FakeClock()
    const parkingService = new ParkingService(clock);
    const plate = "AAA1111";

    //When
    clock.setCurrentDate(new Date("2025-01-13T10:00:00"));
    await parkingService.checkin(plate);

    //Then
    clock.setCurrentDate(new Date("2025-01-13T12:00:00"));
    const ticket = await parkingService.checkout(plate);
    expect(ticket.price).toBe(20);
});