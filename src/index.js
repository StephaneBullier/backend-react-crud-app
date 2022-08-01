const express = require('express');

require('./db/mongoose');

const userRouter = require('./router/user-router');
const carRouter = require('./router/car-router');

const app = express();
const port = process.env.PORT;

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
  next();
});

app.use(express.json());

app.use(userRouter);
app.use(carRouter);

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
