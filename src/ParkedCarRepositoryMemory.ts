import ParkedCar from "./ParkedCar";
import ParkedCarRepository from "./ParkedCarRepository";

export default class ParkedCarRepositoryMemory implements ParkedCarRepository {
    parkedCars: any = {}

    constructor() {}

    async save(parkedCar: ParkedCar): Promise<void> {
        this.parkedCars[parkedCar.plate.value] = parkedCar;
    }
    async update(parkedCar: ParkedCar): Promise<void> {
        this.parkedCars[parkedCar.plate.value] = parkedCar;
    }
    async get(plate: string): Promise<ParkedCar> {
        return this.parkedCars[plate];
    }

}