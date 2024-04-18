// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useSelector, useDispatch } from 'react-redux';
// import { callSmallPostListAPI } from "../../api/MainAPICall";
// import MLE from '../../image/openchat/MLE.png'
// import MLR from '../../image/openchat/MLR.png'
// import DS from '../../image/openchat/DS.png'
// import DE from '../../image/openchat/DE.png'
// import AI_DEV from '../../image/openchat/AI_DEV.png'
// import AI_PM from '../../image/openchat/AI_PM.png'
// import AI_ART from '../../image/openchat/AI_ART.png'
import './SmallCommunity.css';
import kakao from '../../image/kakao.png'

function SmallCommunity() {

    return (
        <div className = 'smallpost_container'>
        <div className="smallpost_first">
            <div className="smallpost_left">
                <div className="smallpost_title">
                    직무 오픈채팅
                </div>
            </div>
        </div>
        <div className="smallpost_second">
            <div className="smallpost_box">
                <div className="smallcommu_contents">
                    <div>
                        <span className='smallcommu_contents_logo mle'>
                            <span className="smallcommu_contents_logo_text">chat</span>
                        </span>
                        머신러닝/딥러닝 엔지니어
                        <span className="smallcommu_openchat ">
                            <button className="mle">오픈채팅</button>
                        </span>
                    </div>
                    <div>
                    <span className='smallcommu_contents_logo mls'>
                    <span className="smallcommu_contents_logo_text">chat</span>
                    </span>
                        머신러닝/딥러닝 리서처
                        <span className="smallcommu_openchat">
                            <button>오픈채팅</button>
                        </span>
                    </div>
                    <div>
                    <span className='smallcommu_contents_logo ds'>
                    <span className="smallcommu_contents_logo_text">chat</span>
                    </span>
                        데이터 사이언티스트
                        <span className="smallcommu_openchat">
                            <button>오픈채팅</button>
                        </span>
                    </div>
                    <div>
                    <span className='smallcommu_contents_logo de'>
                    <span className="smallcommu_contents_logo_text">chat</span>
                    </span>
                        데이터 엔지니어
                        <span className="smallcommu_openchat">
                            <button>오픈채팅</button>
                        </span>
                    </div>
                    <div>
                    <span className='smallcommu_contents_logo ai_dev'>
                    <span className="smallcommu_contents_logo_text">chat</span>
                    </span>
                        AI 서비스 개발자
                        <span className="smallcommu_openchat">
                            <button>오픈채팅</button>
                        </span>
                    </div>
                    <div>
                    <span className='smallcommu_contents_logo ai_pm'>
                    <span className="smallcommu_contents_logo_text">chat</span>
                    </span>
                        AI 서비스 기획자
                        <span className="smallcommu_openchat">
                            <button>오픈채팅</button>
                        </span>
                    </div>
                    <div>
                    <span className='smallcommu_contents_logo ai_art'>
                    <span className="smallcommu_contents_logo_text">chat</span>
                    </span>
                        AI 아티스트
                        <span className="smallcommu_openchat">
                            <button>오픈채팅</button>
                        </span>
                    </div>
                    <div>
                        
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default SmallCommunity;