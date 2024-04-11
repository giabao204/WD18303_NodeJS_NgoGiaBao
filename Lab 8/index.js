const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 5000;
app.use(bodyParser.urlencoded({ extended: true }));


const apiRoute  = require('./router/api');

app.use("/api",apiRoute);


app.listen(port, () => {
    console.log(`Example app listening on port http://127.0.0.1:${port}`);
});