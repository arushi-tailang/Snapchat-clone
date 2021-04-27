import { createSlice } from '@reduxjs/toolkit';

export const cameraSlice = createSlice({
  name: 'camera',
  initialState: {
  cameraImage: null,
  },
    reducers: {
        setCameraImage: (state, action) => {
      state.cameraImage = action.payload;
    },
    resetCameraImage: (state) => {
     state.cameraImage = null;
    }
  },  
});

export const {setCameraImage, resetCameraImage } = cameraSlice.actions;
export const selectCameraImage = (state) => state.camera.cameraImage; //pulls information from the store
export default cameraSlice.reducer;
