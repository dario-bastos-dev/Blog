import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import Category from "./CategoryModels";
import Article from "./ArticleModels";
import validator from "validator";
import bcryptjs from "bcryptjs"

@Table({
          tableName: "user",
          timestamps: true
})
export default class User extends Model{
          static error:Array<string> = [];
          static user:any;

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
          static validation(body:any) {
                    if(validator.isEmpty(body.email)) User.error.push("E-mail inválido!");

                    if(validator.isEmpty(body.password)) User.error.push("Senha inválida!");

                    if(validator.isEmpty(body.name)) User.error.push("Nome inválido!");

          }

          static async createUser(body:any) {
                    try {
                         User.validation(body);

                         const {name, password, email} = body;
                         
                         if(User.error.length == 0) {

                              const salt = bcryptjs.genSaltSync(10)
                              const hash = bcryptjs.hashSync(password, salt)

                              User.user = await User.create({name, email, password: hash})

                         }

                    } catch(e:any) {
                              throw new Error(e)
                    }
          }

}