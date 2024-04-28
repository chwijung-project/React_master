import { handleActions } from 'redux-actions';


const initialState = [];

export const GET_JOBPOST = 'main/GET_JOBPOST';
export const GET_SMALLPOST = 'main/GET_SMALLPOST';


const postReducer = handleActions(
    {
        [GET_JOBPOST]: (state, { payload }) => {
            // ...state,
            // posts: payload.data,
            // pageInfo: payload.pageInfo

            return payload;
        },
        [GET_SMALLPOST]: (state, { payload }) => {

            return payload;
        },
    },
    initialState
);

export default postReducer;