const asyncHandler = require('express-async-handler')
const { PromiseProvider } = require('mongoose')
const Patient = require('../models/patientModel')
const Doctor = require('../models/doctorModel')

// Get Patient 
const getPatient = asyncHandler(async(req,res)=>{
  const patients = await Patient.find({doctor:req.doctor.id})
 
  res.status(200).json(patients)
  
})

// Create a Patient 
const setPatient = asyncHandler(async(req,res)=>{
  const {Name,Symtopms,Age,Gender} = req.body

  if (!req.body){
    res.status(400)
    throw new Error("please enter field")
  }

  const patient = await Patient.create(
    {
      Name:req.body.Name,
      Symtopms:req.body.Symtopms,
      Age:req.body.Age,
      Gender:req.body.Gender,
      doctor:req.doctor.id
    }
  )
  res.status(200).json(patient)
})


// Update a Patient
const updatePatient = asyncHandler(async(req,res)=>{
  const patient = await Patient.findById(req.params.id)

  if (!patient){
    res.status(400)
    throw new Error("Patient Not Found ")
  }

  const doctor = await Doctor.findById(req.doctor.id)

  // Check doctor 
  if (!doctor){
    res.status(401)
    throw new Error("Doctor not found")

  }
  // Make sure the logged in doctor macthed the patient
  if (patient.doctor.toString() !== doctor.id){
    res.status(401)
    throw new Error("doctor not authorized")
  }


  const updatedpatient = await Patient.findByIdAndUpdate(req.params.id,req.body,
    {new:true},
    )
    res.status(200).json(updatedpatient)
  })



// Delete a Patient
const deletePatient = asyncHandler(async(req,res)=>{

  const patient = await Patient.findById(req.params.id)

  if (!patient){
    res.status(400)
    throw new Error("Patient Not Found ")
  }
  const doctor = await Doctor.findById(req.doctor.id)

  // Check doctor 
  if (!doctor){
    res.status(401)
    throw new Error("Doctor not found")

  }
  // Make sure the logged in doctor macthed the patient
  if (patient.doctor.toString() !== doctor.id){
    res.status(401)
    throw new Error("doctor not authorized")
  }

  await patient.remove()
  res.status(200).json({id:req.params.id})
})


module.exports ={
  getPatient,
  setPatient,
  deletePatient,
  updatePatient,
  deletePatient
} 

