import { InterfaceCategory } from "../interfaces/Interfaces";
import Category from "../models/CategoryModels";
import { Response, Request } from "express";

export default abstract class Categories {
  static categoriesNew(req:Request, res:Response): void {
    res.render("NewCategories");
  }

  static async categorySave(req:Request, res:Response): Promise<void> {
    try {
      if (!req.body.title) {
        res.redirect("/admin/categories/new");
      } else {
        const body: InterfaceCategory = {title:req.body.title}
        await Category.createCategorie(body, req.params.id);
        res.redirect("back");
      }
    } catch (e: any) {
      throw new Error(e);
    }
  };

  static async allCategories(req:Request, res:Response): Promise<void> {
    try {
      const allCategories: any | undefined = await Category.getAllCategories();
      res.render("AllCategories", { allCategories });
    } catch (e: any) {
      throw new Error(e);
    }
  };

  static async deleteCategorie(req:Request, res:Response): Promise<void> {
    try {
      if (!req.params.id) res.redirect("/admin/categories");
      else {
        if (req.params.id !== null) {
          await Category.deleteCategorie(req.params.id);
          res.redirect("back");
        } else res.redirect("/admin/categories");
      }
    } catch (e: any) {
      throw new Error(e);
    }
  };

  static async editCategories(req:Request, res:Response): Promise<void> {
          try {
                    const body: InterfaceCategory = {title:req.body.title}
                    await Category.editCategorie(body, req.params.id)
                    res.redirect("/admin/categories")
                    
          } catch (e: any) {
                    throw new Error(e);
          }

  };

  static async getCategorie(req:Request, res:Response): Promise<void> {
    try {
      const categories = await Category.getCategorie(req.params.slug)

      if(!categories) res.redirect("back");

      else res.render("HomeCategory", {categories});

    } catch(e:any) {
      throw new Error(e)
    }
  }
}
