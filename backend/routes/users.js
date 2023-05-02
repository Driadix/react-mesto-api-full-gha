const router = require('express').Router();

const {
  updateProfileValidation,
  updateAvatarValidation,
  getUserByIdValidation,
} = require('../utils/validation/userValidation');

const {
  getAllUsers,
  getUserById,
  getMyUser,
  updateProfile,
  updateAvatar,
} = require('../controllers/users');

router.get('/', getAllUsers); // Получить всех пользователей

router.get('/me', getMyUser); // Найти информацию о себе

router.patch('/me', updateProfileValidation, updateProfile); // Обновить профиль

router.patch('/me/avatar', updateAvatarValidation, updateAvatar); // Обновить аватар

router.get('/:userId', getUserByIdValidation, getUserById); // Найти пользователя по ID

module.exports = router;
