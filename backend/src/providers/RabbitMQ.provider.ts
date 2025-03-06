import { ConfigService } from '@nestjs/config';
import { ClientsModule, RmqOptions, Transport } from '@nestjs/microservices';

export const GIT_CRM_SERVICE = 'GIT_CRM_SERVICE';
export const GitCrmServiceProvider = ClientsModule.registerAsync({
  isGlobal: true,
  clients: [
    {
      name: GIT_CRM_SERVICE,
      useFactory: (configService: ConfigService) =>
        ({
          transport: Transport.RMQ,
          options: {
            urls: [configService.getOrThrow('rabbitMQ.url')],
            queue: 'gitcrm',
            queueOptions: {
              durable: false,
            },
          },
        }) as RmqOptions,
      inject: [ConfigService],
    },
  ],
});
