import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from '../configuration';
import { CompanyEvaluationModule } from './companyEvaluation/companyEvaluation.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    CompanyEvaluationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
