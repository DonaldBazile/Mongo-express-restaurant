const express = require('express');
const mongo = require('mongodb').MongoClient
const cors = require('cors');

const app = express()
app.use(cors())
app.use(express.json())

const url = 'mongodb+srv://Donbazile07:@cluster0.pxbvb.mongodb.net?retryWrites=true&w=majority'
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}

let menudb, customersdb

mongo.connect(url, options, (err, client) => {
    if (err) {
        console.error(err)
        return
    }
    console.log('We connected!')

    app.listen(3000, () => console.log('app is listen on port 3000'))

    const db = client.db('restaurant')
    const customersdb = db.collection('customers')
    const menudb = db.collection('menu')
})

//get
app.get('/', (req, res) => res.status(200).send('Hey class!'))

//patch
app.patch('/', (req, res) => {
    menudb
    .updateOne({ name: 'leche de tigre' },
    {$set:
        { name: 'tequila', cost: 30, stock: true }
    }
    )
    .then(() => res.status(200).send('Item was updated'))
})
//post
app.post('/', (req, res) => {
    menudb.insertOne(req.body)
    // console.log('This is the req',req.body)
    // const dish1 = { name: 'leche de tigre' }
    // menudb.insertOne(dish1)
    res.status(201).send('Item was added')
})

app.delete('/' , (req, res) => {
    menudb.deleteOne({name: req.body.name }).then(() => res.send('Item was deleted'))
})
//delete