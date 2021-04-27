// creating video constraints

import React, { useCallback,useRef } from 'react'
import Webcam from 'react-webcam'
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import { useDispatch } from 'react-redux';
import { setCameraImage } from './features/cameraSlice';
import { useHistory } from 'react-router-dom';
import './WebcamCapture.css';

const videoConstraints = {
    width: 250,
    height : 400,
    facingMode: "user", //front facing camera
}

function WebcamCapture() {
    
    const webcamRef = useRef(null) //importing this from react
    const dispatch = useDispatch();
    const history = useHistory();
  
    const capture = useCallback(() => {
            const imageSrc = webcamRef.current.getScreenshot();
            dispatch(setCameraImage (imageSrc)) 
            history.push('./preview') //redirecting the user on the appropriate page of the webcam capture
        }, [webcamRef]);


    return (
        <div className='webcamCapture'>
          <Webcam

            audio={false}
            height={videoConstraints.height}
            ref={webcamRef}
            screenshotFormat="image/jpeg" // jpeg is compressed images and easier to store
             width={videoConstraints.width}
             videoConstraints={videoConstraints}

          />


          <RadioButtonUncheckedIcon
          className='webcamCapture_button'
          onClick={capture}
          fontSize ='large'
          />
        </div>
    )
}

export default WebcamCapture
