const cloudinary = require("cloudinary").v2

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Function to delete an image by URL
const deleteImageByUrl = async (imageUrl) => {
  try {
    // Extract the public ID from the URL
    const publicId = imageUrl.split("/").slice(-2).join("/").split(".")[0];

    // Delete the image from Cloudinary
    const result = await cloudinary.uploader.destroy(publicId);

    console.log("Image deleted:", result);
    return result;
  } catch (error) {
    console.error("Error deleting image:", error);
    throw error;
  }
};

module.exports = deleteImageByUrl;
