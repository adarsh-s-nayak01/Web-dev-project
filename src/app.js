const e = require("express");
const express =  require("express");
const path = require("path");
const app= express();
const hbs=require("hbs");

require("./db/conn");
const Register =require("./models/register")

const port= process.env.PORT || 3000;


const static_path=path.join(__dirname,"../public");
const template_path=path.join(__dirname,"../templates/views");
const partials_path=path.join(__dirname,"../templates/partials");

//console.log(path.join(__dirname." ../public"));
//app.use(express.static());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(static_path));

app.set("view engine","hbs");
app.set("views",template_path);
hbs.registerPartials(partials_path);



//well have to give the path of home page in here 

app.get("/",(req,res)=>{
    res.render("index");
});


app.get("/register",(req,res)=>{
    res.render("register");
});

app.get("/login",(req,res)=>{
    res.render("login");
});

app.get("/StudentProfile",(req,res)=>{
    res.render("StudentProfile");
});
app.get("/TestLogin",(req,res)=>{
    res.render("TestLogin");
});
app.get("/Test",(req,res)=>{
    
    res.render("Test");
});
app.get("/TestResults",(req,res)=>{
    res.render("TestResults");
});
app.get("/OptionEntryPage1",(req,res)=>{
    res.render("OptionEntryPage1");
});
app.get("/AllotmentResults",(req,res)=>{
    res.render("AllotmentResults");
});

app.get("/about",(req,res)=>{
    res.render("about")
})

//posting the info to the database

app.post("/register",async (req,res)=>{
    try{


        // res.send(req.body.firstname);



        const password=req.body.password;
        const cpassword=req.body.confirmpassword;
        if(password===cpassword){
            const registerEmployee = new Register ({
                name: req.body.name,
                username:req.body.username,
                email: req.body.email,
                password: password,
                confirmpassword: cpassword
            })
           const registered= await registerEmployee.save();
            res.status(201).render("index");
            
            
        }else{
            res.send("Passwords doesn't match");
          
        }
    }catch (error) {
        console.error(error);
        res.status(400).send(error);
    }
});

app.post("/login",async (req,res) =>{
    try{
           const email = req.body.email;
           const password = req.body.password;
           const userEmail= await Register.findOne({email:email});
           
        
           
           if(userEmail.password===password){
                  
                res.status(200).render("StudentProfile",{email: userEmail.email, name:userEmail.name, username:userEmail.username});
                
           }
           else{ 
                
                res.render("login");
                
                
            
               
           }
    }catch (error){

        res.status(401).send("Invalid Login details") 
    }
});


app.listen(port, () => {
    console.log(`server is running at port no ${port}`);
});

