import session from "express-session";
import Category from "../models/CategoryModels";
import { sessionStore } from "../config/sessionStorage";
import { Request, Response, NextFunction } from "express";

export const sessionUsage = session({
          secret: "Sessions Aplication",
          resave: false,
          saveUninitialized: false,
          store: sessionStore,
          cookie: {
            httpOnly: true,
            maxAge: 1000 * 60 * 7 * 1000,
          },
          name: "user"
}); 

export class Middlewars{
  
  static async getCategory(req:Request, res:Response, next:NextFunction): Promise<void> {
          try {
            const categories = await Category.getAllCategories()

            req.session.category = categories;
            res.locals.category = req.session.category;  

            next(); 

        } catch(e: any) {
          throw new Error
        }
        
  };

  static getUser(req:Request, res:Response, next:NextFunction): void {
    res.locals.errors = req.flash("errors")
    res.locals.success = req.flash("success")
    res.locals.user = req.session.user

    next()

  };

  static adminAuth(req:Request, res:Response, next:NextFunction) {
      if(req.session.user == undefined) res.redirect("/admin/login");
      else next();
  }

}