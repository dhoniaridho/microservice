import { Module } from '@nestjs/common';
import { EmailsHttpController, EmailsMicroserviceController } from './controllers';
import { EmailsService } from './services';
import { EmailsRepository } from './repositories';

@Module({
  controllers: [EmailsHttpController, EmailsMicroserviceController],
  providers: [EmailsService, EmailsRepository],
})
export class EmailsModule {}
