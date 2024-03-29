'use strict';
const {SALT} = require('../config/serverConfig');
const bcrypt = require('bcrypt')
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.Role , {
        through:'User_Roles'//This means that when you query the associated model, you can use the specified alias ('User') instead of the actual model name (models.User).
      });
    }
  }
  User.init({
    email: {type:DataTypes.STRING,allowNull:false,unique:true,validate:{isEmail:true}},   //isEmail is the validation object given by sequelize by default
    password: {type:DataTypes.STRING, allowNull:false , validate:{
      len:[3,30] //len is the by default given by sequelize , min-3 and max-30 
    }}
  }, {
    sequelize,
    modelName: 'User',
  });

  //We use this because , any logic we want to implement before creating user can be done here like enrypting the password
  User.beforeCreate((user) => {
    const encryptedPassword = bcrypt.hashSync(user.password , SALT);
    user.password=encryptedPassword;
  })
  return User;
};