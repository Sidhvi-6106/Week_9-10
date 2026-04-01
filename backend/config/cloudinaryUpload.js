import cloudinary from "./cloudinary.js";

export const uploadToCloudinary = (file, options = {}) =>
  new Promise((resolve, reject) => {
    if (!file) {
      reject(new Error("No file provided for upload"));
      return;
    }

    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: options.folder || "blog-app",
        resource_type: "image",
        public_id: options.publicId,
        overwrite: options.overwrite ?? true,
      },
      (error, result) => {
        if (error) {
          reject(error);
          return;
        }

        resolve(result);
      },
    );

    uploadStream.end(file.buffer);
  });

export const uploadProfileImage = async (file, publicId) => {
  const result = await uploadToCloudinary(file, {
    folder: "blog-app/profile-images",
    publicId,
  });

  return result.secure_url;
};
