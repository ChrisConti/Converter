import {
  LIST_FAV_ADD,
  LIST_FAV_DEL,
  LIST_FAV_UPDATE,
  LIST_FAV_FETCH
} from "./types";
import axios from "axios";

export const listFavFetch = () => {
  return {
    type: LIST_FAV_FETCH
  };
};

export const listFavAdd = (currency, id, amount) => dispatch => {
  //check if the id is stored, amount already to 1 cf reducer
  id === "" ? (id = currency[0].id) : null;

  //sending currencies add to favlist with the amount convert
  renderPromise(currency, id, amount).then(data => {
    //update the listFav with the last currecy select
    const newCurrencies = currency.map((val, i) => {
      return { ...val, amount: data[i].amount };
    });

    dispatch({
      type: LIST_FAV_ADD,
      payload: {
        currSelect: { id, amount },
        arr: newCurrencies
      }
    });
  });
};

export const listFavDel = currency => {
  return {
    type: LIST_FAV_DEL,
    payload: currency
  };
};

export const listFavUpdate = (listFav, id, amount) => dispatch => {
  renderPromise(listFav, id, amount).then(data => {
    dispatch({
      type: LIST_FAV_UPDATE,
      payload: {
        arr: data,
        currSelect: { id, amount }
      }
    });
  });
};

const renderPromise = (listFav, id, amount) => {
  var promises = [];
  for (var i = 0; i < listFav.length; i++) {
    const convertKey = id + "_" + listFav[i].id;
    promises.push(
      new Promise((resolve, reject) => {
        return axios
          .get(
            "https://free.currencyconverterapi.com/api/v6/convert?q=" +
              convertKey +
              "&compact=ultra"
          )
          .then(response => {
            resolve({
              id: convertKey,
              amount: +(amount * response.data[convertKey]).toFixed(3)
            }); //limit the amount to 3 after the coma, and '+' to don't get the 000
          })
          .catch(erro => console.log(erro));
      })
    );
  }

  var p = Promise.all(promises).then(values => {
    return values;
  });
  return p;
};
