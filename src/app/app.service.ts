import { Injectable } from '@nestjs/common';
import metadata from '../utils/metadata';

@Injectable()
export class AppService {
  getHello(): string {
    return metadata.description;
  }
}
