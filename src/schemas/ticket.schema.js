import Joi from 'joi';

export const ticketSchema = Joi.object({
  code: Joi.string().required(),
  purchase_datetime: Joi.date().required(),
  amount: Joi.number().min(0).required(),
  purchaser: Joi.string().email().required()
});
