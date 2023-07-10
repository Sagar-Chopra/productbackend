const express = require("express");
const dotenv = require("dotenv");
const cors = require('cors');
const app = express();

dotenv.config({path: './config.env'});

const PORT = process.env.PORT || 5000;

app.use(cors());

require("./db/conn");

app.use(express.json({ limit: '100mb' }));

app.use(require("./router/auth"))


app.listen(PORT, () => {
  console.log(`server is runnning at port No. ${PORT}`);
});
