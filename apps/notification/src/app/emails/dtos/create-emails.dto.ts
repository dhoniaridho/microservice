import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateEmailsDto {
  @ApiProperty()
  @IsString()
  name: string;
}
