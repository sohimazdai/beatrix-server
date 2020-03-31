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
        path: ROUTES_ENUM.GET_ALL_NOTES,
        method: 'GET',
    },
    {
        path: ROUTES_ENUM.GET_NOTES,
        method: 'POST',
        body: {
            userId: 'string'
        }
    },
    {
        path: ROUTES_ENUM.CREATE_NOTE,
        method: 'POST',
        body: {
            id: 'string',
            userId: 'string',
            date: 'string',
            glucose: 'string',
            breadUnits: 'string',
            insulin: 'string',
            longInsulin: 'string'
        }
    },
    {
        path: ROUTES_ENUM.UPDATE_NOTE,
        method: 'POST',
        body: {
            userId: 'string',
            id: 'string',
            date: 'string',
            prevDate: 'string',
            glucose: 'string',
            breadUnits: 'string',
            insulin: 'string',
            longInsulin: 'string',
        }
    },
    {
        path: ROUTES_ENUM.DELETE_NOTE,
        method: 'POST',
        body: {
            userId: 'string',
            id: 'string',
        }
    },
    {
        path: ROUTES_ENUM.SYNC_NOTES,
        method: "POST",
        body: {
            notes: '[]',
            userId: 'string'
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
