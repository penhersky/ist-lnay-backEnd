import Sequelize from "sequelize";
import sequelize from "../connect";

export class Cathedra extends Sequelize.Model {
  public id!: number;
  public name!: string;
  public faculty!: string;
  public mainImage!: string;
  public information!: string;

  public readonly createdAt!: Date;
}

type CathedraType = typeof Sequelize.Model & {
  new (values?: object, options?: Sequelize.BuildOptions): Cathedra;
};

const CathedraModel = <CathedraType>sequelize.define(
  "Cathedra",
  {
    id: {
      type: Sequelize.DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: new Sequelize.DataTypes.STRING(128),
      allowNull: false
    },
    faculty: {
      type: new Sequelize.DataTypes.STRING(128),
      allowNull: true
    },
    mainImage: {
      type: new Sequelize.DataTypes.STRING(256),
      allowNull: true
    },
    information: {
      type: new Sequelize.DataTypes.STRING(128),
      allowNull: true
    }
  },
  {
    freezeTableName: true
  }
);

export default CathedraModel;
