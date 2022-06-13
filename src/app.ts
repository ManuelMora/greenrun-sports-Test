import express from 'express';
import logger from 'morgan';
import config from './config';
// Controllers
import cityController from './controllers/cityController';
import countryController from './controllers/countryController';
import moduleController from './controllers/moduleController';
import roleController from './controllers/roleController';
import rolePermissionController from './controllers/rolePermissionController';
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

app.use(`${fullApiPath}/cities`, cityController);
app.use(`${fullApiPath}/countries`, countryController);
app.use(`${fullApiPath}/modules`, moduleController);
app.use(`${fullApiPath}/roles`, roleController);
app.use(`${fullApiPath}/permissions`, rolePermissionController);
app.use(`${fullApiPath}/users`, userController);

export default app;
