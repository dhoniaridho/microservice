import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PaginationQueryDto } from 'src/common/dtos/pagination-query.dto';
import { PaginatedEntity } from 'src/common/entities/paginated.entity';
import { PrismaService } from 'src/platform/database/services/prisma.service';

export type Filter = {
  where?: Prisma.emailWhereInput;
  orderBy?: Prisma.emailOrderByWithRelationInput;
  cursor?: Prisma.emailWhereUniqueInput;
  take?: number;
  skip?: number;
  include?: Prisma.emailInclude;
};

@Injectable()
export class EmailsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  public async paginate(paginateDto: PaginationQueryDto, filter?: Filter) {
    const { limit = 10, page = 1 } = paginateDto;

    const [data, count] = await this.prismaService.$transaction([
      this.prismaService.email.findMany({
        skip: (+page - 1) * +limit,
        take: +limit,
        where: filter?.where,
        orderBy: filter?.orderBy,
        cursor: filter?.cursor,
        include: filter?.include,
        skip: filter?.skip
      }),
      this.prismaService.email.count({
        where: filter?.where,
      }),
    ]);

    return new PaginatedEntity(data, {
      limit,
      page,
      totalData: count,
    });
  }

  public async create(data: Prisma.emailCreateInput) {
    return this.prismaService.email.create({ data });
  }

  public async update(
    where: Prisma.emailWhereUniqueInput,
    data: Prisma.emailUpdateInput,
  ) {
    return this.prismaService.email.update({ where, data });
  }

  public async delete(
    where: Prisma.emailWhereUniqueInput,
  ) {
    return this.prismaService.email.update({
      where,
      data: { deletedAt: new Date() },
    });
  }

  public async first(
    where: Prisma.emailWhereUniqueInput,
    select?: Prisma.emailSelect,
  ) {
    return this.prismaService.email.findUnique({ where, select });
  }

  public async firstOrThrow(
    where: Prisma.emailWhereUniqueInput,
    select?: Prisma.emailSelect,
  ) {
    const data = await this.prismaService.email.findUnique({ where, select });
    if(!data) throw new Error('data.not_found');
    return data;
  }

  public async find(filter: Filter) {
    return this.prismaService.email.findMany(filter);
  }

  public async count(filter: Omit<Filter, 'include'>) {
    return this.prismaService.email.count(filter);
  }

  public async any(filter: Omit<Filter, 'include'>) {
    return (await this.prismaService.email.count(filter)) > 0;
  }
}
