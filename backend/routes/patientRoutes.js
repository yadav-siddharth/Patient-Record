const express = require("express")
const router = express.Router()
const {
          getPatient,
          setPatient,
          updatePatient,
          deletePatient
} = require ('../controller/patientController.js')
const {protect} = require('../middleware/authMiddleware')


router.get('/',protect,getPatient)


router.post('/',protect,setPatient)

router.put('/:id',protect,updatePatient)

router.delete('/:id',protect,deletePatient)

module.exports  = router