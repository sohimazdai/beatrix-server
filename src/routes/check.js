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
    },
    {
        path: ROUTES_ENUM.CREATE_NOTE,
        method: 'GET',
        body: {
            note: 'Note'
        }
    },
    {
        path: ROUTES_ENUM.GET_USER,
        method: 'POST',
        body: {
            userId: 'asdf'
        }
    },
    {
        path: ROUTES_ENUM.SYNC_USER,
        method: 'POST',
        body: {
            id: 'asdf',
            email: 'example@sample.com'
        }
    },
    {
        path: ROUTES_ENUM.DELETE_USER,
        method: 'POST',
        body: {
            userId: 'asdf'
        }
    },
    {
        path: ROUTES_ENUM.FIND_USERS,
        method: 'POST',
        body: {
            id: 'asdf',
            email: 'asd@asd.asd'
        }
    },
]

module.exports = router;
