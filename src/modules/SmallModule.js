import { handleActions } from 'redux-actions';

const initialState = [];

export const GET_SMALLPOST  = 'main/GET_SMALLPOST';

const smallReducer = handleActions(
    {
        [GET_SMALLPOST]: (state, { payload }) => {

            return payload;
        }
    },
    initialState
);

export default smallReducer;