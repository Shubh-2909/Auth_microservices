'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.User, {
        through:'User_Roles'
      });
    }
  }
  Role.init({
    name: {type:DataTypes.STRING , allowNull:false}
    // We need to associate to a user, so it is many to many relation because multiple persons has multiple roles. For many to many relation we use third table.
    // refer this article : guides.rubyonrails.org/association_basics.html
  }, {
    sequelize,
    modelName: 'Role',
  });
  return Role;
};