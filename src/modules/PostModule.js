import { handleActions } from 'redux-actions';
import {Orders, jobsTotal, regionTotal} from '../component/common/Information'

const initialState = {
    posts: [],
    pageInfo: {},
    currentPage: 1,
    selectedJob: jobsTotal,  
    selectedRegion: regionTotal,         
    selectedOrder: Orders[0].value,                      
    showOpenJobs: false                      
};

export const GET_JOBPOST = 'main/GET_JOBPOST';
export const UPDATE_FILTERS = 'main/UPDATE_FILTERS';

export const updateFilters = (filters) => ({
    type: UPDATE_FILTERS,
    payload: filters
  });

export const postReducer = handleActions(
    {
        [GET_JOBPOST]: (state, { payload }) => ({
            ...state,
            posts: payload.data,
            pageInfo: payload.pageInfo
        }),
        [UPDATE_FILTERS]: (state, { payload }) => ({
            ...state,
            ...payload
        }),
        
    },
    initialState
);

export default postReducer;