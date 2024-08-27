import {v2 as cloudinary} from 'cloudinary';
import dotenv from 'dotenv';
dotenv.config();


cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
    secure: true
});

const uploadImage = async (filePath, userId) => {
    try {
        const folderPath = `imagenes/${userId}`;  
        const result = await cloudinary.uploader.upload(filePath, {
            folder: folderPath,  
        });
        return result;
    } catch (error) {
        console.error('Error al subir la imagen:', error);
        throw error;  
    }
};

const deleteImage = async (publicId) => {
    try {
        const result = await cloudinary.uploader.destroy(publicId);
        return result;
    } catch (error) {
        console.error('Error al borrar la imagen:', error);
        throw error;
    }
};

export {uploadImage, deleteImage};
