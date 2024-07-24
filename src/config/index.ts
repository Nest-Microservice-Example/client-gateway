import { Config } from './config.type';

export * from './config.type';
export * from './config.enum';
export * from './services';

export default (): Config => ({
  port: parseInt(process.env.PORT || '3000', 10),
  microservice: {
    products: {
      port: parseInt(process.env.PRODUCTS_MICROSERVICE_PORT || '3001', 10),
      host: process.env.PRODUCTS_MICROSERVICE_HOST,
    },
    orders: {
      port: parseInt(process.env.ORDERS_MICROSERVICE_PORT || '3002', 10),
      host: process.env.ORDERS_MICROSERVICE_HOST,
    },
  },
});
