import React, {useEffect, useState} from 'react';
import './EduFilter.css';
import Dropdown from '../common/Dropdown';
import Clickbutton from '../common/Clickbutton';

function EduFilter(){
    const Region = [
        {label: '서울', value: '서울 강남구'},
        {label: '경기', value: '경기 성남시'},
        {label: '인천', value: '인천 계양구'},
        {label: '대전', value: '대전 대덕구'},
        {label: '울산', value: '울산 남구'},
        {label: '부산', value: '부산 강서구'},
        {label: '광주', value: '광주 광산구'},
        {label: '대구', value: '대구 남구'}
    ];
  
    const Order = [
        {label: '최신순', value: 'latest_order'},
        {label: '마감순', value: 'deadline_order'}
    ];
  
    const [selectedRegion, setSelectedRegion] = useState(Region.map(region=>region.value));
    const [selectedOrder, setSelectedOrder] = useState('');
    const [showOpenJobs, setShowOpenJobs] = useState(false);
  
    const toggleOpenJobs = () => {setShowOpenJobs(!showOpenJobs)};
    const handleRegionChange = (region) => {
      setSelectedRegion(region);
    };
    const handleOrderChange = (order) => {
      setSelectedOrder(order);
    };


    return(
        <>
          <div className="edufilter_container">
            <div className='top' style={{fontSize:'12px'}}>
            <div className='space_left'>
                AI 부트캠프
            </div>
            <div className='space_right'>
                <Dropdown buttonText='지역'
                dropdownContent={Region}
                selectedOne = {selectedRegion}
                handleChange={handleRegionChange}
                backcolor= 'c_white'
                backsize= 's_default'
                optionsize='o_small'>
                </Dropdown>
                <Dropdown buttonText='정렬'
                dropdownContent={Order}
                selectedOne = {selectedOrder}
                handleChange={handleOrderChange}
                backcolor= 'c_white'
                backsize= 's_default'
                multiple = {false}
                optionsize='o_short'>
                </Dropdown>
                <Clickbutton buttonText={showOpenJobs ? '모집중 교육만' : '전체 교육'}
                toggleOpen = {toggleOpenJobs}
                showOpen = {showOpenJobs}
                size= 'medium'>
                </Clickbutton>
            </div>
            </div>
        </div>
        </>
    )
};
export default EduFilter;