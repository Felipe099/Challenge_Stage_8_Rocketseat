const knex = require('../database/knex');
const AppError = require('../utils/AppError');

const MoviesRepository = require('../repositories/MoviesRepository');

class MovieNotesController {
    async create(request, response) {
        const { title, description, rating, tag } = request.body;
        const user_id = request.user.id;

        const moviesRepository = new MoviesRepository();

        if (rating <= 0 || rating > 5) {
            throw new AppError(
                'Nota para o filme podem variar apenas de 1 até o 5'
            );
        }

        await moviesRepository.create(
            { title, description, rating, tag },
            user_id
        );

        return response.json();
    }

    async show(request, response) {
        const { id } = request.params; //id da nota

        const note = await knex('movie_notes').where({ id }).first();
        const tags = await knex('movie_tags')
            .where({ note_id: id })
            .orderBy('name');

        return response.json({ ...note, tags });
    }

    async delete(request, response) {
        const { id } = request.params;

        await knex('movie_notes').where({ id }).delete();

        return response.json();
    }

    async index(request, response) {
        const { title } = request.query;
        const user_id = request.user.id;

        const movie_notes = await knex('movie_notes')
            .where({ user_id })
            .whereLike('title', `%${title}%`)
            .orderBy('title');

        const userTags = await knex('movie_tags').where({ user_id });
        const notesWithTags = movie_notes.map((note) => {
        const noteTags = userTags.filter((tag) => tag.note_id === note.id);

            return {
                ...note,
                tag: noteTags,
            };
        });

        return response.json(notesWithTags);
    }
}

module.exports = MovieNotesController;
