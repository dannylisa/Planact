
// Each tab has its own navigation stack, you can read more about this pattern here:
import React from "react";
import Profile from '@/screens/profile/Profile';
import { createStackNavigator } from '@react-navigation/stack';

// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
type ProfileParamList = {
    Profile:undefined
  }
const ProfileStack = createStackNavigator<ProfileParamList>();
  
function ProfileNavigator() {
    return (
        <ProfileStack.Navigator>
        <ProfileStack.Screen
            name="Profile"
            component={Profile}
            options={{ headerTitle: 'Profile' }}
        />
        </ProfileStack.Navigator>
    );
}

export default ProfileNavigator;
