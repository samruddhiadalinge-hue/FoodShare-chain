import mongoose from 'mongoose';
const schema=new mongoose.Schema({name:{type:String,required:true,trim:true,maxlength:100},email:{type:String,required:true,unique:true,lowercase:true,trim:true},phone:{type:String,required:true,match:/^[0-9]{10}$/},role:{type:String,required:true,enum:['donor','ngo']},passwordHash:{type:String,required:true,select:false}},{timestamps:true});
export default mongoose.model('User',schema);
