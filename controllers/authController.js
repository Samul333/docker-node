const User = require('../models/userModels')
const bcrypt = require('bcryptjs')

exports.signUp = async (req,res)=>{
    const {username,password}= req.body;
    const hashedPassword = await bcrypt.hash(password,10)

    try {
        const newUser = await User.create({
            username,
            password:hashedPassword
        });
        req.session.user = newUser;
        res.status(201).json({
            status:'sucess',
            data:{
                user:newUser
            }
        })
    } catch (error) {
        console.log(error)
        res.status(400).json({
            status:'failed'
        })
    }
}


exports.login = async (req,res)=>{
    const {username,password}= req.body;
    console.log('There is a login request')
    try {
       const user = await User.findOne({username})
        if(!user){
            throw new Error('User was not found')
        }

        const isCorrect = await bcrypt.compare(password,user.password)
        req.session.user = user;
        if(!isCorrect) throw new Error('Something went wrong')

        res.status(201).json({
            status:'sucess',
        })
    } catch (error) {
        console.log(error)
        res.status(400).json({
            status:'failed'
        })
    }
}