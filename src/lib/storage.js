import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";

function getConfig() {
  const config = {
    accessKeyId: process.env.R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
    bucket: process.env.R2_BUCKET_NAME,
    endpoint: process.env.R2_ENDPOINT,
    publicUrl: process.env.R2_PUBLIC_URL
  };

  if (!config.accessKeyId || !config.secretAccessKey || !config.bucket || !config.endpoint || !config.publicUrl) {
    throw new Error("Missing R2 environment variables. Check R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_BUCKET_NAME, R2_ENDPOINT, R2_PUBLIC_URL");
  }

  return config;
}

function getClient() {
  const config = getConfig();
  return new S3Client({
    region: "auto",
    endpoint: config.endpoint,
    credentials: {
      accessKeyId: config.accessKeyId,
      secretAccessKey: config.secretAccessKey,
    },
    forcePathStyle: true,
  });
}

export async function uploadFile(key, buffer, contentType) {
  const config = getConfig();
  const command = new PutObjectCommand({
    Bucket: config.bucket,
    Key: key,
    Body: buffer,
    ContentType: contentType,
  });

  await getClient().send(command);

  return getPublicUrl(key);
}

export async function deleteFile(key) {
  const config = getConfig();
  const command = new DeleteObjectCommand({
    Bucket: config.bucket,
    Key: key,
  });

  await getClient().send(command);
}

export function getPublicUrl(key) {
  return `${getConfig().publicUrl}/${key}`;
}

export function generateKey(prefix, filename) {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 8);
  const ext = filename.split(".").pop() || "bin";
  return `${prefix}/${timestamp}-${random}.${ext}`;
}
