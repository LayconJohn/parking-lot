// Table Data Gateway => DAO
export default interface ParkedCarDAO {
    save(parkedCar: any): Promise<void>;
    update(parkedCar: any): Promise<void>;
    get(plate: string): Promise<any>;
}