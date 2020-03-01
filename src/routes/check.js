const {
    Router
} = require('express');
const ROUTES_ENUM = require('./routes');

const router = Router();

router.get('/test/routes', (req, res) => {
    res.type('application/json')
    res.send(ROUTES);
})

const ROUTES = [
    {
        path: ROUTES_ENUM.GET_NOTES,
        method: 'GET',
    }, {
        path: ROUTES_ENUM.CREATE_NOTE,
        method: 'GET',
        body: {
            note: 'Note'
        }
    }, {
        path: ROUTES_ENUM.GET_USER,
        method: 'GET',
        body: {
            userId: 'Number'
        }
    }, {
        path: ROUTES_ENUM.CREATE_USER,
        method: 'GET',
        body: {
            user: 'User'
        }
    }
]

module.exports = router;