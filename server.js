const express = require('express')
const mongoose = require('mongoose');   
const Router = require('express').Router();
const cors = require('cors');

const userRouter = require('./router/userRouter');

const app = express();

app.use(express.json());  

mongoose.connect('', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log("✅ MongoDB connected");
    
})
.catch(err => console.log("❌ DB connection error:", err));


// app.post('/users', async (req, res) => {
//     try {   
//         const user = new userModel(req.body);
//         await user.save();
//         res.status(201).send(user);
//     }   
//     catch (error) {
//         res.status((400), send(error));
//     }   
// });


// app.get('/', async (req, res) => {
//     try {
//         const users = await userModel.find();
//         res.status(200).send(users);
//     } catch (error) {
//         res.status((500), send(error));
//     }   
// });

app.use(cors());
app.use('/', userRouter);

app.listen(5000,()=>{
    console.log('Server Running on port http://localhost:5000');
    
});

