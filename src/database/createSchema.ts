import {
  User,
  News,
  Group,
  File,
  Cathedra,
  UserInformation,
  Image,
  FileNews
} from "./models/index";

const createSchemas = async () => {
  await User.sync({force: true});
  await Group.sync({force: true});
  await Cathedra.sync({force: true});
  await File.sync({force: true});
  await News.sync({force: true});
  await UserInformation.sync({force: true});
  await Image.sync({force: true});
  await FileNews.sync({force: true});
};

export default createSchemas;
