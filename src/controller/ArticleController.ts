import { toInt } from 'validator';
import Article from '../models/ArticleModels';
import Category from '../models/CategoryModels';
import { Request, Response } from 'express';
import { InterfaceArticle } from '../interfaces/Interfaces';

export default abstract class Articles {
          static async newArticle(req:Request, res:Response): Promise<void> {
                    try {
                              const allCategories = await Category.getAllCategories();
                              res.render("NewArticle", {allCategories})

                    } catch (e: any) {
                              throw new Error(e);
                            }
          };

          static async saveArticle(req:Request, res:Response): Promise<void> {
                    try {
                              const body: InterfaceArticle = {
                                title: req.body.title,
                                body: req.body.body,
                                category: req.body.category
                              }

                              await Article.createArticle(body)

                              res.redirect("/admin/articles")

                   } catch (e: any) {
                    throw new Error(e);
                  }
          };

          static async allArticles(req:Request, res:Response): Promise<void> {
                    try {
                              const allArticles = await Article.getAllArticles()

                              res.render("AllArticles", {allArticles})

                  } catch (e: any) {
                    throw new Error(e);
                  }
          };

          static async deleteArticle(req:Request, res:Response): Promise<void> {
                    try {
                              if (!req.params.id) res.redirect("/admin/articles");
                              else {
                                if (req.params.id !== null) {
                                  await Article.deleteArticle(req.params.id);
                                  res.redirect("back");

                                } else res.redirect("/admin/articles");
                              }
                            } catch (e: any) {
                              throw new Error(e);
                            }
          };

          static async editArticle(req:Request, res:Response): Promise<void> {
                    try {
                      const body: InterfaceArticle = {
                        title: req.body.title,
                        body: req.body.body,
                        category: req.body.category
                      }
                              await Article.editArticle(body, req.params.id)
                              res.redirect("/admin/articles")

                    } catch(e:any) {
                              throw new Error(e)
                    }
          };

          static async homePageArticles(req:Request, res:Response): Promise<void> {
            try {
                      const allArticles = await Article.getAllArticles()

                      res.render("Home", {allArticles})

            } catch (e: any) {
                  throw new Error(e);
            }
          };

          static async getArticle(req:Request, res:Response): Promise<void> {
            try {
              const article = await Article.getArticle(req.params.slug)

              if(!article) res.redirect("back");

              else res.render("Article", {article});

            } catch(e:any) {
              throw new Error(e)
            }
          };

          static async articlesPage(req:Request, res:Response): Promise<void> {
            try {
              const page = parseInt(req.params.num);
              let offset:number = 0;
              let next:boolean;

              if(isNaN(page) || page <= 1) res.redirect("/");

              else offset = (page -1) *6;

              const articles = await Article.getArticlesAndCount(offset);

              if(offset+4 >= articles.count) next = false;

              else next = true;

              const result:object = {
                page: page,
                next: next,
                articles: articles
              }

              res.render("Page", {result})

            } catch(e:any) {
              throw new Error(e)
            }
          }
}