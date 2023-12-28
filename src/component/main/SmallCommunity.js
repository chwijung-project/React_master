import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { callSmallComuListAPI } from "../../api/MainAPICall";
import './SmallCommunity.css';

function SmallCommunity() {

    const dispatch = useDispatch();
    const smallcomu = useSelector(state => state.mainReducer);
    const comuList = smallcomu.data;
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(
        () => {
            dispatch(callSmallComuListAPI({
                currentPage: currentPage
            }));  
        }
        ,[currentPage]
    );

    return (
        <>
            <div>
            <h1>감자 커뮤니티</h1>
                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>제 목</th>
                            <th>작성자</th>
                        </tr>
                    </thead>
                    <tbody>
                        { Array.isArray(comuList) && comuList.map((p, index) => (
                            <tr
                                key={ p.comu_idx }
                            >
                                <td>{ index + 1 }</td>
                                <td className="comu_titl">{ p.comu_titl }</td>
                                <td className="user_id">{ p.user_id }</td>
                            </tr>
                        )) 
                    }
                    </tbody>                    
                </table> 
            </div>
        </>
    )
}

export default SmallCommunity;