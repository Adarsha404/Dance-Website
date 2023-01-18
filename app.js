const express= require("express"); //Using express module
const app=express();               //Assigning app ti the fuction of express
const path=require("path");        //Using path module to concatinate tha path
const fs=require("fs");            //Using FS module to store data from form
const port=80                      //Using port 80 because it is best      
const bodyparser=require("body-parser");
const mongoose = require('mongoose');    //Using mongoose DB on node
mongoose.set('strictQuery', true);
main().catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/contactDance');
}            


//Defince mongoose schema
const contactSchema = new mongoose.Schema({
    name: String,
    phone: Number,
    email: String,
    address: String,
    desc: String
  });
 const contact = mongoose.model('contact', contactSchema);

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files into website (not required)
app.use(express.urlencoded({extended:false})) //// It handles the upcoming (post)request and changes it into object and is easy to store data into file/database 

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set/initializing the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory
 
// ENDPOINTS
app.get("/", (req, res)=>{
    res.status(200).render('home.pug');
})
app.get('/home', (req, res)=>{
    res.status(200).render('home.pug');
})
app.get('/about', (req, res)=>{
    res.status(200).render('home.pug');
})
app.get('/services', (req, res)=>{
    res.status(200).render('home.pug');
})
app.get('/class', (req, res)=>{
    res.status(200).render('home.pug');
})
app.get('/contact', (req, res)=>{
    res.status(200).render('contact.pug');
})
app.post('/contact', (req, res)=>{
    var myData= new contact(req.body);
    myData.save().then(()=>{
        res.status(200).render("home.pug");
        console.log(req.body);

    }).catch(()=>{
        res.status(400).send("This item was not saved to the database");
    });
})

// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});