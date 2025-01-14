import ParkedCarDAO from "./ParkedCarRepository";
import Period from "./Period";

export default class CheckOut {
    constructor(
        readonly workingHours: Period,
        readonly parkedCarDAO: ParkedCarDAO
        ){}

    async execute(plate: string, checkoutDate: Date) {
        const parkedCar = await this.parkedCarDAO.get(plate);
        if(!parkedCar) throw new Error(`${plate} not parked`);
        parkedCar.checkout(checkoutDate)
        
        await this.parkedCarDAO.update(parkedCar);
        return {
            price: parkedCar.price
        }
    }
}