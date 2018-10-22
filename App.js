import React from "react";
import { StyleSheet, Text, View, AsyncStorage } from "react-native";
import { createStackNavigator } from "react-navigation";
import ListFavScreen from "./src/screens/ListFavScreen";
import ListSearchScreen from "./src/screens/ListSearchScreen";
import Splash from "./src/components/Splash";
import reducers from "./src/reducers";
//persistance
import configStore from "./src/configStore";
const { store, persistor } = configStore();
import { PersistGate } from "redux-persist/integration/react";

import { Provider } from "react-redux"; //access to all the application to reducers

export default class App extends React.Component {
  render() {
    const RootStack = createStackNavigator(
      {
        Splash: Splash,
        Home: ListFavScreen,
        Search: ListSearchScreen
      },
      {
        initialRouteName: "Splash"
      }
    );

    return (
      <Provider store={store}>
        <View style={styles.container}>
          <PersistGate loading={null} persistor={persistor}>
            <RootStack />
          </PersistGate>
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center"
  }
});
