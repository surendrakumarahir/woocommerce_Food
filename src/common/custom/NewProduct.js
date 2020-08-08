import React from 'react';
import {Text, View, StyleSheet, Image, ScrollView, TouchableOpacity, ImageBackground} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {connect} from 'react-redux';
import { Value } from 'react-native-reanimated';
const NewProuct = (props) => {
    const {main, image, box} = styles;
   //  const banners = props.data.cartItems2.sharedData.banners;
     const newProduct = props.isLoading.sharedData.tab1;
     console.log('new product', newProduct);
     console.log(props);
    //this.props.bannersArray.sharedData.banners
    
    return newProduct.length > 0 ? ( <View  style={main}>
        <View style={{zIndex: -1, height: wp(40)}}>
            <Image style={{flex:1, width: '100%', height: wp(40), resizeMode: 'cover'}} source={require('../../images/group11.png')} />
        </View>
            <View style={{marginTop: -wp(40)}}>
                    <Text style={styles.label}>New Product</Text>
                    <ScrollView
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                                contentContainerStyle={{ alignItems: 'center' }}
                            >
                            {
                                newProduct.map((val, key) => {
                                    return (
                                        <TouchableOpacity
                                            key={key}
                                            // onPress={() => {
                                            // if (val.type == 'category') {
                                            //     props.navigation.navigate('NewestScreen', {
                                            //     id: parseInt(val.banners_url),
                                            //     name: '',
                                            //     sortOrder: val.type,
                                            //     })
                                            // } else if (val.type == 'product') {
                                            //     //this.getOneProduct(parseInt(val.banners_url))
                                            // } else {
                                            //     props.navigation.navigate('NewestScreen', {
                                            //     id: '',
                                            //     name: '',
                                            //     sortOrder: val.type,
                                            //     })
                                            // }
                                            // }}
                                            >
                                                <View style={box}>
                                                    <Image source={{uri: val.images[0].src}}
                                                            style={image}
                                                        />
                                                </View>
                                        </TouchableOpacity>
                                    );
                                })
                            }
                                
                </ScrollView>
            </View>  
        </View>
        ) : null
         
}

const mapStateToProps = state => ({
  isLoading: state,
})
export default connect(mapStateToProps, null)(NewProuct)

const styles = StyleSheet.create({
    label: {
       marginTop: wp(5),
       marginBottom: wp(5),
       marginLeft: wp(5),
       fontSize: wp(5),
       color: '#fff',
       fontWeight: 'bold',
    },
    main: {
        marginTop: wp(7),
        marginBottom: wp(7),   
    },
    image: {
        borderRadius: wp(8),
        flex: 1, width: null, height: null, resizeMode: 'cover'
    }, 
    imageBackground: {
        height: wp(40),
        zIndex: -1,
       },
    box: {
        height: wp(32),
        width:  wp(50),
        marginLeft: wp(5),
       // borderWidth: 0.5,
        borderColor: '#dddddd',
    },
    
})



