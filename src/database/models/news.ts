import Sequelize from "sequelize";
import sequelize from "../connect";

export class News extends Sequelize.Model {
  public id!: number;
  public title!: string;
  public body!: string;
  public video!: string;
  public author!: number;
  public views!: number;
  public group!: number;
  public cathedra!: number;
  public levelOfOpenness!: string;

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
    video: {
      type: new Sequelize.DataTypes.STRING(256),
      allowNull: true
    },
    author: {
      type: new Sequelize.DataTypes.INTEGER(),
      allowNull: false
    },
    views: {
      type: new Sequelize.DataTypes.INTEGER(),
      allowNull: false,
      defaultValue: 0
    },
    group: {
      type: new Sequelize.DataTypes.INTEGER(),
      allowNull: true
    },
    cathedra: {
      type: new Sequelize.DataTypes.INTEGER(),
      allowNull: true
    },
    levelOfOpenness: {
      type: new Sequelize.DataTypes.STRING(),
      allowNull: true
    }
  },
  {
    freezeTableName: true
  }
);

export default NewsModel;
