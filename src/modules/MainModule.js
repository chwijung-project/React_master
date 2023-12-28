import { handleActions } from 'redux-actions';


const initialState = [];

export const GET_MAINGRAHP            = 'main/GET_MAIN';
export const GET_SMALLCOMU            = 'main/GET_SMALLCOMU';

const mainReducer = handleActions(
    {
        [GET_MAINGRAHP]: (state, { payload }) => {

            return payload;
        },
        [GET_SMALLCOMU]: (state, { payload }) => {

            return payload;
        }
    },
    initialState
);

export default mainReducer;