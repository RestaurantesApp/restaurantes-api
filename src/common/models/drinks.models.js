import mongoose from 'mongoose'

const drinksSchemas = new mongoose.Schema(
    {
        name: { type: String, required: true, minLength: 2, maxLenght: 100, unique: true },
        active: { type: Boolean, required: true },
        price: { type: Number, required: true },
        createBy: { type: String, required: true },
        image: { type: String },
        updateBy: { type: String },
        
    },
    {
        timestamps: true,
    },
)

const drinksModels = mongoose.model('drinks', drinksSchemas)

export default drinksModels
