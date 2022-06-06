const express = require("express");
const app = express();
const ObjectId = require("mongodb").ObjectId;
const { MongoClient, ServerApiVersion } = require("mongodb");
const cors = require("cors");
require('dotenv').config();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.lg5wc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
    try{
      await client.connect();
      const productData = client.db('troyal_electro').collection('products');
      console.log('db connected');

      app.get('/products', async(req, res) =>{
          const query = {};
          const cursor = productData.find(query);
          const users = await cursor.toArray();
          res.send(users);
      });
      app.get('/products/:id', async(req, res) =>{
        const id = req.params.id;
        const query = {_id: ObjectId(id)};
        const result = await productData.findOne(query);
        res.send(result);
    });

      // delete a user
      app.delete('/products/:id', async(req, res) =>{
        const id = req.params.id;
        const query = {_id: ObjectId(id)};
        const result = await productData.deleteOne(query);
        res.send(result);
    })
    // update user
    app.put('/products/:id', async(req, res) =>{
      const id = req.params.id;
      const updatedStock = req.body;
      const filter = {_id: ObjectId(id)};
      const options = { upsert: true };
      const updatedDoc = {
          $set: {
            Stock_Qty: updatedStock.reStock
          }
      };
      const result = await productData.updateOne(filter, updatedDoc, options);
      res.send(result);

     })
   
    //add Product Product
    app.post('/products', async(req, res) =>{
      const newProduct = req.body;
      console.log('adding new user', newProduct);
      const result = await productData.insertOne(newProduct);
      res.send(result)
    });
    app.get('/products',  async (req, res) => {
      const email = req.query.email;
      const query = { email: email };
      const cursor = productData.find(query);
      const products = await cursor.toArray();
      res.send(products);
    })
    
      
    }
    finally{

    }
    
}
run().catch(console.dir);


app.get("/", (req, res) => {
    res.send(`<h1 style="text-align: center;
      color: red;"> Server is Running at <span style="color: Blue;">${port}</span></h1>`);
  });

app.listen(port, () => {
  console.log("uniMart server Running at Port : ", port);
});
