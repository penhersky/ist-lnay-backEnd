import Sequelize from "sequelize";
import sequelize from "../connect";

export class User extends Sequelize.Model {
  public id!: number;
  public name!: string;
  public surname!: string;
  public admin!: boolean;
  public email!: string;
  public password!: string;
  public confirmed!: boolean;

  public readonly createdAt!: Date;
}

type UserType = typeof Sequelize.Model & {
  new (values?: object, options?: Sequelize.BuildOptions): User;
};

const UserModel = <UserType>sequelize.define(
  "User",
  {
    id: {
      type: Sequelize.DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: new Sequelize.DataTypes.STRING(28),
      allowNull: false
    },
    surname: {
      type: new Sequelize.DataTypes.STRING(28),
      allowNull: false
    },
    admin: {
      type: Sequelize.DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false
    },
    email: {
      type: new Sequelize.DataTypes.STRING(128),
      allowNull: false
    },
    confirmed: {
      type: Sequelize.DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false
    },
    password: {
      type: new Sequelize.DataTypes.STRING(200)
    }
  },
  {
    freezeTableName: true
  }
);

export default UserModel;
