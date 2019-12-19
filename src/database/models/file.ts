import Sequelize from "sequelize";
import sequelize from "../connect";

export class File extends Sequelize.Model {
  public id!: number;
  public path!: string;
  public owner!: number;
  public name!: string;
  public information!: string;

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
      allowNull: false
    },
    owner: {
      type: new Sequelize.DataTypes.INTEGER(),
      allowNull: false
    },
    name: {
      type: new Sequelize.DataTypes.STRING(84),
      allowNull: false
    },
    information: {
      type: new Sequelize.DataTypes.STRING(512),
      allowNull: true
    }
  },
  {
    freezeTableName: true
  }
);

export default FileModel;
