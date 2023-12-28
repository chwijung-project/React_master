import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import ad1 from '../../image/ad1.png';
import BannerCss from './BannerSlider.css'

const BannerSlider = () => {
  return (
    <>
      <Carousel className={BannerCss.carousel} infiniteLoop useKeyboardArrows autoPlay showThumbs={false} interval={3000}>
          <div><img src={ad1} alt= "-" style={{ width: '1200px', height: '350px' }}/></div>
          <div><img src={ad1} alt= "-" style={{ width: '1200px', height: '350px' }}/></div>
          <div><img src={ad1} alt= "-" style={{ width: '1200px', height: '350px' }}/></div>
      </Carousel>
    </>
  );
};

export default BannerSlider;
