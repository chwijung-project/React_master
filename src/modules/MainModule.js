import { handleActions } from 'redux-actions';


const initialState = [];

export const GET_MAINGRAHP = 'main/GET_MAIN';

const mainReducer = handleActions(
    {
        [GET_MAINGRAHP]: (state, { payload }) => {

            return payload;
        },
    },
    initialState
);

export default mainReducer;