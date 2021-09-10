const router = require('express').Router();

const {
  updateProfile,
  getCurrentUser,
} = require('../controllers/users');
const { updateProfileValidation } = require('../middlewares/validators');

router.get('/users/me', getCurrentUser);
router.patch('/users/me', updateProfileValidation, updateProfile);

module.exports = router;
