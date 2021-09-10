const router = require('express').Router();
const auth = require('../middlewares/auth');
const {
  updateProfile,
  getCurrentUser,
} = require('../controllers/users');
const { updateProfileValidation } = require('../middlewares/validators');

router.get('/users/me', auth, getCurrentUser);
router.patch('/users/me', auth, updateProfileValidation, updateProfile);

module.exports = router;
