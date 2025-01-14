export default class Plate {
    readonly value: string;

    constructor(plate: string){
        if(!plate.match(/[A-Z]{3}[0-9]{4}/)) throw new Error("Invalid plate");
        
        this.value =plate;
    }
}