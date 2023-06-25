const knex = require('./databases/knex');

class MovieNotesController {
    async create(request, response) {
        const { title, description, rating } = request.body;
        const { user_id } = request.params;

        const [note_id] = await knex('movie_notes').insert({
            title,
            description,
            user_id,
        });
        
        response.json();
    }
}

module.exports = MovieNotesController;
