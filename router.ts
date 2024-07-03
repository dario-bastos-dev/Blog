import Articles from "./src/controller/ArticleController"
import Categories from "./src/controller/CategoryController"

const router = require("express").Router()

// Category
router.get("/admin/categories/new", Categories.categoriesNew)
router.get("/admin/categories", Categories.allCategories)
router.get("/categories/delete/:id", Categories.deleteCategorie)
router.post("/admin/categories/edit/:id", Categories.editCategories)
router.post("/categories/save", Categories.categorySave)
// Article
router.get("/admin/articles", Articles.allArticles)
router.get("/admin/articles/new", Articles.newArticle)
router.get("/articles/delete/:id", Articles.deleteArticle)
router.post("/articles/edit/:id", Articles.editArticle)
router.post("/articles/save", Articles.saveArticle)

export default router