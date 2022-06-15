export default {
    env: process.env.NODE_ENV || 'dev',
    apiPath: process.env.API_PATH || '',
    databaseHost: process.env.DB_HOST || '127.0.0.1',
    databasePort: process.env.DB_PORT || '3306',
    databaseUser: process.env.DB_USER || 'root',
    databasePassword: process.env.DB_PASSWORD || 'Cyb3rS3gur0',
    databaseName: process.env.DB_NAME || 'greenrun',
    jwtSecret: process.env.JWT_SECRET_HASH || '1as5FR67-2sdfAs2J',
    defaultPassword: process.env.DEFAULT_PASSWORD || 'Colombia2022*',
    port: process.env.PORT || '8090',
};
