const express = require("express");
const sequelize = require("./config/connection");
console.log(sequelize);
const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

sequelize.sync({ force: false }).then(() => {
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
});
