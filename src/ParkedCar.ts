import Period from "./Period";
import Plate from "./Plate";

export default class ParkedCar {
    plate: Plate;
    checkinDate: Date;
    checkoutDate?: Date;
    period?: Period;
    PRICE_PER_HOUR = 10;
    price?: number;

    constructor(plate: string, checkinDate: Date){
        this.plate = new Plate(plate);
        this.checkinDate = checkinDate;
    }

    checkout(checkoutDate: Date) {
        this.checkoutDate = checkoutDate;
        this.period = new Period(this.checkinDate, this.checkoutDate);
        this.price = this.calculatePrice();
    }

    calculatePrice() {
        if(!this.period) throw new Error("Period not initialized")
        return this.period?.getDurationInHours() * this.PRICE_PER_HOUR;
    }
}