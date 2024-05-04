import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { callSmallPostListAPI } from "../../api/MainAPICall";
import './SmallPosting.css';
import { MdArrowForwardIos} from "react-icons/md";
import DropdownSingle from "../../component/common/DropdownSingle"
import { Jobnames } from "../common/Information";

function SmallPosting() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const smallposting = useSelector(state => state.smallReducer);
    const postingList = smallposting.data;
    console.log("postingList",postingList)
    const [selectOption, setSelectOption] = useState('머신러닝/딥러닝 엔지니어');

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
        ,[dispatch, selectOption]
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
                        <DropdownSingle buttonText='직무'
                            dropdownContent={Jobnames.slice(1)}
                            selectedOne = {selectOption}
                            handleChange={DropdownChangehandler}
                            backcolor= 'c_gray'
                            backsize="s_small"
                            multiple = {false}
                            optionsize='o_short'>
                        </DropdownSingle>
                    </div>
                    <div className="smallpost_nav" onClick={onClickNaviHandler}>
                        더보기
                        <span className="smallpost_nav_icon">
                            <MdArrowForwardIos/>
                        </span>
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