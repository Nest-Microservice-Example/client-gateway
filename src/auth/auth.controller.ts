import {Controller, Inject, Post} from '@nestjs/common';
import {AuthService} from './auth.service';
import {NATS_SERVICE} from "../config";
import {ClientProxy} from "@nestjs/microservices";

@Controller('auth')
export class AuthController {
    constructor(
        @Inject(NATS_SERVICE) private readonly client: ClientProxy
    ) {
    }

    @Post('register')
    public register() {
        return this.client.send('auth.user.register', {})
    }

    @Post('login')
    public login() {
        return this.client.send('auth.user.login', {})
    }

    @Post('verify')
    public verify() {
        return this.client.send('auth.user.verify', {})
    }
}
