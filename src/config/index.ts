import { Config } from './config.type';

export * from './config.type';
export * from './config.enum';
export * from './services';

export default (): Config => ({
  port: parseInt(process.env.PORT || '3000', 10),
  nats: process.env.NATS_SERVERS.split(','),
});
