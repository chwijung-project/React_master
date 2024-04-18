import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { callSmallPostListAPI } from "../../api/MainAPICall";
import './SmallPosting.css';
import { 
    MdArrowForwardIos,
 } from "react-icons/md";
import Dropdown from "../../component/common/Dropdown"

function SmallPosting() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const smallposting = useSelector(state => state.postReducer);
    const postingList = smallposting.data;
    const [selectOption, setSelectOption] = useState('머신러닝/딥러닝 엔지니어');

    const jobOptions = [
    {label: '머신러닝/딥러닝 엔지니어', value: '머신러닝/딥러닝 엔지니어'},
    {label: '머신러닝/딥러닝 리서처', value: '머신러닝/딥러닝 리서처'},
    {label: '데이터 사이언티스트', value: '데이터 사이언티스트'},
    {label: '데이터 엔지니어', value: '데이터 엔지니어'},
    {label: 'AI 서비스 개발자', value: 'AI 서비스 개발자'},
    {label: 'AI 서비스 기획자', value: 'AI 서비스 기획자'},
    {label: 'AI 아티스트', value: 'AI 아티스트'}
    ];

    //선택한 직무 그대로 담아서 페이지 넘어가게
    const onClickNaviHandler = () => {
        navigate("/jobposting", { state: { selectedJob: selectOption }, replace: true });
    };
    const DropdownChangehandler = (job) => {
        setSelectOption(job);
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
        <div className = 'smallpost_container'>
            <div className="smallpost_first">
                <div className="smallpost_left">
                    <div className="smallpost_title">
                        최신 채용공고
                    </div>
                </div>
                <div className="smallpost_right">
                    <div>
                        <Dropdown buttonText='직무'
                            dropdownContent={jobOptions}
                            selectedOne = {selectOption}
                            handleChange={DropdownChangehandler}
                            backcolor= 'c_gray'
                            backsize="s_small"
                            multiple = {false}
                            optionsize='o_semi'>
                        </Dropdown>
                    </div>
                    <div className="smallpost_nav" onClick={onClickNaviHandler}>
                        더보기
                        <span style={{alignItems:'center'}}><MdArrowForwardIos/></span>
                    </div>
                </div>
            </div>
            <div className="smallpost_second">
                {Array.isArray(postingList) && postingList.map((p) =>(
                <div key={p.idx} className="smallpost_box">
                    <div className="smallist_left">
                        <div className="small_logo">
                            <img src={p.recru_logo} alt=""/>
                        </div>
                        <div className="small_jd" onClick={() => window.open(p.recru_url, '_blank')}>
                            <div className="small_title">{p.recru_title}</div>
                            <span className="small_company">{p.recru_company}</span>
                        </div>
                    </div>
                    <div className="smallist_right">
                        <div className='smallist_button'>
                            {p.recru_closed_date ? (
                            <button className='button no'>
                            공고마감</button>):(<button className='button url' onClick={() => window.open(p.recru_url, '_blank')}>
                            지원하기</button>
                        )}
                        </div>
                    </div>
                </div>
            ))}
            </div>
        </div>
    )
}

export default SmallPosting;