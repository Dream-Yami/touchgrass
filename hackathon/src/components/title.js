// src/App.js
import React from 'react';
import "./title.css"
import MapComponent from './Map';
import TakePictureButton from './TakePictureButton';

function title() {
  return (
    <div className="app-container">
        <div className='Title-container'>
            <p>test</p>
        </div>
        <div className='map-container'>
            <MapComponent />
            <TakePictureButton />
        </div>
    </div>
  );
}

export default title;
