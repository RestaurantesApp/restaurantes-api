import mongoose from 'mongoose'

const complementsSchemas = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: 2,
      maxLenght: 100,
      unique: true,
    },
    active: { type: Boolean, required: true },
    createBy: { type: String, required: true },
    updateBy: { type: String },
  },
  {
    timestamps: true,
  },
)

const complementsModels = mongoose.model('complements', complementsSchemas)

export default complementsModels
