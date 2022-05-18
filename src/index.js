const express = require("express");
const path = require("path");
const app = express();
const hbs = require("hbs");
var bodyParser = require('body-parser');
// create application/json parser
var jsonParser = bodyParser.json();
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(urlencodedParser);
app.use(jsonParser);

require("./db/connect");
const Signup = require("./models/signup");
const async = require("hbs/lib/async");

const port = process.env.PORT || 3000;

const static_path = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");
const images_path = path.join(__dirname, "../public/images");

app.use(express.static(static_path));
app.set("view engine", "hbs");
app.set("views", template_path); 
hbs.registerPartials(partials_path);
app.use(express.static(images_path));

app.get("/", (req, res) => {
    res.render("index");
});

app.get("/index", (req, res) => {
    res.render("index");
});

app.get("/Genre", (req, res) => {
    res.render("Genre");
});

app.get("/abcd", (req, res) => {
    res.render("abcd");
});

app.get("/donate", (req, res) => {
    res.render("donate");
});

app.get("/Premiere", (req, res) => {
    console.log("Inside Priemiere GET ");
    res.render("Premiere");
});
// signup
app.post("/Premiere", async (req, res) => {
    
    try{
        const password = req.body.password;
        const confirmpassword = req.body.confirmpassword;
        if (password === confirmpassword){
            const userrecord = new Signup({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                confirmpassword: req.body.confirmpassword
            });
            
            const userstatus = await userrecord.save();
            console.log(userstatus);
            res.redirect("Premiere");

        }else{
            res.render("Premiere");
        }

    } catch (error) {
        res.status(400).send(error);
    }

});

// signin
app.post("/PremiereSignIn",async (req, res) => {
    try {
        console.log("Inside /PrimierSignIn");
        console.log(req.body);
        const email = req.body.email;
        const password = req.body.password;
        
        
        const useremail = await Signup.findOne({email:email});
        console.log(useremail);
        
        if(useremail!== null && useremail.password === password){
            res.status(201).render("index");
        }else{
            
            res.status(404).render("Premiere");
        }

    } catch (error) {
        console.log(error);
       res.status(400).render("Premiere");
    }
});

app.get("/ID", (req, res) => {
    res.render("ID");
});

app.listen(port, () => {
    console.log(`Server is running at port no ${port}`);
});