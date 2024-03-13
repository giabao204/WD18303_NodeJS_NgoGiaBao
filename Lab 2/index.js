//khai báo sử dụng multer
const express=require('express');
const bodyParser = require('body-parser');
const app=express();
const port=4000;
app.use(bodyParser.urlencoded());

//khai bao sử dụng template ejs
app.set("view engine", "ejs");
app.set("views", "./view");
app.use(express.static("public"));

//router
app.get("/",(req,res)=>{
var today=new Date();
currentDay=today.getDay();
var day='';
switch(currentDay){
case 0:
day='Chủ nhật';
break;
case 1:
day = 'Thứ hai';
break;
case 2:
day = 'Thứ ba';
break;
case 3:
day = 'Thứ tư';
break;
case 4:
day = 'Thứ năm';
break;
case 5:
day = 'Thứ sáu';
break;
case 6:
day = 'Thứ bảy';
break;
default:
console.log(`Error: ${currentDay}`);
}
res.render('home',{kindOfDay:day});
});




const productList = [
   
        {
        id:1,
        title:'Apple Book',
        price:3000,
        description:"A very interesting book about so many even more interesting things!",
        imageURL:"book.jpg",
        },
        {
        id:2,
        title:'Microsoft Book',
        price:2000,
        description:"A very interesting book about so many even more interesting things!",
        imageURL:"book.jpg",
        },
        {
        id:3,
        title:'VFast Book',
        price:1000,
        description:"A very interesting book about so many even more interesting things!",
        imageURL:"book.jpg",
        }
];

app.get("/shop",(req,res)=>{
    res.render('shop.ejs',{products:productList});
    });

app.get("/addnew",(req,res)=>{
    res.render("add-product.ejs");
    });

    const multer=require('multer');
    //khai báo sử dụng multer
    // SET STORAGE
    const storage = multer.diskStorage({
    destination: function (req, file, cb) {
    cb(null, './public/images')
    },
    filename: function (req, file, cb) {
    cb(null, Date.now()+'-'+file.originalname )
    }
    })
    const upload = multer({ storage: storage });

    app.post('/addnew', upload.single('productImage'),(req, res) => {
        //lấy dữ liệu từ form sau khi upload anh
        const file = req.file
        let title=req.body.productName;
        let price=req.body.productPrice;
        let description=req.body.title;
        let nameImage=file.filename;
        //Thêm vào mảng json 1 cuối sách mới
        productList.push({
        id:0,
        title:title,
        price:price,
        description:description,
        imageURL:nameImage,
        })
        //chuyển về trang sản phẩm
        res.redirect('/shop');
        });



app.listen(port, () => {
    console.log(`Example app listening on port http://127.0.0.1:${port}`);
  });