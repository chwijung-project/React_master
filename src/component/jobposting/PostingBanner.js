import React, {useEffect, useState} from 'react';
import './PostingBanner.css';
import sample from '../../image/sample_banner.png'

function PostingBanner(){
    return(
        <div className='edubanner_container'>
            <img src={sample}></img>
        </div>
    )
};
export default PostingBanner;