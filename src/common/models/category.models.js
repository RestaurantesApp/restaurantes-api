import mongoose from 'mongoose'

const categorySchemas = new mongoose.Schema({

  name:{ type: String,required: true, minLength: 3, maxLenght: 70},
  active:{ type: Boolean, required :true },
  position: {type: Number , required: true  },
  createBy:{type: String , required: true },
  updateBy: { type: String },
  }, { 
    timestamps: true 
})

const categoryModels = mongoose.model('category',categorySchemas)

export default categoryModels