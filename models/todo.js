'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Todo.belongsTo(models.Activity, {
        foreignKey: "activity_group_id",
        as: "activity",
        constraints: false
      });
    }
  }
  Todo.init({
    activity_group_id: DataTypes.STRING,
    title: DataTypes.STRING,
    is_active: DataTypes.STRING,
    priority: DataTypes.STRING,
    created_at:   DataTypes.DATE ,
    updated_at:   DataTypes.DATE,  
    deleted_at:   DataTypes.DATE,  
  }, {
    timestamps: false,
    paranoid: true,
    sequelize,
    modelName: 'Todo',
  });
  return Todo;
};