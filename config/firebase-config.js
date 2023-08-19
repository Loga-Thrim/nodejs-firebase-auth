var admin = require("firebase-admin");

var serviceAccount = require("./zpy-user-management-firebase-adminsdk-tjdzm-dceb247b23.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

module.exports = admin;