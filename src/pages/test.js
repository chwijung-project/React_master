import './test.css';
import basic from '../image/basic.png';
import graph from '../image/free-icon-growth-graph-4052058.png';
import calendar from '../image/free-icon-calendar-2838779.png';
import view from '../image/free-icon-page-views-9038122.png';
import visitor from '../image/free-icon-unique-visitor-7162254.png';

function Test() {
    return (
        <>
            <div className="container">
                <div class="entry">
                    <div class="entry-icon">
                        <img src={graph}></img>
                    </div>
                    <div class="text-area">
                        <div class="title">TOTAL RECRUITMENT</div>
                        <div class="value">43,871</div>
                        <div class="description">402 Orders</div>
                    </div>
                </div>

                <div className="entry">
                    <div class="entry-icon">
                        <img src={calendar}></img>
                    </div>
                    <div class="text-area">
                        <div class="title">TODAY RECRUITMENT</div>
                        <div class="value">43</div>
                        <div class="description">402 Orders</div>
                    </div>
                </div>
                    
                <div className="entry">
                    <div class="entry-icon">
                        <img src={view}></img>
                    </div>
                    <div class="text-area">
                        <div class="title">TOTAL VIEW</div>
                        <div class="value">43,871,566</div>
                        <div class="description">402 Orders</div>
                    </div>
                </div>

                <div className="entry">
                    <div class="entry-icon">
                        <img src={visitor}></img>
                    </div>
                    <div class="text-area">
                        <div class="title">HOMEPAGE VISITORS</div>
                        <div class="value">4,023</div>
                        <div class="description">402 Orders</div>
                    </div>
                </div>
            </div>
            <div class="bottom-line"></div>
        </>
    )
}

export default Test;