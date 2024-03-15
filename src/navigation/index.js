import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Posts from '../screens/posts';
import ComingSoon from '../screens/coming-soon';

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Posts" component={Posts} />
      <Tab.Screen name="Tab2" component={ComingSoon} />
      <Tab.Screen name="Tab3" component={ComingSoon} />
    </Tab.Navigator>
  );
}
export default MyTabs;
