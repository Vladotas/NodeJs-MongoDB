const UserCtrl = {};

const User = require('../models/User');

UserCtrl.renderSignUpForm = (req, res) => {
    res.render('users/signup');
};

UserCtrl.signup = async (req, res) => {
    const errors = [];
    const {name, email, password, confirm_password} = req.body;
    if(password != confirm_password){
        errors.push({text: 'passwords do not match.'});
    };
    if(password.length < 4) {
        errors.push({text: 'Passwords must be at laest 4 characters.'});
    };
    if(errors.length > 0){
        res.render('users/signup', {
            errors,
            name,
            email
        }); 
    }else {
      const emailUser = await User.findOne({email:email});
      if(emailUser) {
          req.flash('error', 'the email is already is use');

          res.redirect('/users/signup');
      } else{
         const newUser = new User ({name, email, password});
         newUser.password = await newUser.encryptPassword(password);
         await newUser.save();
         req.flash('success_msg','You are registered BREo')
         res.redirect('/users/signin');
      }
    }
};

UserCtrl.renderSignInForm = (req, res) => {
    res.render('users/signin');
};

UserCtrl.signin = (req, res) => {
    res.send('entraste breooo');
}

UserCtrl.logOut = (req, res) => {
    req.send('Se fueee');
}

module.exports = UserCtrl;