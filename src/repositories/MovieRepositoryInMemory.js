class MovieRepositoryInMemory {
    async create({ title, description, rating, tag }, user_id) {
        const note_id = {
            title,
            description,
            rating,
            user_id: Math.floor(Math.random() * 1000) + 1,
        };

        return note_id;
    }
}

module.exports = MovieRepositoryInMemory;
