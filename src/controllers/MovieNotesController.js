const knex = require('../database/knex');
const AppError = require('../utils/AppError');

class MovieNotesController {
    async create(request, response) {
        const { title, description, rating, tag } = request.body;
        const { user_id } = request.params;

        if (rating <= 0 || rating > 5) {
            throw new AppError(
                'Nota para o filme podem variar apenas de 1 até o 5'
            );
        }
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

    async show(request, response) {
        const { id } = request.params; //id da nota

        const movie_notes = await knex('movie_notes').where({ id }).first();
        const movie_tags = await knex('movie_tags')
            .where({ note_id: id })
            .orderBy('name');

        return response.json({ ...movie_notes, movie_tags });
    }

    async delete(request, response) {
        const { id } = request.params;

        await knex('movie_notes').where({ id }).delete();

        response.json();
    }

    async index(request, response) {
        const { title, user_id } = request.query;

       

        const movie_notes = await knex('movie_notes')
            .where({ user_id })
            .whereLike('title', `%${title}%`)
            .orderBy('title');


            const userTags = await knex('movie_tags').where({ user_id })
            const notesWithTags = movie_notes.map(note => {
                const noteTags = userTags.filter(tag => tag.note_id === note.id)

                return {
                    ...note, 
                    tag: noteTags
                }
            })

             

        return response.json(notesWithTags);
    }
}

module.exports = MovieNotesController;
