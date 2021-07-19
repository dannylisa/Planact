// Each tab has its own navigation stack, you can read more about this pattern here:
import React from 'react'
import Home from '@/screens/home'
import { createStackNavigator } from '@react-navigation/stack'
import dayjs from 'dayjs'
import EventDetails from '@/screens/home/details'
import UserScheduleAnalysis from '@/screens/profile/UserScheduleAnalysis'

// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
type HomeParamList = {
  Home: undefined
  "Event/Details": undefined
  "Home/ScheduleManager/Analysis": undefined
}
const HomeStack = createStackNavigator<HomeParamList>()

function HomeNavigator() {
  const day = dayjs()
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown:false,
          headerTitle: 'PLANACT',
          headerTitleStyle: {
            fontWeight: '800',
            fontSize: 20,
          },
        }}
      />
      <HomeStack.Screen
        name="Event/Details"
        component={EventDetails}
        options={{
          headerTitle: 'PLANACT',
          headerTitleStyle: {
            fontWeight: '800',
            fontSize: 20,
          },
        }}
      />
      <HomeStack.Screen 
        name="Home/ScheduleManager/Analysis" 
        component={UserScheduleAnalysis} 
      />
    </HomeStack.Navigator>
  )
}
export default HomeNavigator
