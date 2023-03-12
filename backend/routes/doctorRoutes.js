const express = require('express')
const router = express.Router()
const {
          registerDoctor,
          loginDoctor, 
          getDoctor 
}= require('../controller/doctorController')
const {protect}= require('../middleware/authMiddleware')



router.post('/',registerDoctor)
router.post('/login',loginDoctor)
router.get('/me',protect,getDoctor)

module.exports = router

