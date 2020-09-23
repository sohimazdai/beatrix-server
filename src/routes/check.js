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
            longInsulin: 'string',
            commentary: 'string',
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
            commentary: 'string',
            tagIds: 'array'
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
            user: {
                id: 'id',
                email: 'example@sample.com'
            },
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
    {
        path: ROUTES_ENUM.CLEAR_NOBODY,
        method: 'POST',
        body: {}
    },
    {
        path: ROUTES_ENUM.CLEAR_USER_PROPERTIES_TEST,
        method: 'POST',
        body: {
            userId: 'stringa',
        }
    },
    {
        path: ROUTES_ENUM.SET_USER_PROPERTIES_TEST,
        method: 'POST',
        body: {
            userId: 'stringa',
            targetGlycemia: 'string',
            glycemiaMeasuringType: 'string',
            carbsMeasuringType: 'string',
            carbsUnitWeightType: 'string',
        }
    },
    {
        path: ROUTES_ENUM.FOOD_GET_PRODUCTS_BY_DB_ID,
        method: 'POST',
        body: {
            dbId: 'string',
        }
    },
    {
        path: ROUTES_ENUM.FOOD_SEARCH_DBS_PRODUCTS,
        method: 'POST',
        body: {
            dbs: 'array',
            searchOptions: 'object',
        }
    },
    {
        path: ROUTES_ENUM.FOOD_REMOVE_DB,
        method: 'POST',
        body: {
            dbId: 'string',
        }
    },
]

module.exports = router;
