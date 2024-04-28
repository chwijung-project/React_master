import React, {useEffect, useState} from 'react';
import './EduBanner.css';
import sample from '../../image/sample_banner.png'

function EduBanner(){
    return(
        <div className='edubanner_container'>
            <img src={sample}></img>
        </div>
    )
};
export default EduBanner;