import { DataSource } from 'typeorm';
import { configService } from './configuration';

const AppDataSource = new DataSource(
  configService.getTypeOrmDataSourceOptions(),
);
export default AppDataSource;
