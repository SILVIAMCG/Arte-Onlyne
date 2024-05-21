import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    esAdmin: {
        type: Boolean,
        required: true,
        default: false
    },

    esVendedor: {
        type: Boolean,
        required: true,
        default: false
    }, 
    },{
        timestamps: true,  
});

const User = mongoose.model("User", userSchema);
export default User;