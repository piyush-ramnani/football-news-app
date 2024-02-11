const { z } = require("zod");

const createUserInputValidation = z.object({
  firstName: z.string(),
  lastName: z.string(),
  username: z.string(),
  password: z.string().min(6),
});

const createPostInputValidation = z.object({
  heading: z.string(),
  description: z.string(),
  date: z.date(),
  media: z.string(),
  content: z.string(),
  socialLinks: z.object({
    twitter: z.optional(z.string()),
    facebook: z.optional(z.string()),
    whatsapp: z.string(),
    email: z.string().email(),
  }),
});

module.exports = {
  zCreateUserInput: createUserInputValidation,
  zCreatePostInput: createPostInputValidation,
};
