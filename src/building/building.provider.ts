import { BuildingEntity } from "./entities/building.entity";
import { DataSource } from "typeorm";

export const buildingProvider = [ {
    provider: 'BUILDING_REPOSITORY',
    useFactory: (DataSource: DataSource) => DataSource.getRepository(BuildingEntity),
    inject: ['DATA_SOURCE'],
} ]