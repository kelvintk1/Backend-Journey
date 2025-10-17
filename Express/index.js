import express from 'express';
import products from './productsData.js';

const app = express();
const PORT = 8000;
 
// middleware
app.use(express.json());

app.get('/', (req, res) => {
    res.send("Don't give up Kelvin. you are making it progress")
});

app.listen(PORT, () => {
    console.log(`Server is running on: http://localhost:${PORT}`)
});

app.get('/products', (req, res) => {
    res.json(products)
});

app.get('/products/:id', (req, res) => {
    const id = req.params.id;
    const idNum = Number(id);
    const product = products.find(p => p.id === idNum);
    if(!product)
        res.status(404).json({message: 'Product not found'});
    res.json(product);
})

app.post('/products', (req, res) => {
    const {name, price} = req.body
    const newProduct = {id: products.length + 1, name, price}
    products.push(newProduct)
    res.status(201).json({message: 'Product added successfully', product: newProduct})
})

app.put('/products/:id', (req, res) => {
    const {id} = req.params
    const {name, price} = req.body
    const product = products.find(p => p.id === Number(id))

    if(!product)
        res.status(404).json({message: 'product not found'})
    
    product.name = name || product.name
    product.price = price || product.price

    res.json({message: 'Product updated successfully', product});
})

app.delete('/products/:id', (req, res) => {
  const { id } = req.params;
  const idNum = Number(id);

  const exists = products.some(p => p.id === idNum);
  if (!exists)
    return res.status(404).json({ message: 'Product not found' });

  products.splice(0, products.length, 
  ...products
    .filter(p => p.id !== idNum)
    .map((p, index) => ({ ...p, id: index + 1 }))
);

  res.status(202).json({
    message: `Product ${idNum} deleted successfully`,
    products,
  });
});
