import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {Logger, ValidationPipe} from '@nestjs/common';
import {RpcCustomExceptionFilter} from './common';
import {RequestMethod} from "@nestjs/common/enums/request-method.enum";

const validationPipe = new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
});

const rpcCustomExceptionFilter = new RpcCustomExceptionFilter();

async function bootstrap() {
    const logger = new Logger(AppModule.name);

    const app = await NestFactory.create(AppModule);

    app.setGlobalPrefix('api', {
        exclude: [{
            path: '',
            method: RequestMethod.GET
        }],
    });

    app.useGlobalPipes(validationPipe);

    app.useGlobalFilters(rpcCustomExceptionFilter);

    await app.listen(AppModule.PORT);

    logger.log(`Gateway running on port ${AppModule.PORT}`);
}

bootstrap();
