'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    static associate(models) {
      // define association here
      Task.belongsTo(models.User, {
        foreignKey: 'userId',
      })
    }
  }
  Task.init({
    body: { 
      typee: DataTypes.STRING, 
      allowNull: false, 
      validate: {
        not: /^$/
      }
    },
    deadline: { 
      type: DataTypes.DATEONLY ,
      validate: {
        isAfter: new Date(new Date().setDate(new Date().getDate() - 15)).toISOString()
      }
    }
  }, {
    sequelize,
    underscored: true,
    modelName: 'Task',
  });
  return task;
};