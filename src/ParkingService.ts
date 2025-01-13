export default class ParkingService {
    parkedCars: any = {}

    constructor(){

    }

    async checkin(plate: string) {
        this.parkedCars[plate] = { 
            plate,
            checkinDate: new Date()
        };
    }

    async checkout(plate: string) {
        const parkedCar = this.parkedCars[plate];
        // if(!parkedCar) throw new Error(`${plate} not parked`);
        const checkoutDate = new Date();
        const duration = (checkoutDate.getTime() - parkedCar.checkinDate.getTime()) / (1000 * 60 * 60); 
        const price = duration * 10;
        return {
            price
        }
    }
}