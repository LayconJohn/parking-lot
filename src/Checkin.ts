import ParkedCar from "./ParkedCar";
import ParkedCarDAO from "./ParkedCarRepository";
import Period from "./Period";

export default class CheckIn {
    constructor(
        readonly workingHours: Period,
        readonly parkedCarDAO: ParkedCarDAO
        ){ }

    async execute(plate: string, checkinDate: Date) {
        if(this.workingHours.isOutOfPeriod(checkinDate)) throw new Error("Parking lot is closed");

        const parkedCar = new ParkedCar(plate, checkinDate);  
        await this.parkedCarDAO.save(parkedCar);
    }

}