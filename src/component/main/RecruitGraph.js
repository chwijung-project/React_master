import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { callMainJobListAPI, callMainJobListAPI2 } from "../../api/MainAPICall";
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';
import zoomPlugin from 'chartjs-plugin-zoom';
import DropdownSingle from "../common/DropdownSingle"
import { GoQuestion, GoX } from "react-icons/go";
import { Jobnames,chartOptions } from "../common/Information";
import './RecruitGraph.css';

function RecruitGraph() {
    ChartJS.register(zoomPlugin);
    const dispatch = useDispatch();
    const postingByCrawlingdate = useSelector((state) => state.mainReducer);
    const NewJobnames = Jobnames.slice(1);
    const [selectOption, setSelectOption] = useState('일별 그래프'); 
    const [selectedItems, setSelectedItems] = useState([]); 
    //그래프 안내문
    const [showPopup, setShowPopup] = useState(false); 

    const handleDropdownChange = (chart) => {
      setSelectOption(chart);
    };
    const handleSelect = (value) => {
      if (selectedItems.find(item => item.label === value)) {
        // 선택된 직무 제거
        setSelectedItems(selectedItems.filter(item => item.label !== value));
      } else {
        // 선택되지 않은 직무 추가
        const itemToAdd = NewJobnames.find(item => item.label === value);
        if (itemToAdd) {
          setSelectedItems([...selectedItems, itemToAdd]);
        }      
      }
    };
    const togglePopup = () => {
      setShowPopup(!showPopup);
  };

    useEffect(() => {
      setSelectedItems(NewJobnames); //초기에는 다 넣기기
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
      datasets: NewJobnames.filter(job => selectedItems.some(selected => selected.label === job.label)).map((job) => {
        return {
          label: job.label,
          data: transformedData.map(p => p.recruitCounts[job.label] || 0),
          backgroundColor: job.color,
          borderColor: job.color,
          borderWidth: 2.5,
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

              backgroundColor: "rgba(255, 255, 255, 0.9)", 
              borderColor: "#80868d", 
              borderWidth: "1", 
              padding: 20,
              bodySpacing: 10,
              titleColor: "#212529", 
              bodyColor: "#212529", 
              titleFont: { size: 13.5 },
              bodyFont: { size: 12 },
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
            padding: 10, 
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
                  size:8
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
                  size:8
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
                <div style={{ marginTop: '3.15px' , cursor:"pointer"}} onClick={togglePopup}>
                  <GoQuestion />
                </div>
                {showPopup &&
                  <div className="popup_container">
                      <div className="popup_wrapper">
                        <div className="popup_first">
                          <div className="popup_first_close" onClick={togglePopup}>
                            <GoX/>
                          </div>
                        </div>
                        <div className="popup_second">
                          직무별 AI 채용공고 현황
                        </div>
                        <div className="popup_third">
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
                <DropdownSingle buttonText='그래프'
                  dropdownContent={chartOptions}
                  selectedOne = {selectOption}
                  handleChange={handleDropdownChange}
                  backcolor = 'c_gray'>
                </DropdownSingle>
              </div>
          </div>

          <div className="recruitgraph_second">
            <div className="recruitgraph_graph">
                <Line data={chartData} options={options} className="chart-canvas"/>
            </div>
            <div className="recruitgraph_legend">
              <div className="recruitgraph_legend_contents">
              {NewJobnames.map((job) => (
                <div className='recruitgraph_legend_box' 
                  key={job.label}
                  onClick={() => handleSelect(job.label)}>
                  <div className="recruitgraph_legend_left" style={{backgroundColor: selectedItems.some(selected => selected.label === job.label) ? job.color : '#adb5bd'}}>
                  </div>
                  <div className="recruitgraph_legend_right" style={{color: selectedItems.some(selected => selected.label === job.label) ? "" : '#adb5bd'}}>
                    {job.label}
                  </div>

                  {/* media_legend */}
                  <div className="recruitgraph_legend_right_media" style={{color: selectedItems.some(selected => selected.label === job.label) ? "" : '#adb5bd'}}>
                    {job.short}
                  </div>
                  {/* media_end */}
                  

                </div>
              ))}
              </div>
            </div>
            {/* media_graph */}
            <div className="recruitgraph_graph_media">
                <Line data={chartData} options={options_media} className="chart-canvas"/>
            </div>
            {/* media_end */}
          </div>
        </div>
      </div>
    );
}

export default RecruitGraph;