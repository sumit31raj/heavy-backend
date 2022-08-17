import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { of } from 'await-of';
import { Queue } from 'bull';
import { Hash, ResultStatusEnum } from 'src/database/entities/hash.entity';
import { HashRepository } from 'src/database/repositories/hash.repository';
import BigNumber from 'bignumber.js';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CronService {
  constructor(
    @InjectRepository(Hash) private hashRepository: HashRepository,
    @InjectQueue('hexadecimal') private hashQueue: Queue,
    private readonly configService: ConfigService,
  ) {}

  async queueHashJobs(): Promise<any> {
    const [pendingHash, hashError] = await of(
      this.hashRepository.find({
        where: {
          status: ResultStatusEnum.PENDING,
        },
      }),
    );

    if (hashError) throw hashError;
    if (pendingHash && pendingHash.length) {
      for (let hash = 0; hash < pendingHash.length; hash++) {
        const { id, input_hex, last_processed_nonce, status } =
          pendingHash[hash];
        const addJob = await this.hashQueue.add('process-nonce', {
          id,
          input_hex,
          nonce_range: {
            start_nonce: new BigNumber(last_processed_nonce),
            end_nonce: new BigNumber(last_processed_nonce).plus(
              new BigNumber(this.configService.get('MAX_PROCESS_NONCE')),
            ),
          },
          status,
        });
        await this.hashRepository.update(
          {
            id: id,
          },
          {
            last_processed_nonce: addJob.data.nonce_range.end_nonce.toString(),
          },
        );
      }
    }
  }

  @Cron(CronExpression.EVERY_10_SECONDS)
  async handleCron() {
    await of(this.queueHashJobs());
  }
}
