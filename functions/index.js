const functions = require('firebase-functions')
const express = require('express')
const MongoClient = require('mongodb').MongoClient
const routes = require('./routes')
const cors = require('cors')

const app = express();
const port = process.env.PORT || 9000;
const dbURL = 'mongodb+srv://admin:qnjT40YlKOOi47Ml@cluster0.cdtbz.mongodb.net/jallcard-agenda?retryWrites=true&w=majority'

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors({ origin: true }))

MongoClient.connect(dbURL, {
    useUnifiedTopology: true
})
    .then(client => {
        console.log('Connected to Database')
        const db = client.db('jallcard-agenda')
        routes(app, db)
    })
    .catch(error => console.error(error))

app.listen(port, () => {
    console.log('App listening on host')
})

exports.api = functions.https.onRequest(app)