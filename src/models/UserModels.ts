import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import Category from "./CategoryModels";
import Article from "./ArticleModels";
import validator from "validator";
import bcryptjs from "bcryptjs"
import { InterfaceUSer } from "../interfaces/Interfaces";

@Table({
          tableName: "user",
          timestamps: true
})
export default class User extends Model{
          private static  _error:Array<string> = [];
          private static _user: object = {};

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
          }

          static get user(): object {
               return this._user;
          }

          private static validation(body: InterfaceUSer): void {
                    if(validator.isEmpty(body.email)) this._error.push("E-mail inválido!");

                    if(validator.isEmpty(body.password)) this._error.push("Senha inválida!");

                    if(validator.isEmpty(body.name)) this._error.push("Nome inválido!");

          }

          static async createUser(body: InterfaceUSer): Promise<void> {
                    try {
                         this.validation(body);
                         
                         if(this._error.length == 0) {

                              const {name, password, email} = body;

                              const salt = bcryptjs.genSaltSync(10)
                              const hash = bcryptjs.hashSync(password, salt)

                              this._user = await this.create({name, email, password: hash})

                         }

                         this.reset();

                    } catch(e:any) {
                              throw new Error(e)
                    }
          }
          // Remove os erros do array evitando erros - reseta ele
          private static reset(): void {
               if(this._error.length > 0) {
                    for(let i = 0; i<= this._error.length; i++ ){
                         this._error.pop()
                    }
               }
          }

}