const knex = require('../database/knex');

class MoviesRepository {
    async create({ title, description, rating, tag }, user_id) {
        const [note_id] = await knex('movie_notes').insert({
            title,
            description,
            rating,
            user_id,
        });

        if (tag.length > 0) {
            const tagsInsert = tag.map((name) => {
                return {
                    note_id,
                    name,
                    user_id,
                };
            });
            await knex('movie_tags').insert(tagsInsert);
        }
        return note_id;
    }
}

module.exports = MoviesRepository;
