// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useSelector, useDispatch } from 'react-redux';
// import { callSmallPostListAPI } from "../../api/MainAPICall";
import './SmallCommunity.css';
import MLE from '../../image/openchat/MLE.png'
import MLR from '../../image/openchat/MLR.png'
import DS from '../../image/openchat/DS.png'
import DE from '../../image/openchat/DE.png'
import AI_DEV from '../../image/openchat/AI_DEV.png'
import AI_PM from '../../image/openchat/AI_PM.png'
import AI_ART from '../../image/openchat/AI_ART.png'

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
                    <img src={MLE} />
                    <img src={MLR} />
                    <img src={DS} />
                    <img src={DE} />
                    <img src={AI_DEV} />
                    <img src={AI_PM} />
                    <img src={AI_ART} />
                </div>
            </div>
        </div>
    </div>
    )
}

export default SmallCommunity;