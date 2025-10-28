import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: import.meta.env.CLOUDINARY_CLOUD_NAME,
  api_key: import.meta.env.CLOUDINARY_API_KEY,
  api_secret: import.meta.env.CLOUDINARY_API_SECRET,
});

export class ImageUpload {
  static async upload(file: File) {
    const buffer = await file.arrayBuffer();
    const base64Image = Buffer.from(buffer).toString('base64');
    const imageType = file.type.split('/')[2]; // image/png => png

    const response = await cloudinary.uploader.upload(
      `data:image/${imageType};base64,${base64Image}`
    );

    return response.secure_url;
  }

  static async delete(image: string) {
    try {
      const imageName = image.split('/').pop() ?? ''; // get the last part of the url
      const imageId = imageName.split('.')[0]; // remove the file extension

      const result = await cloudinary.uploader.destroy(imageId);
      console.log(result);

      return true;
    } catch (error) {
      console.error('Error deleting image:', error);
      return false;
    }
  }
}
