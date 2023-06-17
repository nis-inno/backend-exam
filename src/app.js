const express = require('express')
const cors = require("cors");
var bodyParser = require('body-parser')
const header_detail = require('./routers/header_detail')


const path = require('path');


var morgan = require('morgan')

const app = express()

// var whitelist = ["http://localhost:3000", "http://localhost:*"];
// var corsOptions = {
//   origin: function (origin, callback) {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
// };

// app.use(cors(corsOptions));
app.use(cors());

// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// app.use('/uploads', express.static('uploads'));


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(morgan('combined'))

// routes
app.use("/header", header_detail.headerRoutes)
app.use("/detail", header_detail.detailRoutes)
app.use("/item", header_detail.itemRoutes)

app.use('/livecheck', (req, res)=> {
  res.status(200).send('live check')
})

app.use('*', (req, res)=> {
  res.status(500).send('no such route')
})

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    // Log out the error to the console
    console.error(
      "F.S.H. Error: ",
      error?.message
        ? error.message
        : error?.original?.sqlMessage
        ? error.original.sqlMessage
        : null
    );
    return res.json({
      error: error?.original?.sqlMessage
        ? error?.original?.sqlMessage
        : error
        ? error
        : null,
    });
  });

module.exports = app

