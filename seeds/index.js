const sequelize = require("../config/connection");
const User = require("../models/User");
const userSeeds = require("./user-seeds.json");

const seedUsers = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userSeeds, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedUsers();
