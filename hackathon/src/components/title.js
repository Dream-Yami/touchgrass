// src/App.js
import React from 'react';
import "./title.css"
import MapComponent from './Map';
import TakePictureButton from './TakePictureButton';

function Title() {
  return (
    <div className="app-container">
        <div className='Title-container'>
            <img src='./assets/Photograss_Logo.png' alt="logo"/>
            <img src='./assets/Photograss_title.png' alt="title"/>

        </div>
        <div className='map-container'>
            <MapComponent />
            <TakePictureButton />
        </div>
    </div>
  );
}

export default Title;
