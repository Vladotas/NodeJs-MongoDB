const express = require('express');
const path = require ('path');
const exphbs = require ('express-handlebars');
const morgan = require('morgan');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');


//Initializations
const app = express();

// Settings
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
app.engine('hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layout'),
    partialsDir: path.join(app.get('views'), 'partial'),
    extname: '.hbs'
}));
app.set('view engine','.hbs');

// Middlewares
app.use(express.urlencoded({extended: false}));
app.use(morgan('dev'));
app.use(methodOverride('_method'));
app.use(session({
    secret: 'vladotas',
    resave: true,
    saveUninitialized: true
}));
app.use(flash());

// Global Variables
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error = req.flash('error');
    next();
} )

// Routes
app.use(require('./routes/index.routes'))
app.use(require('./routes/notes.routes'))
app.use(require('./routes/user.routes'))

// Static Files
app.use(express.static(path.join(__dirname,'public')));

module.exports = app;