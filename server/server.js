const app = require("express")();
const http = require("http").Server(app);
const morgan = require("morgan");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const fs = require('fs');
const path = require("path");

const config = require('./config/config');
const db = require('./db/db');


// make directory
var dir = './uploads'
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir)
}

const authRoute = require('./routes/auth/auth');
const checkAuthRoute = require('./routes/checkAuthentication/checkAutentication');
const addNewMessageRoute = require('./routes/adding/new-Message');
const editMessageRoute = require('./routes/adding/edit-Message');

const addSendereRoute = require('./routes/senders/add-sender');
const getSenderesRoute = require('./routes/senders/get-senders');

const newUserRoute = require('./routes/addUser/new-user');
const checkisAdminRoute = require('./routes/checkAuthentication/checkIsAdminVueRoute');

const changePasswordRoute = require('./routes/auth/changePassword');

const searchBySenderRoute = require('./routes/searchBySender/searchbysender');

const getLastSerial = require('./routes/adding/last-serial');

// app.use(bodyparser.json());
// app.use(bodyparser.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cors());
app.use(bodyparser.json({limit: '50mb'}));
app.use(bodyparser.urlencoded({limit: '50mb', extended: true}));

app.use('/check-is-auth', checkAuthRoute);
app.use('/check-is-admin', checkisAdminRoute);
app.use("/auth", authRoute);
app.use('/new-message', addNewMessageRoute);
app.use('/edit-message', editMessageRoute);
app.use('/add-sender', addSendereRoute);
app.use('/get-senders', getSenderesRoute);
app.use('/new-user', newUserRoute);
app.use('/change-password', changePasswordRoute);
app.use('/search-by-sender', searchBySenderRoute);
app.use('/get-last-serial', getLastSerial);

const express = require("express");
app.use(express.static(path.join(__dirname, "uploads")));
app.use(express.static(path.resolve("uploads")));
app.use("/profile-image/", express.static("./uploads"));


mongoose.Promise = global.Promise;
const ConnectionUri = config.db;
mongoose.connect(ConnectionUri, (err) => {
  if (err) {
    console.log("Error in connecting to Mongo DB !!");
    throw err;
  }
  console.log("successfully connected to database ..");
});

// create admin
const createAdmin = new db.UsersSchema();
const name = 'admin';
const password = 'admin1';

db.UsersSchema.findOne({ name: name, password: password })
  .exec((err, doc) => {
    if (err) throw err;
    if (doc) {
      console.log('admin already created');
    } else {
      createAdmin.name = name;
      createAdmin.password = password;
      createAdmin.isAdmin = true
      createAdmin.save();
    }
  })


const port = config.port || 8000 ||  process.env.PORT;
http.listen(port, (err) => {
  if (err) {
    throw err;
  } else {
    console.log(`server running on port ${port}`);
  }
});