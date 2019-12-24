import Sequelize from "sequelize";
import sequelize from "../connect";

export class FileNews extends Sequelize.Model {
  public id!: number;
  public path!: string;
  public news!: number;
  public type!: string;

  public readonly createdAt!: Date;
}

type FileNewsType = typeof Sequelize.Model & {
  new (values?: object, options?: Sequelize.BuildOptions): FileNews;
};

const FileNewsModel = <FileNewsType>sequelize.define(
  "FileNews",
  {
    id: {
      type: Sequelize.DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    path: {
      type: new Sequelize.DataTypes.STRING(256),
      allowNull: false
    },
    news: {
      type: new Sequelize.DataTypes.INTEGER(),
      allowNull: false
    },
    type: {
      type: new Sequelize.DataTypes.STRING(12),
      allowNull: false
    }
  },
  {
    freezeTableName: true
  }
);

export default FileNewsModel;
