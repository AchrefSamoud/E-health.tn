const express=require('express')
const router=express.Router()
const Patient = require('../db/models/patient')
const auth = require('../middlewares/auth')
router.post('/patients',auth,async(req,res)=>{
    const patient =new Patient({
        ...req.body, //spread operator
        medecin:req.user._id
    })
    try {
        patient.save(),
        res.status(201).send(patient)
    }   
    catch(e){
        res.status(400).send(e)
    }
})

//get a specefic patient 

router.get('/patients/:id',auth,async (req, res) => {
    const _id = req.params.id

    try {
        const patient = await Patient.findOne({_id,medecin:req.user._id}) //return the task only if the user concerned

        if (!patient) {
            return res.status(404).send()
        }

        res.send(patient)
    } catch (e) {
        res.status(500).send()
    }
})




//get all relative patients
router.get('/patients',auth, async (req, res) => {
    try {
        const patients = await Patient.find({medecin:req.user._id})
        res.send(patients)
    } catch (e) {
        res.status(500).send()
    }
})

// update a patient 
router.patch('/patients/:id',auth,async(req,res)=>{
    const updates= Object.keys(req.body)
    const allowedUpdates=['name']
    const isValidOperation=updates.every((update)=>{
        return allowedUpdates.includes(update)
    })
    if(!isValidOperation){
        
        return res.status(400).send({error: 'Invalid Updates!'})
    } try{
        const patient = await Patient.findOne({_id:req.params.id,medecin:req.user._id})
        

       
        if(!patient){

            return res.status(404).send()
        }

        updates.forEach((update) => patient[update]=req.body[update])
        

        await patient.save()
        res.send(patient)
        
        
    }catch(e){  
        res.status(400).send(e)
    }
})

//Delete relative patients for a specefic patient

router.delete('/patients/:id',auth, async (req, res) => {
    try {
        const patient = await Patient.findOneAndDelete({_id:req.params.id,medecin:req.user._id})

        if (!patient) {
            return res.status(404).send()
        }

        res.send(patient)
    } catch (e) {
        res.status(500).send()
    }
})






module.exports=router