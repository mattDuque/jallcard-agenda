const authVerify = require('./firebaseAuth')
const { ObjectId } = require("mongodb");
const cors = require('cors')

const getContacts = (db, req, res) => {
    db.collection((req.body.data || req.headers.data)).find().toArray()
        .then(result => {
            res.send(result)
        }).catch(error => console.log(error))
}

const routes = (app, db) => {
    app.use(cors({ origin: true }))
    app.post('/contacts/login', authVerify, (req, res) => {
        db.createCollection(req.body.data)
            .catch(() => console.log('Collection already exists'))
        getContacts(db, req, res)

    })
    app.post('/contact/create', authVerify, (req, res) => {
        db.collection(req.body.user).insertOne(req.body.data)
            .then(result => res.send(result))
            .catch(error => res.send(error))

    })
    app.get('/contacts/sync', authVerify, (req, res) => {
        getContacts(db, req, res)
    })
    app.put('/contacts/update', authVerify, (req, res) => {
        db.collection(req.body.user).updateOne(
            { _id: new ObjectId(req.body.id) }, {
            $set: {
                name: req.body.data.name,
                lastName: req.body.data.lastName,
                phone: req.body.data.phone,
                phone2: req.body.data.phone2,
                birthdate: req.body.data.birthdate,
                relative: req.body.data.relative
            }
        }, { multi: true }
        )
            .then(result => res.send(result))
            .catch(error => res.send(error))
    })
    app.delete('/contacts/delete', authVerify, (req, res) => {
        db.collection(req.headers.user).deleteOne(
            { _id: new ObjectId(req.headers.id) }
        )
            .then(result => res.send(result))
            .catch(error => res.send(error))
    })
}

module.exports = routes