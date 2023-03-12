const mongoose = require('mongoose')

const patientSchema = mongoose.Schema(
       {

         doctor :
         {
                  type:mongoose.Schema.Types.ObjectId,
                  required:true,
                  ref:'Doctor',
                     
         },
          Name :
          {
                    type:String,
                    required:[true,'Please Add A Name']
          },

          Symtopms :
          {
                    type:String,
                    required:[true,'Please Add A Symtopms']
          },

          Age :
          {
                    type:Number,
                    required:[true,'Please Add Age']
          },
          
          Gender:
          {
                    type:String,
                    required:[true,'Please Add Gender']
          },
},
{
timestamps:true,
})

module.exports = mongoose.model("Patient",patientSchema)

