const express = require("express");
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const sequelize = require("./config/connection");
const routes = require("./routes");

const app = express();
const port = process.env.PORT || 3000;

const sess = {
  secret: process.env.SESSION_SECRET,
  cookie: {
    maxAge: 5 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    secure: false,
    sameSite: "strict",
  },
  resave: false,
  saveUninitialize: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

app.get("*", (req, res) => {
  res.status(404).send("page not found");
});

sequelize.sync({ force: false }).then(() => {
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
});
