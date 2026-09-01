import { sendError } from '../utils/apiResponse.js';

export const validate = (schema) => (req, res, next) => {
  try {
    req.body = schema.parse(req.body);
    next();
  } catch (error) {
    const formattedErrors = error.errors?.map(err => ({
      field: err.path.join('.'),
      message: err.message,
    })) || error.message;
    return sendError(res, 'Validation Error', 400, formattedErrors);
  }
};
