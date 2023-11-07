import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { UserProviders } from './user.providers';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule,TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [...UserProviders,UserService],
})
export class UserModule {}
