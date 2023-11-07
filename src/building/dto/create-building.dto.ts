import { IsNotEmpty } from "class-validator";

export class CreateBuildingDto {
    
    @IsNotEmpty()
    buildingName: string;
    
    @IsNotEmpty()
    buildingAddress: string;
    
    @IsNotEmpty()
    price: string;

}
