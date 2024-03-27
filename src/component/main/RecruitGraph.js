import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { callMainJobListAPI, callMainJobListAPI2 } from "../../api/MainAPICall";
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';
import zoomPlugin from 'chartjs-plugin-zoom';
import './RecruitGraph.css';

function RecruitGraph() {
    ChartJS.register(zoomPlugin);
    const dispatch = useDispatch();
    const postingByCrawlingdate = useSelector((state) => state.mainReducer);
    const [selectOption, setSelectOption] = useState('option1'); // 드롭다운 상태

    useEffect(() => {
      if (selectOption === 'option1') {
          dispatch(callMainJobListAPI({}));
      } else if (selectOption === 'option2') {
          dispatch(callMainJobListAPI2({}));
      }
    }, [dispatch, selectOption]);

    const handleDropdownChange = (e) => {
      setSelectOption(e.target.value);
    };
    
    const colors = [
        'gray', // AI 서비스 기획자
        'gray', // 데이터 사이언티스트
        'gray', // 머신러닝/딥러닝 엔지니어
        'gray', // 머신러닝/딥러닝 리서처
        'gray', // AI 서비스 개발자
        'gray', // 데이터 엔지니어
        'gray', // AI 아티스트
    ];

    const allKeys = new Set();
            postingByCrawlingdate.forEach(p => {
            Object.keys(p.recruitCounts).forEach(key => {
            allKeys.add(key);
        });
    });

    const chartData = {
        labels: postingByCrawlingdate.map(p => {
            const parts = p.week.split('-');
            return `${parts[1]}-${parts[2]}`;
        }),
        datasets: Array.from(allKeys).map((key, index) => {
          return {
            label: key,
            data: postingByCrawlingdate.map(p => p.recruitCounts[key] || 0),
            backgroundColor: colors[index % colors.length],
            borderColor: colors[index % colors.length],
            tension: 0.1,
          };
        }),
    };
    
    const options = {
        plugins: {
            zoom: {
                zoom: {
                  wheel: {
                    enabled: true,
                    speed: 0.1
                  },
                  mode: 'xy'
                },
                pan: {
                  enabled: true,
                  mode: 'xy'
                },
                limits: {
                  x: {min: 'original', max: 'original'},
                  y: {min: 'original', max: 'original'}
                }
              },
            legend: {
                labels: {
                    boxWidth: 15,
                }
            }
        },
        scales: {
            x: {
                grid: {
                    display: false
                }
            },
            y: {
                beginAtZero: true
            }
        },
        responsive: true,
        maintainAspectRatio: false
    };

    return(
      <>
        <div className="graphcontainer">
          <div className="graph-upside">
              <h1 className="text">AI 직무 현황</h1>
              <div className="spacer"></div>
              <select onChange={handleDropdownChange} value={selectOption} className="dropdown">
                  <option value="option1">누적</option>
                  <option value="option2">임시</option>
              </select>
          </div>
          <div className="graph">
              <Line data={chartData} options={options} className="chart-canvas"/>
          </div>
        </div>
        <div class="bottom-line"></div>
      </>
    );
}

export default RecruitGraph;