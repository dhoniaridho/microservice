import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ENV } from 'src/config/env';

const services = [
  ClientsModule.register({
    clients: [
      {
        name: ENV.MS.NOTIFICATION,
        transport: Transport.RMQ,
        options: {
          urls: [ENV.RMQ_URL],
          queue: ENV.MS.NOTIFICATION,
          queueOptions: {
            durable: false,
          },
        },
      },
    ],
  }),
];

@Module({
  imports: services,
  exports: services,
})
export class ServicesModule {}
