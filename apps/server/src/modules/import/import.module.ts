import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImportController } from './import.controller';
import { ImportService } from './import.service';
import { GeminiService } from './gemini.service';
import { ImportMapping } from '../../model/importMapping.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ImportMapping])],
  controllers: [ImportController],
  providers: [ImportService, GeminiService],
})
export class ImportModule {}
