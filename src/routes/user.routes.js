const { Router } = require('express');

const multer = require('multer');
const uploadConfig = require('../config/upload.js');

const UsersController = require('../controllers/UsersController');
const ensureAuthenticated = require('../middlewares/ensureAuthenticated');

const UserAvatarController = require('../controllers/UserAvatarController.js');

const userRoutes = Router();
const upload = multer(uploadConfig.MULTER);

const usersController = new UsersController();
const userAvatarController = new UserAvatarController();

userRoutes.post('/', usersController.create);
userRoutes.put('/', ensureAuthenticated, usersController.update);
userRoutes.patch(
    '/avatar',
    ensureAuthenticated,
    upload.single('avatar'),
    userAvatarController.update
);

module.exports = userRoutes;
