import Sequelize from "sequelize";
import sequelize from "../connect";

export class File extends Sequelize.Model {
  public id!: number;
  public path!: string;
  public owner!: number;

  public readonly createdAt!: Date;
}

type FileType = typeof Sequelize.Model & {
  new (values?: object, options?: Sequelize.BuildOptions): File;
};

const FileModel = <FileType>sequelize.define(
  "File",
  {
    id: {
      type: Sequelize.DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    path: {
      type: new Sequelize.DataTypes.STRING(256),
      allowNull: true
    },
    owner: {
      type: new Sequelize.DataTypes.INTEGER(),
      allowNull: true
    }
  },
  {
    freezeTableName: true
  }
);

export default FileModel;
