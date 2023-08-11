const express = require('express');
const router = express.Router();

const friendController = require('../controllers/FriendController');
const middleware = require('../middleware/Middleware');

router.get('/', friendController.getListFriends);
router.get('/friends-by-cat', friendController.getListFriendsByCat);
router.get('/friend-by-id', friendController.getFriendById);

router.post('/contact', middleware.uploadFile, friendController.postContact);

module.exports = router;
