import {
    createParamDecorator,
    ExecutionContext,
    InternalServerErrorException,
    UnauthorizedException
} from '@nestjs/common';

export const Token = createParamDecorator(
    (data: string, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();

        if (!request.token) {
            throw new InternalServerErrorException('Token not found in request');
        }

        return request.token;
    },
);