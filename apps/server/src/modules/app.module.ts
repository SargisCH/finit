import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from '../configuration';
import { CompanyEvaluationModule } from './companyEvaluation/companyEvaluation.module';
import { CompanyEvaluationWipModule } from './companyEvaluationWip/companyEvaluationWip.module';
console.log('asdas', configService.getTypeOrmConfig());
@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    CompanyEvaluationModule,
    CompanyEvaluationWipModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
