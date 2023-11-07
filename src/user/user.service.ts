import { Inject,Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { Equal } from 'typeorm';

@Injectable()
export class UserService {
  
  constructor(@Inject('USER_REPOSITORY')
    private userRepository: Repository<UserEntity>,
  ) {}

  async findAll(): Promise<CreateUserDto[]> {
    const returnPromise = new Promise<CreateUserDto[]> (
      (resolve, reject) => {
        this.userRepository.find().then(resultData => {
          if (resultData != null) {
            let allUserDto = [];

            resultData.forEach(data => {
              let userDto = new CreateUserDto();
              userDto.email = data.email;
              userDto.name = data.name;
              userDto.password = null;
              userDto.callNumber = data.callNumber;

              allUserDto.push(userDto);
            });

            resolve(allUserDto);
          } else {
            reject("Failed to Fetch All User Data");
          }
        })        
      }
    )

    return returnPromise;
    
  }

  async findOneById(inputId: number): Promise<CreateUserDto> {
    const promisedId = new Promise<CreateUserDto> (
      (resolve, reject) => {   
        this.userRepository.findOne({
          where: {
            id: Equal(inputId),
          }
        }).then(resultData => {
          if (resultData != null) {
            let idDto = new CreateUserDto();
            idDto.email = resultData.email;
            idDto.name = resultData.name;
            idDto.password = null;
            idDto.callNumber = resultData.callNumber;

            resolve(idDto);
          } else {
            reject("Failed to Find Id User")
          }
        })        
      }
    )

    return promisedId;
  }

  async findOneByName(inputName: string): Promise<CreateUserDto> {
    const promisedName = new Promise<CreateUserDto> (
      (resolve, reject) => {   
        this.userRepository.findOne({
          where: {
            name: Equal(inputName),
          }
        }).then(resultData => {
          if (resultData != null) {
            let nameDto = new CreateUserDto();
            nameDto.name = resultData.name;
            nameDto.email = resultData.email;
            nameDto.password = null;
            nameDto.callNumber = resultData.callNumber;

            resolve(nameDto);
          } else {
            reject("Failed to Find Id User")
          }
        })        
      }
    )
    return promisedName;
  }

  async findOneByEmail(inputEmail: string): Promise<CreateUserDto> {
     const promisedEmail = new Promise<CreateUserDto> (
        (resolve,reject) => {this.userRepository.findOne({
        where: {
          email: Equal(inputEmail),
        },
      }).then(resultEmail => {
        if (resultEmail != null) {
          // objek DTO untuk hasil pencarian
          let emailDto = new CreateUserDto();
          emailDto.name = resultEmail.name;
          emailDto.email = resultEmail.email;
          emailDto.password = null; 
          emailDto.callNumber = resultEmail.callNumber;
      resolve(emailDto);
        } else {
          reject("failed to find Email User")
        }
      })
    
      
    })
    return promisedEmail;
  }
     
  async findOneByCallNumber(inputNumber: string): Promise<CreateUserDto> {
    const promisedNumber = new Promise<CreateUserDto> (
       (resolve,reject) => {this.userRepository.findOne({
       where: {
         callNumber: Equal(inputNumber),
       },
     }).then(resultNumber => {
       if (resultNumber != null) {
         // objek DTO untuk hasil pencarian
         let numberDto = new CreateUserDto();
         numberDto.name = resultNumber.name;
         numberDto.email = resultNumber.email;
         numberDto.password = null; 
         numberDto.callNumber = resultNumber.callNumber;

    resolve(numberDto);
       } else {
         reject("failed to find callnumber user")
       }
     })
   
     
   })
   return promisedNumber;
 }
  
  async create(createUserDto: CreateUserDto): Promise<CreateUserDto> {

    const newUser = new UserEntity();
    newUser.name = createUserDto.name;
    newUser.email = createUserDto.email;
    newUser.password = createUserDto.password;
    newUser.callNumber = createUserDto.callNumber;

    const returnPromise = new Promise<CreateUserDto> (
      (resolve, reject) => {
        this.userRepository.save(newUser).then(resultData => {
          if (resultData != null) {
            let createdUserDto = new CreateUserDto();
            createdUserDto.email = resultData.email;
            createdUserDto.name = resultData.name;
            createdUserDto.password = resultData.password;
            createdUserDto.callNumber = resultData.callNumber;

            resolve(createdUserDto);
          } else {
            reject("Failed to Create New User");
          }
        })        
      }
    )

    return returnPromise;
  }

  async update(inputId: number, updateUserDto: UpdateUserDto): Promise<CreateUserDto> {
    const existingUser = await this.userRepository.findOne({where: {
      id: Equal(inputId),
    }});
  
    if (!existingUser) {
      throw new Error("User not found");
    }
  
    if (updateUserDto.name) {
      existingUser.name = updateUserDto.name;
    }
  
    if (updateUserDto.email) {
      existingUser.email = updateUserDto.email;
    }
  
    if (updateUserDto.password) {
      existingUser.password = updateUserDto.password;
    }
    if (updateUserDto.callNumber) {
      existingUser.callNumber = updateUserDto.callNumber;
    }
  
    // Simpan perubahan ke dalam basis data
    const updatedUser = await this.userRepository.save(existingUser);
  
    // Buat objek DTO untuk hasil pembaruan
    const updatedUserDto = new CreateUserDto();
    updatedUserDto.email = updatedUser.email;
    updatedUserDto.name = updatedUser.name;
    updatedUserDto.password = updatedUser.password;
    updatedUserDto.callNumber = updatedUser.callNumber;
  
    return updatedUserDto;
  }

  async remove(inputId: number): Promise<CreateUserDto> {
    const returnPromise = new Promise<CreateUserDto> (
      (resolve, reject) => {
        this.userRepository.findOne({
          where: {
            id: Equal(inputId),
          }
        }).then(
          findResultData => {
            if (findResultData != null) {
              this.userRepository.remove(findResultData)
                .then(
                  removeResultData => {
                    if (removeResultData != null) {
                      let deletedUserDto = new CreateUserDto();
                      deletedUserDto.email = removeResultData.email;
                      deletedUserDto.name = removeResultData.name;
                      deletedUserDto.password = null;

                      resolve(deletedUserDto);
                    } else {
                      reject("Failed te Delete User Data");
                    }
                  }
                )
            } else {
              reject("Failed to Find User Data for Deletion")
            }
          }
        )
      }
    )

    return returnPromise;
  }
}