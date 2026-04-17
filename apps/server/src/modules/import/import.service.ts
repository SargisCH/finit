import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ImportMapping } from '../../model/importMapping.entity';
import { GeminiService, AnalysisResult } from './gemini.service';
import * as xlsx from 'xlsx';

@Injectable()
export class ImportService {
  constructor(
    @InjectRepository(ImportMapping)
    private importMappingRepository: Repository<ImportMapping>,
    private geminiService: GeminiService,
  ) {}

  async saveCategorization(categorization: any, name?: string) {
    const mapping = new ImportMapping();
    mapping.categorization = categorization;
    mapping.name = name;
    return this.importMappingRepository.save(mapping);
  }

  async saveMapping(fieldMapping: any, name?: string) {
    const mapping = new ImportMapping();
    mapping.fieldMapping = fieldMapping;
    mapping.name = name;
    return this.importMappingRepository.save(mapping);
  }

  async extractHeaders(file: Express.Multer.File): Promise<string[]> {
    if (!file) {
      throw new BadRequestException('File is required');
    }

    const workbook = xlsx.read(file.buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const jsonData = xlsx.utils.sheet_to_json(sheet, { header: 1 });

    if (jsonData.length === 0) {
      return [];
    }

    return jsonData[0] as string[];
  }

  private parseRows(file: Express.Multer.File): Record<string, any>[] {
    const workbook = xlsx.read(file.buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    return xlsx.utils.sheet_to_json(sheet) as Record<string, any>[];
  }

  async analyzeExpenses(
    file: Express.Multer.File,
    fieldMapping?: Record<string, string>,
  ): Promise<AnalysisResult> {
    const rows = this.parseRows(file);
    if (rows.length === 0) throw new BadRequestException('File has no data rows');

    const result = await this.geminiService.analyzeExpenses(rows, fieldMapping);

    const mapping = new ImportMapping();
    mapping.name = file.originalname;
    mapping.fieldMapping = fieldMapping as any;
    mapping.categorization = result;
    await this.importMappingRepository.save(mapping);

    return result;
  }
}
