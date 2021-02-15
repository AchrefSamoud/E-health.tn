const express=require('express')
const User=require('../db/models/user')
const auth =require('../middlewares/auth')
const router = new express.Router()
router.post('/users', async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
    } catch (e) {
        res.status(400).send(e)
    }
})
router.post('/users/login',async (req,res)=>{
    try{
            
            const user=await User.findByCredentials(req.body.email,req.body.password)
        
            const token=await user.generateAuthToken()  
            res.send({user, token}) 
    }catch(e){
            res.status(400).send()
    }



    
})
router.patch('/users/me',auth,async(req,res)=>{
    const updates=Object.keys(req.body)
    const allowedUpdates=['userName','email','password','age']
    const isValidOperation=updates.every((update)=>{
            return allowedUpdates.includes(update)
    })
    if(!isValidOperation){
        return res.status(400).send({error: 'Iinvalid Updates'})
    }
//    const id= req.params.id
    try{

        // const user=await User.findById(req.params.id)
        const user=req.user
        updates.forEach((update)=>user[update]=req.body[update])
        await user.save()
        if(!user){
            return res.status(404).send()
        }
        res.send(user)


    }catch(e) {
        res.status(400).send(e)
    }
})

router.delete('/users/me',auth,async(req,res)=>{
    try {
        // const user=await User.findByIdAndDelete(req.params.id)
        // if(!user){
        //     return res.status(404).send
        // }
        await req.user.remove()
        res.send(req.user)
    }
    catch(e){
         res.status(500).send()
    }
    })



module.exports=router



