

const router= require("express").Router();
const {User, validate}=require("../models/user")
const bcrypt= require("bcrypt")
// POST request to create a new user.
router.post("/", async(req,res)=>{
    try {
        // Validating the user’s input (e.g., name, email, password)
        const{error}= validate(req.body);
        // Checking if the email is already in use
        if (error) 
            return res.status(400).send({message:error.details[0].message});
        const user= await User.findOne({email:req.body.email})
        if (user) 
            return res.status(409).send({message:"User already exists"});

        // Hashing the password for security.
        const salt= await bcrypt.genSalt(Number(process.env.SALT));
        const hashPassword=await bcrypt.hash(req.body.passweord, salt);
        // Saving the new user in the database
        await new User({...req.body, password: hashPassword}).save();
        res.status(201).send({message:"User Created Successfully"})
    } catch (error) {
        res.status(500).send({message:"Internal Server Error"})
    }
})

module.exports=router;