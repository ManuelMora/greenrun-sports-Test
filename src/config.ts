export default {
    apiPath: process.env.API_PATH || '',
    databaseHost:
        process.env.DB_HOST || '127.0.0.1',
    databasePort:
        process.env.DB_PORT || '3306',
    databaseUser:
        process.env.DB_USER || 'root',
    databasePassword:
        process.env.DB_PORT || 'Cyb3rS3gur0',
    databaseName:
        process.env.DB_NAME || 'greenrun',
    port: process.env.PORT || '8090',
};
