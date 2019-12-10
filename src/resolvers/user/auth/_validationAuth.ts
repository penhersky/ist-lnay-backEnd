import Joi from "@hapi/joi";

export const validationUserData = async (data: {
  name: string;
  surname: string;
  email: string;
}): Promise<string | undefined> => {
  const schema = Joi.object({
    name: Joi.string()
      .min(2)
      .max(24)
      .required(),
    surname: Joi.string()
      .min(2)
      .max(24)
      .required(),
    email: Joi.string()
      .email()
      .min(6)
      .max(128)
  });
  const result = schema.validate(data);
  if (result.error) return result.error.details[0].message;
  return undefined;
};

export const loginValidation = async (data: {
  email: String;
  password: string;
}): Promise<string | undefined> => {
  const mailErr = await validationEmail({email: data.email});
  const passErr = await passwordValidation({password: data.password});
  return mailErr || passErr;
};

export const validationEmail = async (data: {
  email: String;
}): Promise<string | undefined> => {
  const schema = Joi.object({
    email: Joi.string()
      .email()
      .min(6)
      .max(128)
  });
  const result = schema.validate(data);
  if (result.error) return result.error.details[0].message;
  return undefined;
};

export const passwordValidation = async (data: {
  password: string;
}): Promise<string | undefined> => {
  const schema = Joi.object({
    password: Joi.string()
      .min(8)
      .max(24)
      .required()
  });
  const result = schema.validate(data);
  if (result.error) return result.error.details[0].message;
  return undefined;
};
