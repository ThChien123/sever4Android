var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');
const mongoose = require('mongoose');
require('./components/categories/CategoryModel');
require('./components/products/productModel');



const indexRouter = require('./routes/index');


//khai báo đường dẫn
const ProductAPIRouter = require('./routes/api/ProductAPI');
const UserAPIRouter = require('./routes/api/UserAPI');
const ProductCPanelRouter = require('./routes/cpanel/ProductCPanel');
const UserCPanelRouter = require('./routes/cpanel/UserCPanel');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'tranthienchien',
  resave: true,
  saveUninitialized: true,
  cookie: { secure: false }
}));

// chạy online: mongodb+srv://chienttps24584:123@chienttps24584.fbgelrl.mongodb.net/MOB402?retryWrites=true&w=majority
mongoose.connect('mongodb://127.0.0.1:27017/CP17309', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('>>>>>>>>>> DB Connected!!!!!!'))
  .catch(err => console.log('>>>>>>>>> DB Error: ', err));


//khai báo đường dẫn tĩnh
//http://localhost:3000/
app.use('/', indexRouter);

//http://localhost:3000/api/user
app.use('/api/user', UserAPIRouter);
//http://localhost:3000/api/product
app.use('/api/product', ProductAPIRouter);

//http://localhost:3000/cpanel/user
app.use('/cpanel/user', UserCPanelRouter);
//http://localhost:3000/cpanel/product
app.use('/cpanel/product', ProductCPanelRouter);





// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
