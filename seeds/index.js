const sequelize = require("../config/connection");
const { User, Review } = require("../models");
const userSeeds = require("./user-seeds.json");
const reviewSeeds = require("./review-seeds.json");

const seedUsers = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userSeeds, {
    individualHooks: true,
    returning: true,
  });

  for (let review of reviewSeeds) {
    await Review.create({
      ...review,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  process.exit(0);
};

seedUsers();
