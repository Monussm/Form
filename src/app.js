const express=require ('express')
const app=express()
const path=require('path')
const hbs=require('hbs')
const bodyparser=require('body-parser')
const mypath=path.join(__dirname,"../public")
const mypartials=path.join(__dirname,"../partials")
app.use(express.static(mypath))
app.set('view engine','hbs')
hbs.registerPartials(mypartials)
const mongoose = require('mongoose');
main().catch(err => console.log(err));
async function main() {
mongoose.set('strictQuery', true);
await mongoose.connect('mongodb://127.0.0.1:27017/contact');
}
//Define Mongoose schema//
const contact= new mongoose.Schema({
    firstname:{
    type:String,
    required:true
    },
    lastname:{
    type:String,
    required:true
    },
    email:{
    type:String,
    required:true,
    unique:[true,"Email is already present"],
    validate(value){
    if(!validator.isEmail(value)){
        throw new Error("invalid email")
    }
    }
    },
    mobileno:{
    type:Number,
    required:true
    },
    password:Number,
  });
  const Contact = mongoose.model('Contact',contact)
app.get("/",(req,res)=>{
const params={ }    
res.render("index",params)
})
app.post("/",(req,res)=>{
const mydata=new Contact(req.body);
mydata.save().then(()=>{

res.send("This item been saved in database")
}).catch(()=>{

res.status(404).send("This item not saved in database")
})
const params={ }    
res.render("index",params)
})
app.get("/log",(req,res)=>{

res.render("log")

})
app.listen(3000)