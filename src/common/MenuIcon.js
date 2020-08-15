import React from 'react';
import { Icon } from 'native-base';
import {
  View,
  StyleSheet,
  Platform,
  TouchableOpacity,
  Image
} from 'react-native';
import theme from '../common/Theme.style';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

// eslint-disable-next-line no-unused-vars
const MenuIcon = props => (
  <TouchableOpacity
    onPress={() => {
      console.log('asdfasd', props);
      props.navigation.openDrawer()
    }}
  >
    <View
      style={{
        alignItems: 'center',
        paddingLeft: wp(3),
      }}
    >
      <View
        style={[
          { padding: 3 },
          Platform.OS === 'android' ? styles.iconContainer : null
        ]}
      >
        {/* <Icon
          style={{ paddingLeft: 6, color: theme.headerIconsColor, fontSize: 22 }}
          name='md-menu'
        /> */}
        <Image style={styles.image} source={require('../images/Group787.png')} />
      </View>
    </View>
  </TouchableOpacity>
);
export default MenuIcon;
const styles = StyleSheet.create({
  iconContainer: {
    paddingLeft: 10,
    paddingTop: 6,
    marginRight: 5
  },
  image: {
     width: wp(7),
     height: wp(5),
     resizeMode: 'cover'
  }
});
