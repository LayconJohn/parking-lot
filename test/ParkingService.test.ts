
import CheckIn from "../src/application/usecase/Checkin";
import CheckOut from "../src/application/usecase/Checkout";
import ParkedCarDAOMemory from "../src/infra/database/ParkedCarRepositoryMemory";
import Period from "../src/domain/Period";


let checkIn: CheckIn;
let checkOut: CheckOut;

beforeAll(() => {
    const workingHours = new Period(new Date("2025-01-13T08:00:00"), new Date("2025-01-13T22:00:00"))
    const parkedCarDAO = new ParkedCarDAOMemory();
    checkIn = new CheckIn(workingHours, parkedCarDAO);
    checkOut = new CheckOut(workingHours, parkedCarDAO);
});

test("Deve entrar e sair um carro do estacionamento, calculando um valor da tarifa, 10 reais por hora de permanencia", async () => {
    //Given
    const plate = "AAA1111";

    //When
    const checkinDate = new Date("2025-01-13T10:00:00");
    await checkIn.execute(plate, checkinDate);

    //Then
    const checkoutDate = new Date("2025-01-13T12:00:00")
    const ticket = await checkOut.execute(plate, checkoutDate);

    expect(ticket.price).toBe(20);
});

test("Deve lançar um erro quando o carro não for encontrado tentar sair", async () => {
    await expect(() => checkOut.execute("ABA1212", new Date("2025-01-14T14:00:00"))).rejects.toThrow(new Error(`ABA1212 not parked`))
});

test("Não deve entrar carro com placa inválida", async () => {
    const plate = "AA11";
    const checkinDate = new Date("2025-01-13T10:00:00");
    await expect(() => checkIn.execute(plate, checkinDate)).rejects.toThrow(new Error("Invalid plate"))
});

test("Não deve entrar carro antes da abertura do estacionamento", async () => {
    const plate = "AAA1111";
    const checkinDate = new Date("2025-01-13T07:59:00");
    await expect(() => checkIn.execute(plate, checkinDate)).rejects.toThrow(new Error("Parking lot is closed"))
});