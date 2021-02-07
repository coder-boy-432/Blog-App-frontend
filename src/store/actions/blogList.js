import * as actionTypes from './actionTypes';
import axios from '../../axiosInstance';

export const fetchBlogsSuccess = (list) => {
    return {
        type: actionTypes.FETCH_BLOGS_LIST_SUCCESS,
        blogsList: list
    };
};

export const fetchBlogsFail = (error) => {
    return {
        type: actionTypes.FETCH_BLOGS_LIST_FAIL,
        error: error
    }
}

export const fetchBlogsStart = () => {
    return {
        type: actionTypes.FETCH_BLOGS_LIST_START
    };
};

export const fetchBlogs = () => {
    return dispatch => {
        dispatch(fetchBlogsStart());
        axios.get('http://localhost:5000/blogsList')
            .then(response => {       
                dispatch(fetchBlogsSuccess(response.data));
            })
            .catch(error => {
                dispatch(fetchBlogsFail(error));
            });
    }
}
