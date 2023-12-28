import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { callSmallPostListAPI } from "../../api/MainAPICall";
import './SmallPosting.css';

function SmallPosting() {

    const dispatch = useDispatch();
    const smallposting = useSelector(state => state.postReducer);
    const postingList = smallposting.data;
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(
        () => {
            dispatch(callSmallPostListAPI({
                currentPage: currentPage
            }));  
        }
        ,[currentPage]
    );

    return (
        <>
            <div>
            <h1>채용공고</h1>
                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>공고명</th>
                            <th>회사명</th>
                        </tr>
                    </thead>
                    <tbody>
                        { Array.isArray(postingList) && postingList.map((p, index) => (
                            <tr
                                key={ p.idx }
                            >
                                <td>{ index + 1 }</td>
                                <td className="recruit">{ p.recruit }</td>
                                <td className="company">{ p.company }</td>
                            </tr>
                        )) 
                    }
                    </tbody>                    
                </table> 
            </div>
        </>
    )
}

export default SmallPosting;