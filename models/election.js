"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Election extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Election.belongsTo(models.Admin, {
        foreignKey: "adminID",
      });
      Election.hasMany(models.question, {
        foreignKey: "electionID",
      });
      Election.hasMany(models.Voter, {
        foreignKey: "electionID",
      });
    }

    static async add(adminID, name) {
      const res = await Election.create({
        adminID: adminID,
        name: name,
        launched: false,
        ended: false,
      });
      return res;
    }

    static async launch(id) {
      const res = await Election.update(
        { launched: true },
        {
          where: {
            id: id,
          },
        }
      );
      return res;
    }

    static async end(id) {
      const res = await Election.update(
        { ended: true },
        {
          where: {
            id: id,
          },
        }
      );
      return res;
    }
  }
  Election.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: true,
        },
      },
      launched: DataTypes.BOOLEAN,
      ended: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Election",
    }
  );
  return Election;
};
