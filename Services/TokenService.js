const jwt = require("jsonwebtoken")
require("dotenv").config()

class TokenService {
      constructor(){

      }

  async generateAccessToken(payload){
        
   const accessToken = await jwt.sign(payload,process.env.JWT_SECRET,{
     expiresIn:"2h"
   })

   return accessToken
   }




}


module.exports = new TokenService