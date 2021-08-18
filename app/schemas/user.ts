import { Joi, Segments } from 'celebrate';

export default {
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().min(1).optional(),
    email: Joi.string().pattern(/^.+@\S+\.\S+$/).required(),
    password: Joi.string().min(8).required().messages({
      'string.min': 'your password is less then 8 characters long'
    })
  })
};
