import cloudinary from "../../dbconfig/cloudinaryConfig"

export const deleteImageServer = async (publicId: string) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result.result === 'ok';
  } catch (error) {
    console.error('Error deleting image:', error);
    throw error;
  }
};