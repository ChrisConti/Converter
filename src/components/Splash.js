import React, { Component } from "react";
import { View, Text } from "react-native";

class Splash extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: null
    };
  };

  componentDidMount() {
    setTimeout(() => this.props.navigation.navigate("Home"), 3000);
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#4885ed"
        }}
      >
        <Text style={{ color: "white", fontSize: 40 }}>Converter</Text>
      </View>
    );
  }
}

export default Splash;
