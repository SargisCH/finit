import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { configService } from './configuration';
async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bodyParser: true });
  app.enableCors({
    origin: ['http://localhost:5173', configService.getAppUrl()],
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
