// Each tab has its own navigation stack, you can read more about this pattern here:
import React from 'react'
import Profile from '@/screens/profile'
import { createStackNavigator } from '@react-navigation/stack'
import SetProfile from '@/screens/profile/SetProfile'
import ScheduleManager from '@/screens/profile/ScheduleManager'
import UserScheduleAnalysis from '@/screens/profile/UserScheduleAnalysis'
import { IUserSchedule } from '@/utils/data'

// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
type ProfileParamList = {
  Profile: undefined
  SetProfile: undefined
  "Profile/ScheduleManager": undefined
  "Profile/ScheduleManager/Analysis": undefined
}
const ProfileStack = createStackNavigator<ProfileParamList>()

function ProfileNavigator() {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name="Profile"
        component={Profile}
        options={{ headerTitle: '프로필 설정' }}
      />
      <ProfileStack.Screen name="SetProfile" component={SetProfile} />
      <ProfileStack.Screen 
        name="Profile/ScheduleManager" 
        component={ScheduleManager} 
        options={{ headerTitle: '내 플랜'}}
      />
      <ProfileStack.Screen 
        name="Profile/ScheduleManager/Analysis" 
        component={UserScheduleAnalysis} 
      />
    </ProfileStack.Navigator>
  )
}

export default ProfileNavigator
