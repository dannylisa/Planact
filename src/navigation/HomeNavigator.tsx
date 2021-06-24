
// Each tab has its own navigation stack, you can read more about this pattern here:
import React from "react";
import Home from '@/screens/home/Home';
import { createStackNavigator } from '@react-navigation/stack';

// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
type HomeParamList = {
    Home:undefined
  }
const HomeStack = createStackNavigator<HomeParamList>();
  
function HomeNavigator() {
    return (
        <HomeStack.Navigator>
        <HomeStack.Screen
            name="Home"
            component={Home}
            options={{ 
                headerTitle: 'PLANACT', 
                headerTitleStyle:{
                    fontWeight:"800", 
                    fontSize: 20} 
                }}
        />
        </HomeStack.Navigator>
    );
}
export default HomeNavigator;
