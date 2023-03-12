const mongoose = require('mongoose')
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Doctor = require('../models/doctorModel');



const registerDoctor = asyncHandler(async(req,res)=>{
          const {name,email,password} = req.body
          if(!req.body){
                    res.status(400)
                    throw new Error("Please enter all field")
          }

          // Doctor Exists
          const doctorExist = await Doctor.findOne({email})

          if(doctorExist){
                    res.status(400)
                    throw new Error("User already exist")
          }


          // Hashing Password
          const salt = await bcrypt.genSalt(10)
          const hashedPassword = await bcrypt.hash(password,salt)

          // Create new Doctor
          const doctor = await Doctor.create({
                    name,
                    email,
                    password:hashedPassword
          })

          if(doctor){
                    res.status(200).json({
                              _id:doctor.id,
                              name:doctor.name,
                              email:doctor.email,
                              token : generateToken(doctor._id)
                    })
          }else{
                    res.status(400)
                    throw new Error("Doctor Not created")
          }
})

const loginDoctor = asyncHandler(async(req,res)=>{

          const {email,password} = req.body

          const doctor = await Doctor.findOne({email})

          if (doctor && (await bcrypt.compare(password,doctor.password))){
                    res.status(200).json({
                              _id:doctor.id,
                              name:doctor.name,
                              email:doctor.email,
                              token : generateToken(doctor._id)
                    })
          }else{
                    res.status(400)
                    throw new Error("Invalid creditinals")
          }
})  

// Generate jwt token 

const generateToken =(id)=>{
          return jwt.sign({id},process.env.JWT_secret,
                    {expiresIn:'30d'
          })
}


const getDoctor = asyncHandler(async(req,res)=>{
          const {_id,name,email}=await Doctor.findById(req.doctor.id)

          res.status(200).json({
                    id:_id,
                    name,
                    email,
          })
})

module.exports = {
          registerDoctor,
          loginDoctor,
          getDoctor
}