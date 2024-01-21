import { handleActions } from 'redux-actions';

const initialState = [];

export const GET_SMALLCOMU            = 'main/GET_SMALLCOMU';

const smallReducer = handleActions(
    {
        [GET_SMALLCOMU]: (state, { payload }) => {

            return payload;
        }
    },
    initialState
);

export default smallReducer;