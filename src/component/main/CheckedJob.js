// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { callMainJobListAPI } from "../../api/MainAPICall";
// import { Bar } from 'react-chartjs-2';
// import { Chart as ChartJS } from 'chart.js/auto'; // 활성화 되어있지 않더라도 삭제 시 그래프 렌더링X
// import './CheckedJob.css';

// function CheckedJob() {

//     const [selectedJob, setSelectedJob] = useState('');
//     const dispatch = useDispatch();

//     const postingByCrawlingdate = useSelector((state) => state.mainReducer);

//     const jobCategories = [
//         { label: '머신러닝 엔지니어', value: 'machinelearning' },
//         { label: '딥러닝 엔지니어', value: 'deeplearning_enginner' },  //
//         { label: '딥러닝 리서처', value: 'deeplearning researcher' },
//         { label: '데이터 사이언티스트', value: 'data_scientist' },
//         { label: '데이터 엔지니어', value: 'data_enginner' },   //
//         { label: 'AI 서비스 개발자', value: 'applied_ai_service_developer' }
//     ];

//     const handleRadioChange = (job) => {
//         setSelectedJob(job);
//     };

//     useEffect(() => {
//         dispatch(
//             callMainJobListAPI({
//                 selectedJob: selectedJob
//             })
//         );
//     }, [dispatch, selectedJob]);

//     const chartData = {
//         labels: Array.isArray(postingByCrawlingdate) ? postingByCrawlingdate.map(item => item.month) : [],
//         datasets: [
//             {
//             label: '공고 수(모집중)',
//             data: Array.isArray(postingByCrawlingdate) ? postingByCrawlingdate.map(item => item.recruit_count) : [],
//             backgroundColor: '#F6D641',
//             borderColor: 'rgba(54, 162, 235, 1)',
//             hoverBackgroundColor: '#FFC34E',
//             barPercentage: 0.25
//             }
//         ],
//     };

//     const options = {
//         maintainAspectRatio: false,
//         aspectRatio: 1,
//         scales: {
//             x: {
//                 grid: {
//                     display: false
//                 }
//             },
//             y: {
//                 ticks: {
//                   display: true,
//                   stepSize: 10
//                 }
//             }
//         }
//     };

//     return(
//       <>
//         <div className="chart-container">
//             <div className="chart">
//                 <h1 className="recotext">AI 직무 추천 현황</h1>
//                 <div className="category">
//                     {jobCategories.map(job => (
//                         <label key={job.label}>
//                             <input
//                                 type="radio"
//                                 name="jobCategory"
//                                 value={job.value}
//                                 checked={selectedJob === job.value}
//                                 onChange={() => handleRadioChange(job.value)}
//                             />
//                             <span>{job.label}</span>
//                         </label> 
//                     ))}
//                 </div>
//                 <div className="bar">
//                     <Bar data={chartData} options={options}/>                
//                 </div>
//             </div>
//         </div>
//       </>
//     );
// }

// export default CheckedJob;