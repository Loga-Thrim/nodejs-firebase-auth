const express = require("express");
const cors = require("cors");
const app = express();

const admin = require("./config/firebase-config");

app
  .use(cors())
  .use(express.json())
  .use(express.urlencoded())

  .get("/users", (req, res) => {
    admin
      .auth()
      .listUsers(1000)
      .then((listUsersResult) => {
        const users = listUsersResult.users.map((userRecord) => {
          const {
            uid,
            email,
            emailVerified,
            displayName,
            phoneNumber,
            disabled,
          } = userRecord.toJSON();
          return {
            uid,
            email,
            emailVerified,
            displayName,
            phoneNumber,
            disabled,
          };
        });
        res.status(200).json(users);
      })
      .catch((error) => {
        res.status(500).json({});
      });
  })
  .put("/user/:uid", (req, res) => {
    const { uid } = req.params;
    const { phoneNumber, emailVerified, password, displayName, disabled } =
      req.body;

    const payload = {
      phoneNumber,
      emailVerified,
      displayName,
      disabled,
    };
    if (password != "") payload.password = password;

    admin
      .auth()
      .updateUser(uid, payload)
      .then(() => res.status(200).json({ status: "success" }))
      .catch(() => res.status(500).json({ status: "failed" }));
  })
  .delete("/user/:uid", (req, res) => {
    const { uid } = req.params;
    admin
      .auth()
      .deleteUser(uid)
      .then(() => res.status(200).json({ status: "success" }))
      .catch(() => res.status(500).json({ status: "failed" }));
  })

  .listen(5000, () => console.log("> App on port 5000."));
