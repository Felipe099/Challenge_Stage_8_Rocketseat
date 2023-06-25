class UsersController {
    create(request, response) {
        const { name, email } = request.body;

        response.status(201).json({ name, email });
    }
}

module.exports = UsersController;
