import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
    {
      usuario: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
      },
  
      items: {
        type: mongoose.Schema.Type.Array,
        // { idProducto, cantidad}
      },
      nombre_completo: {
        type: String,
        required: false,
      },
      direccion: {
        type: String,
        required: false,
      },
      
      ciudad: {
        type: String,
        required: false,
      },

      comuna: {
        type: String,
        required: false,
      },
      
      telefono: {
        type: String,
        required: false,
      },
      costoEnvio: {
        type: Number,
        required: true,
        default: 0,
      },
  
      totalPrecio: {
        type: Number,
        required: true,
        default: 0,
      },
  
      estaPagado: {
        type: Boolean,
        required: true,
        default: false,
      },
      estaEntregado: {
        type: Boolean,
        required: true,
        default: false,
      },
      fechaEntrega: {
        type: Date,
        required: false,
      },
    //   monto: {
    //       type: Number,
    //       required: true
    //   },
    //   descripcion: {
    //       type: String,
    //       required: true
    //   },
    //   id_metodo_pago: {
    //       type: String,
    //       required: true
    //   },
    //   clienteEmail: {
    //       type: String,
    //       required: true
    //   },
    //   id_transaccion: {
    //       type: String
    //   },
      estado: {
          type: String,
          default: "pendiente"
      },
    },
    { timestamps: true }
  );
  
  const Order = mongoose.model("Order", orderSchema);
    export default Order;