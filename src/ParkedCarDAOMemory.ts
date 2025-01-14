import ParkedCarDAO from "./ParkedCarDAO";

export default class ParkedCarDAOMemory implements ParkedCarDAO {
    parkedCars: any = {}

    constructor() {}

    async save(parkedCar: any): Promise<void> {
        this.parkedCars[parkedCar.plate] = parkedCar;
    }
    async update(parkedCar: any): Promise<void> {
        this.parkedCars[parkedCar.plate] = parkedCar;
    }
    async get(plate: string): Promise<any> {
        return this.parkedCars[plate];
    }

}