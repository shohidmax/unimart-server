const express = require('express');
const app = express();
const ObjectId = require('mongodb').ObjectId;
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors');
const port = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());
//user: Shohidbd1
//pass: eCfvBaOlHADanZ9P





const uri = "mongodb+srv://Shohidbd1:eCfvBaOlHADanZ9P@cluster0.geh16.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try{
        await client.connect();
        const UserData = client.db('userDetail').collection('userdata');
        //get user
        // app.get('/user', (req, res) =>{
    
        //     res.send(user);
        // })
        app.get('/user', async(req, res) =>{
            const query = {};
            const cursor = UserData.find(query);
            const users = await cursor.toArray();
            res.send(users);
        });


        // add new user
        app.post('/user', async(req, res) =>{
            const users = req.body;
            const result = await UserData.insertOne(users);
            // users.id = user.length + 1;
            // user.push(users);
            console.log(users);
            res.send(result);
        });
        // delete a user
        app.delete('/user/:id', async(req, res) =>{
            const id = req.params.id;
            const query = {_id: ObjectId(id)};
            const result = await UserData.deleteOne(query);
            res.send(result);
        })

        // app.post('/users', (req, res) => {
        //     const newUser = req.body;
        //     console.log('added user', newUser);
        //     res.send('data receved');
        // })
    }
    finally{

    }
    
}
run().catch(console.dir);

const tonggardern =[
    {"productName":"TONG GARDEN PARTY SNACK 500GM","id":"8850291100499","brand":"TONG GARDEN","type":"READY FOOD","price":"660","Imageurl":"https://www.chipmongsupermarket.com/wp-content/uploads/2021/12/8850291100499.jpg"},
    {"productName":"TONG GARDEN SALTED PEANUTS 20GM","id":"8850291110511","brand":"TONG GARDEN","type":"NUTS","price":"25","Imageurl":"https://www.thebasketbd.com/media/catalog/product/cache/48f48cf19b12af076f14576460489c35/8/8/8850291110511.jpg"},
    {"productName":"TONG GARDEN PARTY SNACK 25GM","id":"8850291510410","brand":"TONG GARDEN","type":"NUTS","price":"25","Imageurl":"https://www.chipmongsupermarket.com/wp-content/uploads/2021/12/8850291510410.jpg"},
    {"productName":"TONG GARDEN SALTED CASHEW NUTS 40GM","id":"8850291210464","brand":"TONG GARDEN","type":"NUTS","price":"120","Imageurl":"https://www.okpapa.com.bd/wp-content/uploads/2020/04/TONG-GARDEN-CASHEW-NUT-40G.jpg"},
    {"productName":"TONG GARDEN SALTED PISTACHIOS 30GM","id":"8850291010408","brand":"TONG GARDEN","type":"NUTS","price":"120","Imageurl":"https://www.urbanmart.shop/wp-content/uploads/2021/07/7-63.png"},
    {"productName":"TONG GARDEN SALTED PEANUTS 150GM","id":"8850291111600","brand":"TONG GARDEN","type":"NUTS","price":"305","Imageurl":"https://www.chipmongsupermarket.com/wp-content/uploads/2021/12/8850291111600.jpg"},
    {"productName":"TONG GARDEN SALTED COCKTAIL NUTS 150GM","id":"8850291531309","brand":"TONG GARDEN","type":"NUTS","price":"490","Imageurl":"https://static-01.daraz.com.bd/p/7819c63d7bc9770eadb9603703be4849.jpg"},
    {"productName":"TONG GARDEN WASABI GREEN PEAS 180GM","id":"8850291102165","brand":"TONG GARDEN","type":"NUTS","price":"250","Imageurl":"https://www.friendshipmart.com/wp-content/uploads/2021/05/8850291102165.jpg"},
    {"productName":"TONG GARDEN CASHEW NUTS SALTED 150GM","id":"8850291211409","brand":"TONG GARDEN","type":"NUTS","price":"490","Imageurl":"https://chaldn.com/_mpimage/tong-garden-salted-cashew-nuts-can-150-gm?src=https%3A%2F%2Feggyolk.chaldal.com%2Fapi%2FPicture%2FRaw%3FpictureId%3D65841&q=low&v=1"},
    {"productName":"TONG GARDEN SALTED CASHEW NUTS POUCH 160GM","id":"8850291211607","brand":"TONG GARDEN","type":"NUTS","price":"520","Imageurl":"https://wingmarts.com/media/user_39117/438091/BLO-8850291211607.jpg"},
    {"productName":"TONG GARDEN SALTED CASHEW NUTS 400GM","id":"8850291100512","brand":"TONG GARDEN","type":"NUTS","price":"1250","Imageurl":"https://www.thenicemart.com/media/catalog/product/8/8/8850291100512_1.jpg?width=600&height=600&canvas=600:600&optimize=high&bg-color=255,255,255&fit=bounds"},
    {"productName":"TONG GARDEN SAKURA PLUM 200GM","id":"8850291104909","brand":"TONG GARDEN","type":"PLUM","price":"260","Imageurl":"https://www.thebasketbd.com/media/catalog/product/cache/48f48cf19b12af076f14576460489c35/8/8/8850291104909.jpg"}
    ];

app.get('/', (req, res) => {
    res.send('sihab prem kore lukaya lukaya paser basai');
})

app.get('/products', (req, res) =>{
    res.send(tonggardern);
})

app.get('/product/:id', (req, res) => {
    console.log(req.params);
    const id = parseInt(req.params.id);
    const product = tonggardern.find(p => p.id == id);
    res.send(product);
})
const user = [
    {id: 1, name: 'sarwar', email: 'sarrar@gmail.com'},
    {id: 2, name: 'mohabbot', email: 'mohabbot@gmail.com'},
];



// listening
app.listen(port, () => {
    console.log('ha kaka ami lukaya prem korsi ekhane', port);
})