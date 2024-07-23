import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import Category from "./CategoryModels";
import Article from "./ArticleModels";
import validator from "validator";
import bcryptjs from "bcryptjs"
import { InterfaceLogin, InterfaceUSer } from "../interfaces/Interfaces";

@Table({
          tableName: "user",
          timestamps: true
})
export default class User extends Model{
          private static  _error: Array<string> = [];
          private static _user: object | User = {};

          @Column({
                    type: DataType.STRING,
                    allowNull: false
          })
          name!: string;

          @Column({
                    type: DataType.STRING,
                    allowNull: false
          })
          email!: string;

          @Column({
                    type: DataType.STRING,
                    allowNull: false
          })
          password!:string;

          @HasMany(() => Category)
          categories!: Category[];

          @HasMany(() => Article)
          articles!: Article[];

          // Métodos
          static get error(): Array<string> {
               return this._error;
          };

          static get user(): object {
               return this._user;
          };

          private static async validation(body: InterfaceUSer): Promise<void> {
                    try {
                         this.reset()
                         this._user = await this.findOne({where:{email:body.email}}) as User

                    if(validator.isEmpty(body.email)) this._error.push("E-mail inválido!");
                    if(validator.isEmpty(body.password)) this._error.push("Senha inválida!");
                    if(validator.isEmpty(body.name)) this._error.push("Nome inválido!");
                    if(this._user != undefined) this._error.push("O e-mail informado já existe");

               } catch(e: any) {
                    throw new Error(e)
               }

          };

          static async createUser(body: InterfaceUSer): Promise<void> {
                    try {
                         await this.validation(body);
                         
                         if(this._error.length === 0) {

                              const {name, password, email} = body;
                              const salt = bcryptjs.genSaltSync(10)
                              const hash = bcryptjs.hashSync(password, salt)

                              this._user = await this.create({name, email, password: hash})

                         }

                    } catch(e:any) {
                              throw new Error(e)
                    }
          };

          static async getAllUsers(): Promise<User[]> {
               try{
                    this.reset();

                    const allUsers = await this.findAll()

                    return allUsers;

               } catch(e: any) {
                    throw new Error(e)
               }
          };

          static async editUser(body: InterfaceUSer, id: string): Promise<void> {
               try {
                    if(body.password == null || undefined) await this.update({name: body.name, email: body.email}, {where: {id: id}});
                    else {
                         const salt = bcryptjs.genSaltSync(10)
                         const hash = bcryptjs.hashSync(body.password, salt)

                         await this.update({name: body.name, email: body.email, password: hash}, {where: {id: id}});

                         this._user = await this.findByPk(id) as User
                    }
   
               } catch(e:any) {
                   throw new Error(e)
               }
   
             };

             static async deleteUser(id: string) {
               try {
                   await this.destroy({where:{id: id}})
   
               } catch(e:any) {
                   throw new Error(e)
               }
             };

          static async loginAuth(body: InterfaceLogin): Promise<void> {
               try{
                    this.reset();

                    const user = await this.findOne({where:{email: body.email}})

                    if(!user) this._error.push("Usuário não existe!");  
                    else {
                         if(!bcryptjs.compareSync(body.password, user.dataValues.password)) this._error.push("Senha incorreta!");

                         this._user = user.dataValues;
                    }


               } catch(e: any) {
                    throw new Error(e)
               }
          };

          // Garante que os elementos estejam sempre vazios
          private static reset(): void {
               if(this._error.length > 0) {
                    for(let i = 0; i<= this._error.length; i++ ){
                         this._error.pop()
                    }
               }

               if(this._user == undefined || null) this._user = {};
          };

}