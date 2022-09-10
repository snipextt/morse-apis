import config from '../config';

const AWS = require('aws-sdk');

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

export async function putObject(file: any, key: string) {
  const params = {
    Bucket: config.get('awsS3Bucket'),
    Key: key,
    Body: file,
  };

  return new Promise((resolve, reject) => {
    s3.upload(params, (err: any, data: any) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });
}
