import React, { useState, useEffect } from 'react';
import './Analyze.css';


function Analyze() {
    const messages = [
        "이번주 신규 공고 개수는 23개입니다.",
        "지난주 방문자 수는 10,235명입니다.",
        "Hot 직무: 머신러닝/딥러닝 엔지니어",
        "Down 직무: 데이터사이언티스트"
    ];
    
    const [currentIndex, setCurrentIndex] = useState(0);
    useEffect(() => {
        const randomIndex = Math.floor(Math.random() * messages.length);
        setCurrentIndex(randomIndex);
    }, []);


    return (
    <>
        <div className='analyze_container'>
            <div className='analyze_contents'>
                <div className='contents_box'>
                    <div className='first_layer'>
                        <img></img>
                    </div>
                    <div className='second_layer'>
                        <span>TOTAL REVENUE</span>
                        <span className='plus'>+15%</span>
                    </div>
                    <div className='third_layer'>
                        43,871
                    </div>
                    <div className='last_layer'>
                        402 Orders
                    </div>
                </div>
            </div>
            <div className='analyze_contents'>
                <div className='contents_box'>
                    <div className='first_layer'>
                        <img></img>
                    </div>
                    <div className='second_layer'>
                        <span>Down JD</span>
                        <span className='minus'>-15%</span>
                    </div>
                    <div className='third_layer'>
                        32
                    </div>
                    <div className='last_layer'>
                        Datas cientist
                    </div>
                </div>
            </div>
            <div className='analyze_contents'>
                <div className='contents_box'>
                    <div className='first_layer'>
                        <img></img>
                    </div>
                    <div className='second_layer'>
                        <span>TOTAL REVENUE</span>
                        <span className='plus'>+15%</span>
                    </div>
                    <div className='third_layer'>
                        43,871
                    </div>
                    <div className='last_layer'>
                        402 Orders
                    </div>
                </div>
            </div>
            <div className='analyze_contents'>
                <div className='contents_box'>
                    <div className='first_layer'>
                        <img></img>
                    </div>
                    <div className='second_layer'>
                        <span>TOTAL REVENUE</span>
                        <span className='plus'>+15%</span>
                    </div>
                    <div className='third_layer'>
                        43,871
                    </div>
                    <div className='last_layer'>
                        402 Orders
                    </div>
                </div>
            </div>
        </div>

        <div className='analyze_small'>
            {messages[currentIndex]}
        </div>
    </>
    )
}

export default Analyze;