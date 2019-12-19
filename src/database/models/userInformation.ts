import Sequelize from "sequelize";
import sequelize from "../connect";

export class UserInformation extends Sequelize.Model {
  public id!: number;
  public owner!: number;
  public group!: number;
  public cathedra!: number;
  public faculty!: string;
  public phonNumber!: string;
  public studentNumber!: number;
  public born!: string;
  public residence!: string;
  public otherInformation!: string;

  public readonly createdAt!: Date;
}

type UserType = typeof Sequelize.Model & {
  new (values?: object, options?: Sequelize.BuildOptions): UserInformation;
};

const UserInformationModel = <UserType>sequelize.define(
  "UserInformation",
  {
    id: {
      type: Sequelize.DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    owner: {
      type: new Sequelize.DataTypes.INTEGER(),
      allowNull: false
    },
    group: {
      type: new Sequelize.DataTypes.INTEGER(),
      allowNull: true
    },
    cathedra: {
      type: new Sequelize.DataTypes.INTEGER(),
      allowNull: true
    },
    faculty: {
      type: new Sequelize.DataTypes.STRING(48),
      allowNull: true
    },
    phonNumber: {
      type: Sequelize.DataTypes.STRING(13),
      allowNull: true
    },
    studentNumber: {
      type: new Sequelize.DataTypes.INTEGER(),
      allowNull: true
    },
    born: {
      type: new Sequelize.DataTypes.STRING(28),
      allowNull: true
    },
    residence: {
      type: new Sequelize.DataTypes.STRING(128),
      allowNull: true
    },
    otherInformation: {
      type: new Sequelize.DataTypes.STRING(2040),
      allowNull: true
    }
  },
  {
    freezeTableName: true
  }
);

export default UserInformationModel;
