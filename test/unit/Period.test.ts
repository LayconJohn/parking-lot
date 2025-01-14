import Period from "../../src/domain/Period";

test("Deve testar a duração do período", () => {
    const period = new Period( new Date("2025-01-14T09:00:00"), new Date("2025-01-14T12:00:00"));
    expect(period.getDurationInHours()).toBe(3)
});

test("Deve retornar verdadeiro quando a data passada é fora do horário de trabalho", () => {
    const period = new Period( new Date("2025-01-14T09:00:00"), new Date("2025-01-14T12:00:00"));
    const input = new Date("2025-01-14T06:00:00");
    const output = period.isOutOfPeriod(input);
    expect(output).toBe(true);
})

test("Deve retornar falso quando a data passada é dentro do horário de trabalho", () => {
    const period = new Period( new Date("2025-01-14T08:00:00"), new Date("2025-01-14T12:00:00"));
    const input = new Date("2025-01-14T09:00:00");
    const output = period.isOutOfPeriod(input);
    expect(output).toBe(false);
})