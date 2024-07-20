import mongoose from "mongoose";

//ESTE MODELO AUN NO SE USA, PERO SE USARA PARA LAS ORDENES DE COMPRA

const orderSchema = new mongoose.Schema({
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    ordenItems: [
        {
            nombre: { type: String, required: true },
            cantidad: { type: Number, required: true },
            imagen: { type: String, required: true },
            precio: { type: Number, required: true },
            producto: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: "Product"
            }
        }
    ],
    direccionEnvio: {
        direccion: { type: String, required: true },
        comuna: { type: String, required: true },
        ciudad: { type: String, required: true },
        pais: { type: String, required: true },
    },

    metodoPago: {
        type: String,
        required: true
    },

    resultadoPago: {
        id: { type: String },
        status: { type: String },
        actualizacion: { type: String },
        email: { type: String }
    },

    itemsPrecio: {
        type: Number,
        required: true,
        default: 0.0
    },

    costoEnvio: {
        type: Number,
        required: true,
        default: 0.0
    },
    
    totalPrecio: {
        type: Number,
        required: true,
        default: 0.0
    },

    estaPagado: {
        type: Boolean,
        required: true,
        default: false
    },
    fechaPago: {
        type: Date
    },

    estaEntregado: {
        type: Boolean,
        required: true,
        default: false
    },

    fechaEntrega: {
        type: Date
    }
}, {
    timestamps: true
});

const Order = mongoose.model("Order", orderSchema);
export default Order;