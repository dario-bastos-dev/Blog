import { BelongsTo, Column, DataType, ForeignKey, HasMany, HasOne, Model, Table } from "sequelize-typescript";
import Article from './ArticleModels';
import slugify from "slugify";
import User from "./UserModels";
import { InterfaceCategory } from '../interfaces/Interfaces';

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

          @ForeignKey(() => User)
          @Column({
                    type:DataType.INTEGER,
                    allowNull: false
          })
          userId!: User;


          @BelongsTo(() => User)
          user!: User;

          static async getAllCategories(): Promise<Category[]> {
            try {
                const categories = await this.findAll();
                return categories;

            } catch(e:any) {
                throw new Error(e)
            }

          };

          static async createCategorie(body: InterfaceCategory, id: string): Promise<void> {
            try {
                await this.create({title: body.title, slug: slugify(body.title).toLowerCase(), userId: id})

            } catch(e:any) {
                throw new Error(e)
            }

          };

          static async deleteCategorie(id:string) {
            try {
                await this.destroy({where:{id: id}})

            } catch(e:any) {
                throw new Error(e)
            }
          };

          static async editCategorie(body: InterfaceCategory, id:string): Promise<void> {
            try {
                await this.update({title: body.title, slug: slugify(body.title).toLowerCase()}, {where: {id: id}})

            } catch(e:any) {
                throw new Error(e)
            }

          };

          static async getCategorie(slug:string):Promise<Category> {
            try {
                const categorie = await this.findOne({
                    where: {slug},
                    include: [Article]
                }) as Category;

                return categorie;

            } catch(e:any) {
                throw new Error(e)
            }

          };
}