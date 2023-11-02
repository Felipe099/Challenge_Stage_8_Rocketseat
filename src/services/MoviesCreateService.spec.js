const MovieCreateService = require('./MoviesCreateService');
const MovieRepositoryInMemory = require('../repositories/MovieRepositoryInMemory');


describe('MoviesCreateService', () => {
    it('movie should be create', async () => {
        const note_id = {
            title: 'Felipe',
            description: 'cara desenrolado',
            rating: '5',
            tag: ['Ação', 'Carro'],
        };

        const movieRepositoryInMemory = new MovieRepositoryInMemory();
        const movieCreateService = new MovieCreateService(movieRepositoryInMemory);
        const movieCreated = await movieCreateService.execute(note_id);

        expect(movieCreated).toHaveProperty('description');
    });
});
