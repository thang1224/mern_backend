const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


exports.signup = (req, res) => {
    

    User.findOne({ email: req.body.email })
    .exec( async (error, user) => {
        if(user) return res.status(400).json({
            message: "User already registered"
        });

        const {
            firstName,
            lastName,
            email,
            password,
            username
        } = req.body;

        const hash_password = await bcrypt.hash(password, 10);
        const _user = new User({
            firstName,
            lastName,
            email,
            hash_password,
            username
        });

        _user.save((error, data) => {
            if(error){
                return res.status(400).json({
                    message: 'Something went wrong',
                    err: error
                });
            }

            if(data){
                return res.status(201).json({
                    message: 'User created successfully!'
                });
            }
        });

    });
}

exports.signin = (req, res) => {
    User.findOne({ email : req.body.email })
    .exec((error, user) => {
        if(error) return res.status(400).json({ error });

        if(user){

            if(user.authenticate(req.body.password)){
                const token = jwt.sign({_id: user._id, role: user.role}, process.env.JWT_SECRET, { expiresIn: '1h'});
                const { _id, firstName, lastName, email, role, fullname } = user;
                res.status(200).json({
                    token,
                    user:{
                        _id, firstName, lastName, email, role, fullname
                    }
                });
            }else{
                return res.status(400).json({
                    message: 'Invalid password'
                });
            }

        }else{
            return res.status(400).json({ message: 'Something went wrong'});
        }
    });
}

/* exports.requireSignin = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    next();
} */