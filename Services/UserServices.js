const User = require("../model/User")


class UserService{
    constructor(){

    }

async findUserByEmail (email){
    const findUser = await User.find({email:email})
    return findUser
}








}


module.exports = new UserService