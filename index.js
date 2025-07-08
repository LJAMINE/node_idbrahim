const config=require('config');
const express = require("express");
const helmet =require('helmet');
const morgan =require('morgan');
const Joi = require("joi");
const logged=require('./middleware/logged.js')
const app = express();

const courses=require("./router/courses.js")
const home=require("./router/home.js")


app.use("/api/courses",courses);
app.use("/",home);

app.use(express.json());

app.use(express.urlencoded());

app.use(express.static("public"));

app.use(logged.log);

app.use(helmet());

// config 

console.log(`app name : ${config.get('name')}`);
console.log(`mail server : ${config.get('mail.host')}`);


app.use(morgan('tiny'));

app.use((req,res,next) => {
  console.log('authenticated ...')
  next()
}
) 








const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`the app is listening to port ${port}`);
});
