import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { callPostListAPI } from "../../api/PostingAPICall";
import { Region } from "../../component/common/Region";
import "./PostingFilter.css"


function PostingFilter(){
    const dispatch = useDispatch();
    const [selectedJob, setSelectedJob] = useState('머신러닝/딥러닝 엔지니어');
    const [selectedRegion, setSelectedRegion] = useState('서울 강남구');
    const [selectedOrder, setSelectedOrder] = useState('');

    const Jobnames = [
        {label: '머신러닝/딥러닝 엔지니어', value: '머신러닝/딥러닝 엔지니어', short:'MLE'},
        {label: '머신러닝/딥러닝 리서처', value: '머신러닝/딥러닝 리서처', short:'MLR'},
        {label: '데이터 사이언티스트', value: '데이터 사이언티스트', short:'DS'},
        {label: '데이터 엔지니어', value: '데이터 엔지니어', short:'DE'},
        {label: 'AI 서비스 개발자', value: 'AI 서비스 개발자', short:'AI DEV'},
        {label: 'AI 서비스 기획자', value: 'AI 서비스 기획자', short:'AI PM'},
        {label: 'AI 아티스트', value: 'AI 아티스트', short:'AI ART'}
      ];
    
      const Regions = [
          {label: '서울', value: '서울 강남구'},
          {label: '경기', value: '경기 성남시'},
          {label: '인천', value: '인천 계양구'},
          {label: '대전', value: '대전 대덕구'},
          {label: '울산', value: '울산 남구'},
          {label: '부산', value: '부산 강서구'},
          {label: '광주', value: '광주 광산구'},
          {label: '대구', value: '대구 남구'}
      ];
    
      const Orders = [
          {label: '최신순', value: 'latest_order'},
          {label: '마감순', value: 'deadline_order'}
      ];

    
      const handleFilterChange = () => {
        dispatch(callPostListAPI({
            selectedJob,
            selectedRegion,
            selectedOrder,
            currentPage: 1,
            showOpenJobs: true
        }));
    };
    
    return (
        <div>
            <select value={selectedJob} onChange={e => { setSelectedJob(e.target.value); handleFilterChange(); }}>
                <option value="">직무 선택</option>
                {Jobnames.map(job => <option key={job.value} value={job.value}>{job.label}</option>)}
            </select>
            <select value={selectedRegion} onChange={e => { setSelectedRegion(e.target.value); handleFilterChange(); }}>
                <option value="">지역 선택</option>
                {Regions.map(region => <option key={region.value} value={region.value}>{region.label}</option>)}
            </select>
            <select value={selectedOrder} onChange={e => { setSelectedOrder(e.target.value); handleFilterChange(); }}>
                <option value="">정렬 순서</option>
                {Orders.map(order => <option key={order.value} value={order.value}>{order.label}</option>)}
            </select>
        </div>
    );
}; 
export default PostingFilter;



