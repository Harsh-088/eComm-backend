import aws from "aws-sdk"

export const fileUploader = async (
  fileName: string,
  file: Express.Multer.File
): Promise<string> => {
  const client = new aws.S3({
    region: process.env.AWS_REGION,
    credentials: {
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
      accessKeyId: process.env.AWS_ACCESS_KEY_ID as string
    }
  })
  const fileExt = file.mimetype.split("/")[1]
  const params = {
    Bucket: process.env.S3_BUCKET as string,
    Key: `thumbnails/${fileName}.${fileExt}`,
    Body: file.buffer,
    ContentType: file.mimetype,
    ACL: "public-read"
  }
  const res = await client.upload(params).promise()

  return res.Location
}
