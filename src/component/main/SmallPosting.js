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
            <div className="postcontainer">
            <h1 className="posttext">채용공고</h1>
                <table className="smallposttable">
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
                                <td className="index">{ index + 1 }</td>
                                <td className="recruit">{ p.recru_title }</td>
                                <td className="company">{ p.recru_company }</td>
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