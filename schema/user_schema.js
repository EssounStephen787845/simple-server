import mongoose from "mongoose"
const {Schema,model}= mongoose

const user_schema = Schema({
    first_name:{
        type:String,
        require:true
    },
    last_name:{
        type:String,
        require:true
    },
    date_of_birth:{
        type:String,
        require:true
    },
    school:{
        type:String,
        require:true
    }
})
const Usermodel = model("User",user_schema) 

export default Usermodel