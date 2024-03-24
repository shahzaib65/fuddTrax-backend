const bcrypt = require("bcryptjs")
const model = require("../model/Admin");
const register = async(req,res)=>{
    try {

        let check = await model.findOne({email: req.body.email});
        if(check){
            res.status(400).json({error: true,message: "Sorry a user with this email already exist"})
        }else{
            const salt = await bcrypt.genSalt(10);
            const securePass = await bcrypt.hash(req.body.password,salt)
            check = await model.create({
                email: req.body.email,
                password: securePass
            });
            res.status(500).json({error: false, message: check})
          
        }
        
    } catch (error) {
        res.status(500).json({error: true,message: error.message});
    }
};

module.exports = {
    register
};