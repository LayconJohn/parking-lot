
export default class ParkingService {
    parkedCars: any = {}

    constructor(
        
        ){

    }

    async checkin(plate: string, checkinDate: Date) {
        if(!plate.match(/[A-Z]{3}[0-9]{4}/)) throw new Error("Invalid plate")
        this.parkedCars[plate] = { 
            plate,
            checkinDate
        };
    }

    async checkout(plate: string, checkoutDate: Date) {
        const parkedCar = this.parkedCars[plate];
        if(!parkedCar) throw new Error(`${plate} not parked`);
        const duration = (checkoutDate.getTime() - parkedCar.checkinDate.getTime()) / (1000 * 60 * 60); 
        const price = duration * 10;
        return {
            price
        }
    }
}