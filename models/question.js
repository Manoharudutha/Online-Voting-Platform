"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class question extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      question.belongsTo(models.Election, {
        foreignKey: "electionID",
      });
    }

    static async add(title, description, electionID) {
      const res = await question.create({
        title: title,
        desctiption: description,
        electionID: electionID,
      });
      return res;
    }
  }
  question.init(
    {
      title: DataTypes.STRING,
      description: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "question",
    }
  );
  return question;
};
