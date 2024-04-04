import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { callMainJobListAPI, callMainJobListAPI2 } from "../../api/MainAPICall";
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';
import zoomPlugin from 'chartjs-plugin-zoom';
import './RecruitGraph.css';
import Dropdown from "../../component/common/Dropdown"
// import { isHtmlElement } from "react-router-dom/dist/dom";

function RecruitGraph() {
    ChartJS.register(zoomPlugin);
    const dispatch = useDispatch();
    const postingByCrawlingdate = useSelector((state) => state.mainReducer);

    const [selectOption, setSelectOption] = useState('누적 그래프'); // 드롭다운 상태
    const [selectedItems, setSelectedItems] = useState([]); //아이템선택

    const handleDropdownChange = (chart) => {
      setSelectOption(chart);
    };

    const handleSelect = (value) => {
      if (selectedItems.find(item => item.title === value)) {
        // 선택된 직무 제거
        setSelectedItems(selectedItems.filter(item => item.title !== value));
      } else {
        // 선택되지 않은 직무 추가
        const itemToAdd = jobTitle.find(item => item.title === value);
        if (itemToAdd) {
          setSelectedItems([...selectedItems, itemToAdd]);
        }      
      }
    };
    


    const chartOptions = [
      {label: '누적 그래프', value: '누적 그래프'},
      {label: '증감 그래프', value: '증감 그래프'}
      ];
      // 직무명 순서대로 배열 정의
      const jobTitle = [
        { title: '머신러닝/딥러닝 엔지니어', color: '#E69F00', short:'MLE' },
        { title: '머신러닝/딥러닝 리서처', color: '#56B4E9' , short:'MLR' },
        { title: '데이터 사이언티스트', color: '#009E73' , short:'DS' },
        { title: '데이터 엔지니어', color: '#d5cb3b' , short:'DE' },
        { title: 'AI 서비스 개발자', color: '#0072B2' , short:'AI DEV' },
        { title: 'AI 서비스 기획자', color: '#D55E00' , short:'AI PLAN' },
        { title: 'AI 아티스트', color: '#CC79A7' , short:'AI ART' }
      ];

    useEffect(() => {
      setSelectedItems(jobTitle); //초기에는 다 넣기기
      if (selectOption === '누적 그래프') {
          dispatch(callMainJobListAPI({}));
      } else if (selectOption === '증감 그래프') {
          dispatch(callMainJobListAPI2({}));
      }
    }, [dispatch, selectOption]);


    
    const chartData = {
      labels: postingByCrawlingdate.map(p => {
        const parts = p.week.split('-');
        return `${parts[1]}/${parts[2]}`;
      }),
      datasets: jobTitle.filter(job => selectedItems.some(selected => selected.title === job.title)).map((job) => {
        return {
          label: job.title,
          data: postingByCrawlingdate.map(p => p.recruitCounts[job.title] || 0),
          backgroundColor: job.color,
          borderColor: job.color,
          borderWidth: 3,
          tension: 0.5,
          pointRadius: 0,
        };
      }),
    };

    
    const options = {
        plugins: {
            legend: {
                display: false,
                position: 'right',
                labels: {
                    boxWidth: 20,
                    boxHight: 5,
                    padding: 10
                  }
              },
            tooltip:{
              enabled: true,
              mode: 'index',
              intersect: false,
              backgroundColor: "white", 
              titleColor: "#212529", 
              bodyColor: "#212529", 
              padding: 15, 
              borderColor: "#80868d", 
              borderWidth: "1", 
              xAlign: "right" 
              }
          },
        interaction: {
          mode: 'index',
          intersect: false,
        },
        scales: {
            x: {
                grid: {
                  display: true,
                  drawBorder: false,
                  drawOnChartArea: false,
                  color: '#adb5bd'
                },
                border: {
                  display: true,
                },
                ticks: {
                  autoSkip: true,
                  maxTicksLimit: 10
                }
            },
            y: {
                beginAtZero: true,
                border: {
                  display: false,
                },
                grid: {
                  color: '#adb5bd80'
                }
              },
        },
        responsive: true,
        maintainAspectRatio: false
    };

    const options_media = {
      plugins: {
          legend: {
              display: false,
              position: 'right',
              labels: {
                  boxWidth: 20,
                  boxHight: 5,
                  padding: 10
                }
            },
          tooltip:{
            enabled: true,
            mode: 'point',
            intersect: false,
            backgroundColor: "white", 
            titleColor: "#212529", 
            bodyColor: "#212529", 
            padding: 7, 
            borderColor: "#80868d", 
            borderWidth: "1", 
            xAlign: "right" 
            }
        },
      interaction: {
        mode: 'index',
        intersect: false,
      },
      scales: {
          x: {
              grid: {
                display: true,
                drawBorder: false,
                drawOnChartArea: false,
                color: '#adb5bd'
              },
              border: {
                display: true,
              },
              ticks: {
                autoSkip: true,
                maxTicksLimit: 5
              }
          },
          y: {
              beginAtZero: true,
              border: {
                display: false,
              },
              grid: {
                color: '#adb5bd70'
              }
            },
      },
      responsive: true,
      maintainAspectRatio: false
  };

    return(
      <div className="graph_container">
        <div className="graph_box">
          <div className="graph_upside">
              <div className="graph_line"></div>
              <div className="graph_dropdown">
                <Dropdown buttonText='그래프'
                  dropdownContent={chartOptions}
                  selectedOne = {selectOption}
                  handleChange={handleDropdownChange}
                  backcolor='c_gray'
                  backsize="s_semi"
                  multiple = {false}
                  optionsize='o_semi'>
                </Dropdown>
              </div>
          </div>
          <div className="graph_downside">
            <div className="graph_title">
                <div className='contents'>
                  <span>AI채용공고 현황</span>
                  <span className="small">(단위:개수)</span>
                </div>
            </div>
            
            <div className="graph">
                <Line data={chartData} options={options} className="chart-canvas"/>
            </div>
            {/* 미디어 쿼리 */}
            <div className="graph_media">
                <Line data={chartData} options={options_media} className="chart-canvas"/>
            </div>

            <div className="graph_legend">
              <div className="box">
                {jobTitle.map((job) => (
                  <div className='container' 
                    key={job.title}
                    onClick={() => handleSelect(job.title)}>
                    <div className="left" style={{backgroundColor: selectedItems.some(selected => selected.title === job.title) ? job.color:'#80868d'}}></div>
                    <div className="right" style={{color: selectedItems.some(selected => selected.title === job.title) ? '':'#80868d'}}>
                      {job.title}
                    </div>

                    {/* 미디어쿼리 */}
                    <div className="right_media" style={{color: selectedItems.some(selected => selected.title === job.title) ? '':'#80868d'}}>
                      {job.short}
                    </div>

                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}

export default RecruitGraph;