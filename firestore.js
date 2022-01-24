const admin = require('firebase-admin');
require('firebase/firestore');
const serviceAccount = require('./config/d1-firestore.json');
const config = require('./config/config.json')

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: config.databaseURL
});

const db = admin.firestore();

exports.db = db;
