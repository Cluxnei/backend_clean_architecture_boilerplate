import * as Joi from 'joi';

export const envValidationSchema = Joi.object({
  NODE_ENV: Joi.string().valid('development', 'production', 'test').required(),
  APP_NAME: Joi.string().required(),
  APP_ENV: Joi.string().valid('local', 'develop', 'production').required(),
  APP_URL: Joi.string().uri().required(),
  DATABASE_URL: Joi.string().required(),
  SERVER_PORT: Joi.number().required(),
  SERVER_HTTP_TIMEOUT_MS: Joi.number().required(),
  AWS_S3_KEY: Joi.string().allow('').default('').optional(),
  AWS_S3_SECRET: Joi.string().allow('').default('').optional(),
  AWS_S3_REGION: Joi.string().allow('').default('').optional(),
  AWS_S3_BUCKET: Joi.string().allow('').default('').optional(),
  AWS_SES_REGION: Joi.string().allow('').default('').optional(),
  AWS_SES_KEY: Joi.string().allow('').default('').optional(),
  AWS_SES_SECRET: Joi.string().allow('').default('').optional(),
  AWS_SES_FROM_EMAIL: Joi.string().allow('').default('').optional(),
});
