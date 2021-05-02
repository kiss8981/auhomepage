const vhost = require('vhost');
const express = require('express');
const cookieParser = require("cookie-parser");
const path = require("path");
const logger = require("morgan");
const http = require("http");
const app = express();
const server = http.createServer(app);

const indexRouter = require('./routes/index');
const apiRouter = require('./routes/api');
const shopRouter = require('./routes/payment');
const session = require('express-session');

const domain = "audiscordbot.xyz"

// view engine setup

app.use(express.static("public"));
app.set("views", path.join(__dirname, "views"));
app.set('view engine', 'ejs');

app.use(cookieParser(`secret`));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(`secret`));
app.use(express.static(path.join(__dirname, "public")));


app.use(session({
  secret: '48738924783748273742398747238',
  resave: false,
  saveUninitialized: false,
  expires: 604800000,
}));
app.use(vhost(`api.${domain}`, apiRouter));
app.use(vhost(`shop.${domain}`, shopRouter));
app.use('/', indexRouter);



const listener = server.listen(8080, function() {
  console.log(`[Server] http://${domain}:` + listener.address().port);})

module.exports = app;
