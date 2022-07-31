const mongoose = require('mongoose');

mongoose.connect(
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.rpq5uhj.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
);
