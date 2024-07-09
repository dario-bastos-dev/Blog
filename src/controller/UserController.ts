import User from "../models/UserModels"

export default class Users {
          static createUserPage(req:any, res:any) {
                    res.render("CreateUser")
          }

          static async createNewUser(req:any, res:any){
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