"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Option extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Option.belongsTo(models.question, {
        foreignKey: "questionID",
      });
    }

    static async add(value, questionID) {
      const res = await Option.create({
        value: value,
        questionID: questionID,
      });
      return res;
    }

    static async edit(newValue, id) {
      const res = await Option.update(
        {
          value: newValue,
        },
        {
          where: {
            id: id,
          },
        }
      );
      return res;
    }
  }
  Option.init(
    {
      value: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: true,
        },
      },
    },
    {
      sequelize,
      modelName: "Option",
    }
  );
  return Option;
};
