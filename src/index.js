const express = require('express');
const cors = require('cors');

require('./db/mongoose');

const userRouter = require('./router/user-router');
const carRouter = require('./router/car-router');

const app = express();
const port = process.env.PORT;

// use middleware
app.use(cors());
app.use(express.json());

app.use(userRouter);
app.use(carRouter);

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
