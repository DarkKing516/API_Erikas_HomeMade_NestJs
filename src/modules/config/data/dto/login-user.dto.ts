import {ApiProperty} from "@nestjs/swagger";
import {IsEmail} from "class-validator";
import { faker } from '@faker-js/faker';

export class LoginUserDto {
    @ApiProperty({ example: faker.internet.email().toLowerCase() })
    @IsEmail()
    email    : string;
}