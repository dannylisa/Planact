import React from 'react';
import useTheme from '@modules/theme/hooks'
import { Ionicons, AntDesign, Feather } from '@expo/vector-icons';
import { BottomTabNavigationOptions, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeNavigator from './HomeNavigator';
import ProfileNavigator from './ProfileNavigator.tsx';
import MarketNavigator from './MarketNavigator';
import { Dimensions, StatusBar, StyleSheet, View } from 'react-native';
import { DefaultTheme } from '@/style/styled';
import { Text } from "@components/materials";
import media from '@/style/media';

type BottomTabParamList = {
  Home: undefined;
  Market: undefined;
  Profile: undefined;
};
const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const theme = useTheme()
  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      tabBarOptions={{ 
        activeTintColor: theme.primary.main,
        showLabel: false,
        style:{
          paddingTop:10,
          ...media.vertical('height', 85, 75, 70),
          alignItems:"flex-end"
        }
      }}
    >
      <BottomTab.Screen
        name="Home"
        component={HomeNavigator}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <TabBarIcon
              alignSelf="flex-end"
              title="Home"
              name="calendar" 
              {...{ focused, color }}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="Market"
        component={MarketNavigator}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <TabBarIcon
              alignSelf="center"
              title="Market"
              name="package" 
              {...{ focused, color }}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="Profile"
        component={ProfileNavigator}
        
        options={{
          tabBarIcon: ({ focused, color }) => (
            <TabBarIcon
              alignSelf="flex-start"
              title="Profile"
              name="user" 
              {...{ focused, color }}
            />
          ),
          
        }}
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
interface TabBarIconProps {
  focused: boolean
  color: string
  name: React.ComponentProps<typeof Feather>['name']
  title:string
  alignSelf: "flex-start" | "center" | "flex-end"
}
function TabBarIcon({focused, color, name, title, alignSelf}: TabBarIconProps) {
  const {wrapper, focusWrapper, text} = styles(useTheme())
  return !focused ? (
    <View style={wrapper}>
      <Feather 
        name={name} 
        color={color}
        size={30}
      />
    </View>
  ) : (
    <View style={[focusWrapper, {alignSelf}]} >
      <Feather 
        name={name} 
        color={color}
        size={30}
      />
      <Text
        style={text}
        content={title}
        headings={3}
      />
    </View>
  )
}

const styles = (theme:DefaultTheme) => {
  const {width} = Dimensions.get('screen');
  return StyleSheet.create({
    wrapper:{
      justifyContent: "center",
    },
    focusWrapper:{
      paddingVertical:5,
      paddingHorizontal: 10,
      backgroundColor:theme.primary.main+"30",
      borderRadius:15,
      flexDirection:"row",
      alignItems: "center",
      justifyContent: "center",
    },
    text:{
      marginLeft:8,
      color: theme.primary.main,
      fontWeight: "700",
    }
  })
}
