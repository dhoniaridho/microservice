import { PartialType } from '@nestjs/mapped-types';
import { CreateEmailsDto } from './create-emails.dto';

export class UpdateEmailsDto extends PartialType(CreateEmailsDto) {}
