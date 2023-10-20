require('express-async-errors');
require('dotenv/config');

const express = require('express');
const migrationsRun = require('./database/sqlite/migrations');
const uploadConfig = require('./configs/upload');

const cors = require('cors');

const AppError = require('./utils/AppError');

const routes = require('./routes');

migrationsRun();

const app = express();
app.use(express.json());
app.use(cors());

app.use('/files', express.static(uploadConfig.UPLOADS_FOLDER));

app.use(routes);

app.use((error, request, response, next) => {
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

const PORT = process.env.PORT || 3332;

app.listen(PORT, () => {
    PORT, console.log(`Project Running on ${PORT}`);
});
