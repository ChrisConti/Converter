import React, { Component } from "react";
import axios from "axios";
import {
  View,
  Text,
  ScrollView,
  FlatList,
  TouchableOpacity
} from "react-native";
import { connect } from "react-redux";
import { listFavFetch, listFavDel, listFavUpdate } from "../actions";
import ListFavItem from "../components/ListFavItem";

class ListFavScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: "Converter",
      headerStyle: {
        backgroundColor: "#4885ed"
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold",
        fontSize: 30,
        paddingBottom: 20
      },
      headerLeft: null,
      headerRight: (
        <View
          style={{
            flex: 1,
            bottom: 8,
            marginRight: 10
          }}
        >
          <TouchableOpacity onPress={() => navigation.navigate("Search")}>
            <Text
              style={{
                fontSize: 40,
                color: "#fff",
                fontWeight: "bold"
              }}
            >
              +
            </Text>
          </TouchableOpacity>
        </View>
      )
    };
  };

  state = {
    idSaveListFav: "" //save the id of the new currency ref
  };

  componentDidMount() {
    this.props.listFavFetch();
  }

  deleteItemListFav = currency => {
    this.props.listFavDel(currency);
  };

  updateItemListFav = (currency, amount) => {
    this.props.listFavUpdate(this.props.listFav, currency.id, amount);
  };

  renderRow(currency) {
    return (
      <ListFavItem
        saveId={id => this.setState({ idSaveListFav: id })}
        getId={this.state.idSaveListFav}
        select={this.props.currSelect}
        updateItem={this.updateItemListFav}
        deleteItem={this.deleteItemListFav}
        currency={currency}
      />
    );
  }

  render() {
    return (
      <View>
        <ScrollView>
          <FlatList
            style={{ backgroundColor: "white" }}
            enableEmptySections
            data={this.props.listFav}
            renderItem={row => this.renderRow(row.item)}
            keyExtractor={(item, index) => String(index)}
            ListEmptyComponent={() => (
              <View style={styles.flatList} onPress={() => alert("test")}>
                <Text style={{ fontSize: 20 }}>List is empty!</Text>
              </View>
            )}
          />
        </ScrollView>
      </View>
    );
  }
}

const styles = {
  flatList: {
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    borderBottomWidth: 2
  }
};

const mapStateToProps = state => {
  return {
    listFav: state.listFav.arr,
    currSelect: state.listFav.currSelect
  };
};

export default connect(
  mapStateToProps,
  { listFavFetch, listFavDel, listFavUpdate }
)(ListFavScreen);
