import * as Joi from 'joi';

export const validationSchema = Joi.object({
  ROQ_ONE_API_KEY: Joi.string().default('CHANGE_ME_3'),
  API_URI: Joi.string().default('/graphql'),
  APP_ENVIRONMENT: Joi.string().default('development'),
  APP_PROJECT: Joi.string().default('roq-tech'),
  APP_NAME: Joi.string().default('roq-one-project'),
  BLACKLISTED_FIELDS: Joi.string().default('userEntity:password'), //Add fields with ',' to be split and for other entities add with space
  CLOUD_LOGS_ENABLED: Joi.bool().default(false),
  CLOUD_LOGS_NAME: Joi.string().default(''),
  CONSOLE_LOGS_ENABLED: Joi.bool().default(true),
  DATABASE_LOGS: Joi.boolean().default(true),
  DB_COLLATION_LOCALES: Joi.string().default('case_insensitive:like,iLike: COLLATE "en-US-x-icu"'), // Use ';' to be split for other collations triplet [name:operators:collate]
  LOGS_SKIP_FIELDS: Joi.string().default('password'),
  DATABASE_URL: Joi.string().uri().default('postgres://roqone:roqone@localhost/roqone_dev'),
  DEBUG: Joi.boolean().default(false),
  DEFAULT_FILE_MAX_SIZE_BYTES: Joi.number().default(2000000), // default is 2MB
  DEFAULT_LANGUAGE: Joi.string().default('de_DE'),
  ENTITY_LISTENER_EVENTS_NAME: Joi.string().default('PROJECT'),
  FRONTEND_URL: Joi.string().default('http://localhost:3000'),
  INVITE_EMAIL_TYPE: Joi.string().default('USER_INVITE_MAIL'),
  JWT_SECRET: Joi.string().default('CHANGE_ME'),
  JWT_TTL: Joi.number().default(60 * 60), //1h
  LINK_TO_ACCOUNT_EXPIRES_HOURS: Joi.number().default(24),
  MAX_CONCURRENCY_LIMIT: Joi.number().default(3),
  MAX_INVITE_PER_REQUEST: Joi.number().default(10),
  NEW_RELIC_RECORD_SQL: Joi.string().default('raw'),
  NEW_RELIC_EXPLAIN_THRESHOLD: Joi.number().default(0),
  NEW_RELIC_TRACER_THRESHOLD: Joi.number().default(0),
  NEW_RELIC_SLOW_SQL_ENABLED: Joi.boolean().default(true),
  NEW_RELIC_ENABLE: Joi.boolean().default(false),
  PORT: Joi.number().port().default(3001),
  QUERY_LIMIT: Joi.number().default(1000),
  MAX_GRAPHQL_QUERY_DEPTH:Joi.number().default(4),
  QUERY_DEPTH_IGNORE_FIELDS:Joi.string().default('data'),
  RESET_PASSWORD_EXPIRES_HOURS: Joi.number().default(24),
  ROQ_PLATFORM_API_URI: Joi.string().default('/graphql'),
  ROQ_PLATFORM_AUTHORIZATION_HEADER: Joi.string().default('roq-platform-authorization'),
  ROQ_PLATFORM_REQUEST_ID_HEADER: Joi.string().default('request-id'),
  ROQ_PLATFORM_REQUEST_CALLER_HEADER: Joi.string().default('request-caller'),
  ROQ_PLATFORM_USER_ID_HEADER: Joi.string().default('roq-user-id'),
  ROQ_PLATFORM_HOST: Joi.string().default('http://localhost:3002'),
  API_KEY: Joi.string().default('CHANGE_ME_2'),
  TENANT_ID: Joi.string().default('CHANGE_ME_2'),
  ROQ_PLATFORM_USER_AUTHORIZATION_HEADER: Joi.string().default('roq-user-authorization'),
  ROQ_PLATFORM_USER_SYNC_CRON_INTERVAL: Joi.string().default('*/15 * * * * *'),
  VALIDATE_EMAIL_EXPIRES_HOURS: Joi.number().default(24),
  WRITE_SIGNED_URL_VALID_MS: Joi.number().default(86400000), //In milliesecond so default is 1 days
  AUTO_EMAIL_CONFIRMATION: Joi.boolean().default(false),
  /* eslint-disable @roq/no-eslint-disable */
  /* eslint-disable @roq/no-spaces-in-object-definition */
  // pattern "source;?feature1,feature2:?isPlatform"
  // ;? optional is optional
  // isPlatform need specific 'platform' string
  IMPORT_DATA_CONFIG: Joi.string().default('demo;platform-demo:notification,content,mail,space,user:platform'),
  ROQ_PLATFORM_SERVICE_ACCOUNT_EMAIL: Joi.string().default('project-service-account@roq.tech'),
  ROQ_PLATFORM_SERVICE_ACCOUNT_CACHE_TTL: Joi.number().default(60), // 1m
  ROQ_PLATFORM_SERVICE_ACCOUNT_TOKEN_CACHE_KEY: Joi.string().default('roq-platform-token'),
});
