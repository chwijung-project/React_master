import { combineReducers } from 'redux';
import mainReducer from './MainModule';
import postReducer from './PostModule';
import smallReducer from './SmallModule';

const rootReducer = combineReducers({
    mainReducer,
    postReducer,
    smallReducer
});

export default rootReducer;
