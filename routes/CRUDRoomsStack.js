import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';

const screens = {
  ListRoomsScreen: {
    screen: ListRoomsScreen
  },
  RoomDetail: {
      screen:DetailRoomScreen
  },
  RoomCreator: {
       screen:CreateRoomScreen
  },
}
 const CRUDRoomsStack = createStackNavigator(screens);
 export default createAppContainer(CRUDRoomsStack);
