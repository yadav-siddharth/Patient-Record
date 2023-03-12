const  jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const Doctor = require ('../models/doctorModel')


const protect = asyncHandler(async(req,res,next)=>{
          let token 

          if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
                    try{
                              token = req.headers.authorization.split(' ')[1]

                              const decoded = jwt.verify(token,process.env.JWT_secret)

                              req.doctor = await Doctor.findById(decoded.id).select('-password')
                              next()
                    }
                    catch(error){
                              console.log(error)
                              res.status(401)
                              throw new Error("Not Authorized")
                    }
          }

          if(!token){
                    res.status(401)
                    throw new Error("Not authorized no token")
          }
})

module.exports={protect}