import { DataTypes } from "sequelize";
import sequelize from "../configs/sequelize.js";

const Auth = sequelize.define("Auth", {
  authId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false,
  },
  roles: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: false,
    defaultValue: "user",
  },
});

sequelize
  .sync()
  .then(() => {
    console.log("Auth table created successfully!");
  })
  .catch((error) => {
    console.error("Unable to create table Auth: ", error);
  });

export default Auth;
