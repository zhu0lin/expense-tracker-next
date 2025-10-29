const { S3Client, CreateBucketCommand } = require('@aws-sdk/client-s3');

const s3Client = new S3Client({
  endpoint: 'http://localhost:4566',
  region: 'us-east-1',
  credentials: {
    accessKeyId: 'test',
    secretAccessKey: 'test',
  },
  forcePathStyle: true,
});

async function createBucket() {
  try {
    await s3Client.send(new CreateBucketCommand({ 
      Bucket: 'expense-receipts' 
    }));
    console.log('Bucket created successfully!');
  } catch (error) {
    if (error.name === 'BucketAlreadyOwnedByYou') {
      console.log('Bucket already exists');
    } else {
      console.error('Error:', error.message);
    }
  }
}

createBucket();
