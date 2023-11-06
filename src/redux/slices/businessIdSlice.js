import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: null,
};

const businessIdFromLocalStorage =
  JSON.parse(localStorage.getItem("businessId")) || initialState;

const businessIdSlice = createSlice({
  name: "businessId",
  initialState: businessIdFromLocalStorage,
  reducers: {
    setBusinessId: (state, action) => {
      state.id = action.payload;
      localStorage.setItem("businessId", JSON.stringify(state));
    },
    clearBusinessId: (state, action) => {
      state.id = null;
      localStorage.removeItem("businessId");
    },
  },
});
const { reducer, actions } = businessIdSlice;
export const { setBusinessId, clearBusinessId } = actions;
export default reducer;
