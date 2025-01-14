import Period from "../../domain/Period";
import ParkedCarRepository from "../repository/ParkedCarRepository";

export default class CheckOut {
    constructor(
        readonly workingHours: Period,
        readonly parkedCarRepository: ParkedCarRepository
        ){}

    async execute(plate: string, checkoutDate: Date) {
        const parkedCar = await this.parkedCarRepository.get(plate);
        if(!parkedCar) throw new Error(`${plate} not parked`);
        parkedCar.checkout(checkoutDate)
        
        await this.parkedCarRepository.update(parkedCar);
        return {
            price: parkedCar.price
        }
    }
}