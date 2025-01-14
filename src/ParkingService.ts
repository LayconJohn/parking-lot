import ParkedCarDAO from "./ParkedCarDAO";

export default class ParkingService {
    

    constructor(
        readonly parkedCarDAO: ParkedCarDAO
        ){

    }

    async checkin(plate: string, checkinDate: Date) {
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