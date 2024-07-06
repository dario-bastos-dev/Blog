import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import Category from "./CategoryModels";
import slugify from "slugify";

@Table({
          tableName: 'article',
          timestamps: true,
      })
export default class Article extends Model {
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

          static async createArticle(Body:any) {
            try {
                let title:string = Body.title
                let body:string = Body.body
                let category:string = Body.category
                let slug:string = slugify(title).toLowerCase()

                await Article.create({title, body, slug, categoryId: category})

        } catch(e:any) {
            throw new Error(e)
        }
          };

          static async getAllArticles() {
            try {
                const articles:any|undefined = await Article.findAll({
                    include: [{model: Category}],
                    order: [["id", "DESC"]]
                })

                return articles;

            } catch(e:any) {
                throw new Error(e)
            }
            
          };

          static async getArticle(slug:string) {
            try {
                const article:any|undefined = await Article.findOne({where: {slug} })
                return article;

            } catch(e:any) {
                throw new Error(e)
            }
            
          };

          static async deleteArticle(id:string) {
            try {
                await Article.destroy({where:{id: id}})

            } catch(e:any) {
                throw new Error(e)
            }
          };

          static async editArticle(Body:any, id:string) {
            try {
                const {title, body, category} = Body
                const slug:string = slugify(title).toLowerCase()
                await Article.update({title, body, slug, categoryId: category}, {where: {id: id}})

            } catch(e:any) {
                throw new Error(e)
            }
          }
}