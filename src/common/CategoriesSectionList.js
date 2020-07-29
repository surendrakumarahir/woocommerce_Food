/* eslint-disable no-confusing-arrow */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-unused-vars */
/* eslint-disable import/newline-after-import */
/* eslint-disable import/imports-first */
import React, { Component } from 'react';
// eslint-disable-next-line import/newline-after-import
import { View, FlatList } from 'react-native';
import {UIActivityIndicator} from 'react-native-indicators';
import Category5Style from './Categories5';
import theme from './Theme.style';
export default class FlatListView extends Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
    this.state = {
      newData: []
    };
  }
  openSubCategories = (parent, name) => {
    console.log(parent);
    let count = 0;
    for (const val of this.props.allCategories) {
      if (val.parent === parent) {
        count++;
      }
    }
    this.props.props.navigation.navigate('NewestScreen', {
      id: parent,
      name,
      sortOrder: 'newest'
    });
  }
  renderSeparator = () => (
    <View style={{ height: 1, width: '100%', backgroundColor: '#ddd' }} />
  )

  render() {
    return this.props.sectionlist.length === 0 ? (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <UIActivityIndicator size={27} color={theme.loadingIndicatorColor} />
      </View>
    ) : (
      <FlatList
      showsVerticalScrollIndicator={false}
        data={this.props.sectionlist}
        horizontal={this.props.vertical}
        numColumns={this.props.noOfCol}
        style={{ paddingBottom: this.props.viewButton ? 0 : 10 }}
        ItemSeparatorComponent={this.renderSeparator}
        keyExtractor={(item, index) => index.toString()}
        renderItem={item => (
          <View>
            <View>
              <Category5Style
                item={item.item.parent}
                id={item.inde + 1}
                products={this.props.products}
                image={
                  item.item.parent.image === null
                    ? ''
                    : item.item.parent.image.src
                }
                openSubCategories={(t, n) => this.openSubCategories(t, n)}
                header
              />
              {item.item.data.map(key => (
                <View>
                  <Category5Style
                    item={key}
                    id={item.index}
                    products={this.props.products}
                    image={key.image === null ? '' : key.image.src}
                    openSubCategories={(t, n) => this.openSubCategories(t, n)}
                  />
                  <View
                    style={{
                      height: 1,
                      width: '100%',
                      backgroundColor: '#ddd'
                    }}
                  />
                </View>
              ))}
            </View>
          </View>
        )}
      />
    );
  }
}
