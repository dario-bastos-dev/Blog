import session from "express-session";
import Category from "../models/CategoryModels";
export const sessionUsage = session({
          secret: "Sessions Aplication",
          resave: false,
          saveUninitialized: false,
          cookie: {
            httpOnly: true,
            maxAge: 1000 * 60 * 7 * 1000,
          },
}); 

export const middlewareGetCategory = async (req:any, res:any, next:any) =>{

          const categories = await Category.getAllCategories()

          req.session.category = categories;

          res.locals.category = req.session.category;  
          next(); 
        
}