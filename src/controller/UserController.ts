import { InterfaceUSer } from '../interfaces/Interfaces';
import User from '../models/UserModels';
import { Request, Response } from "express"

export default class Users {

          static createUserPage(req:Request, res:Response): void {
                    res.render("CreateUser")
          };

          static async createNewUser(req:Request, res:Response): Promise<void> {
                    await User.createUser(req.body)

                    if(User.error.length > 0) {
                              req.flash("errors", User.error)
                              res.redirect("back")

                    } else {
                              req.flash("success", "Usuário cadastrado com sucesso!")
                              res.redirect("/")

                    }
          };

          static async getAllUsers(req: Request, res: Response): Promise<void> {
                    try {
                              const allUsers = await User.getAllUsers();

                              res.render("AllUsers", {allUsers})

                    } catch(e: any) {
                              throw new Error(e)
                    }
          };

          static userProfile(req: Request, res: Response): void {

                    res.render("UserProfile")

          };

          static async updateUSer(req: Request, res: Response): Promise<void> {
                    try {
                              const body: InterfaceUSer = {
                                        name: req.body.name,
                                        email: req.body.email,
                                        password: req.body.password
                              }
                    
                              await User.editUser(body, req.params.id);

                              req.session.user = User.user;

                              res.redirect("back")

                    } catch(e: any) {
                              throw new Error(e)
                    }
          };

          static async deleteUSer(req: Request, res: Response): Promise<void> {
                    try {
                              await User.deleteUser(req.params.id);

                              req.session.destroy((err) => {
                                        if (err) {
                                                  throw new Error(err)
          
                                        } else {
                                                  res.clearCookie("user");
                                                  res.redirect("/")
                                    
                                        }
                              });

                    } catch(e: any) {
                              throw new Error(e)
                    }
          };

}