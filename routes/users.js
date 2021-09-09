const router = require('express').Router();

const {
  updateProfile,
  getCurrentUser,
} = require('../controllers/users');

router.get('/users/me', getCurrentUser);
router.patch('/users/me', updateProfile);

module.exports = router;
