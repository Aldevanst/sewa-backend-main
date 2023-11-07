import { Column, PrimaryGeneratedColumn } from "typeorm";

export class BuildingEntity {
    
    @PrimaryGeneratedColumn({type: 'int'})
    idBuilding: number;

    @Column({type: 'varchar', length: 50})
    buildingName: string;
    
    @Column({type: 'varchar', length: 50})
    buildingAddress: string;
    
    @Column({type: 'varchar',length: 50 })
    price: string;
}
