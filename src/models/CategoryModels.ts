import { Column, DataType, HasMany, HasOne, Model, Table } from "sequelize-typescript";
import Article from './ArticleModels';
import slugify from "slugify";

@Table({
          tableName: 'category',
          timestamps: true,
      })
export default class Category extends Model {
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

          @HasMany(() => Article)
          articles!: Article[];

          @HasOne(() => Article)
          article!: Article;

          static async getAllCategories() {
            try {
                const categories:any|undefined = await Category.findAll();
                return categories;

            } catch(e:any) {
                throw new Error(e)
            }

          };

          static async createCategorie(body:any) {
            try {
                await Category.create({title: body.title, slug: slugify(body.title).toLowerCase()})

            } catch(e:any) {
                throw new Error(e)
            }

          };

          static async deleteCategorie(id:string) {
            try {
                await Category.destroy({where:{id: id}})

            } catch(e:any) {
                throw new Error(e)
            }
          };

          static async editCategorie(body:any, id:string) {
            try {
                await Category.update({title: body.title, slug: slugify(body.title).toLowerCase()}, {where: {id: id}})

            } catch(e:any) {
                throw new Error(e)
            }

          }
}