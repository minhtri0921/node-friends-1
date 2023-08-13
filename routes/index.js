const friendsRouter = require('./friends');
const friendsController = require('../controllers/FriendsController')
function route(app) {
    app.use('/friends', friendsRouter , friendsController.postFriend);
}

module.exports = route;
