const mongoose=require('mongoose')

const patientSchema=new mongoose.Schema({
name:{
    type:String,
    required:true,
    trim:true
    
},
medecin:{
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
}

},{
    timestamps:true
})
const Patient= mongoose.model('Patient',patientSchema)

module.exports= Patient