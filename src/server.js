const express = require('express');
const migrationsRun = require('./database/sqlite/migrations');

const uploadConfig = require('./configs/upload');

require('express-async-errors');
const AppError = require('./utils/AppError');

const routes = require('./routes');

migrationsRun();

const app = express();
app.use(express.json());

app.use('/files', express.static(uploadConfig.UPLOADS_FOLDER));

app.use(routes);

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
