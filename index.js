const express = require("express");
const mongoose = require("mongoose");
const app = express();
const env = require("dotenv");
const userRouters = require("./routes/users");
const noteRoutes = require("./routes/notes");
var bodyParser = require("body-parser");
const {MONGOURI}  = require("./config/keys");

const PORT = 7000;

mongoose.connect(MONGOURI);


mongoose.connection.on("connected", () => {
  console.log("Serever connected to mongodb");
});

mongoose.connection.on("error", (error) => {
  console.log(error);
});

app.use(bodyParser.json());

app.use("/NOTE_PAD", userRouters);
app.use("/NOTE_PAD", noteRoutes);

let NODE_ENV = 'production'
if(NODE_ENV =='production')
{
   const path = require('path')
   app.use(express.static(path.resolve(__dirname,'my-noteapp','build'))) //for static file like js,css
   app.get('/',(req,res) => {
     res.sendFile(path.resolve(__dirname,'my-noteapp','build','index.html'))
   })
}

app.listen(PORT, () => {
  console.log(`server running on Port ${PORT}`);
});
