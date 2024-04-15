import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
// import { callSmallPostListAPI } from "../../api/MainAPICall";
import './SmallCommunity.css';
import { 
    MdArrowForwardIos
 } from "react-icons/md";
import { IoMdChatboxes } from "react-icons/io";
import kakao from '../../image/kakao.png'

function SmallCommunity() {

    const navigate = useNavigate();
    const dispatch = useDispatch();


    const onClickRecruUrl = (url) => {
        window.open(url, '_blank');
    };

    const onClickNaviHandler = () => {
        navigate("/community", { replace: true });
    };

    return (
        <div className = 'smallpost_container'>
            <div className="smallpost_top">
                <div className="smallpost_left">
                    {/* <div className="smallpost_icon">
                        <IoMdChatboxes />
                    </div> */}
                    <div className="smallpost_title" style={{margin:'6px 0'}}>
                        직무 오픈채팅
                    </div>
                </div>
                {/* <div className="smallpost_right">
                    <div className="smallpost_nav" onClick={onClickNaviHandler}>
                        더보기
                        <span style={{alignItems:'center'}}><MdArrowForwardIos/></span>
                    </div>
                </div> */}
            </div>

            <div className="smallpost_bottom">
                <div className="smallist_wraper">
                    <div className="small_commu">
                        <div className="commu_banner mle">머신러닝/딥러닝 엔지니어
                        <img src={kakao} width={20} height={20}/>
                        </div>
                        <div className="commu_banner mls">머신러닝/딥러닝 리서처<img src={kakao} width={20} height={20}/></div>
                        <div className="commu_banner ds">데이터 사이언티스트<img src={kakao} width={20} height={20}/></div>
                        <div className="commu_banner de">데이터 엔지니어<img src={kakao} width={20} height={20}/></div>
                        <div className="commu_banner ai_dev">AI 서비스 개발자<img src={kakao} width={20} height={20}/></div>
                        <div className="commu_banner ai_plan">AI 서비스 기획자<img src={kakao} width={20} height={20}/></div>
                        <div className="commu_banner ai_art">AI 아티스트<img src={kakao} width={20} height={20}/></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SmallCommunity;