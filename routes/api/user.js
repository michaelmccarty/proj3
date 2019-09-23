module.exports = (app, passport, db) => {
  // const url = 'localhost:3001'
  app.post('/login', (req, res) =>{
    // console.log(req);
    console.log(req.body);
    res.json(req.body);
  })




  app.post("/api/users", (req, res) => {
    // console.log(req);
    console.log(req)
    console.log(req.body);
    res.json(req.body);
    db.User.create(req.body).then(data => {res.json(data)});
  });
};
