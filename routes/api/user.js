const db = require("../../models");

module.exports = app => {
  app.get("/api/users", (req, res) => {
    db.User.find().then(data => {res.json(data)});
  });
};
