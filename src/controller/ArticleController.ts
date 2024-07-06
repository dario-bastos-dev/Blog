import Article from '../models/ArticleModels';
import Category from '../models/CategoryModels';

export default abstract class Articles {
          static async newArticle(req:any, res:any) {
                    try {
                              const allCategories:any = await Category.getAllCategories();
                              res.render("NewArticle", {allCategories})

                    } catch (e: any) {
                              throw new Error(e);
                            }
          };

          static async saveArticle(req:any, res:any) {
                    try {
                              await Article.createArticle(req.body)

                              res.redirect("/admin/articles")

                   } catch (e: any) {
                    throw new Error(e);
                  }
          };

          static async allArticles(req:any, res:any) {
                    try {
                              const allArticles = await Article.getAllArticles()

                              res.render("AllArticles", {allArticles})

                  } catch (e: any) {
                    throw new Error(e);
                  }
          };

          static async deleteArticle(req:any, res:any) {
                    try {
                              if (!req.params.id) res.redirect("/admin/articles");
                              else {
                                if (!isNaN(req.params.id)) {
                                  await Article.deleteArticle(req.params.id);
                                  res.redirect("back");

                                } else res.redirect("/admin/articles");
                              }
                            } catch (e: any) {
                              throw new Error(e);
                            }
          };

          static async editArticle(req:any, res:any) {
                    try {
                              await Article.editArticle(req.body, req.params.id)
                              res.redirect("/admin/articles")

                    } catch(e:any) {
                              throw new Error(e)
                    }
          };

          static async homePageArticles(req:any, res:any) {
            try {
                      const allArticles = await Article.getAllArticles()

                      res.render("Home", {allArticles})

            } catch (e: any) {
                  throw new Error(e);
            }
          };

          static async getArticle(req:any, res:any) {
            try {
              const article = await Article.getArticle(req.params.slug)

              if(!article) res.redirect("back");

              else res.render("Article", {article});

            } catch(e:any) {
              throw new Error(e)
            }
          }
}