import { request, response } from "express"
import Articles from "./src/controller/ArticleController"
import Categories from "./src/controller/CategoryController"
import Login from "./src/controller/LoginController"
import Users from "./src/controller/UserController"
import { Middlewars } from "./src/middlewares/middlewares"

const router = require("express").Router()

// Home page
router.get("/", Articles.homePageArticles)
router.get("/:slug", Articles.getArticle)
// Category
router.get("/category/:slug", Categories.getCategorie)
router.get("/admin/categories/new", Middlewars.adminAuth, Categories.categoriesNew)
router.get("/admin/categories", Middlewars.adminAuth, Categories.allCategories)
router.get("/categories/delete/:id", Categories.deleteCategorie)
router.post("/admin/categories/edit/:id", Categories.editCategories)
router.post("/categories/save", Categories.categorySave)
// Article
router.get("/articles/page/:num", Articles.articlesPage)
router.get("/admin/articles", Middlewars.adminAuth, Articles.allArticles)
router.get("/admin/articles/new", Middlewars.adminAuth, Articles.newArticle)
router.get("/articles/delete/:id", Articles.deleteArticle)
router.post("/articles/edit/:id", Articles.editArticle)
router.post("/articles/save", Articles.saveArticle)
// Admin
router.get("/admin/user/create", Users.createUserPage)
router.get("/admin/users", Middlewars.adminAuth, Users.getAllUsers)
router.get("/admin/profile", Users.userProfile)
router.get("/admin/delete/:id", Users.deleteUSer)
router.post("/admin/update/:id", Users.updateUSer)
router.post("/user/create", Users.createNewUser)
// Login and logout
router.get("/admin/login", Login.loginPage)
router.get("/admin/logout", Login.logout)
router.post("/login/auth", Login.loginAuth)

export default router