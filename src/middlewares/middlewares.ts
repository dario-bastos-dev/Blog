import session from "express-session";
import Category from "../models/CategoryModels";
import User from '../models/UserModels';
export const sessionUsage = session({
          secret: "Sessions Aplication",
          resave: false,
          saveUninitialized: false,
          cookie: {
            httpOnly: true,
            maxAge: 1000 * 60 * 7 * 1000,
          },
}); 

export class Middlewars{
  
  static async getCategory(req:any, res:any, next:any) {

          const categories = await Category.getAllCategories()

          req.session.category = categories;

          res.locals.category = req.session.category;  
          next(); 
        
  };

  static async getUser(req:any, res:any, next:any) {
    req.locals.user = req.session.User
    next()

  };

}