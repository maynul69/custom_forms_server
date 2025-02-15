const router = require("express").Router();
const User = require('../models/user');
const bcrypt = require("bcrypt");

// POST request to create a new user
router.post("/", async (req, res) => {
  try {
    const { firstName, lastName, email, password, role } = req.body;
    
    if (!firstName || firstName.length < 3)
      return res.status(400).send({ message: "firstName must be at least 3 characters long" });
    if (!lastName || lastName.length < 3)
      return res.status(400).send({ message: "lastName must be at least 3 characters long" });
    if (!email)
      return res.status(400).send({ message: "Invalid email format" });
    if (!password)
      return res.status(400).send({ message: "Password must be at least 6 characters long" });

    // // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(409).send({ message: "User already exists" });


    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({ firstName, lastName, email, password: hashedPassword, role });
    await newUser.save();

    res.status(201).send({ message: "User created successfully" });
  } catch (error) {
 
    res.status(500).send({ message: "Internal Server Error" });
  }
});

router.get('/',async(req,res)=>{
  try{
    const allData = await User.find();
    return res.status(200).json({
      res: allData
    })

  }catch(err){
    return res.status(500).json({
      message: "Internal server error"
    })
  }
})
module.exports = router;
