import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { PRODUCT_SERVICE } from '../config';
import { PaginationDto } from '../common';
import { CreateProductDto, UpdateProductDto } from './dto';

@Controller('products')
export class ProductsController {
  constructor(
    @Inject(PRODUCT_SERVICE) private readonly productsClient: ClientProxy,
  ) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto): Promise<any> {
    try {
      const product = firstValueFrom(
        this.productsClient.send({ cmd: 'create_product' }, createProductDto),
      );

      return product;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Get()
  findAll(@Query() query: PaginationDto) {
    try {
      const product = firstValueFrom(
        this.productsClient.send({ cmd: 'find_all_products' }, query),
      );

      return product;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    try {
      const product = await firstValueFrom(
        this.productsClient.send({ cmd: 'find_one_products' }, { id }),
      );

      return product;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    try {
      const product = firstValueFrom(
        this.productsClient.send(
          { cmd: 'update_product' },
          { id, ...updateProductDto },
        ),
      );

      return product;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    try {
      const product = firstValueFrom(
        this.productsClient.send({ cmd: 'delete_product' }, { id }),
      );

      return product;
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
