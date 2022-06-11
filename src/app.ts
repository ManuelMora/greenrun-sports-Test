import express from 'express';
import logger from 'morgan';
import config from './config';
// Controllers
import userController from './controllers/userController';

const app = express();
const apiPath = config.apiPath;
const fullApiPath = `${apiPath}/V1`;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((_req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Authorization, X-API-KEY, Origin, X-Requested-With,' +
        'Content-Type, Accept, Access-Control-Allow-Request-Method'
    );
    res.header(
        'Access-Control-Allow-Methods',
        'GET, POST, OPTIONS, PUT, PATCH, DELETE'
    );
    res.header('Allow', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    next();
});

app.use(`${fullApiPath}/users`, userController);

export default app;
