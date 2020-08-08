import React from 'react';
import {Text, View, StyleSheet, Image, ScrollView, TouchableOpacity, ImageBackground} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {connect} from 'react-redux';
import { Value } from 'react-native-reanimated';
const RecentView = (props) => {
    const {main, image, box, imageBackground, slider} = styles;
   //  const banners = props.data.cartItems2.sharedData.banners;
     const recentViewed = props.isLoading.cartItems.recentViewedProducts;
     console.log('recent viewed', recentViewed);
    //this.props.bannersArray.sharedData.banners
    
    return recentViewed.length > 0 ? (<View  style={main}>
                <View style={{zIndex: -1, height: wp(40)}}>
                    <Image style={{flex:1, width: '100%', height: wp(40), resizeMode: 'cover'}} source={require('../../images/group11.png')} />
                </View>
             <View style={{marginTop: -wp(40)}}>
                     <Text style={styles.label}>Recent</Text>
                     <ScrollView
                                 horizontal={true}
                                 showsHorizontalScrollIndicator={false}
                                 contentContainerStyle={{ alignItems: 'center' }}
                             >
                             {
                                 recentViewed.map((val, key) => {
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
                                                 <View style={styles.descriptionBox}>
                                                    <View>
                                                         <Text style={styles.name}>{val.name}</Text>
                                                         {/* <Text>{val.short_description}</Text> */}
                                                    </View>
                                                    <View>
                                                         <Text style={styles.price}>{val.price}</Text>
                                                     </View>
                                                 </View>
                                         </TouchableOpacity>
                                     );
                                 })
                             }
                                 
                  </ScrollView>
             </View>  
         </View>) : null 
        
}

const mapStateToProps = state => ({
  isLoading: state,
})
export default connect(mapStateToProps, null)(RecentView)

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
        marginTop: wp(3),
        marginBottom: wp(3),   
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
        height: wp(35),
        width:  wp(43),
        marginLeft: wp(5),
       // borderWidth: 0.5,
        borderColor: '#dddddd',
    },
    descriptionBox: {
        marginLeft: wp(5),
        width: wp(43),
        paddingLeft: 5,
        paddingRight: 5,
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    name: {
      fontWeight: 'bold',
      color: '#000',
    },
    price: {
        fontWeight: 'bold',
        color: '#000',
    }
})



