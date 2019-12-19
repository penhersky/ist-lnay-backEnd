import Sequelize from "sequelize";
import sequelize from "../connect";

export class News extends Sequelize.Model {
  public id!: number;
  public title!: string;
  public body!: string;
  public author!: number;
  public views!: number;

  public readonly createdAt!: Date;
}

type NewsType = typeof Sequelize.Model & {
  new (values?: object, options?: Sequelize.BuildOptions): News;
};

const NewsModel = <NewsType>sequelize.define(
  "News",
  {
    id: {
      type: Sequelize.DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    title: {
      type: new Sequelize.DataTypes.STRING(256),
      allowNull: false
    },
    body: {
      type: new Sequelize.DataTypes.STRING(4024),
      allowNull: false
    },
    author: {
      type: new Sequelize.DataTypes.INTEGER(),
      allowNull: false
    },
    views: {
      type: new Sequelize.DataTypes.INTEGER(),
      allowNull: false,
      defaultValue: 0
    }
  },
  {
    freezeTableName: true
  }
);

export default NewsModel;
