import ParkedCar from "./ParkedCar";
import ParkedCarDAO from "./ParkedCarDAO";
import Period from "./Period";
import Plate from "./Plate";

export default class ParkingService {
    constructor(
        readonly workingHours: Period,
        readonly parkedCarDAO: ParkedCarDAO
        ){

        }

    async checkin(plate: string, checkinDate: Date) {
        if(this.workingHours.isOutOfPeriod(checkinDate)) throw new Error("Parking lot is closed");

        const parkedCar = new ParkedCar(plate, checkinDate);  
        await this.parkedCarDAO.save(parkedCar);

    }

    async checkout(plate: string, checkoutDate: Date) {
        const parkedCar = await this.parkedCarDAO.get(plate);
        if(!parkedCar) throw new Error(`${plate} not parked`);
        parkedCar.checkout(checkoutDate)
        
        await this.parkedCarDAO.update(parkedCar);
        return {
            price: parkedCar.price
        }
    }
}