const secretOrKey =
  process.env.NODE_ENV === 'production'
    ? process.env.JWT_SECRET_PROD
    : process.env.JWT_SECRET_DEV;

export default secretOrKey;
