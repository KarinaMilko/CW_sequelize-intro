"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  /* Обмеження
  PRIMARY KEY - primaryKey
  UNIQUE - unique (constraint)
  CHECK - validate (validator)
  NOT NULL - allowNull (validator + constraint),
  FOREIGN KEY
  constraint - db
  validator - app
*/
  User.init(
    {
      firstName: {
        type: DataTypes.STRING(50),
        allowNull: false, // NOT NULL
        validate: {
          is: /^[A-Z][a-z]+$/,
          len: [2, 50],
        },
      },
      lastName: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
          is: /^[A-Z][a-z]+$/,
          len: [2, 50],
        },
      },
      // Сконфігурувати властивості
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      birthday: {
        type: DataTypes.DATEONLY,
        validate: {
          isDate: true,
          isBefore: new Date().toISOString(),
        },
      },
      isMale: {
        type: DataTypes.BOOLEAN,
      },
      activitiesCount: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        validate: {
          isInt: true,
          min: 0,
        },
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
