import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Dashboard from './Dashboard';
import WorkInProgressScreen from "./WorkInProgress"
const Tab = createMaterialTopTabNavigator();

export default function MyTabs() {
  return (
    <Tab.Navigator
    screenOptions={{
        tabBarActiveTintColor:'#00a883',
        tabBarInactiveTintColor:"white",
        tabBarIndicatorStyle: {
            backgroundColor: '#025D4B',
            height: 2
          },
          tabBarLabelStyle: {fontSize: 14,fontWeight:'bold'},
        tabBarStyle: {
          backgroundColor: '#1f2c34',
        },
        
      }}
>
      <Tab.Screen name="Chats" component={Dashboard} />
      <Tab.Screen name="Status" component={WorkInProgressScreen} />
      <Tab.Screen name="Calls" component={WorkInProgressScreen} />
    </Tab.Navigator>
  );
}