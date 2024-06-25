import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { EmailsService } from 'src/app/emails/services';
import { PaginationQueryDto } from 'src/common/dtos/pagination-query.dto';
import { ResponseEntity } from 'src/common/entities/response.entity';
import { CreateEmailsDto, UpdateEmailsDto } from 'src/app/emails/dtos';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Emails')
@Controller({
  path: 'email',
  version: '1',
})
export class EmailsHttpController {
  constructor(private readonly emailService: EmailsService) {}

  @Post()
  public async create(@Body() createEmailsDto: CreateEmailsDto) {
    try {
      const data = await this.emailService.create(createEmailsDto);
      return new ResponseEntity({
        data,
        message: 'success',
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  public async index(@Query() paginateDto: PaginationQueryDto) {
    try {
      const data = await this.emailService.paginate(paginateDto);
      return new ResponseEntity({
        data,
        message: 'success',
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @Get(':id')
  public async detail(@Param('id') id: string) {
    try {
      const data = await this.emailService.detail(id);

      return new ResponseEntity({
        data,
        message: 'success',
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @Delete(':id')
  public async destroy(@Param('id') id: string) {
    try {
      const data = await this.emailService.destroy(id);
      return new ResponseEntity({
        data,
        message: 'success',
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Put(':id')
  public async update(
    @Param('id') id: string,
    @Body() updateEmailsDto: UpdateEmailsDto,
  ) {
    try {
      const data = await this.emailService.update(id, updateEmailsDto);
      return new ResponseEntity({
        data,
        message: 'success',
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
