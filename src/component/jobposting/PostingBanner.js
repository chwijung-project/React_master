import React, {useEffect, useState} from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './PostingBanner.css';

function PostingBanner(){
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
         <Carousel 
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
         </>
    );
};
export default PostingBanner;