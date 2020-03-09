const express = require('express');
const app = express();
const morgan = require('morgan');
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');

//Connect with mongodb database
require('./db/database');

// To check api logs 
app.use(morgan('dev'));

// To get  json in request body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const userRoute = require('./routes/route');

app.use('/',userRoute);






app.listen(port,(err)=>{
    if(err){
        console.log("Something went wrong.");
    }else{
        console.log(`Server is running at ${port}`);
    }
})
