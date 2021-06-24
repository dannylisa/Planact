/**
 * Learn more about createBottomTabNavigator:
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */

 import { GlobalState } from '@modules/index';
 import Home, { HomeProps } from '@/screens/home/Home';
import { isLight } from '@/style/themes';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { useSelector } from 'react-redux';
import HomeNavigator from './HomeNavigator';
import ProfileNavigator from './ProfileNavigator.tsx';
import MarketNavigator from './MarketNavigator';

type BottomTabParamList = {
  Home: undefined
  Market: undefined
  Profile: undefined
};
const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const theme = useSelector(({theme}:GlobalState) => theme);
  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      tabBarOptions={{ activeTintColor: (isLight(theme) ? "#2f95dc" : "#fff") }}>
      <BottomTab.Screen
        name="Home"
        component={HomeNavigator}
        options={{
          tabBarIcon: ({color}) => <TabBarIcon name="ios-home-outline" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Market"
        component={MarketNavigator}
        options={{
          tabBarIcon: ({color}) => <TabBarIcon name="ios-person-outline" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Profile"
        component={ProfileNavigator}
        options={{
          tabBarIcon: ({color}) => <TabBarIcon name="ios-person-outline" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: React.ComponentProps<typeof Ionicons>['name']; color: string }) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}
