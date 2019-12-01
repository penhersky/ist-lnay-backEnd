import Sequelize from "sequelize";
import sequelize from "../connect";

export class User extends Sequelize.Model {
  public id!: number;
  public name!: string;
  public surname!: string;
  public email!: string;
  public password!: string;

  public readonly createdAt!: Date;
}

type MyModelStatic = typeof Sequelize.Model & {
  new (values?: object, options?: Sequelize.BuildOptions): User;
};

const UserModel = <MyModelStatic>sequelize.define(
  "User",
  {
    id: {
      type: Sequelize.DataTypes.INTEGER.UNSIGNED,
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
    email: {
      type: new Sequelize.DataTypes.STRING(128),
      allowNull: false
    },
    password: {
      type: new Sequelize.DataTypes.STRING(200),
      allowNull: false
    }
  },
  {
    freezeTableName: true
  }
);

export default UserModel;
