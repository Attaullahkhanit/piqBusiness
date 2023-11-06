import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { PIQ_BASE_URL } from "../../apis/variables";

const initialState = {
  allBusinesses: null,
};

const allBusinessesFromLocalStorage =
  localStorage.getItem("allBusinesses") ? JSON.parse(localStorage.getItem("allBusinesses")) : []
export const setfcmtoken = createAsyncThunk("business/setfcm", async (user, thunkAPI) => {
    try {
      const { data } = await axios.post(
        `${PIQ_BASE_URL}auth/add-business-user-fcm`,
        user
      );
      return data;
    } catch (err) {
      if (err.response && err.response.data) {
        return thunkAPI.rejectWithValue({
          error: err.response.data,
          status: err.response.status,
        });
      } else {
        return thunkAPI.rejectWithValue({
          error: {
            success: false,
            message: "Network Error",
          },
        });
      }
    }
  });

const allBusinessesSlice = createSlice({
  name: "allBusinesses",
  initialState: allBusinessesFromLocalStorage,
  reducers: {
    setAllBusinesses: (state, action) => {
      state.allBusinesses = action.payload;
      localStorage.setItem("allBusinesses", JSON.stringify(state.allBusinesses));
    },
    clearAllBusinesses: (state, action) => {
      state.allBusinesses = null;
      localStorage.removeItem("allBusinesses");
    },
  },
});
const { reducer, actions } = allBusinessesSlice;
export const { setAllBusinesses, clearAllBusinesses} =
  actions;
export default reducer;
