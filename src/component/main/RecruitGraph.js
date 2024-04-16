import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { callMainJobListAPI, callMainJobListAPI2 } from "../../api/MainAPICall";
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';
import zoomPlugin from 'chartjs-plugin-zoom';
import './RecruitGraph.css';
import Dropdown from "../../component/common/Dropdown"
import { GoQuestion, GoX } from "react-icons/go";
// import { isHtmlElement } from "react-router-dom/dist/dom";

function RecruitGraph() {
    ChartJS.register(zoomPlugin);
    const dispatch = useDispatch();
    const postingByCrawlingdate = useSelector((state) => state.mainReducer);

    const [selectOption, setSelectOption] = useState('일별 그래프'); // 드롭다운 옵션 선택
    const [selectedItems, setSelectedItems] = useState([]); //그래프 직무 선택
    const [showPopup, setShowPopup] = useState(false); //그래프 안내문

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

    const togglePopup = () => {
      setShowPopup(!showPopup);
  };
    
    const chartOptions = [
      {label: '일별 그래프', value: '일별 그래프'},
      {label: '증감 그래프', value: '증감 그래프'}
      ];

    // 직무명 순서대로 배열 정의
    const jobTitle = [
      { title: '머신러닝/딥러닝 엔지니어', color: '#E69F00', short:'MLE' },
      { title: '머신러닝/딥러닝 리서처', color: '#56B4E9' , short:'MLR' },
      { title: '데이터 사이언티스트', color: '#009E73' , short:'DS' },
      { title: '데이터 엔지니어', color: '#d5cb3b' , short:'DE' },
      { title: 'AI 서비스 개발자', color: '#0072B2' , short:'AI DEV' },
      { title: 'AI 서비스 기획자', color: '#D55E00' , short:'AI PM' },
      { title: 'AI 아티스트', color: '#CC79A7' , short:'AI ART' }
    ];

    useEffect(() => {
      setSelectedItems(jobTitle); //초기에는 다 넣기기
      if (selectOption === '일별 그래프') {
          dispatch(callMainJobListAPI({}));
      } 
      // else if (selectOption === '증감 그래프') {
      //     dispatch(callMainJobListAPI2({}));
      // }
    }, [dispatch, selectOption]);

    //데이터 날짜, 직무별로 groupby
    const transformedData = postingByCrawlingdate.reduce((acc, { recru_situ_crawling_date, job_name, recru_situ_open_count }) => {
      let group = acc.find(g => g.week === recru_situ_crawling_date);
      if (!group) {
        group = { week: recru_situ_crawling_date, recruitCounts: {} };
        acc.push(group);
      }
      group.recruitCounts[job_name] = (group.recruitCounts[job_name] || 0) + recru_situ_open_count;
    
      return acc;
    }, []);

    const chartData = {
      labels: transformedData.map(p => {
        const parts = p.week.split('-');
        return `${parts[1]}/${parts[2]}`;
      }),
      datasets: jobTitle.filter(job => selectedItems.some(selected => selected.title === job.title)).map((job) => {
        return {
          label: job.title,
          data: transformedData.map(p => p.recruitCounts[job.title] || 0),
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
              xAlign: "right",
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
                },
                ticks: {
                  autoSkip: true,
                  maxTicksLimit: 5
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
            padding: 5, 
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
                font:{
                  size:9
                },
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
              },
              ticks: {
                font:{
                  size:9
                },
                autoSkip: true,
                maxTicksLimit: 5
              }
            },
      },
      responsive: true,
      maintainAspectRatio: false
  };

    return(
      <div className="recruitgraph_container">
        <div className="recruitgraph_wrapper">
          <div className="recruitgraph_first">
              <div style={{display:'flex', alignItems:'center',gap:'3px'}}>직무별 AI채용공고 현황
                <div style={{ marginTop: '3.15px' }} onClick={togglePopup}>
                  <GoQuestion />
                </div>
                {showPopup &&
                  <div className="popup_overlay">
                      <div className="popup_content">
                        <div className="popup_first">
                          <span>직무별 AI 채용공고 현황</span>
                          <span onClick={togglePopup}><GoX size={18}/></span>
                        </div>
                        <div className="popup_second">
                          <div>
                          · 원천 데이터: AI와 관련된 검색어로 수집한 채용공고
                          </div>
                          <div>
                          · 가공: 다양한 직무명을 가진 원천 데이터를 챗GPT로 재분류
                          </div>
                          <div>
                          · 결과: 직무별로 수집 당일 채용중인 공고 현황 제공
                          </div>
                        </div>
                      </div>
                  </div>
                }
              </div>
              <div>
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

          <div className="recruitgraph_second">
            <div className="recruitgraph_graph">
                <Line data={chartData} options={options} className="chart-canvas"/>
            </div>
            {/* media_graph */}
            <div className="recruitgraph_graph_media">
                <Line data={chartData} options={options_media} className="chart-canvas"/>
            </div>
            {/* media_end */}

            <div className="recruitgraph_legend">
              <div className="recruitgraph_legend_contents">
                {jobTitle.map((job) => (
                  <div className='recruitgraph_legend_box' 
                    key={job.title}
                    onClick={() => handleSelect(job.title)}>
                    <div className="recruitgraph_legend_left" style={{backgroundColor: selectedItems.some(selected => selected.title === job.title) ? job.color:'#adb5bd'}}>
                    </div>
                    <div className="recruitgraph_legend_right" style={{color: selectedItems.some(selected => selected.title === job.title) ? '':'#adb5bd'}}>
                      {job.title}
                    </div>

                    {/* media_legend */}
                    <div className="recruitgraph_legend_right_media" style={{color: selectedItems.some(selected => selected.title === job.title) ? '':'#adb5bd'}}>
                      {job.short}
                    </div>
                    {/* media_end */}

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