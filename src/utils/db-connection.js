import { Sequelize }  from "sequelize";

const sequelize = new Sequelize("superapp", "root", "Mohsin@123", {
  host: "localhost",
  dialect: "mysql",
  port: 3306,
});

export default sequelize;