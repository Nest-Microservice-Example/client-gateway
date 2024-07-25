import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { NATS_SERVICE } from '../config';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { PaginationDto } from '../common';
import { ChangeOrderStatusDto, CreateOrderDto } from './dto';

@Controller('orders')
export class OrdersController {
  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto): Promise<any> {
    try {
      const order = firstValueFrom(
        this.client.send('create_order', createOrderDto),
      );

      return order;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Get()
  findAll(@Query() query: PaginationDto) {
    try {
      const order = firstValueFrom(this.client.send('find_all_orders', query));

      return order;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const order = await firstValueFrom(
        this.client.send('find_one_order', { id }),
      );

      return order;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Post('change_status')
  changeStatus(@Body() changeStatusDto: ChangeOrderStatusDto): Promise<any> {
    try {
      const order = firstValueFrom(
        this.client.send('change_status_order', changeStatusDto),
      );

      return order;
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
