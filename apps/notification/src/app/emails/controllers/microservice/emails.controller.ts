import { Controller, HttpStatus } from '@nestjs/common';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { EmailsRepository, type Filter } from 'src/app/emails/repositories';
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
export class EmailsMicroserviceController {
  constructor(
    private readonly emailService: EmailsService,
    private readonly emailRepository: EmailsRepository,
  ) {}

  @MessagePattern('email.create')
  public async create(@Payload() createEmailsDto: CreateEmailsDto) {
    try {
      console.log(createEmailsDto);
      const data = await this.emailService.create(createEmailsDto);
      return new ResponseEntity({
        data,
        message: 'success',
      });
    } catch (error) {
      throw new RpcException(
        new ResponseEntity({
          status: HttpStatus.BAD_REQUEST,
          message: error.message,
        }),
      );
    }
  }

  @MessagePattern('email.find')
  public async find(@Payload() filter: Omit<Filter, 'include'>) {
    return this.emailRepository.find(filter);
  }

  @MessagePattern('email.paginate')
  public async index(@Payload() paginateDto: PaginationQueryDto) {
    try {
      const data = await this.emailService.paginate(paginateDto);
      return new ResponseEntity({
        data,
        message: 'success',
      });
    } catch (error) {
      throw new RpcException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @MessagePattern('email.detail')
  public async detail(@Payload('id') id: string) {
    try {
      const data = await this.emailService.detail(id);

      return new ResponseEntity({
        data,
        message: 'success',
      });
    } catch (error) {
      throw new RpcException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @MessagePattern('email.destroy')
  public async destroy(@Payload('id') id: string) {
    try {
      const data = await this.emailService.destroy(id);
      return new ResponseEntity({
        data,
        message: 'success',
      });
    } catch (error) {
      throw new RpcException(
        new ResponseEntity({
          status: HttpStatus.BAD_REQUEST,
          message: error.message,
        }),
      );
    }
  }

  @MessagePattern(':id')
  public async update(
    @Payload('id') id: string,
    @Payload() updateEmailsDto: UpdateEmailsDto,
  ) {
    try {
      const data = await this.emailService.update(id, updateEmailsDto);
      return new ResponseEntity({
        data,
        message: 'success',
      });
    } catch (error) {
      throw new RpcException(
        new ResponseEntity({
          status: HttpStatus.BAD_REQUEST,
          message: error.message,
        }),
      );
    }
  }
}
