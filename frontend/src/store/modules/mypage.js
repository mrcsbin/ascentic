import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeTab: "주문",
};

const myPageReducer = createSlice({
  name: "mypage",
  initialState,
  reducers: {
    setActiveTab: (state, action) => {
      state.activeTab = action.payload;
    },
  },
});

export const { setActiveTab } = myPageReducer.actions;

export default myPageReducer.reducer;
