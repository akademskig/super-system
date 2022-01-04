import { DynamicModule, Module } from '@nestjs/common';
import { AWSS3Service, S3UploadConfig } from './aws-s3.service';
import { config } from 'dotenv';

const awsConfig: S3UploadConfig = {
  accessKeyId: config().parsed['AWS_ACCESS_KEY_ID'],
  secretAccessKey: config().parsed['AWS_SECRET_KEY'],
  destinationBucketName: config().parsed['AWS_BUCKET_NAME'],
  region: config().parsed['AWS_REGION'],
};

@Module({})
export class AWSS3Module {
  static register(): DynamicModule {
    return {
      module: AWSS3Module,
      providers: [
        {
          provide: 'config',
          useValue: awsConfig,
        },
        AWSS3Service,
      ],
      exports: [AWSS3Service],
    };
  }
}
