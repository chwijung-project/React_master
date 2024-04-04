import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { callSmallPostListAPI } from "../../api/MainAPICall";
import './SmallPosting.css';
import { 
    MdArrowForwardIos,
    MdCampaign,
    MdCircle
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
    
    //직무별 다른 색깔
    const jobStyles = {
    '머신러닝/딥러닝 엔지니어': { backgroundColor: '#f8ad9d40', color: '#e5383b' },
    '머신러닝/딥러닝 리서처': { backgroundColor: '#fae58840', color: '#ffc300' },
    '데이터 사이언티스트': { backgroundColor: '#b2f7ef40', color: '#72efdd' },
    '데이터 엔지니어': { backgroundColor: '#caf0f850', color: '#4361ee' },
    'AI 서비스 개발자': { backgroundColor: '#eae2b750', color: '#f77f00' },
    'AI 서비스 기획자': { backgroundColor: '#d8f3dc60', color: '#52b788' },
    'AI 아티스트': { backgroundColor: '#fff0f360', color: '#ff758f' },
    };

    const onClickNaviHandler = () => {
        navigate("/jobposting", { replace: true });
    };

    const DropdownChangehandler = (job) => {
        setSelectOption(job);
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
        <div className = 'smallpost_container'>
            <div className="smallpost_top">
                <div className="smallpost_left">
                    <div className="smallpost_icon">
                        <MdCampaign />
                    </div>
                    <div className="smallpost_title">
                        최신 채용공고
                    </div>
                </div>
                <div className="smallpost_right">
                    <div className="smallpost_dropdown">
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
            <div className="smallpost_bottom">
                {Array.isArray(postingList) && postingList.map((p) => (<div key={p.idx} className="smallist_wraper">
                    <div className="smallist_left">
                        <div className="smallogo">
                            <img src="https://static.wanted.co.kr/images/wdes/0_5.be5f31e8.png" alt="" width={25} height={25}/>
                        </div>
                        <div className="smalltitle">
                            <div className="title">{p.recru_title}</div>
                            <span className="company">{p.recru_company}</span>
                            {/* <span className='jobstyle' style={{backgroundColor:jobStyles[p.recru_job].backgroundColor, color:jobStyles[p.recru_job].color}}>
                                <MdCircle size={6} color={jobStyles[p.recru_job].color}/>
                                <span className='jobname'>
                                    {p.recru_job}
                                </span>
                            </span> */}
                        </div>
                    </div>
                    <div className="smallist_right">
                        <div className='smallist_button'>
                            {p.recru_closed === 'false' ? (
                            <button className='button url' onClick={() => window.open(p.recru_url, '_blank')}>
                            지원하기</button>):(<button className='button no'>
                            공고마감</button>)}
                        </div>
                    </div>
                </div>
            ))}
            </div>
        </div>
    )
}

export default SmallPosting;