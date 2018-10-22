import axios from "axios";
import _ from "lodash";
import { LIST_SEARCH_FETCH } from "./types";

export const listSearchFetch = listFavCurr => async dispatch => {
  try {
    const { data } = await axios.get(
      "https://free.currencyconverterapi.com/api/v6/currencies"
    );
    //difference
    const listWhithoutFav = _.values(data.results).filter(
      o => !listFavCurr.find(o2 => o.id === o2.id)
    );

    //sort by alphabetic currencyName
    listWhithoutFav.sort((a, b) =>
      a.currencyName.localeCompare(b.currencyName)
    );
    //return the list of currencies avalable whitout
    dispatch({
      type: LIST_SEARCH_FETCH,
      payload: listWhithoutFav
    });
  } catch (err) {
    console.log(err);
  }
};
