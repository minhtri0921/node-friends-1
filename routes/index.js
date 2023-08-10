const friendRouter = require('./friend');
const categoryRouter = require('./category');

function route(app) {
    app.use('/friend', friendRouter);
    app.use('/cat', categoryRouter);
}

module.exports = route;
