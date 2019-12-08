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
  public residence!: String;
  public otherInformation!: String;

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
      allowNull: true
    },
    group: {
      type: new Sequelize.DataTypes.INTEGER(),
      allowNull: false
    },
    cathedra: {
      type: new Sequelize.DataTypes.INTEGER(),
      allowNull: false
    },
    faculty: {
      type: new Sequelize.DataTypes.STRING(48),
      allowNull: false
    },
    phonNumber: {
      type: Sequelize.DataTypes.STRING(13),
      allowNull: false
    },
    studentNumber: {
      type: new Sequelize.DataTypes.INTEGER(),
      allowNull: false
    },
    born: {
      type: new Sequelize.DataTypes.STRING(28),
      allowNull: false
    },
    residence: {
      type: new Sequelize.DataTypes.STRING(128),
      allowNull: false
    },
    otherInformation: {
      type: new Sequelize.DataTypes.STRING(2040),
      allowNull: false
    }
  },
  {
    freezeTableName: true
  }
);

export default UserInformationModel;
