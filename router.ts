import Article from "./src/controller/ArticleController"
import Categories from "./src/controller/CategoryController"

const router = require("express").Router()

// Category
router.get("/admin/categories/new", Categories.categoriesNew)
router.get("/admin/categories", Categories.allCategories)
router.get("/categories/delete/:id", Categories.deleteCategorie)
router.post("/admin/categories/edit/:id", Categories.editCategories)
router.post("/categories/save", Categories.categorySave)
// Article
router.get("/admin/articles/new", Article.newArticle)

export default router