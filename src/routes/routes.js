module.exports = {
    //NOTES
    GET_NOTES: '/note',
    GET_ALL_NOTES: '/note/all',
    UPDATE_NOTE: '/note/update',
    CREATE_NOTE: '/note/create',
    DELETE_NOTE: '/note/delete',
    SYNC_NOTES: '/note/sync',
    //USER
    GET_USER: '/user',
    SYNC_USER: '/user/sync',
    DELETE_USER: '/user/delete',
    FIND_USERS: '/user/find',
    UPDATE_SHEDULE_FOR_USER: '/user/shedule',
    UPDATE_PROPERTIES_FOR_USER: '/user/properties',
    CLEAR_USER_PROPERTIES_TEST: '/user/properties/clear',
    SET_USER_PROPERTIES_TEST: '/user/properties/set',
    //APP
    CLEAR_NOBODY: '/nobody/clear',
    //ONBOARDING
    COMPLETE_ONBOARDING: '/onboarding/complete',
    //TAGS
    TAGS_SYNC: '/tag/sync',
    // FOOD
    FOOD_GET_BY_ID: '/food/get',
    FOOD_SEARCH: '/food/search',
    FOOD_ADD_PRODUCT: '/food/add',
    FOOD_GET_PRODUCTS_BY_DB_ID: '/food/dbid/products',
    FOOD_SEARCH_DBS_PRODUCTS: '/food/search/dbs',
    FOOD_REMOVE_DB: '/food/remove/db',
    FOOD_GET_DBS_LIST: '/food/get/dbs',
    FOOD_GET_BY_BARCODE: '/food/get/barcode',
    FOOD_GET_ALL_WITH_BARCODE: '/food/get/barcode/all',
    //FAVORITES
    FAVORITES_ADD: '/favorites/add',
    FAVORITES_REMOVE: '/favorites/remove',
    FAVORITES_GET: '/favorites/get',
}
