const express = require('express');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 3030;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

var database = "mongodb://user:pass1kweh>@ds031098.mlab.com:31098/heroku_rvfz435q";
if (process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });
} else {
  mongoose.connect(database, { useNewUrlParser: true });
}


//mongoose.connect('mongodb://localhost/chat_db', { useNewUrlParser: true });

require('./routes/apiRoutes')(app);

app.listen(PORT, function() {
  console.log(`App running on port ${PORT}`);
});