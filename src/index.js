'use strict';

const { HttpsClient, } = require('./HttpsClient');
const { Router,      } = require('./Router');

const app = new Router();

const handler = async (request, response) => {
    try {
        const body = await HttpsClient.get(`https://api.weatherbit.io${request.path}?${Object.keys(request.query).map(key => `${key}=${request.query[key]}`).join('&')}`);

        return response.send(body);
    } catch (error) {
        console.error(error);

        return response.sendError(502);
    }
};

app.get('/v2.0/current', handler)
    .get('/v2.0/forecast/hourly', handler)
    .get('/v2.0/forecast/daily', handler);

exports.handler = async (event, context, callback) => await app.serve(event, context, callback);
