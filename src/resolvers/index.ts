import register from "./user";

export default {
  Query: {
    hello: (_: void, args: void) => {
      return "hello new project!";
    }
  },

  Mutation: {
    ...register
  }
};
