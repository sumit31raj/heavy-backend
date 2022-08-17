import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HashDto } from './dto/hash.dto';
import { HashRepository } from 'src/database/repositories/hash.repository';
import { Hash, ResultStatusEnum } from 'src/database/entities/hash.entity';
import moment from 'moment';
import { of } from 'await-of';
import { ConfigService } from 'src/config/config.service';

@Injectable()
export class HashService {
  constructor(
    @InjectRepository(Hash) private hashRepository: HashRepository,
    private readonly configService: ConfigService,
  ) {}

  async uploadData(hashDto: HashDto) {
    const { inputHex, ipAddress } = hashDto;

    const [checkIP, ipError] = await of(
      this.hashRepository.find({
        where: {
          ip_address: ipAddress,
        },
      }),
    );
    if (ipError) throw ipError;
    const [hex, hexError] = await of(
      this.hashRepository.find({
        where: {
          input_hex: inputHex,
        },
      }),
    );
    if (hexError) throw hexError;
    if (hex && hex.length > 0)
      return {
        success: true,
        message: 'Hexadecimal Already Exists',
        data: hex,
      };
    if (checkIP && checkIP.length > 0) {
      const createdDate = checkIP[0]?.createdAt;
      const currentEpoch = Math.floor(Date.now() / 1000);
      const createdEpoch = moment(createdDate).unix();
      if (
        currentEpoch - createdEpoch >
        parseInt(this.configService.get('reqLimit'))
      ) {
        const result = this.saveHash(inputHex, ipAddress);
        return {
          success: true,
          message: 'Record inserted successfully',
          data: result,
        };
      } else {
        throw new UnauthorizedException();
      }
    } else {
      const response = this.saveHash(inputHex, ipAddress);
      return {
        success: true,
        message: 'Record inserted successfully',
        data: response,
      };
    }
  }

  async saveHash(inputHex: string, ipAddress: string) {
    const hashData = new Hash();
    hashData.input_hex = inputHex;
    hashData.ip_address = ipAddress;
    hashData.status = ResultStatusEnum.PENDING;

    const [insertHash, hashError] = await of(hashData.save());

    if (hashError) throw hashError;
    if (insertHash) {
      return {
        success: true,
        message: 'Record has been inserted successfully',
        data: insertHash,
      };
    }
  }

  async getHashInfo(hex: string) {
    const [fetchData, fetchError] = await of(
      this.hashRepository.find({
        where: {
          input_hex: hex,
        },
      }),
    );
    if (fetchError) throw fetchError;
    if (!fetchData)
      return {
        success: false,
        message: 'Hexadecimal not found',
        data: [],
      };
    if (fetchData)
      return {
        success: true,
        message: 'Hexadecimal found',
        data: fetchData,
      };
  }
}
