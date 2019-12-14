import Joi from "@hapi/joi";

export const groupInput = async (data: {
  name: string;
  cathedra: number;
  information: string;
}): Promise<string | undefined> => {
  const schema = Joi.object({
    name: Joi.string()
      .min(4)
      .max(128)
      .required(),
    cathedra: Joi.number().id(),
    information: Joi.string()
      .min(0)
      .max(4014)
  });
  const result = schema.validate(data);
  if (result.error) return result.error.details[0].message;
  return undefined;
};
