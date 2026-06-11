require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');

async function uploadImages() {
  const s3Client = new S3Client({
    region: 'auto',
    endpoint: process.env.R2_ENDPOINT,
    credentials: {
      accessKeyId: process.env.R2_ACCESS_KEY_ID,
      secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
    },
    forcePathStyle: true,
  });

  const bucket = process.env.R2_BUCKET_NAME;
  const publicUrl = process.env.R2_PUBLIC_URL;

  const imageDir = path.join(__dirname, '..', 'Imagenes');
  const files = fs.readdirSync(imageDir);

  const results = {};

  for (const file of files) {
    if (!file.match(/\.(png|jpe?g)$/i)) continue;

    const filePath = path.join(imageDir, file);
    const buffer = fs.readFileSync(filePath);
    const ext = path.extname(file).substring(1);
    const contentType = ext === 'png' ? 'image/png' : 'image/jpeg';
    
    // We prefix with seed/ to keep it organized
    const key = `seed/${file}`;

    console.log(`Uploading ${file}...`);
    try {
      await s3Client.send(new PutObjectCommand({
        Bucket: bucket,
        Key: key,
        Body: buffer,
        ContentType: contentType,
      }));
      const url = `${publicUrl}/${key}`;
      console.log(`Success: ${url}`);
      results[file] = url;
    } catch (e) {
      console.error(`Error uploading ${file}:`, e);
    }
  }

  console.log('\n--- UPLOAD RESULTS ---');
  console.log(JSON.stringify(results, null, 2));
}

uploadImages().catch(console.error);
