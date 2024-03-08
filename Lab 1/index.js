const express = require('express')
const bodyParser = require('body-parser');

const app = express();
const port = 4000;
var jsnParser = bodyParser.json();

app.use(bodyParser.urlencoded());

app.get('/', (req, res) => {
  res.send('Đây là trang home')
});

app.get("/product", (req, res) => {
  res.send(`
    <h1>Đây là trang Product</h1>
  `);
});

app.get("/add-product", (req, res) => {
  res.send(`
    <h1>Đây là trang Product</h1>
    <form action="/product" method="POST" enctype="application/x-www-form-urlencoded">
    <input type="text" name="ProductName" placeholder="Product" id="">
    <button type="submit">Add Product</button>
    </form>
  `);
});

app.post('/product', jsnParser, function(req, res){
  console.log(req.body.ProductName);
  productlist.unshift(req.body.ProductName);
  res.send(req.body);
});

//Cau 1.4
const inventors = [
  { id:1, first: 'Albert', last: 'Einstein', year: 1879, passed: 1955 },
  { id:2, first: 'Isaac', last: 'Newton', year: 1643, passed: 1727 },
  { id:3, first: 'Galileo', last: 'Galilei', year: 1564, passed: 1642 },
  { id:4, first: 'Marie', last: 'Curie', year: 1867, passed: 1934 },
  { id:5, first: 'Johannes', last: 'Kepler', year: 1571, passed: 1630 },
  { id:6, first: 'Nicolaus', last: 'Copernicus', year: 1473, passed: 1543 }
];

app.get('/inventors', (req, res) => {
  let list='<h2>Danh sách nhà khoa học<ul>';
  inventors.forEach(e => {
    list+=`<li><a style="text-decoration:none;color:green;" href="/inventor/${e.id}">${e.last}</a></li>`;
  });
  list+='</ul></h2>';
  res.send(list);
});

app.get('/inventor/:id', (req, res) => {
  let id=req.params.id;
  inventor=inventors.find(e=>e.id==id);
  info=`<h2>Thông tin chi tiết nhà khoa học:Full name: ${inventor.first} ${inventor.last}, Year: ${inventor.year},
      Passed: ${inventor.passed}</h2>`;
  res.send(info);
});


app.get('/add-inventor', (req, res) => {
  res.send(`<h1>Thêm Nhà Khoa Học</h1><form action="/inventor" method="POST"><input type="text"
        name="first" placeholder="input first name"><input type="text" name="last" placeholder="input last name"><br><input
        type="number" name="year" placeholder="Year"><input type="number" name="passed"
        placeholder="passed"><br><button type="submit">Add Product</button></form>`);
});

app.post('/inventor', (req, res) => {
  let newInventor=req.body;
  newInventor.id=inventors.length+1;
  inventors.push(newInventor);
  res.redirect('/inventors');
});


//Cau 1.5
const products = [
  { id: 1, name: 'Product 1', price: 100, shortDescription: 'Short description 1', description: 'Detailed description 1', images: ['image1.jpg', 'image2.jpg'], comments: [] },
  { id: 2, name: 'Product 2', price: 200, shortDescription: 'Short description 2', description: 'Detailed description 2', images: ['image3.jpg', 'image4.jpg'], comments: [] },
  { id: 3, name: 'Product 3', price: 150, shortDescription: 'Short description 3', description: 'Detailed description 3', images: ['image5.jpg', 'image6.jpg'], comments: [] }
];

app.get('/products', (req, res) => {
  let productList = '<h2>Product List<ul>';
  products.forEach(product => {
    productList += `<li><a style="text-decoration:none;color:green;" href="/product/${product.id}">${product.name} | ${product.images}</a></li>`;
  });
  productList += '</ul></h2>';
  res.send(productList);
});

app.get('/product/:id', (req, res) => {
  const productId = req.params.id;
  const product = products.find(p => p.id == productId);
  let productInfo = `<h2>Product Details: ${product.name}</h2>`;
  productInfo += `<p>Price: ${product.price}</p>`;
  productInfo += `<p>Short Description: ${product.shortDescription}</p>`;
  productInfo += `<p>Description: ${product.description}</p>`;
  productInfo += `<h3>Images:</h3>`;
  product.images.forEach(image => {
    productInfo += `<img src="${image}" alt="Product Image"><br>`;
  });
  productInfo += `<h3>Comments:</h3>`;
  product.comments.forEach(comment => {
    productInfo += `<p>${comment}</p>`;
  });
  productInfo += `<h3>Add Comment:</h3>`;
  productInfo += `<form action="/product/${product.id}/comment" method="POST"><input type="text" name="comment" placeholder="Your comment"><br><button type="submit">Submit</button></form>`;
  res.send(productInfo);
});

app.post('/product/:id/comment', (req, res) => {
  const productId = req.params.id;
  const comment = req.body.comment;
  const product = products.find(p => p.id == productId);
  product.comments.push(comment);
  res.redirect(`/product/${productId}`);
});


app.listen(port, () => {
  console.log(`Example app listening on port http://127.0.0.1:${port}`);
});