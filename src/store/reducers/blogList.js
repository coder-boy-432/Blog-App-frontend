import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../utiliity';

const initialState = {
    blogsList: [],
    loading: false,
    error: false,
    blogsFetched: false
}

const fetchBlogsListStart = (state,action) => {
    return updateObject(state,{loading: true, error: false});
}

const fetchBlogsListSuccess = (state,action) => {
    return updateObject(state,{
        blogsList: action.blogsList,
        blogsFetched: true,
        loading: false
    });
}

const fetchBlogsListFail = (state,action) => {
    return updateObject(state,{loading: false});
}

const reducer = (state = initialState,action) => {
    switch (action.type) {
        case actionTypes.FETCH_BLOGS_LIST_START: return fetchBlogsListStart(state,action);
        case actionTypes.FETCH_BLOGS_LIST_SUCCESS: return fetchBlogsListSuccess(state,action);
        case actionTypes.FETCH_BLOGS_LIST_FAIL: return fetchBlogsListFail(state,action);
        default: return state;
    }
};

export default reducer;