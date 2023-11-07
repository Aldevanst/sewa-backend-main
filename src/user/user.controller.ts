import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll() {
    const allUserDto = await this.userService.findAll();
    return allUserDto;
  }

  @Get('/:id')
  async findOneById(@Param('id') id: string) {
    const userId = await this.userService.findOneById(+id);
    return userId;
  }

  @Get('email/:email')
  async findOneByEmail(@Param('email') email: string) {
    const userEmail = await this.userService.findOneByEmail(email);
    return userEmail;
  }

  @Get('number/:number')
  async findOneByCallNumber(@Param('number') callNumber: string) {
    const userNumber = await this.userService.findOneByCallNumber(callNumber)
    return userNumber;
  }

  @Get('name/:name')
  async findOneByName(@Param('name') name: string) {
    const userName = await this.userService.findOneByName(name)
    return userName;
  }
  
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const createdUserDto = await this.userService.create(createUserDto);
    return createdUserDto;
  }
  
  @Patch(':id/update')
  async update(@Param('id') id: string, 
  @Body() updateUserDto: UpdateUserDto) {
    const updatedUserDto = await this.userService.update(+id, updateUserDto);
    return updatedUserDto;
  }

  @Delete(':id/remove')
  async remove(@Param('id') id: string) {
    const removedUserDto = this.userService.remove(+id);
    return removedUserDto;
  }
}

