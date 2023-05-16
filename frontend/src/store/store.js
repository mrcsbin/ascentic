import { configureStore } from "@reduxjs/toolkit";
// import applySubsReducer from "./modules/applySubs";
import orderReducer from "./modules/order";

// Redux Tooolkit 사용 단계
// 1. yarn add @reduxjs/toolkit,  yarn add react-redux
// 2. store.js 파일 ( configureStore() 메서드를 사용하여 store 생성)
// 3. initialState 초기 state 값 설정
// 4. reducer 함수 생성 (createSlice() 사용하여 생성)
// reducer: 오직 인자로 받은 이전 상태와 액션 객체만을 기반으로 새로운 상태를 반환
// 5. store에 reducer 등록
// 6. index.js에서 provider에 적용(Redux store를 전역에서 사용할 수 있게 해줌)
const store = configureStore({
  reducer: {
    order: orderReducer,
    // applySubs: applySubsReducer,
  },
});

export default store;
