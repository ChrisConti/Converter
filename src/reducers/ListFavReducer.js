import {
  LIST_FAV_ADD,
  LIST_FAV_DEL,
  LIST_FAV_UPDATE,
  LIST_FAV_FETCH
} from "../actions/types";
const INITIAL_STATE = {
  arr: [],
  currSelect: { id: "", amount: 1 } //to keep record of the currency ref
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LIST_FAV_FETCH:
      return state;
    case LIST_FAV_DEL:
      return {
        ...state,
        arr: state.arr.filter(item => item !== action.payload)
      };
    case LIST_FAV_ADD:
      return {
        ...state,
        arr: [...state.arr.concat(action.payload.arr)],
        currSelect: { ...action.payload.currSelect }
      };
    case LIST_FAV_UPDATE:
      return {
        ...state,
        arr: state.arr.map((val, i) => {
          return { ...val, amount: action.payload.arr[i].amount };
        }),
        currSelect: { ...action.payload.currSelect }
      };
    default:
      return state;
  }
};
