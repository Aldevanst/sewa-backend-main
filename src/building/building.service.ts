import { Injectable,Inject } from '@nestjs/common';
import { CreateBuildingDto } from './dto/create-building.dto';
import { UpdateBuildingDto } from './dto/update-building.dto';
import { BuildingEntity } from './entities/building.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BuildingService {
  constructor(@Inject('USER_REPOSITORY')
    private buildingRepository: Repository<BuildingEntity>,
  ) {}
  create(createBuildingDto: CreateBuildingDto): Promise<CreateBuildingDto> {
    const newBuilding = new BuildingEntity();
    newBuilding.buildingName = createBuildingDto.buildingName;
    newBuilding.buildingAddress = createBuildingDto.buildingAddress;
    newBuilding.price = createBuildingDto.price;

    const promiseCreate = new Promise<CreateBuildingDto> 
    ((resolve, reject) => {
      this.buildingRepository.save(newBuilding).then(resultBuilding =>{
        if (resultBuilding != null) {
        let createdbuildinglist = new CreateBuildingDto();
        createdbuildinglist.buildingName = resultBuilding.buildingName
        createdbuildinglist.buildingAddress = resultBuilding.buildingAddress
        createdbuildinglist.price = resultBuilding.price

        resolve(createBuildingDto);
         } else {
          reject('Failed')
         }
      }
     )
    }
    
    ) 

    return promiseCreate;
  }

  findAll() {
    return `This action returns all building`;
  }

  findOneByBuildingId(id: number) {
    return `This action returns a #${id} building`;
  }

  FindObeVyPrice(id: number, updateBuildingDto: UpdateBuildingDto) { //gausah dulu
    return `This action updates a #${id} building`;
  }

  update(id: number) {
    return `This action removes a #${id} building`;
  }

  remove(id: number) {
    return `This action removes a #${id} building`;
  }
}
