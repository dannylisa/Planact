import React from 'react'
import Auth from '@/screens/Auth/Auth'
import SetProfile from '@/screens/profile/SetProfile'
import { createStackNavigator } from '@react-navigation/stack'

type AuthParamList = {
  Auth: undefined
  SetPorfile: undefined
}

const AuthStack = createStackNavigator<AuthParamList>()

function AuthNavigator() {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen name="Auth" component={Auth} />
      <AuthStack.Screen name="SetPorfile" component={SetProfile} />
    </AuthStack.Navigator>
  )
}
export default AuthNavigator
