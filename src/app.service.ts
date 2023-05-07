import { Injectable } from '@nestjs/common';
import { Logger } from '@nestjs/common';
import * as fs from 'fs';

@Injectable()
export class AppService {
  version: string;

  constructor() {
    // Read version
    try {
      this.version = fs.readFileSync('./VERSION', 'utf8');
      Logger.log(`VERSION=${this.version}`);
    } catch (err) {
      Logger.error('Error loading VERSION file');
      process.exit(1);
    }
  }

  getStatus(): object {
    return { name: 'notification-api', version: this.version };
  }
}
