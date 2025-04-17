import { DatabaseType, DataSource, DataSourceOptions } from 'typeorm';
import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { DatabaseConfigModule } from '../../config/database/config.module';
import { DatabaseConfigService } from '../../config/database/config.service';
import { config } from 'dotenv';

config();
export const dataSource = new DataSource({
  type: process.env.DATABASE_TYPE as DatabaseType,
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT || '3306', 10),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  synchronize: false,
  migrationsRun: false,
  logging: ['error', 'warn', 'migration'],
  entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/migrations/*{.ts,.js}'],
  subscribers: [],
} as DataSourceOptions);

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [DatabaseConfigModule],
      useFactory: async (databaseConfigService: DatabaseConfigService) => ({
        type: databaseConfigService.type as DatabaseType,
        host: databaseConfigService.host,
        port: databaseConfigService.port,
        username: databaseConfigService.username,
        password: databaseConfigService.password,
        database: databaseConfigService.name,
        synchronize: false,
        migrationsRun: false,
        logging: ['error', 'warn', 'migration'],
        retryAttempts: 5,
        retryDelay: 5000,
        autoLoadEntities: true,
        subscribers: [],
        migrations: [__dirname + '/migrations/*{.ts,.js}'],
      }),
      inject: [DatabaseConfigService],
    } as TypeOrmModuleAsyncOptions),
    DatabaseConfigModule,
  ],
})
export class DatabaseModule {}
