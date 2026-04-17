import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  UsePipes,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImportService } from './import.service';
import { ZodValidationPipe } from '../../common/pipes/validation.pipe';
import {
  importCategorizationSchema,
  importMappingRequestSchema,
} from '@shared/schemas';
import type {
  ImportCategorizationDto,
  ImportMappingRequestDto,
} from '@shared/schemas';

@Controller('import')
export class ImportController {
  constructor(private readonly importService: ImportService) {}

  @Post('categorization')
  @UsePipes(new ZodValidationPipe(importCategorizationSchema))
  async saveCategorization(@Body() body: ImportCategorizationDto) {
    return this.importService.saveCategorization(
      body.categorization,
      body.name,
    );
  }

  @Post('headers')
  @UseInterceptors(FileInterceptor('file'))
  async getHeaders(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('File is required');
    }
    const headers = await this.importService.extractHeaders(file);
    return { headers };
  }

  @Post('mapping')
  @UsePipes(new ZodValidationPipe(importMappingRequestSchema))
  async saveMapping(@Body() body: ImportMappingRequestDto) {
    return this.importService.saveMapping(body.fieldMapping, body.name);
  }

  @Post('analyze')
  @UseInterceptors(FileInterceptor('file'))
  async analyzeExpenses(
    @UploadedFile() file: Express.Multer.File,
    @Body('fieldMapping') fieldMappingRaw?: string,
  ) {
    if (!file) throw new BadRequestException('File is required');
    const fieldMapping = fieldMappingRaw
      ? JSON.parse(fieldMappingRaw)
      : undefined;
    return this.importService.analyzeExpenses(file, fieldMapping);
  }
}
