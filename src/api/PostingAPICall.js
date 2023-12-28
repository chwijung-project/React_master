import { GET_JOBPOST } from '../modules/PostModule.js';

/* 채용공고 리스트 호출용(상세 호출API 따로 설정할 것) */
export const callPostListAPI = ({currentPage}) => {

    let requestURL = `http://localhost:8080/jobposting`;

    if (currentPage !== undefined || currentPage !== null) {
        requestURL = `${requestURL}?offset=${currentPage}`;
    }
    
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

