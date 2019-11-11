import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import * as config from 'config';

async function bootstrap() {
  const logger = new Logger('bootstrap');
  const serverConfig = config.get('server');

  const app = await NestFactory.create(AppModule);
  const  port = process.env.port || serverConfig.port;
  await app.listen(port);
  logger.verbose(`Application listening on port ${port}`);
}
bootstrap();
