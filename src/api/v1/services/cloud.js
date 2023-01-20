const {
  S3Client,
  PutBucketCorsCommand,
  DeleteObjectCommand,
} = require("@aws-sdk/client-s3")
const { createPresignedPost } = require("@aws-sdk/s3-presigned-post")
const { v4: uuidV4 } = require("uuid")
const projectConfig = require("../../../config/index")
const s3 = new S3Client({
  region: "default",
  endpoint: projectConfig.cloud.endPointUrl,
  credentials: {
    accessKeyId: projectConfig.cloud.accessKey,
    secretAccessKey: projectConfig.cloud.secretKey,
  },
})

const getPresignedUrlToUpload = async (startsWith, Key, Bucket) => {
  // filename with extention
  try {
    const Fields = {
      acl: "public-read",
    }
    const Conditions = [
      { acl: "public-read" },
      { bucket: Bucket },
      ["starts-with", "$key", `${startsWith}_`],
      ["content-length-range", 0, projectConfig.cloud.maximumFileSize],
    ]
    const result = await createPresignedPost(s3, {
      Bucket,
      Key,
      Conditions,
      Expires: projectConfig.cloud.expiresTime, //Seconds before the presigned post expires. 3600 by default.
      Fields,
    })
    // result = {url , fields}
    return result
  } catch (error) {
    throw error
  }
}

const deleteObjectFromCloud = async (Bucket, Key) => {
  try {
    const data = await s3.send(
      new DeleteObjectCommand({
        Bucket,
        Key,
      })
    )
    return data
  } catch (err) {
    throw err
  }
}

module.exports.getPresignedUrlToUploadUserProfilePiture = async (fileName) => {
  try {
    const uuid = uuidV4()
    const Key = `${uuid}_${fileName}`
    const result = await getPresignedUrlToUpload(
      uuid,
      Key,
      projectConfig.cloud.bucket.userProfilePicture
    )
    return { ...result, Key }
  } catch (error) {
    throw error
  }
}

module.exports.getPresignedUrlToUploadGroupPostPicture = async (fileName) => {
  try {
    const uuid = uuidV4()
    const Key = `${uuid}_${fileName}`
    const result = await getPresignedUrlToUpload(
      uuid,
      Key,
      projectConfig.cloud.bucket.footballManagerGroupPostPicture
    )
    return { ...result, Key }
  } catch (error) {
    throw error
  }
}

module.exports.getPresignedUrlToUploadGroupAndChannelProfilePicture = async (
  fileName
) => {
  try {
    const uuid = uuidV4()
    const Key = `${uuid}_${fileName}`
    const result = await getPresignedUrlToUpload(
      uuid,
      Key,
      projectConfig.cloud.bucket.groupAndChennelProfilePicture
    )
    return { ...result, Key }
  } catch (error) {
    throw error
  }
}

module.exports.getPresignedUrlToUploadPlayerFacePiture = async (fileName) => {
  try {
    const uuid = uuidV4()
    const Key = `${uuid}_${fileName}`
    const result = await getPresignedUrlToUpload(
      uuid,
      Key,
      projectConfig.cloud.bucket.playerFacePicture
    )
    return { ...result, Key }
  } catch (error) {
    throw error
  }
}

module.exports.deletePlayerFacePictureFromCloud = async (Key) => {
  try {
    const result = await deleteObjectFromCloud(
      projectConfig.cloud.bucket.playerFacePicture,
      Key
    )
    return result
  } catch (error) {
    throw error
  }
}

const applayBucketCorsPolicy = async (Bucket) => {
  try {
    const cors = {
      Bucket,
      CORSConfiguration: {
        CORSRules: [
          {
            AllowedHeaders: ["*"],
            AllowedMethods: ["POST"],
            AllowedOrigins: ["*"],
          },
        ],
      },
    }
    const response = await s3.send(new PutBucketCorsCommand(cors))
    console.log("Success", response)
  } catch (err) {
    console.log("Error", err)
  }
}
