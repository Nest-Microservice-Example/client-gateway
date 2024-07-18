import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigEnum, MicroserviceConfig, PRODUCT_SERVICE } from '../config';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: PRODUCT_SERVICE,
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => {
          const microservice = configService.get<MicroserviceConfig>(
            ConfigEnum.PRODUCT_MICROSERVICE,
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
  controllers: [ProductsController],
})
export class ProductsModule {}
