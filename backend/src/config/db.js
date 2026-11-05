
import { Sequelize } from "sequelize";

const sequelize = new Sequelize(process.env.DB_NAME || "task-manager", process.env.DB_USER || "postgres", process.env.DB_PASSWORD || 1234, {
  host: process.env.DB_HOST || "localhost",
  dialect: process.env.DB_DIALECT || "postgres",
  logging: false,
  port: process.env.DB_PORT || 5432,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

export default sequelize;

