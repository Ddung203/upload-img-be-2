import { DataTypes } from "sequelize";
import sequelize from "../configs/sequelize.js";

const Data = sequelize.define("Data", {
  userCode: {
    type: DataTypes.STRING,
    primaryKey: true,
    unique: true,
    allowNull: false,
  },
  fullname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  note: {
    type: DataTypes.TEXT,
    allowNull: true,
    unique: false,
    defaultValue: "",
  },
  url: {
    type: DataTypes.TEXT,
    allowNull: true,
    unique: false,
    defaultValue: "",
  },
});

export default Data;
