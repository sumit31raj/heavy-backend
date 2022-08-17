import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HashController } from './hash.controller';
import { HashService } from './hash.service';
import { HashRepository } from 'src/database/repositories/hash.repository';
import { CronModule } from '../../cron/cron.module';
import { ConfigService } from 'src/config/config.service';

@Module({
  imports: [TypeOrmModule.forFeature([HashRepository]), CronModule],
  controllers: [HashController],
  providers: [HashService, ConfigService],
  exports: [HashService],
})
export class HashModule {}
