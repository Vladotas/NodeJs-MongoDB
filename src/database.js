const mongoose = require('mongoose');

const { TECNOBRO_MONGODB_HOST, TECNOBRO_MONGODB_DATABASE} = process.env;
const MONGODB_URI = `mongodb://${TECNOBRO_MONGODB_HOST}/${TECNOBRO_MONGODB_DATABASE}`;

mongoose.connect(MONGODB_URI,{
    useUnifiedTopology: true,
    useNewUrlParser: true
})
    .then(db => console.log("database is connected"))
    .catch(err => console.log(err));