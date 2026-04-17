import { ImportMappingRequestDto, ImportCategorizationDto, AnalysisResult } from "@shared/schemas";
import { post, postFile } from "./index";

export const uploadFileForHeaders = (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  return postFile<{ headers: string[] }>("import/headers", formData);
};

export const saveFieldMapping = (data: ImportMappingRequestDto) => {
  return post<ImportMappingRequestDto, any>("import/mapping", data);
};

export const saveCategorization = (data: ImportCategorizationDto) => {
  return post<ImportCategorizationDto, any>("import/categorization", data);
};

export const analyzeExpenses = (file: File, fieldMapping?: Record<string, string>) => {
  const formData = new FormData();
  formData.append("file", file);
  if (fieldMapping && Object.values(fieldMapping).some(Boolean)) {
    formData.append("fieldMapping", JSON.stringify(fieldMapping));
  }
  return postFile<AnalysisResult>("import/analyze", formData);
};
