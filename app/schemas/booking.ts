import { Joi, Segments } from 'celebrate';

export default {
  [Segments.BODY]: Joi.object().keys({
    checkIn: Joi.date().greater('now').required(),
    checkOut: Joi.date().greater(Joi.ref('checkIn')).required(),
  }),
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.number().integer().positive().required(),
  }),
  [Segments.HEADERS]: Joi.object().keys({
    'jwt-authorization': Joi.string().required(),
  }).pattern(/./, Joi.string())
};
