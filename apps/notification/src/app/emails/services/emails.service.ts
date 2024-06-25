import { Injectable } from '@nestjs/common';
import { EmailsRepository } from '../repositories';
import { PaginationQueryDto } from 'src/common/dtos/pagination-query.dto';
import { CreateEmailsDto, UpdateEmailsDto } from '../dtos';

@Injectable()
export class EmailsService {
  constructor(private readonly emailRepository: EmailsRepository) {}

  public paginate(paginateDto: PaginationQueryDto) {
    return this.emailRepository.paginate(paginateDto);
  }

  public detail(id: string) {
    try {
      return this.emailRepository.firstOrThrow({
        id,
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  public async destroy(id: string) {
    try {
      return this.emailRepository.delete({
        id,
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  public async create(createEmailsDto: CreateEmailsDto) {
    try {
      return this.emailRepository.create(createEmailsDto);
    } catch (error) {
      throw new Error(error);
    }
  }

  public async update(id: string, updateEmailsDto: UpdateEmailsDto) {
    try {
      return this.emailRepository.update({ id }, updateEmailsDto);
    } catch (error) {
      throw new Error(error);
    }
  }
}
