import { Sequelize } from "sequelize-typescript";
import Category from "../models/CategoryModels";
import Article from "../models/ArticleModels";
import User from "../models/UserModels";
require("dotenv").config()

export const connection = new Sequelize({
  dialect: 'mysql',
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: 45066,
  models: [Category, Article, User], // Informamos os modelos para o Sequelize criar as tebelas
  timezone: "-03:00"
});

connection.sync({force:false})
.then(()=>{console.log("Tabelas conectadas!")})