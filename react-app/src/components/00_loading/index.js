import React from 'react';
import './loading.css';

function LoadingDiv() {
  return (
    <div id='loading-container'>
      <div className='isLoading'>
        <div className='toRotate'>
          <div className='load-circle-outer'></div>
          <div className='load-circle-inner'></div>
          <div className='load-circle-bar'></div>
        </div>
        <p>Uploading</p>
      </div>
    </div>
  );
}

export default LoadingDiv;