const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');


//sub routers
const productRouter = require('./Router/ProductRoute');

//mongodb connection
mongoose.connect('mongodb+srv://jdproject:9110864513@myprojects.oxt8t.mongodb.net/jdproduct?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true  }  )
    .then(() => console.log('successfully connected mongodb'))
    .catch((err)=> console.log(err))



//middleware
const app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(morgan('dev'))
app.use(cors());


//routers
app.use('/product', productRouter);



//catch error 404 and forwarded to error handler
app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404 
    next(error);
})
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        message:error.message
    })
})

//port 
const port = process.env.PORT || 5000;

//start server
app.listen(port, (req, res, next) => {
    console.log(`server starts from port number ${port}`)
});