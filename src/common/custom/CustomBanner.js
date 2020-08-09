import React from 'react';
import {Text, View, StyleSheet, Image, ScrollView, TouchableOpacity, ImageBackground} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const CustomBanner = (props) => {
    const {main, image, box, imageBackground} = styles;
     const banners = props.data.cartItems2.sharedData.banners;
    //this.props.bannersArray.sharedData.banners
   
    
    return (
        <View  style={main}>
            <ImageBackground source={require('../../images/0000.png')} style={imageBackground}>
                
               <Text style={styles.label}>{props.data.cartItems2.Config.languageJson[
                                'Explore Now'
                              ]}</Text>
                <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ alignItems: 'center' }}
                >
                {
                    banners.map((val, key) => {
                        return (
                            <TouchableOpacity
                                key={key}
                                onPress={() => {
                                if (val.type == 'category') {
                                    props.navigation.navigate('NewestScreen', {
                                    id: parseInt(val.banners_url),
                                    name: '',
                                    sortOrder: val.type,
                                    })
                                } else if (val.type == 'product') {
                                    //this.getOneProduct(parseInt(val.banners_url))
                                } else {
                                    props.navigation.navigate('NewestScreen', {
                                    id: '',
                                    name: '',
                                    sortOrder: val.type,
                                    })
                                }
                                }}>
                                    <View style={box}>
                                        <Image source={{uri: val.banners_image}}
                                                style={image}
                                            />
                                    </View>
                            </TouchableOpacity>
                        );
                    })
                }
                    
                </ScrollView>
            </ImageBackground>
           </View>
         )
}

export default CustomBanner;

const styles = StyleSheet.create({
    label: {
        flex: 1, 
        position: 'absolute',
        alignSelf: 'center',
        //marginHorizontal: wp(5),
       marginTop: wp(3),
       fontSize: wp(5),
       color: '#000',
       fontWeight: 'bold',
    },
    main: {
        height: wp(70),
        marginTop: wp(3),
       
    },
    image: {
        borderRadius: wp(8),
        flex: 1, width: null, height: null, resizeMode: 'cover'
    }, 
    imageBackground: {
        flex: 1,
        //width: wp(25),
        height: wp(70),
        // //resizeMode: "contain",
          
      },
    box: {
        height: wp(40),
        width:  wp(40),
        marginLeft: wp(5),
       // borderWidth: 0.5,
        borderColor: '#dddddd',
    },
    
})
