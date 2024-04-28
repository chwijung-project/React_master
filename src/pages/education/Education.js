import React, {useEffect, useState} from 'react';
import './Education.css';
import Dropdown from "../../component/common/Dropdown"
import Clickbutton from "../../component/common/Clickbutton"
import {
  MdArrowBackIos,
  MdArrowForwardIos,
  MdCircle,
} from "react-icons/md";
// npm i react-icons@4.11.0

function Education() {
  return(
    <div className='total'>
      <div className='box'>
          <a href="/oauth2/authorization/google" class="button_login" role="button">Google Login</a>
      </div>
    </div>
    
  )


};
export default Education;