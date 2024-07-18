export type MicroserviceConfig = {
  port: number;
  host: string;
};

export type Config = {
  port: number;
  microservice: {
    products: MicroserviceConfig;
  };
};
