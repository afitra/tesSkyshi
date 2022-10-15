'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Activity extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Activity.hasMany(models.Todo, {
        foreignKey: 'activity_group_id',
        as: 'todos',
      });
    }
  }
  Activity.init({
    // id:{type: DataTypes.INTEGER,
    //   primaryKey: true,
    //   autoIncrement: true}, 
    email: DataTypes.STRING,
    title: DataTypes.STRING,
    created_at:   DataTypes.DATE ,
    updated_at:   DataTypes.DATE,  
    deleted_at:   DataTypes.DATE,  
  }, {
    timestamps: false,
    paranoid: true,
    sequelize,
    modelName: 'Activity',
  });
  return Activity;
};