'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class project extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  project.init({
    title: DataTypes.STRING,
    startDate: DataTypes.DATEONLY,
    endDate: DataTypes.DATEONLY,
    description: DataTypes.STRING,
    tech: DataTypes.ARRAY(DataTypes.STRING),
    image: DataTypes.STRING,
    user_id : DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'project',
  });
  return project;
};