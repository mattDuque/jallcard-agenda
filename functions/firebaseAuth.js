const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const authVerify = (req, res, next) => {
    admin
        .auth()
        .verifyIdToken((req.body.token || req.headers.token))
        .then(() => next())
        .catch((error) => {
            console.log()
            return res.status(401).send(error.message)
        })
}

module.exports = authVerify