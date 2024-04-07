const express=require('express');
const bodyParser = require('body-parser');
const app=express();
const multer=require('multer');
const port=5000;

const clientRoute = require('./routers/client');
const adminRoute = require('./routers/admin');
const apiRoute  = require('./routers/api');

app.use(bodyParser.urlencoded());
app.set("view engine", "ejs");
app.set("views", "./view");
app.use(express.static("public"));

app.use(clientRoute);

app.use('/admin', adminRoute);

app.use('/api',apiRoute);



// app.get("/",(req,res)=>{
//   res.render('index.ejs');
//   });

// app.get("/sanpham",(req,res)=>{
//   res.render('products.ejs');
//   });
  
// app.get("/chitiet",(req,res)=>{
//   res.render('singleproduct.ejs');
//   });
  
// app.get("/giohang",(req,res)=>{
//   res.render('store.ejs');
//   });

// app.get("/admin",(req,res)=>{
//   res.render('admin-index.ejs');
//   });

// app.get("/admin/table",(req,res)=>{
//   res.render('admin-table.ejs');
//   });

app.listen(port, () => {
    console.log(`Example app listening on port http://127.0.0.1:${port}`);
  });