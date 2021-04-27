import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'; 
import { useHistory } from 'react-router-dom';
import {resetCameraImage, selectCameraImage} from './features/cameraSlice';//
import "./Preview.css"; 
import "./Chats";
import CloseIcon from '@material-ui/icons/Close';
import TextFieldsIcons from '@material-ui/icons/TextFields';
import CreateIcon from '@material-ui/icons/Create';
import NoteIcon from '@material-ui/icons/Note';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import AttachFileIcon 
from '@material-ui/icons/AttachFile';
import CropIcon from '@material-ui/icons/Crop';
import TimerIcon from '@material-ui/icons/Timer';
import SendIcon from '@material-ui/icons/Send';
import {v4 as uuid} from "uuid";
import { db, storage } from './firebase' ;
import firebase from 'firebase';
import {selectuser} from './features/appSlice';



function Preview () {
    const cameraImage = useSelector(selectCameraImage); // it is going to pull the camera image from the REDUX (data stored)
    const history = useHistory();
    const dispatch = useDispatch();
     const user = useSelector(selectuser);
    
    useEffect(() =>{
        if (cameraImage === ' '){ //if there is no camera image
             history.replace('/');
        }
    }, [cameraImage, history])

    const closePreview = () => {
        dispatch(resetCameraImage())
    }
        const sendPost = () => {
       const id = uuid();
       const uploadTask = storage.ref(`posts/${id}`).putString(cameraImage, 'data_url')
       uploadTask.on('state_changed', null, (error => {
                console.log(error)
       }), () => {
           storage.ref('posts').child(id).getDownloadURL().then((url)=>{
              db.collection('posts').add({
                imageUrl:url, 
                username:user.username,
                read:false,
                profilePic: user.profilePic,
                timestamp:firebase.firestore.FieldValue.serverTimestamp(),
              });
              history.replace('/chats')
           });
       });
    }

    return (
        <div className='preview'>
            <CloseIcon onClick = {closePreview} className='preview_close'  />
            <div className='preview_toolbarRight'>
              <TextFieldsIcons />
              <CreateIcon />
              <NoteIcon />
              <MusicNoteIcon />
              <AttachFileIcon />
              <CropIcon />
              <TimerIcon /> 

            </div>

            <img src={cameraImage} alt=""/>
            <div onClick={sendPost} className="preview_footer">
                <h2>Send now</h2>
                <SendIcon fontSize="small" className="preview_sendIcon" />
            </div>
        </div>
    );
    }

export default Preview
