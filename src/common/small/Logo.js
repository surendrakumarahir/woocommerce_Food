import React from 'react';
import {Text, View, StyleSheet, Image, ScrollView, TouchableOpacity} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const CustomBanner = (props) => {
    const {main, image, box} = styles;
     
    return (
        <View  style={main}>
            <Image source={require('../../images/logo.png')} />
        </View>
         )
}

export default CustomBanner;

const styles = StyleSheet.create({
     main: {
        //marginTop: wp(5),
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        flex: 1, width: null, height: null, resizeMode: 'cover'
    }, 
    
    
})
