import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './EduBanner.css';

function EduBanner(){
    const renderIndicator = (clickHandler, isSelected, index) => {
        return (
            <span
                className={isSelected ? "indicator selected" : "indicator"}
                onClick={clickHandler}
                onKeyDown={clickHandler}
                role="button"
                key={index}
            />
        );
    };

    return(
        <>
         <Carousel className='carousel'
            infiniteLoop 
            useKeyboardArrows 
            autoPlay 
            showThumbs={false} 
            interval={8000} 
            showArrows={false} 
            renderIndicator={renderIndicator}>

            <div className='edubanner_container'>
                광고판1
            </div>
            <div className='edubanner_container'>
                광고판2
            </div>
            <div className='edubanner_container'>
                광고판3
            </div>
         </Carousel>
         <div className='edubanner_second'>
            <div className='edubanner_second_left'>
                <div className='edubanner_second_box'>
                    광고1
                </div>
            </div>
            <div className='edubanner_second_right'>
                <div className='edubanner_second_box'>
                    광고2
                </div>
            </div>
         </div>
       </>
    )
};
export default EduBanner;

