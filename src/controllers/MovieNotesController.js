const knex = require('../database/knex');

class MovieNotesController {
    async create(request, response) {
        const { title, description, rating, tag } = request.body;
        const { user_id } = request.params;

        const [note_id] = await knex('movie_notes').insert({
            title,
            description,
            rating,
            user_id,
        });

        await knex('movie_tags').insert({
            note_id,
            name: tag,
            user_id,
        });

        
        response.json();
    }
}

module.exports = MovieNotesController;
