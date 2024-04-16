import React from 'react';
import './Analyze.css';
import up from '../../image/up.png'
import down from '../../image/down.png'
import n from '../../image/n.png'
import v from '../../image/v.png'

function Analyze() {

    return (
    <div className='analyze_container'>
            <div className='analyze_wrapper'>
                <div className='analyze_contents'>
                    <div className='analyze_first'>
                        <img src={up}></img>
                    </div>
                    <div className='analyze_second'>
                        <span>증가 공고</span>
                        <span className='plus'>+10%</span>
                    </div>
                    <div className='analyze_third'>
                        ML engineer
                    </div>
                    <div className='analyze_last'>
                        10% 증가
                    </div>
                </div>
            </div>
            <div className='analyze_wrapper'>
                <div className='analyze_contents'>
                    <div className='analyze_first'>
                        <img src={down}></img>
                    </div>
                    <div className='analyze_second'>
                        <span>감소 공고</span>
                        <span className='minus'>-15%</span>
                    </div>
                    <div className='analyze_third'>
                        Data scientist
                    </div>
                    <div className='analyze_last'>
                        15% 감소
                    </div>
                </div>
            </div>
            <div className='analyze_wrapper'>
                <div className='analyze_contents'>
                    <div className='analyze_first'>
                        <img src={n}></img>
                    </div>
                    <div className='analyze_second'>
                        <span>신규 공고</span>
                        <span className='plus'>+5%</span>
                    </div>
                    <div className='analyze_third'>
                        56
                    </div>
                    <div className='analyze_last'>
                        56개 수집
                    </div>
                </div>
            </div>
            <div className='analyze_wrapper'>
                <div className='analyze_contents'>
                    <div className='analyze_first'>
                        <img src={v}></img>
                    </div>
                    <div className='analyze_second'>
                        <span>방문자 수</span>
                        <span className='plus'>+30%</span>
                    </div>
                    <div className='analyze_third'>
                        43,871
                    </div>
                    <div className='analyze_last'>
                        1,502명 증가
                    </div>
                </div>
            </div>
    </div>
    )
}

export default Analyze;