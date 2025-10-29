import { NextRequest, NextResponse } from 'next/server';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { s3Client, BUCKET_NAME } from '@/lib/s3';

/**
 * POST /api/upload-receipt
 * Handles receipt file uploads to S3
 * 
 * Flow:
 * 1. Extract file from form data
 * 2. Validate file (exists, is image, size < 5MB)
 * 3. Convert file to Buffer (S3 needs binary data)
 * 4. Create unique filename (timestamp + original name)
 * 5. Upload to S3 using PutObjectCommand
 * 6. Return success response with file URL
 */
export async function POST(request: NextRequest) {
  try {
    // 1. Extract file from multipart/form-data request
    const formData = await request.formData();
    const file = formData.get('receipt') as File;
    
    if (!file) {
      return NextResponse.json(
        { error: 'No receipt file provided' },
        { status: 400 }
      );
    }

    // 2. Validate file type (accept images only)
    if (!file.type.startsWith('image/')) {
      return NextResponse.json(
        { error: 'Only image files are allowed' },
        { status: 400 }
      );
    }

    // 3. Validate file size (limit: 5MB)
    const MAX_FILE_SIZE = 5 * 1024 * 1024;
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: 'File size must be less than 5MB' },
        { status: 400 }
      );
    }

    // 4. Convert the uploaded File object into a Buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // 5. Create a safe, unique filename
    const timestamp = Date.now();
    const sanitizedFilename = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const filename = `${timestamp}-${sanitizedFilename}`;

    // 6. Define the S3 upload command
    const command = new PutObjectCommand({
      Bucket: BUCKET_NAME,     // Target bucket
      Key: filename,           // Object key (file path in S3)
      Body: buffer,            // File contents
      ContentType: file.type,  // Preserve file type (e.g., image/png)
    });

    // 7. Upload file to S3
    await s3Client.send(command);

    // 8. Build file URL (LocalStack format in development)
    const fileUrl = `http://localhost:4566/${BUCKET_NAME}/${filename}`;

    // 9. Return success response with file details
    return NextResponse.json({
      success: true,
      filename,
      url: fileUrl,
      message: 'Receipt uploaded successfully',
    }, { status: 201 });
    
  } catch (error) {
    // 10. Handle unexpected errors
    console.error('Receipt upload error:', error);
    return NextResponse.json(
      { error: 'Failed to upload receipt' },
      { status: 500 }
    );
  }
}
