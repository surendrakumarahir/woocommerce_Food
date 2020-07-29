import React from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { TouchableOpacity } from 'react-native-gesture-handler';

const CategoryList = (props) => {
    const {main, image, box, all, text, label} = styles;
    const {dataSource, products, allCategories} = props;
    const data = dataSource.slice(0, 3);
    console.log('data', props);
    const openSubCategories2 = (parent, name, noOfCol) => {
        console.log(parent);
        let count = 0;
        for (const val of props.allCategories) {
          if (val.parent === parent) {
            count++;
          }
        }
        if (count === 0) {
          props.props.navigation.navigate('NewestScreen', {
            id: parent,
            name,
            sortOrder: 'newest'
          });
        } else {
          props.props.navigation.navigate('SubCategory', {
            parentId: parent,
            noOfCol,
            categoryPage: this.props.categoryPage,
            separator: this.props.separator
            //
          });
        }
      }
    return (
        <View>
            <Text style={label}>Category</Text>
            <View style={main}>
                <View style={all}>
                    <Text style={text}>All</Text>
                </View>
                { data.map(item => {
                    return (
                        <View style={box}>
                            <TouchableOpacity
                            onPress={() => openSubCategories2(item.id, item.name)}
                            > 
                                <Image 
                                    style={image} 
                                    source={{ uri: item.image.src }}
                                />
                             </TouchableOpacity>
                        </View>
                    )
                })}
                
            </View>
        </View>
         )
}

export default CategoryList;

const styles = StyleSheet.create({
    label: {
       margin: wp(5),
       fontSize: wp(5),
       color: '#000',
       fontWeight: 'bold',
    },
    main: {
       marginHorizontal : wp(5),
       marginBottom: wp(5),
       flexDirection: 'row',
       justifyContent: 'space-between',
    },
    image: {
        width: wp(18),
        height: wp(18),
    }, 
    box: {
        borderWidth: 2,
        borderColor: "#707070",
        borderRadius: wp(3),
      width: wp(20),
      height: wp(20),
      alignItems: 'center',
      justifyContent: 'center'
    },
    all: {
        borderRadius: wp(3),
        width: wp(20),
        height: wp(20),
        backgroundColor: '#b88018',
        justifyContent: 'center'
    },
    text: {
        textAlign: 'center',
        color: '#fff',
        fontSize: wp(5),
        fontWeight: 'bold',
    }
})