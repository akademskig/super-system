import { Inject, Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { Upload } from 'graphql-upload';

export type S3UploadConfig = {
  accessKeyId: string;
  secretAccessKey: string;
  destinationBucketName: string;
  region?: string;
};
export interface IUploader {
  uploadToS3: ({
    file,
  }: {
    file: Upload;
  }) => Promise<AWS.S3.ManagedUpload.SendData>;
}

@Injectable()
export class AWSS3Service implements IUploader {
  private s3: AWS.S3;
  public config: S3UploadConfig;

  constructor(@Inject('config') config: S3UploadConfig) {
    AWS.config.update({
      region: config.region || 'ca-central-1',
      accessKeyId: config.accessKeyId,
      secretAccessKey: config.secretAccessKey,
    });

    this.s3 = new AWS.S3();
    this.config = config;
  }
  private createDestinationFilePath(fileName: string): string {
    return `public/${fileName}`;
  }

  async uploadToS3({ file }: { file: Upload }) {
    const { createReadStream, filename, mimetype } = await file;
    const fileStream = createReadStream();
    const filePath = this.createDestinationFilePath(filename);
    return new Promise(
      (resolve: (v: AWS.S3.ManagedUpload.SendData) => void, reject) => {
        fileStream.once('error', console.error);
        this.s3
          .upload({
            Bucket: this.config.destinationBucketName,
            Key: filePath,
            Body: fileStream,
            ContentType: mimetype,
            ACL: 'public-read',
          })
          .promise()
          .then(resolve, reject)
          .catch(console.error);
      },
    );
  }
}
