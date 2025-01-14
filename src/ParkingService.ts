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

        const parkedCar = {
            plate: new Plate(plate),
            checkinDate
        }    
        await this.parkedCarDAO.save(parkedCar);

    }

    async checkout(plate: string, checkoutDate: Date) {
        const parkedCar = await this.parkedCarDAO.get(plate);
        if(!parkedCar) throw new Error(`${plate} not parked`);
        parkedCar.checkoutDate = checkoutDate;
        const period = new Period(parkedCar.checkinDate, parkedCar.checkoutDate)
        parkedCar.duration = period.getDurationInHours();
        parkedCar.price = parkedCar.duration * 10;
        await this.parkedCarDAO.update(parkedCar);
        return {
            price: parkedCar.price
        }
    }
}