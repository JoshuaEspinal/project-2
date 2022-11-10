const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const sequelize = require("../config/connection");

class User extends Model {
  checkPassword(loginPassword) {
    return bcrypt.compareSync(loginPassword, this.password);
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    hooks: {
      beforeCreate: async (uesrData) => {
        const passwordHash = await bcrypt.hash(uesrData.password, 10);
        uesrData.password = passwordHash;
        return uesrData;
      },
    },
    sequelize,
    modelName: "user",
    freezeTableName: true,
    timestamps: true,
    underscored: true,
  }
);

module.exports = User;
