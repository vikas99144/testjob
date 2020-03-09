const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);
const Response = require('./../utils/response');
const sendMailer = require('./../utils/smtp');
const jwt = require('jsonwebtoken');
const User = require('./../modals/user');


module.exports.signup = async (req, res) => {
    const params = req.body;
    const isEmailExist = await User.findOne({ email: params.email }).exec();
    if (isEmailExist) {
        Response.response(401, 'User already exist.', res)
    } else {
        params.password = bcrypt.hashSync(params.password, salt);
        const newUser = new User(params);
        newUser.save((err) => {
            if (err) {
                Response.response(500, 'Internal error', res);
            } else {
                var token = jwt.sign({ data: 'foobar' }, 'secret', { expiresIn: '1h' });
                (async () => {
                    await User.findOneAndUpdate({ email: params.email }, { token: token }, { useFindAndModify: false }).exec();
                })();
                var data = {
                    url: `http://localhost:3000/verify?token=${token}`
                }
                sendMailer.send(params.email, data, (callback) => {
                    if (callback == "false") {
                        Response.response(500, 'Internal error', res);
                    } else {
                        Response.response(200, 'User created successfully.', res);
                    }
                });

            }
        })
    }
}


module.exports.login = async (req, res) => {
    const params = req.body;
    const isUserExist = await User.findOne({ email: params.email }).exec();
    if (!isUserExist) {
        Response.response(404, 'User not found.', res)
    } else {
        if (!isUserExist.isVerify) {
            Response.response(200, 'Please verify your email', res);
        }
        else if (bcrypt.compareSync(params.password, isUserExist.password)) {
            Response.response(200, 'Login successfully', res);
        } else {
            Response.response(403, 'Check your password', res);
        }

    }

}



module.exports.tokenLogin = async (req, res) => {
    const params = req.body;
    const isUserExist = await User.findOne({ token: params.token }).exec();
    if (!isUserExist) {
        Response.response(404, 'User not found.', res)
    } else {
        if (!isUserExist.isVerify) {
            Response.response(200, 'Please verify your email', res);
        } else {
            Response.response(200, 'Login successfully', res);
        }

    }

}

module.exports.verify = async (req, res) => {
    var params = req.query;
    var token = await User.findOneAndUpdate({ token: params.token }, { isVerify: true }, { useFindAndModify: false }).exec();
    if (token) {
        Response.response(200, "Email verified", res);
    } else {
        Response.response(500, "Internal error", res);
    }
}