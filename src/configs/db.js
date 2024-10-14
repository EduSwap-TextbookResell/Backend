const db = {
  host: process.env.DB_HOST || '127.0.0.1',
  user: process.env.DB_USER || 'mongodb',
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME || 'backend',
  port: process.env.DB_PORT || 27017,
  get url() {
    // return `mongodb://${this.user}:${this.password}@${this.host}:${this.port}/${this.database}?authSource=admin`
    return `mongodb://${this.host}:${this.port}/${this.database}?authSource=admin`;
  },
};

export default db;
