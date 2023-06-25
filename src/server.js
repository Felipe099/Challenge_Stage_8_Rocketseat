const express = require('express');
const database = require('./database/sqlite');

require('express-async-errors');
const AppError = require('./utils/AppError');

const routes = require('./routes');

const app = express();
app.use(express.json());

app.use(routes);

database();

app.use((error, requeste, response, next) => {
    if (error instanceof AppError) {
        return response.status(error.statusCode).json({
            status: 'error',
            message: error.message,
        });
    }

    console.log(error);

    return response.status(500).json({
        status: 'error',
        message: 'Internal server error',
    });
});

const PORT = 3333;

app.listen(PORT, () => {
    PORT, console.log(`Project Running on ${PORT}`);
});
