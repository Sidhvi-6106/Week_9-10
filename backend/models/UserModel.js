import {Schema,model} from "mongoose"

const userSchema=new Schema({
    firstName:{
        type:String,
        required:[true,"First Name is Required"]
    },
    lastName:{
        type:String
    },
    email:{
        type:String,
        required:[true,"Email is Required"],
        unique:[true,"Email already existed"]
    },
    password:{
        type:String,
        required:[true,"Password is Required"]
    },
    profileImageUrl:{
        type:String
    },
    displayName:{
        type:String
    },
    bio:{
        type:String
    },
    location:{
        type:String
    },
    theme:{
        type:String,
        enum:["light","warm","dark"],
        default:"light"
    },
    role:{
        type:String,
        enum:["AUTHOR","USER","ADMIN"],
        required:[true," {Value}Invalid Role"] //{Value } will give the value sent by the client and it will send to the user 
    },
    isActive:{
        type:Boolean,
        default:true
    }
},{
        timestamps:true,
        strict:"throw",
        versionKey:false
    },
);

export const userTypeModel= model("user",userSchema)
