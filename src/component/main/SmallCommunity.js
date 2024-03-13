import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { callSmallComuListAPI } from "../../api/MainAPICall";
import './SmallCommunity.css';

function SmallCommunity() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const smallcomu = useSelector(state => state.smallReducer);
    const comuList = smallcomu.data;
    const [currentPage, setCurrentPage] = useState(1);
    const [selectOption, setSelectOption] = useState('머신러닝/딥러닝 엔지니어');

    const jobOptions = [
        { value: '머신러닝/딥러닝 엔지니어', label: '머신러닝/딥러닝 엔지니어' },
        { value: '머신러닝/딥러닝 리서처', label: '머신러닝/딥러닝 리서처' },
        { value: '데이터 사이언티스트', label: '데이터 사이언티스트' },
        { value: '데이터 엔지니어', label: '데이터 엔지니어' },
        { value: 'AI 서비스 개발자', label: 'AI 서비스 개발자' },
        { value: 'AI 서비스 기획자', label: 'AI 서비스 기획자' },
        { value: 'AI 아티스트', label: 'AI 아티스트' },
      ];

    const onClickMenuiHandler = () => {
       navigate("/community", { replace: true });
    }; 

    const DropdownMenuHandler = (e) => {
        setSelectOption(e.target.value);
    };

    const onClickComuPage = (url) => {
        window.open(url, '_blank');
    };


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
            <div className="comucontainer">
                <div className="comusmall-box">
                    <h1 className="comutext">감자 커뮤니티</h1>
                    <select onChange={ DropdownMenuHandler } value={selectOption} className="smallcomudrop">
                        {jobOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>

                </div>
                <table className="smallcomutable">
                    <button className="morebtn" onClick={ onClickMenuiHandler }>
                           더 보기 &gt;
                        </button><br/><br/>
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>제&nbsp;&nbsp;목</th>
                            <th>작성자</th>
                        </tr>
                    </thead>
                    <tbody>
                        { Array.isArray(comuList) && comuList.map((p, index) => (
                            <tr
                                key={ p.comu_idx }
                            >
                                <td className="index">{ index + 1 }</td>
                                <td className="comu_titl">
                                    { p.comu_titl }
                                </td>
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