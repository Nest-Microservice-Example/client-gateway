import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

@Catch(RpcException)
export class RpcCustomExceptionFilter implements ExceptionFilter {
  catch(exception: RpcException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const rpcError = exception.getError();

    const timestamp = new Date().toISOString();
    console.log(rpcError)
    if (
      typeof rpcError === 'object' &&
      'status' in rpcError &&
      'message' in rpcError
    ) {
      const status = isNaN(+rpcError.status)
        ? HttpStatus.BAD_REQUEST
        : +rpcError.status;

      response.status(status).json({
        status,
        timestamp,
        message: rpcError.message,
      });
    }

    const status = HttpStatus.BAD_REQUEST;

    response.status(status).json({
      status,
      timestamp,
      message: rpcError,
    });
  }
}
