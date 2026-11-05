import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db.js";

class Task extends Model {}

Task.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("pending", "in_progress", "completed"),
      defaultValue: "pending",
    },
  },
  {
    sequelize,
    modelName: "Task",
    tableName: "tasks",
    timestamps: true,
  }
);

export default Task;