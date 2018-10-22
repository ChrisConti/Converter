import { LIST_SEARCH_FETCH, LIST_SEARCH_DEL } from "../actions/types";
const INITIAL_STATE = { results: [] };

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LIST_SEARCH_FETCH:
      return { ...state, results: action.payload };
    case LIST_SEARCH_DEL: //performance
      return {
        ...state,
        results: state.results.filter(item => item !== action.payload)
      };
    default:
      return state;
  }
};
