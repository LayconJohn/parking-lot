export default class Period {
    start: Date;
    end: Date;

    constructor(start: Date, end: Date) {
        if(start.getTime() > end.getTime()) throw new Error("start must be before end");
        this.start = start;
        this.end = end;
    }

    getDurationInHours() {
        return (this.end.getTime() - this.start.getTime()) / (1000 * 60 * 60); 
    }

    isOutOfPeriod(date: Date) {
        if(date.getTime() < this.start.getTime()) return true;
        if(date.getTime() > this.end.getTime()) return true;
        return false;
    }
}