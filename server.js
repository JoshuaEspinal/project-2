const express = require("express");
const session = require("express-session");
const sequelize = require("./config/connection");
const routes = require("./routes");

const app = express();
const port = process.env.PORT || 3000;

const sess = {
  secret: process.env.SESSION_SECRET,
  cookie: {},
  resave: false,
  saveUninitialize: true,
};

app.use(session(sess));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
});
