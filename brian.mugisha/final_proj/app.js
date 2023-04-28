// const http = require('http');
// const fs = require('fs');
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose")
const app = express();
const path = require("path");
const session = require("express-session")
const passport = require("passport")
const bodyParser = require('body-parser');


const Register = require("./models/registerModel")
const config = require("./config/database")

// const server = http.createServer((req, res) => {
//   if (req.url === '/') {
//     // Read the HTML file
//     fs.readFile('index.html', (err, data) => {
//       if (err) {
//         res.writeHead(500);
//         return res.end('Error loading index.html');
//       }

//       // Send the HTML file in the response
//       res.writeHead(200, { 'Content-Type': 'text/html' });
//       res.end(data);
//     });
//   } else {
//     res.writeHead(404);
//     res.end('Not found');
//   }
// });

const registerRoutes = require("./routes/registerRoutes")

// use express session middleware
app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized:false
  }))

  app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  }),
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());
passport.use(Register.createStrategy());
passport.serializeUser(Register.serializeUser());
passport.deserializeUser(Register.deserializeUser())

// creating mongodb connection
mongoose.connect(config.database,{
    useNewUrlParser: true, 
    useUnifiedTopology: true
  })
  const db = mongoose.connection
  
  // checking if db has connected
  db.once("open", ()=>{
    console.log("connected to db")
  })
  db.on("error",(err)=>{
    console.error(err)
  })

  // set pug engine
app.set("view engine","pug")
app.set("views", path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname, "public"))); 

//use Route
app.use("/",registerRoutes) 
app.use("/",router)



app.get("*", (req,res)=>{
    res.status(404).send("page does not exist")
  })
  

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
