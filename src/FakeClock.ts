import Clock from "./Clock";

export default class FakeClock implements Clock {
    currentDate: Date = new Date();

    getCurrentDate(): Date {
        return this.currentDate;
    }

    setCurrentDate(date: Date) {
        this.currentDate = date;
    }
}