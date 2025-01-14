import ParkedCar from "./ParkedCar";

// Table Data Gateway => DAO
export default interface ParkedCarRepository {
    save(parkedCar: ParkedCar): Promise<void>;
    update(parkedCar: ParkedCar): Promise<void>;
    get(plate: string): Promise<ParkedCar>;
}