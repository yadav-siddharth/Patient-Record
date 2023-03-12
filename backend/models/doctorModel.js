const mongoose = require('mongoose')

const doctorSchema = mongoose.Schema(
          {
                    name :
                    {
                              type:String,
                              required:[true,'Please Add  Name']
                    },
          
                    email :
                    {
                              type:String,
                              required:[true,'Please Add email']
                    },
          
                    password :
                    {
                              type:String,
                              required:[true,'Please Add  password']
                    },
                    
          },
          {
          timestamps:true,
          }
)

module.exports = mongoose.model("Doctor",doctorSchema)