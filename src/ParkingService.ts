import ParkedCarDAO from "./ParkedCarDAO";

export default class ParkingService {
    OPEN_HOUR = 8;
    CLOSE_HOUR = 22;

    constructor(
        readonly parkedCarDAO: ParkedCarDAO
        ){}

    async checkin(plate: string, checkinDate: Date) {
        if(checkinDate.getHours() < this.OPEN_HOUR || checkinDate.getHours() > this.CLOSE_HOUR) throw new Error("Parking lot is closed")
        if(!plate.match(/[A-Z]{3}[0-9]{4}/)) throw new Error("Invalid plate")
        const parkedCar = {
            plate,
            checkinDate
        }    
        await this.parkedCarDAO.save(parkedCar);

    }

    async checkout(plate: string, checkoutDate: Date) {
        
        const parkedCar = await this.parkedCarDAO.get(plate);
        if(!parkedCar) throw new Error(`${plate} not parked`);
        parkedCar.checkoutDate = checkoutDate;
        parkedCar.duration = (parkedCar.checkoutDate.getTime() - parkedCar.checkinDate.getTime()) / (1000 * 60 * 60); 
        parkedCar.price = parkedCar.duration * 10;
        await this.parkedCarDAO.update(parkedCar);
        return {
            price: parkedCar.price
        }
    }
}