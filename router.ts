import Articles from "./src/controller/ArticleController"
import Categories from "./src/controller/CategoryController"
import Users from "./src/controller/UserController"

const router = require("express").Router()

// Home page
router.get("/", Articles.homePageArticles)
router.get("/:slug", Articles.getArticle)
// Category
router.get("/category/:slug", Categories.getCategorie)
router.get("/admin/categories/new", Categories.categoriesNew)
router.get("/admin/categories", Categories.allCategories)
router.get("/categories/delete/:id", Categories.deleteCategorie)
router.post("/admin/categories/edit/:id", Categories.editCategories)
router.post("/categories/save", Categories.categorySave)
// Article
router.get("/articles/page/:num", Articles.articlesPage)
router.get("/admin/articles", Articles.allArticles)
router.get("/admin/articles/new", Articles.newArticle)
router.get("/articles/delete/:id", Articles.deleteArticle)
router.post("/articles/edit/:id", Articles.editArticle)
router.post("/articles/save", Articles.saveArticle)
// Admin
router.get("/admin/user/create", Users.createUserPage)
router.post("/user/create", Users.createNewUser)

export default router