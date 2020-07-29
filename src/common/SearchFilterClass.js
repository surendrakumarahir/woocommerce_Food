/* eslint-disable import/newline-after-import */
/* eslint-disable max-len */

import React, {Component} from 'react'
import {
  Text,
  StyleSheet,
  View,
  FlatList,
  TextInput,
} from 'react-native'
import {UIActivityIndicator} from 'react-native-indicators';
import theme from './Theme.style'
import {CardStyleInterpolators} from 'react-navigation-stack'
export default class MyProject extends Component {
  static navigationOptions = () => {
    return {
      headerTitle: 'Search',
      headerForceInset: {top: 'never', vertical: 'never'},
      headerTintColor: theme.headerTintColor,
      headerStyle: {
        backgroundColor: theme.primary,
      },
      headerTitleStyle: {
        fontWeight: Platform.OS === 'android' ? 'bold' : 'normal',
      },
      headerTitleAlign: 'center',
      cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
    }
  }
  constructor (props) {
    super(props)
    this.state = {
      isLoading: true,
      text: '',
      arrayholder: [],
    }
  }

  componentDidMount () {
    this.setState(
      {
        isLoading: false,
        dataSource: this.props.navigation.state.params.data,
      },
      function () {
        this.setState({arrayholder: this.props.navigation.state.params.data})
      },
    )
  }

  GetListViewItem (name) {
    this.setState({text: name})
    this.props.navigation.state.params.onGoBack(
      name,
      this.props.navigation.state.params.onSelectionBase,
    )
    this.props.navigation.goBack()
  }

  SearchFilterFunction (text) {
    const newData = this.state.arrayholder.filter(item => {
      const itemData = item.name.toUpperCase()
      const textData = text.toUpperCase()
      return itemData.indexOf(textData) > -1
    })
    this.setState({
      dataSource: newData,
      text,
    })
  }

  ListViewItemSeparator = () => (
    <View
      style={{
        height: 0.5,
        width: '100%',
        backgroundColor: '#000',
      }}
    />
  )

  render () {
    if (this.state.isLoading) {
      return (
        <View
          style={{flex: 1, paddingTop: 20, color: theme.loadingIndicatorColor}}>
          <UIActivityIndicator color={theme.loadingIndicatorColor} size={27} />
        </View>
      )
    }
    console.log(this.state.dataSource)
    return (
      <View style={styles.MainContainer}>
        <TextInput
          style={styles.TextInputStyleClass}
          onChangeText={text => this.SearchFilterFunction(text)}
          value={this.state.text}
          underlineColorAndroid='transparent'
          placeholder='Search Here'
        />

        <FlatList
          data={this.state.dataSource}
          showsVerticalScrollIndicator={false}
          renderSeparator={this.ListViewItemSeparator}
          renderItem={({item}) => (
            <Text
              style={styles.rowViewContainer}
              onPress={this.GetListViewItem.bind(this, item.name)}>
              {item.name}
            </Text>
          )}
          enableEmptySections
          style={{marginTop: 10}}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    justifyContent: 'center',
    flex: 1,
    margin: 7,
  },
  rowViewContainer: {
    fontSize: 17,
    padding: 10,
  },
  TextInputStyleClass: {
    textAlign: 'center',
    height: 40,
    borderWidth: 1,
    borderColor: '#009688',
    borderRadius: 7,
    backgroundColor: '#FFFFFF',
  },
})
