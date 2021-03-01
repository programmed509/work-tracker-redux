const express = require('express');
const app = express();
const cors = require('cors');
const connectDB = require('./config/db');
const path = require('path');

connectDB()

//using a middleware
app.use(express.json({extended: false}));

//using cors
app.use(cors());

//routes
app.use('/api/tasks', require('./routes/tasks'))

app.use('/api/users', require('./routes/users'));

if (process.env.NODE_ENV === 'production'){

    app.use(express.static('client/build'));

    app.get('*', (req,res)=>
        res.sendFile(path.resolve(__dirname, 'client' , 'build', 'index.html'))
    );
}

const PORT = process.env.PORT || 5000

app.listen(PORT, ()=>console.log(`Server started at ${PORT}`))