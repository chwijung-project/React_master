import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { callSmallPostListAPI } from "../../api/MainAPICall";
import basic from '../../image/basic.png';
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
            <div className="postContainer">
                <div className="small-upside">
                    <h1 className="small-text">최신 채용공고</h1>
                    <button className="morebtn" onClick={ onClickNaviHandler }>
                        더 보기 &gt;
                    </button>
                    <div className="space"></div>
                    <select onChange={ DropdownChangehandler } value={selectOption} className="small-drop">
                        {jobOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>
                <div class="line"></div>
                <div className="smallPostList">
                    {Array.isArray(postingList) && postingList.map((p) => (
                        <div key={p.idx} className="postItem">
                            <div className="company-logo">
                                <img src="https://static.wanted.co.kr/images/wdes/0_5.be5f31e8.png" alt="" />
                            </div>
                            <div className="space2"></div>
                            <div className="recruit">
                                {p.recru_title}
                            </div>
                            <div className="space2"></div>
                            <div className="company">
                                {p.recru_company}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default SmallPosting;