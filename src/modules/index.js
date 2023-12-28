import { combineReducers } from 'redux';
import mainReducer from './MainModule';
import postReducer from './PostModule';

const rootReducer = combineReducers({
    mainReducer,
    postReducer
});

export default rootReducer;
