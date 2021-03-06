const { Model, DataTypes } = require('sequelize')
const bcrypt = require('bcrypt')
const sequelize = require("../config/connection")

class User extends Model {
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password)
  }
}
//gives peramiters for the account information of "user"
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
      validate: {
        len: [6],
      },
    },
    minesweeper_score: {
      type: DataTypes.INTEGER
    },
    snake_score: {
      type: DataTypes.INTEGER
    }
  },
  {
    //takes in new user info and encrpyts and pastes into 'user'
    hooks: {
      beforeCreate: async (newUserData) => {
        newUserData.password = await bcrypt.hash(newUserData.password, 10)
        return newUserData
      },
      beforeUpdate: async (updatedUserData) => {
        updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10)
        return updatedUserData
      },
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'arcade_users',
  });

module.exports = User