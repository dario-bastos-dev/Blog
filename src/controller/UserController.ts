import User from '../models/UserModels';
import { Request, Response } from "express"

export default class Users {
          static createUserPage(req:Request, res:Response): void {
                    res.render("CreateUser")
          }

          static async createNewUser(req:Request, res:Response): Promise<void> {
                    await User.createUser(req.body)

                    if(User.error.length > 0) {
                              req.flash("errors", User.error)
                              res.redirect("back")

                    } else {
                              req.flash("success", "Usuário cadastrado com sucesso!")
                              req.session.user = User.user;
                              res.redirect("/")

                    }
          }

}