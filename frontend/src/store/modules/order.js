import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  extend: {
    prod: true,
    order: true,
    delivery: false,
    disCount: false,
    payment: false,
  },

  orderInformation: {
    email: '',
    domain: '',
    name: '',
    tel: '',
  },

  shipInfo: {
    shipName: '', // 수령인
    shipTel: '', // 연락처
    mainAddress: '', // 메인배송지
    subAddress: '', // 상세주소
    shipMessage: '', // 기사님께 전하는 메시지
  },

  pointInfo: {
    holdPoint: 0, // 보유 포인트
    usePoint: 0, // 사용 포인트
  },

  payMethod: {
    kakao: true,
    naver: false,
    card: false,
    deposit: false,
    account: false,
  },

  paymentMethod: 'kakao',
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    extendChange: (state, action) => {
      // +, - 확장 버튼
      const { type } = action.payload;
      return {
        ...state,
        extend: {
          ...state.extend,
          [type]: !state.extend[type],
        },
      };
    },

    saveExtendChange: (state, action) => {
      // 저장하고 다음 단계 버튼
      const { type } = action.payload;
      return {
        ...state,
        extend: {
          ...state.extend,
          [type]: true,
        },
      };
    },

    updateOrder: (state, action) => {
      const { updateOrderInformation } = action.payload;
      return {
        ...state,
        orderInformation: {
          ...state.orderInformation,
          ...updateOrderInformation,
        },
      };
    },

    sameOrderInfo: (state, action) => {
      return {
        ...state,
        shipInfo: {
          ...state.shipInfo,
          shipName: state.orderInformation.name,
          shipTel: state.orderInformation.tel,
        },
      };
    },

    updateShip: (state, action) => {
      const { updateShipInfo } = action.payload;
      return {
        ...state,
        shipInfo: {
          ...state.shipInfo,
          ...updateShipInfo,
        },
      };
    },

    updatePoint: (state, action) => {
      const { updatePointInfo } = action.payload;
      return {
        ...state,
        pointInfo: {
          ...state.pointInfo,
          ...updatePointInfo,
        },
      };
    },

    setPayMethod: (state, action) => {
      const paymentMethod = action.payload;
      let payMethod = {
        kakao: false,
        naver: false,
        card: false,
        deposit: false,
        account: false,
      };
      switch (paymentMethod.type) {
        case 'kakao':
          payMethod.kakao = true;
          break;
        case 'naver':
          payMethod.naver = true;
          break;
        case 'card':
          payMethod.card = true;
          break;
        case 'deposit':
          payMethod.deposit = true;
          break;
        case 'account':
          payMethod.account = true;
          break;
        default:
          break;
      }
      return {
        ...state,
        payMethod: payMethod,
        paymentMethod: paymentMethod.type,
      };
    },
  },
});

export const {
  extendChange,
  saveExtendChange,
  updateOrder,
  sameOrderInfo,
  updateShip,
  updatePoint,
  setPayMethod,
} = orderSlice.actions;

export default orderSlice.reducer;
