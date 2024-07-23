import { Request, Response } from "express"
import User from "../models/UserModels"
import { InterfaceLogin } from "../interfaces/Interfaces"

export default class Login {

          static loginPage(req: Request, res: Response): void {
                   
                    res.render("Login")
          };

          static async loginAuth(req: Request, res: Response): Promise<void> {
                    try {
                              const body: InterfaceLogin = {
                                        email: req.body.email,
                                        password: req.body.password
                              };
                              
                              await User.loginAuth(body)

                              if(User.error.length > 0) {
                                        req.flash("errors", User.error)
                                        res.redirect("back")

                              } else {
                                        req.flash("success", "Login efetuado com sucesso!")
                                        req.session.user = User.user
                                        res.redirect("/admin/users")
                              }

                    } catch(e: any) {
                              throw new Error(e)
                    }
          };

          static logout(req: Request, res: Response): void {
                    req.session.destroy((err) => {
                              if (err) {
                                        throw new Error(err)

                              } else {
                                        res.clearCookie("user");
                                        res.redirect("/")
                          
                              }
                            });
          };
}