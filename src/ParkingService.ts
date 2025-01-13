import Clock from "./Clock";

export default class ParkingService {
    parkedCars: any = {}

    constructor(
        readonly clock: Clock
        ){

    }

    async checkin(plate: string) {
        const checkinDate = this.clock.getCurrentDate()
        this.parkedCars[plate] = { 
            plate,
            checkinDate
        };
    }

    async checkout(plate: string) {
        const parkedCar = this.parkedCars[plate];
        // if(!parkedCar) throw new Error(`${plate} not parked`);
        const checkoutDate = this.clock.getCurrentDate();
        const duration = (checkoutDate.getTime() - parkedCar.checkinDate.getTime()) / (1000 * 60 * 60); 
        const price = duration * 10;
        return {
            price
        }
    }
}