import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import Category from "./CategoryModels";
import Article from "./ArticleModels";

@Table({
          tableName: "user",
          timestamps: true
})
export default class User extends Model{
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
}