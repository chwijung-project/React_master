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
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
        'rgba(22, 241, 77, 1)'
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
                    boxWidth: 20,
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
        <div className="graph-container">
            <div className="graph-box">
              <div className="graph-upside">
                  <h1 className="recrutext">AI 직무 현황</h1>
                  <select onChange={handleDropdownChange} value={selectOption} className="dropdown">
                      <option value="option1">누적</option>
                      <option value="option2">임시</option>
                  </select>
              </div>
              <div className="graph">
                  <Line data={chartData} options={options} className="chart-canvas"/>
              </div>
            </div>
        </div>
      </>
    );
}

export default RecruitGraph;