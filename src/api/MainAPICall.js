import { GET_MAINGRAHP } from '../modules/MainModule.js';
import { GET_SMALLPOST } from '../modules/SmallModule.js';


/* 메인페이지 직무별 그래프 */
export const callMainJobListAPI = ({selectedJob}) => {
    // const encodedJob = encodeURIComponent(selectedJob);
    // let requestURL = `http://localhost:8080/api/recruit-open-counts`;
    let requestURL = `api/recruit-open-counts`;

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

            console.log('[MainAPICall] callMainJobListAPI RESULT : ', result);

            dispatch({ type: GET_MAINGRAHP,  payload: result.data });
        }
    };
}

/* 메인페이지 직무별 그래프(더미) */
// export const callMainJobListAPI2 = ({selectedJob}) => {
//     // const encodedJob = encodeURIComponent(selectedJob);
//     // let requestURL = `http://localhost:8080/checkedjobs?job=${encodedJob}`;
//     let requestURL = `api/smallrecruit`;

//     return async (dispatch) => {

//         const result = await fetch(requestURL, {
//             method: "GET",
//             headers: {
//                 "Content-Type": "application/json",
//                 "Accept": "*/*"
//             }
//         })
//         .then(response => response.json());

//         if(result.status === 200){

//             console.log('[MainAPICall] callMainJobListAPI2 RESULT : ', result);

//             dispatch({ type: GET_MAINGRAHP,  payload: result.data });
//         }
//     };
// }

/* 메인페이지 채용공고 스몰보드 */
export const callSmallPostListAPI = ({selectOption}) => {

    // let requestURL = `http://localhost:8080/api/smallrecruit?job=${selectOption}`;
    let requestURL = `api/smallrecruit?job=${selectOption}`;
    
    console.log('[MainAPICall] requestURL : ', requestURL);

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

            console.log('[MainAPICall] callSmallPostListAPI RESULT : ', result);

            dispatch({ type: GET_SMALLPOST,  payload: result.data });
        }
    };
}

/* 메인페이지 감자커뮤니티 스몰보드 */
// export const callSmallComuListAPI = ({currentPage}) => {

//     let requestURL = `http://localhost:8080/smallcomu`;

//     if (currentPage !== undefined || currentPage !== null) {
//         requestURL = `${requestURL}?offset=${currentPage}`;
//     }
    
//     console.log('[MainAPICall] requestURL : ', requestURL);

//     return async (dispatch) => {

//         const result = await fetch(requestURL, {
//             method: "GET",
//             headers: {
//                 "Content-Type": "application/json",
//                 "Accept": "*/*"
//             }
//         })
//         .then(response => response.json());

//         if(result.status === 200){

//             console.log('[MainAPICall] callSmallComuListAPI RESULT : ', result);

//             dispatch({ type: GET_SMALLCOMU,  payload: result.data });
//         }
//     };
// }