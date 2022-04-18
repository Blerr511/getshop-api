import * as dotenv from 'dotenv';
import { NestFactory } from '@nestjs/core';
import { Logger, NestApplicationOptions, ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { GetConfigService } from './config/get-config.service';
import { json, urlencoded } from 'body-parser';
import { useContainer as useClassValidatorContainer } from 'class-validator';
import passport from 'passport';
import session from 'express-session';

dotenv.config();

async function bootstrap(): Promise<void> {
  const logger = new Logger('NEST');

  const opt: NestApplicationOptions = {};

  const app = await NestFactory.create(AppModule, opt);

  useClassValidatorContainer(app.select(AppModule), { fallbackOnErrors: true });

  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ limit: '50mb', extended: true }));

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  app.setGlobalPrefix('/api');

  const configService = app.get(GetConfigService);

  app.enableCors({
    origin: configService.safeGet('CORS_ORIGIN'),
    credentials: true,
  });

  app.use(
    session({
      secret: configService.safeGet('SESSION_SECRET'),
      resave: true,
      saveUninitialized: true,
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());

  const swaggerConfig = new DocumentBuilder()
    .setTitle('GetShop')
    .setDescription('GetShop API description')
    .setVersion('1.0')
    .addTag('app')
    .addBearerAuth({ type: 'apiKey', name: 'Authorization', in: 'header' })
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup('api', app, document);

  await app.listen(configService.safeGet('PORT'));

  logger.log(
    `Swagger docs loaded on http://localhost:${configService.safeGet(
      'PORT',
    )}/api`,
  );
}

bootstrap();
