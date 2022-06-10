export default {
    apiPath: process.env.API_PATH || '',
    databaseString:
        process.env.DB_STRING || 'mongodb://localhost:27017/tonnysaurio',
    port: process.env.PORT || '8090',
};
