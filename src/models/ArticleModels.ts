import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import Category from "./CategoryModels";

@Table({
          tableName: 'article',
          timestamps: true,
      })
export default class Article extends Model<Article> {
          @Column({
              type: DataType.STRING,
              allowNull: false,
          })
          title!: string;
      
          @Column({
              type: DataType.STRING,
              allowNull: false,
          })
          slug!: string;

          @Column({
              type: DataType.TEXT,
              allowNull: false,
          })
          body!: string;

          @ForeignKey(() => Category)
          @Column({
                    type:DataType.INTEGER,
                    allowNull: false
          })
          categoryId!: Category;


          @BelongsTo(() => Category)
          category!: Category;
}