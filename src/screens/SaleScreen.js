
import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import { CardStyleInterpolators } from 'react-navigation-stack';
import ShoppingCartIcon from '../common/ShoppingCartIcon'
import MenuIcon from '../common/MenuIcon'
class RewardPoints extends Component {

static navigationOptions = ({ navigation }) => {
  const headerStyle = navigation.getParam(
    'headerTitle',
    
  );
  return {
    headerTitle: headerStyle,
    headerLeft: () => <MenuIcon navigation={navigation} />,
    headerRight: () => <ShoppingCartIcon navigation={navigation} />,
    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
    headerTitleStyle: {
      textAlign: 'center',
      flexGrow: 1,
      alignSelf: 'center',
  },
  };
};
// eslint-disable-next-line react/sort-comp
componentDidMount() {
  this.props.navigation.setParams({
    headerTitle: this.props.isLoading.Config.languageJson.Settings
  });
}

  constructor(props) {
    super(props);
    this.state = {
    };
  }
 
  render() {
    return (
      <View>
        <Text>Sale</Text>
      </View>
    );
  }
}
const mapStateToProps = state => ({
  isLoading: state
});


export default connect(
mapStateToProps,
null
)(RewardPoints);

