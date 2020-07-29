import React from 'react';
import {Text, View, StyleSheet, Image, TextInput, TouchableOpacity, I18nManager,  Dimensions} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Icon } from 'native-base';
WIDTH = Dimensions.get('window').width;
const Search = (props) => {
    const {main} = styles;
     
    return (
        <View  style={main}>
            <View style={styles.TextviewStyle}>
              
                <TextInput
                    style={styles.TextInputStyleClass}
                   // onChangeText={text => this.SearchFilterFunction(text)}
                   // value={this.state.text}
                    underlineColorAndroid='transparent'
                    //placeholder={this.props.isLoading.Config.languageJson.Search}
                    placeholder="Search"
                    returnKeyType={'search'}
                   // onSubmitEditing={() => this.getSearchData()}
                />
                <Icon
                    name={'search'}
                    style={{
                    color: '#ca7302',
                    fontSize: 22,
                    marginHorizontal: wp(5)
                    }}
                />
            </View>
        </View>
         )
}

export default Search;

const styles = StyleSheet.create({
     main: {
        // flex: 1,
        marginHorizontal: wp(4),
        justifyContent: 'center',
        //marginBottom: 0,
        marginTop: 5,
        //alignItems: 'center',
    },
    TextviewStyle: {
        borderRadius: wp(8),
        borderColor: '#ca7302',
        borderWidth: 2,
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: wp(15),
        margin: 7,
        marginBottom: -3,
        backgroundColor: '#fff',
        alignItems: 'center',
      },
    TextInputStyleClass: {
        marginLeft: wp(4),
        height: wp(13),
        backgroundColor: '#fff',
        color: '#000',
        width: WIDTH - wp(30),
        textAlign: I18nManager.isRTL ? 'right' : 'left',
        paddingLeft: 30,
    },
   
    
})

