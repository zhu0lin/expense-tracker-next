import { S3Client } from '@aws-sdk/client-s3';

const isDevelopment = process.env.NODE_ENV === 'development';

export const s3Client = new S3Client({
  endpoint: isDevelopment ? 'http://localhost:4566' : undefined,
  region: process.env.AWS_REGION || 'us-east-1',
  credentials: isDevelopment
    ? {
        accessKeyId: 'test',
        secretAccessKey: 'test',
      }
    : {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
      },
  forcePathStyle: isDevelopment,  // CRITICAL for LocalStack
});

export const BUCKET_NAME = process.env.S3_BUCKET_NAME || 'expense-receipts';
