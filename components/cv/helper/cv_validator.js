const Joi = require("joi");

const cvValidation = Joi.object({
  vacancy: Joi.string()
    .required()
    .regex(/^[0-9a-fA-F]{24}$/)
    .messages({
      "string.empty": "Vacancy ID is required",
      "string.pattern.base": "Invalid Vacancy ID format",
    }),

  fullname: Joi.string().required().messages({
    "string.empty": "Full name is required",
  }),

  email: Joi.string().email().required().messages({
    "string.empty": "Email is required",
    "string.email": "Invalid email format",
  }),

  status: Joi.string().valid("pending", "approved").default("pending").messages({
    "any.only": "Status must be either 'pending' or 'approved'",
  }),
});

module.exports = cvValidation;
