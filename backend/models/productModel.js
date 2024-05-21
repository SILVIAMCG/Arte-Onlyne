import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    //este usuario no es el mismo asociado al producto
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    nombre: { type: String, required: true },
    rating: { type: Number, required: true },
    comentario: { type: String, required: true },
}, {
    timestamps: true,

});

const productSchema = new mongoose.Schema({
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },

    nombre: {
        type: String,
        required: true
    },

    imagen: {
        type: String,
        required: true
    },

    categoria: {
        type: String,
        required: true
    },

    fecha: {
        type: Date,
    },

    descripcion: {
        type: String,
        required: true
    },

    precio: {
        type: Number,
        required: true
    },

    reviews: [reviewSchema],

    rating: {
        type: Number,
        required: true,
        default: 0
    },

    numReviews: {
        type: Number,
        required: true,
        default: 0
    },

    stock:{
        type: Number,
        required: true,
        default: 0
    },

    cantidad: {
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
    
    }
    
    }
, {
        timestamps: true,
    });

    const Product = mongoose.model("Product", productSchema);
    export default Product;