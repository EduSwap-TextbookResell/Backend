const db = {
  host: process.env.DB_HOST || '127.0.0.1',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'example',
  database: process.env.DB_NAME || 'backend',
  port: process.env.DB_PORT || '27017',
  get url() {
    return `mongodb://${this.user}:${this.password}@${this.host}:${this.port}/${this.database}?authSource=admin`;
  },
};

export default db;
