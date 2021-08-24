import { Joi, Segments } from 'celebrate';

export default {
  [Segments.QUERY]: Joi.object()
    .required()
    .keys({
      offset: Joi.number().integer().optional().default(0),
      limit: Joi.number().integer().optional().default(20),
      sort: Joi.string().valid("ASC", "DESC").optional().default('ASC'),
      from: Joi.date().greater('now').optional(),
      to: Joi.date().greater(Joi.ref('from')).optional(),
      minPrice: Joi.number().integer().positive().optional(),
      maxPrice: Joi.number().integer().positive().greater(Joi.ref('minPrice')).optional(),
      country: Joi.string().alphanum().optional(),
      city: Joi.string().alphanum().optional(),
    })
    .with('from', 'to')
    .with('to', 'from')
};
