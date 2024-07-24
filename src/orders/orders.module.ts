import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigEnum, MicroserviceConfig, ORDER_SERVICE } from '../config';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: ORDER_SERVICE,
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => {
          const microservice = configService.get<MicroserviceConfig>(
            ConfigEnum.ORDER_MICROSERVICE,
          );

          return {
            transport: Transport.TCP,
            options: {
              host: microservice.host,
              port: microservice.port,
            },
          };
        },
      },
    ]),
  ],
  controllers: [OrdersController],
})
export class OrdersModule {}
