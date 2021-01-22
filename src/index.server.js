const express = require("express");
const app = express();
const env = require("dotenv");
const mongoose = require("mongoose");
const cors = require('cors');


//routes

const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin/auth');
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');
const cartItemRoutes = require('./routes/cart');
const initialDataRoutes = require('./routes/admin/initialData');
const path = require('path');
// enviroment variable
env.config();

// connection string: mongodb+srv://root:<password>@cluster0.cyiyy.mongodb.net/<dbname>?retryWrites=true&w=majority
mongoose.connect(
    'mongodb+srv://'+ process.env.MONGO_DB_USER +':'+process.env.MONGO_DB_PASSWORD+'@cluster0.cyiyy.mongodb.net/'+process.env.MONGO_DB_DATABASE+'?retryWrites=true&w=majority', 
    {
        useNewUrlParser: true, 
        useUnifiedTopology: true,
        useCreateIndex: true
    }
).then( () => {
    console.log("Database connected");
});


app.use(cors());
app.use(express.json());
app.use('/public', express.static(path.join(__dirname, 'uploads')));
app.use('/api', authRoutes);
app.use('/api', adminRoutes);
app.use('/api', categoryRoutes);
app.use('/api', productRoutes);
app.use('/api', cartItemRoutes);
app.use('/api', initialDataRoutes);
app.get('/', (req, res) => {
    res.status(200).json({
        message : "Hello from server"
    });
});

app.post('/data', (req, res) => {
    res.status(200).json({
        message : req.body
    })
});

app.listen(process.env.PORT, () => {
    console.log('Server is running on port ' + process.env.PORT);
});