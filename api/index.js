const mongoose = require('mongoose');
const app = require('./app')

const port = process.env.PORT || 3001;

const DB_PATH = "mongodb+srv://jeffrey:adonis@cluster0.aruyj.mongodb.net/?retryWrites=true&w=majority"

mongoose.connect(DB_PATH, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(res => {
        console.log('Connected to Database')
        
        // starting the server
        app.listen(port, () => {
            console.log(`App listening on port http://localhost:${port}`);
        });
    })
    .catch(err => console.log(err));