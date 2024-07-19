import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import Category from "./CategoryModels";
import slugify from "slugify";
import User from "./UserModels";
import { InterfaceArticle } from "../interfaces/Interfaces";

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

          @ForeignKey(() => User)
          @Column({
                    type:DataType.INTEGER,
                    allowNull: false
          })
          userId!: User;


          @BelongsTo(() => User)
          user!: User;

          static async createArticle(Body: InterfaceArticle): Promise<void> {
            try {
                const {title, body, category} = Body
                const slug:string = slugify(title).toLowerCase()

                await this.create({title, body, slug, categoryId: category, userId: 1})

        } catch(e:any) {
            throw new Error(e)
        }
          };

          static async getAllArticles(): Promise<Article[]> {
            try {
                const articles = await this.findAll({
                    include: [Category],
                    order: [["id", "DESC"]],
                    limit: 6
                })

                return articles;

            } catch(e:any) {
                throw new Error(e)
            }
            
          };

          static async getArticle(slug:string): Promise<Article> {
            try {
                const article = await this.findOne({where: {slug} }) as Article;
                return article;

            } catch(e:any) {
                throw new Error(e)
            }
            
          };

          static async deleteArticle(id:string): Promise<void> {
            try {
                await this.destroy({where:{id: id}})

            } catch(e:any) {
                throw new Error(e)
            }
          };

          static async editArticle(Body: InterfaceArticle, id:string): Promise<void> {
            try {
                const {title, body, category} = Body
                const slug = slugify(title).toLowerCase()
                await this.update({title, body, slug, categoryId: category}, {where: {id: id}})

            } catch(e:any) {
                throw new Error(e)
            }
          };

          static async getArticlesAndCount(offset:number): Promise<{
            rows: Article[],
            count: number
          }> {
            try {
                const articlesAndCount = await this.findAndCountAll({
                    limit: 6,
                    offset: offset,
                    order: [["id", "DESC"]]
                })

                return articlesAndCount;

            } catch(e:any) {
                throw new Error(e)
            }
          }
}