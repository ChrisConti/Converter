import React, { Component } from "react";
import { Text, View, TextInput, TouchableOpacity } from "react-native";

class ListSearchItem extends Component {
  addCurrency = currency => {
    this.props.addItem(currency);
  };
  delCurrency = currency => {
    this.props.delItem(currency);
  };

  state = {
    icon: {
      name: "+",
      color: "green"
    }
  };

  render() {
    const { currency } = this.props;

    return (
      <View
        key={currency.id}
        style={{
          flex: 1,
          height: 65,
          alignItems: "center",
          justifyContent: "space-between",
          flex: 1,
          flexDirection: "row",
          borderBottomWidth: 1,
          backgroundColor: "#fff",
          paddingLeft: 10
        }}
      >
        <Text key={currency.currencyName} style={{ fontSize: 20 }}>
          {currency.currencyName}
        </Text>
        <TouchableOpacity
          onPress={() => {
            //change the + in -, adding to the favlist to add
            if (this.state.icon.name === "+") {
              this.setState({ icon: { name: "-", color: "red" } });
              this.addCurrency(currency);
            } else {
              this.setState({ icon: { name: "+", color: "green" } });
              this.delCurrency(currency);
            }
          }}
        >
          <Text
            style={{
              color: this.state.icon.color,
              fontSize: 40,
              paddingRight: 7
            }}
          >
            {this.state.icon.name}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default ListSearchItem;
