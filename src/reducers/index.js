import { combineReducers } from "redux";
import ListSearchReducer from "./ListSearchReducer";
import ListFavReducer from "./ListFavReducer";

export default {
  listSearch: ListSearchReducer,
  listFav: ListFavReducer
};
