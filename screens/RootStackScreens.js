import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './LoginScreen';
import SignUpScreen from './SignUpScreen';
const Stack = createStackNavigator();

const RootStackScreens = ({navigation}) => {
  return (
    <Stack.Navigator headerMode={'none'}>
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
    </Stack.Navigator>
  );
}
export default RootStackScreens;