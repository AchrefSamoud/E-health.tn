const express=require('express')
require('./db/mongoose')
const port = 3333
const app=express()
const userRouter=require('./routers/user')
const patientRouter=require('./routers/patient')

app.use(express.json())

app.use(userRouter)
app.use(patientRouter)
app.listen(port,()=>{
    console.log('Server running')

})
const Patient=require('./db/models/patient')
const User=require('./db/models/user')

// const main=async()=>{
//     // const patient=await Patient.findById('60267f13d14eb754a8ce69e2')
//     // await patient.populate('medecin').execPopulate()
//     // console.log(patient.medecin)
//     const user=await User.findById('60267eb9d14eb754a8ce69df') //get the users patients
//     await user.populate('patients').execPopulate() //add information to patient 
//     console.log(user.patients)
// }
// main()
