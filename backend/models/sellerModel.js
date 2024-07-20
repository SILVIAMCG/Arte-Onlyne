import mongoose from "mongoose";

const sellerSchema = new mongoose.Schema({
    usuario: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    nombre: { type: String, required: true },
    apellidoPat: { type: String, required: true },
    apellidoMat: { type: String, required: true },
    rut: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    telefono: { type: String, required: true }, 
    datosBancarios: [{ type: mongoose.Schema.Types.ObjectId, ref: "SellerBank" }] //ESTO viene de sellerBankModel
}, {timestamps: true
});

const Seller = mongoose.model("Seller", sellerSchema);
export default Seller;