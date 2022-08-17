import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
} from '@nestjs/common';
import { validateHex } from 'src/utils/validations/hexadecimal.validation';

import { HashDto } from './dto/hash.dto';
import { HashService } from './hash.service';

@Controller('hash')
export class HashController {
  constructor(private readonly hashService: HashService) {}

  @Get('/:hex')
  hexStatus(@Param('hex') hex: string) {
    return this.hashService.getHashInfo(hex);
  }

  @Post('')
  uploadData(@Body() hashDto: HashDto) {
    const { inputHex, ipAddress } = hashDto;
    if (!inputHex || !ipAddress) throw new BadRequestException('Invalid Input');
    const isVaildHex = validateHex(hashDto?.inputHex);
    if (isVaildHex === null)
      throw new BadRequestException('Invalid Hexadecimal Input');
    return this.hashService.uploadData(hashDto);
  }
}
