class MoviesCreateService {
    constructor(moviesRepository) {
        this.moviesRepository = moviesRepository;
    }

    async execute({ title, description, rating, tag }, user_id) {
        const note_id = await this.moviesRepository.create({
            title,
            description,
            rating,
            user_id,
        });

       return note_id
    }
}

module.exports = MoviesCreateService;
