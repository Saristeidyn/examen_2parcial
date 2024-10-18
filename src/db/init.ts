import { Sequelize } from "sequelize-typescript";
import { Task } from "./models/user.model";
import { envs } from "../config/envs";

export const db = new Sequelize({
    database: envs.MYSQL_DB,
    username: envs.MYSQL_USER,
    password: envs.MYSQL_PASSWORD,
    host: envs.MYSQL_HOST,
    dialect: "mysql",
    models: [Task] // Change from User to Task
});

export const dbConnection = async () => {
    try {
        await db.sync({ force: false });
        console.log("Database connected");
    } 
    catch (error) {
        console.log("Error connecting to database", error);
    }
};
