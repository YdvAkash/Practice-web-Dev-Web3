const bcrpt = require("bcrpt");
const express =  require ("express");
const jwt = require("jsonwebtoken");
const mongoose = require ("mongoose");
// const { UserModel, TodoModel } = require("./Db");
const {UserModel,  TodoModel} = require("./Dbjs");



// mongoose.connect("mongodb+srv:admin:1234@.mongodb.net/")
mongoose.connect("mongodb+srv://admin:1234@aksh.hy6ox.mongodb.net/todo-app")
const { auth, JWT_SECRET } = require("./auth");
 const app = express();
 app.use(express.json());

 app.post("/signup", async function(req, res) {
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;

    const hasedPassword = await bcrypt.hash(password, 10);

    await UserModel.create({
        email: email,
        password: hasedPassword,
        name: name
    });
    
    res.json({
        message: "You are signed up"
    })
});


app.post("/signin", async function(req, res) {
    const email = req.body.email;
    const password = req.body.password;

    const user = await UserModel.findOne({
        email: email,
    });

    const passwordMatch = bcrypt.compare(password, user.password);
    if (user && passwordMatch) {
        const token = jwt.sign({
            id: user._id.toString()
        }, JWT_SECRET);

        res.json({
            token
        })
    } else {
        res.status(403).json({
            message: "Incorrect creds"
        })
    }
});

 app.post("/todo",function(req,res){
    
 })


 app.get("/todos",function(req,res){
    
 })

 app.listen(6000);

 
 
 
