import { Global, Module } from '@nestjs/common';
import { AppModule } from './app/app.module';
import { DatabaseModule } from './platform/database/database.module';
import { ServicesModule } from './services/services.module';

@Global()
@Module({
  imports: [AppModule, DatabaseModule, ServicesModule],
  controllers: [],
  providers: [],
  exports: [DatabaseModule, ServicesModule],
})
export class MainModule {}
