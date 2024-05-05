import { GET_JOBPOST } from '../modules/PostModule.js';

/* 채용공고 리스트 호출용(상세 호출API 따로 설정할 것) */
export const callPostListAPI = ({selectedJob,selectedRegion,selectedOrder,currentPage,showOpenJobs}) => {

    // let requestURL = `http://localhost:8080/api/recruitmentList?`;
    let requestURL = `api/recruitmentList?`;

    const params = new URLSearchParams();

    if (selectedJob && selectedJob.length > 0) {
        params.append('job', selectedJob);
    }
    if (selectedRegion && selectedRegion.length > 0) {
        params.append('region', selectedRegion);
    }
    if (selectedOrder) {
        params.append('sort', selectedOrder);
    }
    params.append('offset', currentPage || '1');
    params.append('closed', showOpenJobs ? 'true' : 'false');

    requestURL += params.toString();
    
    console.log('[callPostListAPI] requestURL : ', requestURL);

    return async (dispatch) => {

        const result = await fetch(requestURL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*"
            }
        })
        .then(response => response.json());

        if(result.status === 200){

            console.log('[ProduceAPICalls] callMainListAPI RESULT : ', result);

            dispatch({ type: GET_JOBPOST,  payload: result.data });
        }
    };
}

