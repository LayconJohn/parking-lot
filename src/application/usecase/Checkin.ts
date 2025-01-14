import ParkedCar from "../../domain/ParkedCar";
import Period from "../../domain/Period";
import ParkedCarRepository from "../repository/ParkedCarRepository";

export default class CheckIn {
    constructor(
        readonly workingHours: Period,
        readonly parkedCarRepository: ParkedCarRepository
        ){ }

    async execute(plate: string, checkinDate: Date) {
        if(this.workingHours.isOutOfPeriod(checkinDate)) throw new Error("Parking lot is closed");

        const parkedCar = new ParkedCar(plate, checkinDate);  
        await this.parkedCarRepository.save(parkedCar);
    }

}