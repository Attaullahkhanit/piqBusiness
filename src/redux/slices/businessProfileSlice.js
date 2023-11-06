import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  businessData: null,
  videosData:null,
};

const businessDataFromLocalStorage =
  JSON.parse(localStorage.getItem("businessData")) || initialState;

const businessProfileSlice = createSlice({
  name: "businessProfile",
  initialState: businessDataFromLocalStorage,
  reducers: {
    setBusinessData: (state, action) => {
      state.businessData = action.payload;
      localStorage.setItem("businessData", JSON.stringify(state));
    },
    setBusinessVideoData: (state, action) => {
      state.videosData = action.payload;
      localStorage.setItem("businessData", JSON.stringify(state));
    },
    clearBusinessData: (state, action) => {
      state.businessData = null;
      state.videosData = [];
      localStorage.removeItem("businessData");
    },
  },
});
const { reducer, actions } = businessProfileSlice;
export const { setBusinessData, setBusinessVideoData, clearBusinessData } =
  actions;
export default reducer;
