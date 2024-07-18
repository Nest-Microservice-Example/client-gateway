import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import config, { ConfigEnum } from './config';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
    }),
    ProductsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  public static PORT: number;

  constructor(private readonly _config: ConfigService) {
    AppModule.PORT = this._config.get<number>(ConfigEnum.PORT);
  }
}
