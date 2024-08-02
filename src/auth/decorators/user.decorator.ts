import {
    createParamDecorator,
    ExecutionContext,
    InternalServerErrorException,
    UnauthorizedException
} from '@nestjs/common';

export const User = createParamDecorator(
    (data: string, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();

        if (!request.user) {
            throw new InternalServerErrorException('User not found in request');
        }

        return request.user;
    },
);