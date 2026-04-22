import { Joi, Segments } from "celebrate";
import { isValidObjectId } from 'mongoose';

export const getAssignmentsSchema = {
  [Segments.QUERY]: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    perPage: Joi.number().integer().min(5).max(20).default(10),
    status: Joi.string().valid("todo", "inProgress", "done"),
  }),
};

export const createAssignmentsSchema = {
  [Segments.BODY]: Joi.object({
    name: Joi.string().min(3).max(30).required().messages({
      "string.base": "Name must be a string",
      "string.min": "Name should have at least {#limit} characters",
      "string.max": "Name should have at most {#limit} characters",
      "any.required": "Name is required",
    }),
    description: Joi.string().min(5).max(65).required().messages({
      "string.base": "description must be a number",
      "string.min": "description must be at least {#limit}",
      "string.max": "description must be at most {#limit}",
      "any.required": "description is required",
    }),
    status: Joi.string().valid("todo", "inProgress", "done").required().messages({
      "any.only": "Status must be one of: todo, in progress, or done",
      "any.required": "Status is required",
    }),
  }),
};

const objectIdValidator = (value, helpers) => {
  return !isValidObjectId(value) ? helpers.message('Invalid id format') : value;
};

export const assignmentsIdParamSchema = {
  [Segments.PARAMS]: Joi.object({
    assignmentsId: Joi.string().custom(objectIdValidator).required(),
  }),
};

export const updateAssignmentsSchema = {
  [Segments.PARAMS]: Joi.object({
    assignmentsId: Joi.string().custom(objectIdValidator).required(),
  }),
  [Segments.BODY]: Joi.object({
    name: Joi.string().min(3).max(30),
    description: Joi.string().min(5).max(65),
    status: Joi.string().valid("todo", "inProgress", "done"),
  }).min(1),
};
