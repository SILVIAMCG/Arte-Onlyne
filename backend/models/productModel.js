import mongoose from "mongoose";

//ESTE MODELO DE MOMENTO SOLO FUNCIONA PARA PRODUCTOS DE PRUEBA, MAS ADELANTE SE IMPLEMENTARA PARA QUE LOS USUARIOS PUEDAN INGRESAR PRODUCTOS

//PRUEBA DEJANDO SOLO LO QUE SE USARA EN LOS PRODUCTOS
//SE COMENTARA LO DEMAS
//const reviewSchema = new mongoose.Schema({
    //este usuario no es el mismo asociado al producto
//     usuario: {
//         type: mongoose.Schema.Types.ObjectId,
//         required: true,
//         ref: "User"
//     },
//     nombre: { type: String, required: true },
//     rating: { type: Number, required: true },
//     comentario: { type: String, required: true },
// }, {
//     timestamps: true,

// });

const productSchema = new mongoose.Schema({
    // usuario: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     required: true,
    //     ref: "User"
    // },
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
        // type: String,
        // required: true
        public_id: String,
        secure_url: String
    },

    categoria: {
        type: String,
        required: true
    },

    // fecha: {
    //     type: Date,
    // },

    descripcion: {
        type: String,
        required: true
    },

    precio: {
        type: Number,
        required: true
    },

    // reviews: [reviewSchema],

    // rating: {
    //     type: Number,
    //     required: true,
    //     default: 0
    // },

    // numReviews: {
    //     type: Number,
    //     required: true,
    //     default: 0
    // },

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