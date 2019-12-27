import Sequelize from "sequelize";
import sequelize from "../connect";

export class Group extends Sequelize.Model {
  public id!: number;
  public name!: string;
  public cathedra!: string;
  public mainImage!: string;
  public information!: string;

  public readonly createdAt!: Date;
}

type GroupType = typeof Sequelize.Model & {
  new (values?: object, options?: Sequelize.BuildOptions): Group;
};

const GroupModel = <GroupType>sequelize.define(
  "Group",
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
    cathedra: {
      type: new Sequelize.DataTypes.INTEGER(),
      allowNull: false
    },
    mainImage: {
      type: new Sequelize.DataTypes.STRING(256),
      allowNull: true
    },
    information: {
      type: new Sequelize.DataTypes.STRING(4024),
      allowNull: true
    }
  },
  {
    freezeTableName: true
  }
);

export default GroupModel;
