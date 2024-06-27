import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ENV } from 'src/config/env';
import * as services from './services.constant';

@Module({
  imports: [
    ClientsModule.register({
      clients: Object.values(services).map((service) => ({
        name: service,
        transport: Transport.RMQ,
        options: {
          urls: [ENV.RMQ_URL],
          queue: service,
          queueOptions: {
            durable: false,
          },
        },
      })),
    }),
  ],
  exports: [
    ClientsModule.register({
      clients: Object.values(services).map((service) => ({
        name: service,
        transport: Transport.RMQ,
        options: {
          urls: [ENV.RMQ_URL],
          queue: service,
          queueOptions: {
            durable: false,
          },
        },
      })),
    }),
  ],
})
export class ServicesModule {}
