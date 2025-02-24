import express from "express"
import router from './router';
const app = express()
require("dotenv").config()
import path from "path";
import { connection } from "./src/config/db";
import { Middlewars, sessionUsage } from "./src/middlewares/middlewares";
import flash from "connect-flash"

// Database Myslq
connection.authenticate()
.then(() => {
          console.log("Banco de dados conectado!")
          
}).catch((e:any) => {
          throw new Error(e)
})

// Iniciando servidor
const port = process.env.PORT || 8080
app.listen(port, ()=> {
          console.log("Servidor on-line!")
})

// View engine
app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "src", "views"))

// Static
app.use(express.static(path.join(__dirname, "public")))

// Body-Parser
app.use(express.urlencoded({extended: true}))
app.use(express.json())

// Middlewars
app.use(sessionUsage)
app.use(flash())
app.use(Middlewars.getUser)
app.use(Middlewars.getCategory)
app.use(router)