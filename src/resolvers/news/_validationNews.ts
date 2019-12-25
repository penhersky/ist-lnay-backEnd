import Joi from "@hapi/joi";

export const newsInput = async (data: {
  title: string;
  body: string;
  author: number;
  group: number;
  cathedra: number;
  video: string;
}): Promise<string | undefined> => {
  const schema = Joi.object({
    title: Joi.string()
      .min(6)
      .max(256)
      .required(),
    body: Joi.string()
      .min(24)
      .max(4024)
      .required(),
    author: Joi.number()
      .id()
      .required(),
    group: Joi.number().id(),
    cathedra: Joi.number().id(),
    video: Joi.string().max(256)
  });
  const result = schema.validate(data);
  if (result.error) return result.error.details[0].message;
  return undefined;
};
