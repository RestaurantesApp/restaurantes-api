import mongoose from 'mongoose'

const extrasShemas = new mongoose.Schema({

  name:{ type: String,required: true, minLength: 3, maxLenght: 100},
  active:{ type: Boolean, required :true },
  price: {type: Number , required: true  },
  createBy:{type: String , required: true },
  updateBy: { type: String },
  }, { 
    timestamps: true 
})

const extrasModels = mongoose.model('extra',extrasShemas)

export default extrasModels