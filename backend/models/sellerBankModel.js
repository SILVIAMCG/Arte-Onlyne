import mongoose from "mongoose";

const sellerBankSchema = new mongoose.Schema({
    vendedor: { type: mongoose.Schema.Types.ObjectId, ref: "Seller" },
    nombreBanco: { type: String, required: true },
    numeroCuenta: { type: String, required: true },
    tipoCuenta: { type: String, required: true },
    titularCuenta: { type: String, required: true },
    verificado: { type: Boolean, default: false }
}, {timestamps: true
});

const SellerBank = mongoose.model("SellerBank", sellerBankSchema);

export default SellerBank;
