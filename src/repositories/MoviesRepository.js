const knex = require('../database/knex');

class MoviesRepository {
    async create({ title, description, rating, tag }, user_id) {
        const [note_id] = await knex('movie_notes').insert({
            title,
            description,
            rating,
            user_id,
        });

        return note_id
    }
}

module.exports = MoviesRepository;
