const User = require("../model/User")
const UserService = require("../Services/UserServices")
const bcrypt = require("bcrypt")
const TokenService = require("../Services/TokenService")


exports.singupUser = async(req,res)=>{
  try {
    const {name,email,password} = req.body
    if(!name || !email || !password){
     return res.status(400).json({
         success:false,
         message : "please fill all details"
     })
    }
 const alreadyExists = await UserService.findUserByEmail(email)
 
 if(alreadyExists){
     return res.status(400).json({
         success:false,
         message : "user already exists login first"
     })
 }
 
 // hash password
 
 const hashedPassword = await bcrypt.hash(password,10)
 
 // create user in database
 
 const userData =  await User.create({
     name,
     email,
     password:hashedPassword
 })
 
 
 return res.status(200).json({
     success:true,
     message:"user created success",
     data:userData
 })
 
  } catch (error) {

    return res.status(500).json({
        success:false,
        message : "internal server error while creating user"
    })
    
    
  }

}


exports.loginUser = async(req,res)=>{
    const {email,password} = req.body

  if(!email || !password){
    return res.status(400).json({
        success:false,
        message:"please give all fields"
    })
  }
//   check user in database
const user = await User.findOne({ email });


if(!user){
    return res.status(400).json({
        success:false,
        message : "user does not exits please login first"
    })
}

const checkPassword = await bcrypt.compare(password,user.password)

if(!checkPassword){
    return res.status(400).json({
        success:false,
        message : "password is inccorect"
    })
}

const payload = {
    userId : user._id
}

const {accessToken} = await TokenService.generateAccessToken(payload)

res.cookie("accessToken", accessToken, {
    httpOnly: true, // Prevents access to the cookie from JavaScript
    maxAge: 24 * 60 * 60 * 1000, // Cookie expiry time (24 hours)
  });



  return res.status(200).json({
    success:true,
    message:"user log in SuccessFully",
    data: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
  })

}




// Controller function for handling Google login
exports.loginGoogle = async (user) => {
    try {
        // Perform operations with the user data
        // Example: Save the user to the database, create a session, etc.
        
        // Since we are not using a database here, let's just log the user data
        console.log('User authenticated:', user);

        // Return a successful response
        return {
            success: true,
            message: "User authenticated successfully",
            data: user
        };
    } catch (error) {
        // Handle any errors that may occur
        console.error('Error in loginGoogle function:', error);
        return {
            success: false,
            message: "Error logging in",
            error: error.message
        };
    }
};
