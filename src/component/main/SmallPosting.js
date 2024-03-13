import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { callSmallPostListAPI } from "../../api/MainAPICall";
import './SmallPosting.css';

function SmallPosting() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const smallposting = useSelector(state => state.postReducer);
    const postingList = smallposting.data;
    // const [currentPage, setCurrentPage] = useState(1);
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

    const onClickNaviHandler = () => {
        navigate("/jobposting", { replace: true });
    };

    const DropdownChangehandler = (e) => {
        setSelectOption(e.target.value);
    };

    const onClickRecruUrl = (url) => {
        window.open(url, '_blank');
    };

    useEffect(
        () => {
            dispatch(callSmallPostListAPI({
                selectOption: selectOption
            }));  
            console.log("useEffect : 보내는 직무의 값", selectOption);
        }
        ,[selectOption]
    );

    return (
        <>
            <div className="postcontainer">
                <div className="small-box">
                    <h1 className="posttext">최신 채용공고</h1>
                    <select onChange={ DropdownChangehandler } value={selectOption} className="smalldrop">
                        {jobOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                    <button className="morebtn" onClick={ onClickNaviHandler }>
                        더 보기 &gt;
                    </button><br/><br/>
                </div>
                <table className="smallposttable">
                    
                    <thead>
                        <tr>
                            <th>No</th>
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
                                <td className="recruit" onClick={() => onClickRecruUrl(p.recru_url)}>
                                    {p.recru_title}
                                </td>
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