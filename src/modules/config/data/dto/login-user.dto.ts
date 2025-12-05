import {ApiProperty} from "@nestjs/swagger";
import {IsEmail, IsString, MinLength} from "class-validator";
import { faker } from '@faker-js/faker';

export class LoginUserDto {
    @ApiProperty({ example: faker.internet.email().toLowerCase() })
    @IsEmail()
    email    : string;

    @ApiProperty({example: "vSJps/f8TD+m7aQighztXA=="})
    @IsString()
    @MinLength(6)
    password : string;
}