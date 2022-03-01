const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const saltRounds=10;

const userSchema = new mongoose.Schema({
    username: {type: String, required: true, unique:true},
    password: {type: String, required: true}
});
 
userSchema.pre('save',function(next){
    if(this.isNew || this.isModified('password')){
        const document=this;
        bcrypt.hash(document.password, saltRounds,(err,hashedPassword)=>{
            if(err){
                next(err);
            }else{
                document.password=hashedPassword;
                next();
            }
        });
    }else{
        next();
    }
});

userSchema.methods.isCorrectPassword=function(password,callback){
    bcrypt.compare(password,this.password,function(err,res){
        if(err){
            callback(err);
        }else{
            callback(err,res);
        }
    });
}

module.exports = mongoose.model('User',userSchema);