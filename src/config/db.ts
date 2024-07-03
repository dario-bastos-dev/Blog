import { Sequelize } from "sequelize-typescript";
import Category from "../models/CategoryModels";
import Article from "../models/ArticleModels";
require("dotenv").config()

export const connection = new Sequelize({
  dialect: 'mysql',
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  models: [Category, Article], // Informamos os modelos para o Sequelize
  timezone: "-03:00"
});

connection.sync({force:false})
.then(()=>{console.log("Tabelas conectadas!")})