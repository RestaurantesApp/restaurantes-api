import mongoose from 'mongoose'

const localSchemas = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: 2,
      maxLenght: 100,
      unique: true,
    },
    active: { type: Boolean, required: true },
    phoneNumber: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true, minLength: 2, maxLenght: 100 },
    image: { type: String, required: true },
    location: {
      type: Object,
      latitud: { type: Number, required: true },
      longitud: { type: Number, required: true },
    },
    createBy: { type: String, required: true },
    updateBy: { type: String },
  },
  {
    timestamps: true,
  },
)

const localModels = mongoose.model('local', localSchemas)

export default localModels
