import Category from "../models/CategoryModels";

export default abstract class Categories {
  static categoriesNew(req: any, res: any) {
    res.render("NewCategories");
  }

  static async categorySave(req: any, res: any) {
    try {
      if (!req.body.title) {
        res.redirect("/admin/categories/new");
      } else {
        await Category.createCategorie(req.body);
        res.redirect("back");
      }
    } catch (e: any) {
      throw new Error(e);
    }
  };

  static async allCategories(req: any, res: any) {
    try {
      const allCategories: any | undefined = await Category.getAllCategories();
      res.render("AllCategories", { allCategories });
    } catch (e: any) {
      throw new Error(e);
    }
  };

  static async deleteCategorie(req: any, res: any) {
    try {
      if (!req.params.id) res.redirect("/admin/categories");
      else {
        if (!isNaN(req.params.id)) {
          await Category.deleteCategorie(req.params.id);
          res.redirect("back");
        } else res.redirect("/admin/categories");
      }
    } catch (e: any) {
      throw new Error(e);
    }
  };

  static async editCategories(req: any, res: any) {
          try {
                    await Category.editCategorie(req.body, req.params.id)
                    res.redirect("/admin/categories")
                    
          } catch (e: any) {
                    throw new Error(e);
          }

  };

  static async getCategorie(req: any, res: any) {
    try {
      const categories = await Category.getCategorie(req.params.slug)

      if(!categories) res.redirect("back");

      else res.render("HomeCategory", {categories});

    } catch(e:any) {
      throw new Error(e)
    }
  }
}
