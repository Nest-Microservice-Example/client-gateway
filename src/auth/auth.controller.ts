import {Body, Controller, Get, Inject, Post, Req, Res, UseGuards} from '@nestjs/common';
import {NATS_SERVICE} from "../config";
import {ClientProxy, RpcException} from "@nestjs/microservices";
import {LoginUserDto, RegisterUserDto} from "./dto";
import {firstValueFrom} from "rxjs";
import {Request} from 'express'
import {AuthGuard} from "./guard";
import {Token, User} from "./decorators";
import {UserPayload} from "./interfaces";

@Controller('auth')
export class AuthController {
    constructor(
        @Inject(NATS_SERVICE) private readonly client: ClientProxy
    ) {
    }

    @Post('register')
    public async register(@Body() registerUserDto: RegisterUserDto) {
        try {
            const resp = await firstValueFrom(this.client.send('auth.user.register', registerUserDto))

            return resp
        } catch (error) {
            throw new RpcException(error);
        }
    }

    @Post('login')
    public async login(@Body() loginUserDto: LoginUserDto) {
        try {
            const resp = await firstValueFrom(this.client.send('auth.user.login', loginUserDto))

            return resp
        } catch (err) {
            console.log(err)
            throw new RpcException(err?.error || err);
        }
    }

    @UseGuards(AuthGuard)
    @Get('verify')
    public async verify(@User() user: UserPayload, @Token() token: string) {
        try {
            return {
                user,
                token
            }
        } catch (error) {
            throw new RpcException(error);
        }
    }
}
