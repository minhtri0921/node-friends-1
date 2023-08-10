const express = require('express');
const router = express.Router();

const friendController = require('../controllers/FriendController');

router.get('/', friendController.getListFriends);
router.get('/friends-by-cat', friendController.getListFriendsByCat);
router.get('/friend-by-id', friendController.getFriendById);

module.exports = router;
