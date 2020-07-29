
import {
   createStackNavigator,
} from 'react-navigation-stack';
import IntroScreen from '../../screens/IntroScreen';
import NewestScreen from '../../navigation/Stacks/Newest';
// eslint-disable-next-line no-unused-vars
///////////////////////////////////////////////////// Home Stack Start
const HomeStackNavigator = createStackNavigator(
    {
      Home: {
        screen: IntroScreen,
        navigationOptions: () => ({
             gestureEnabled: false,
             headerShown: false,    
             drawerLockMode: 'locked-closed',
            })
      },
      NewestScreen: {
        screen: NewestScreen,
        navigationOptions: () => ({
          gestureEnabled: false
        })
      },
    }
  );
  export default HomeStackNavigator;
  
