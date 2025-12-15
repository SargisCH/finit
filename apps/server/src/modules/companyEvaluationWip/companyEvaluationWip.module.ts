import { Module } from '@nestjs/common';
import { CompanyEvaluationWipController } from './companyEvaluationWip.controller';
import { CompanyEvaluationWipService } from './companyEvaluationWip.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ValuationWip } from 'src/model/valuationWip.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ValuationWip]), // ← Add this here!
  ],
  controllers: [CompanyEvaluationWipController],
  providers: [CompanyEvaluationWipService],
})
export class CompanyEvaluationWipModule {}
