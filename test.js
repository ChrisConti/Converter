import React, { Component } from 'react';
import axios from 'axios';
import _ from 'lodash';
import { View, Text, Button, ScrollView, ListItem, TextInput } from 'react-native';
import Swipeout from 'react-native-swipeout';
import { connect } from 'react-redux';
import { currenciesListFetch, delCurrencyListFetch, updateConvertCurr } from '../actions';

class ListCurrScreen extends Component {

  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: 'Converter',
      headerRight: (
        <Button
          title='+'
          onPress={() => {
            navigation.navigate('Search');
            //this.props.currenciesListFetch();
            //console.log('Search');
            }
          }
        />
      ),
    };
  };
  renderCurrency2 = () => {
    return this.props.listCurrency.map((curr, i) => {
        <Text>{curr}</Text>
    });
  };

  renderCurrency = () => {
    console.log('renderCurrency');
    console.log(this.props.listCurrency);

    return this.props.listCurrency.map((curr, i) => {
      console.log('renderCurrency2');
      console.log(this.props.listCurrency);
      console.log(curr);
      const swipeoutBtns = [
        {
          text: 'Delete',
          onPress: () => {this.props.delCurrencyListFetch(curr);}
        }
      ];
      return (
        <Swipeout right={swipeoutBtns}>
          <View style={{flex: 1, height: 45, alignItems: 'center',justifyContent:'space-around',flex:1, flexDirection: 'row', borderBottomWidth: 1, backgroundColor: '#fff', paddingLeft: 10}}>
            <Text>{curr.id}</Text>
            <Text>{curr.currencyName}</Text>
            <TextInput
              style={{width: 40,height: 40, borderColor: 'gray', borderWidth: 1}}
              onChangeText={(test) => {     //alert(amount);
                                          console.log('Saisie new values');
                                          //console.log(this.props.listCurrency);
                                          console.log(test);
                                          this.props.updateConvertCurr(this.props.listCurrency, curr.id, test);
                                        }
                            }

              textAlign={'center'}
            />
          </View>
          <Button
            title='test'
            onPress={
              () => this.props.updateConvertCurr(this.props.listCurrency, curr.id, 3)
            }
          />
        </Swipeout>

      );

    });
  }

  render() {
    return (
      <View>
        <ScrollView>
          <View>{this.renderCurrency()}</View>
          <View>{this.renderCurrency2()}</View>
        </ScrollView>
      </View>
    );
  }
}

const styles = {
  containerStyle: {
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10
  },
}

const mapStateToProps = (state) => {
  const listCurrency = _.values(state.listCurrency.arr);
  console.log('listcurrency update');
  console.log(state.listCurrency.arr);

  return {
          listCurrency
          };
}

export default connect(mapStateToProps, { currenciesListFetch, delCurrencyListFetch, updateConvertCurr })(ListCurrScreen);
