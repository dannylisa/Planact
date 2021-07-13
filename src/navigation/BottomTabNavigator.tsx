/**
 * Learn more about createBottomTabNavigator:
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */

import { GlobalState } from '@modules/index';
import useTheme, { isLight } from '@modules/theme/hooks'
import { Ionicons, AntDesign } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import HomeNavigator from './HomeNavigator';
import ProfileNavigator from './ProfileNavigator.tsx';
import MarketNavigator from './MarketNavigator';

type BottomTabParamList = {
  Home: undefined;
  Market: undefined;
  Profile: undefined;
};
const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const theme = useTheme()
  const iconStyle = {
    size: 30,
    style: {
      marginBottom: -3,
    },
  };
  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      tabBarOptions={{ activeTintColor: isLight(theme) ? '#2f95dc' : '#fff' }}
    >
      <BottomTab.Screen
        name="Home"
        component={HomeNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="ios-home-outline" color={color} {...iconStyle} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Market"
        component={MarketNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <AntDesign name="appstore-o" color={color} {...iconStyle} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Profile"
        component={ProfileNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="ios-person-outline" color={color} {...iconStyle} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof Ionicons>['name'];
  color: string;
}) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}
