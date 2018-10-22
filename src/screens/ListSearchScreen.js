import _ from "lodash";
import React, { Component } from "react";
import {
  View,
  Text,
  ScrollView,
  FlatList,
  Button,
  Platform
} from "react-native";
import { connect } from "react-redux";
import { listSearchFetch, listFavAdd } from "../actions";
import ListSearchItem from "../components/ListSearchItem";
import { SearchBar } from "react-native-elements";

class ListSearchScreen extends Component {
  static navigationOptions = {
    headerTitle: "Add Currency",
    headerStyle: {
      backgroundColor: "#4885ed"
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
      fontWeight: "bold",
      fontSize: 30,
      paddingBottom: 20
    }
  };

  state = {
    filter: "",
    currToAdd: [] //stock every currency to add to the favList
  };

  componentDidMount() {
    this.props.listSearchFetch(this.props.listFav);
  }

  renderRow(currency) {
    return (
      <ListSearchItem
        addItem={this.addItemListToADD}
        delItem={this.deleteItemListToADD}
        currency={currency}
      />
    );
  }

  renderButtonValidation = navigation => {
    if (this.state.currToAdd.length > 0) {
      return (
        <View style={styles.bottomView}>
          <Button
            title="Save"
            onPress={() => {
              this.props.listFavAdd(
                this.state.currToAdd,
                this.props.currSelect.id,
                this.props.currSelect.amount
              );
              this.props.listSearchFetch(this.props.listFav);
              this.props.navigation.navigate("Home");
            }}
            color="#fff"
          />
        </View>
      );
    }
  };

  addItemListToADD = currency => {
    this.setState({ currToAdd: [...this.state.currToAdd, currency] });
  };

  deleteItemListToADD = currency => {
    this.setState({
      currToAdd: this.state.currToAdd.filter(item => item !== currency)
    });
  };

  dataFlatList = () => {
    //search by currencyName
    return this.props.listSearch.filter(
      el =>
        el.currencyName.toLowerCase().indexOf(this.state.filter.toLowerCase()) >
        -1
    );
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <SearchBar
          placeholder="Type Here..."
          lightTheme
          round
          onChangeText={filter => this.setState({ filter })}
          autoCorrect={false}
          style={{ height: 25, backgroundColor: "white" }}
          inputStyle={{ backgroundColor: "white", color: "black" }}
          containerStyle={{
            backgroundColor: "white",
            borderBottomColor: "black"
          }}
        />
        <ScrollView>
          <FlatList
            enableEmptySections
            data={this.dataFlatList()}
            renderItem={row => this.renderRow(row.item)}
            keyExtractor={(item, index) => String(index)}
          />
        </ScrollView>
        {this.renderButtonValidation()}
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    listSearch: state.listSearch.results,
    listFav: _.values(state.listFav.arr),
    currSelect: state.listFav.currSelect
  };
};

const styles = {
  bottomView: {
    width: "100%",
    height: 50,
    backgroundColor: "#FF9800",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    bottom: 0
  }
};

export default connect(
  mapStateToProps,
  { listSearchFetch, listFavAdd }
)(ListSearchScreen);
