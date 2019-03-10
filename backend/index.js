const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Task =  require('./model/Task')
const Credential =  require('./model/Credential')




// App Initialization
const app = express();

// DB Config
const db = require('./config/database');

// Map global promise - get rid of warning
mongoose.Promise = global.Promise;

// Connect to mongoose
mongoose.connect(db.mongoURI)
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));
mongoose.set('useFindAndModify', false);


// cross origin mioddleware
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS')
    next();
});


// Body parser middleware
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());


// Index Route
app.get('/', (req, res) => {
    const title = 'Welcome To Nodejs CRUD Rest api';
    res.json({
        title: title
    })
});

// Post User Details
app.post('/add-task',(req,res)=>{

    const task =   new Task({
        taskName:req.body.taskName,
        taskDescription:req.body.taskDescription,
        startDate:req.body.startDate,
        endDate:req.body.endDate,
        status:req.body.status,
        userId:req.body.userId
    })
task.save().then(()=>{

    res.json({message:"Task has been Successfully Added"})

}).catch(err=>{
    res.json({message:"Something went Wrong"})
})

})
// Get User Details
app.get('/get-all-tasks/:userId',(req,res)=>{

Task.find().where("userId",req.params.userId).then(data=>{
    res.json({data:data})
}).catch(err=>{
    res.json({message:"Something went Wrong"})
})


})

// signUp
app.post('/sign-up',(req,res)=>{
const cred = new Credential({firstName:req.body.firstName,
    lastName:req.body.lastName,
    password:req.body.password,
    email:req.body.email,
    phoneNumber:req.body.phoneNumber});
Credential.find().where("email",req.body.email).then(data=>{
    if(data.length != 0){
        res.json({message:"User Already Exist"})
    }else{
        cred.save().then(()=>{
            res.json({message:"User created Successfully",login:true})
        })
    }
}).catch(err=>{ 
    res.json({message:"Something went Wrong"})

})
})
 
// Update data
app.put('/update-task/:id',(req,res)=>{
    let task =  {
        taskName:req.body.taskName,
        taskDescription:req.body.taskDescription,
        startDate:req.body.startDate,
        endDate:req.body.endDate,
        status:req.body.status,
        userId:req.body.userId
    }
    Task.findOneAndUpdate({_id:req.params.id},task,{new:true},(err)=>{
        if(err){
            res.json({message:"Something went Wrong."})
        }
        res.json({message:"Task Successfully Updated."})
    })
})
//get task by id
app.get('/get-task/:id',(req,res)=>{
    Task.findOne().where({_id:req.params.id}).then(data=>{
        res.json(data)
    })
})
// remove task
app.delete('/delete-task/:id',(req,res)=>{
    Task.findOneAndDelete({_id:req.params.id},(err)=>{
        if(err){
            res.json({message:"Something went Wrong"})
        }
        res.json({message:"Task successfully Removed"})
    })
})
// Login
app.post('/log-in',(req,res)=>{
    const cred = new Credential({userEmail:req.body.userEmail,password:req.body.password});
Credential.find().where("email",req.body.email).then(data=>{
    if(data.length == 0){
        res.json({message:"User Doesn't Exist"})
    }else{
       const credential = data[0]
       if(req.body.email === credential.email){
           if(req.body.password === credential.password){
               res.json({login:true,message:"Logged In Successfully",id:data[0]._id})
           }
           else{
               res.json({login:false,message:"Check your password"})
           }
       }
    }
}).catch(err=>{
    res.json({message:"Something went Wrong"})

})
})
// Using port 5000 or environmental port
const port = process.env.PORT || 5000;


// Starting server
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});