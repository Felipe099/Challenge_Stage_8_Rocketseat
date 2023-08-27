const knex = require('../database/knex');
const AppError = require('../utils/AppError');
const { compare } = require('bcryptjs');

const authConfig = require('../config/auth');
const { sign } = require('jsonwebtoken');

class SessionsController {
    async create(request, response) {
        const { email, password } = request.body;

        const user = await knex('users').where({ email }).first();

        if (!user) {
            throw new AppError('E-mail e/ou Senha incorreta', 401);
        }

        const passwordMatched = await compare(password, user.password);

        if (!passwordMatched) {
            throw new AppError('E-mail e/ou Senha incorreta', 401);
        }

        const { secret, expireIn } = authConfig.jwt;
        const token = sign(
            {},
            secret,
            {
                subject: String(user.id),
            },
            expireIn
        );

        return response.json({ user, token });
    }
}

module.exports = SessionsController;
