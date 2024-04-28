import { handleActions } from 'redux-actions';

const initialState = [];

export const GET_JOBPOST = 'main/GET_JOBPOST';

const postReducer = handleActions(
    {
        [GET_JOBPOST]: (state, { payload }) => {
            // ...state,
            // posts: payload.data,
            // pageInfo: payload.pageInfo

            return payload;
        },
    },
    initialState
);

export default postReducer;