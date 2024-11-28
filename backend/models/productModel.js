import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Seller"
    },

    nombre: {
        type: String,
        required: true
    },

    imagen: {
        public_id: String,
        secure_url: String
    },

    categoria: {
        type: String,
        required: true
    },

    
    descripcion: {
        type: String,
        required: true
    },

    precio: {
        type: Number,
        required: true
    },

    stock:{
        type: Number,
        required: true,
        default: 0
    },
    
    creador:{
        type: String,
        required: true
    },

    contacto:{
        type: String,
        required: true
    
    },
    status:{
        type: String,
        required: true,
        default: "pendiente" //  aprobado
    }
    
    }
, {
        timestamps: true,
    });

    const Product = mongoose.model("Product", productSchema);
    export default Product;