import React, { Component } from "react";
import {
  Alert,
  Text,
  View,
  TextInput,
  Button,
  ScrollView,
  TouchableOpacity
} from "react-native";
import Swipeout from "react-native-swipeout";

class ListFavItem extends Component {
  state = {
    input: this.props.currency.amount,
    id: this.props.currency.id
  };
  deleteCurrency = currency => {
    this.props.deleteItem(currency);
  };
  updateValueConvertion = (currency, amount) => {
    this.props.updateItem(currency, amount);
  };
  componentDidUpdate = prevProps => {
    if (prevProps.currency !== this.props.currency) {
      if (this.state.input !== "") {
        if (this.props.getId !== this.props.currency.id) {
          this.setState({ input: this.props.currency.amount });
        }
      }
    }
  };

  render() {
    const { currency } = this.props;
    const swipeoutBtns = {
      autoClose: true,
      right: [
        {
          text: "Delete",
          backgroundColor: "red",
          onPress: () => {
            Alert.alert("Warning", "Are you sure ?", [
              {
                text: "NO",
                onPress: () => null,
                style: "cancel"
              },
              { text: "YES", onPress: () => this.deleteCurrency(currency) }
            ]);
          }
        }
      ]
    };

    return (
      <Swipeout key={currency.id} {...swipeoutBtns}>
        <View key={currency.id} style={styles.container}>
          <View style={styles.viewLeft}>
            <Text style={styles.id}>{currency.id}</Text>
            <Text style={{ fontSize: 18 }}>{currency.currencySymbol}</Text>
          </View>
          <View style={styles.viewRight}>
            <View style={styles.viewInputTop}>
              <ScrollView scrollEnabled={false}>
                //scrollview the textinput to make the keyboard desapear able
                <TextInput
                  keyboardType="numeric"
                  style={styles.input}
                  value={String(this.state.input)}
                  onChangeText={am => {
                    //am => amount
                    if (am.length !== 0) {
                      this.props.saveId(currency.id); //save the current as select currency convert
                      this.updateValueConvertion(currency, am); //update the reducer to rerender the list with the new currency select convert
                      this.setState({ input: am });
                    }
                  }}
                  onFocus={() => {
                    //selectionning
                    this.setState({ input: "" }, console.log(this.state.input));
                  }}
                  textAlign={"right"}
                  onBlur={() => {
                    //leaving
                    if (this.state.input === "")
                      this.setState({ input: currency.amount });
                  }}
                />
              </ScrollView>
            </View>
            <View style={styles.viewInputBottom}>
              <Text style={{ fontSize: 15 }}>{currency.currencyName}</Text>
            </View>
          </View>
        </View>
      </Swipeout>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    height: 70,
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "black",
    backgroundColor: "#fff"
  },
  viewLeft: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    paddingLeft: 10
  },
  viewRight: {
    flex: 3,
    justifyContent: "center",
    alignItems: "flex-end",
    paddingRight: 10
  },
  viewInputTop: {
    flex: 2,
    justifyContent: "center"
  },
  viewInputBottom: {
    alignItems: "flex-end",
    flex: 1
  },
  input: {
    height: 40,
    fontSize: 30
  },
  id: {
    fontSize: 20,
    fontWeight: "bold"
  }
};

export default ListFavItem;

/*

*/
