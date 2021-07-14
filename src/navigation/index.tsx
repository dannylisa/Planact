import React from 'react'
import useTheme, { isLight } from '@modules/theme/hooks'
import {
  DarkTheme,
  DefaultTheme as NavDefaultTheme,
  NavigationContainer,
} from '@react-navigation/native'
import LinkingConfiguration from './LinkingConfiguration'
import { createStackNavigator } from '@react-navigation/stack'
import BottomTabNavigator from './BottomTabNavigator'
import NotFoundScreen from '@/screens/NotFoundScreen'
import { useSelector } from 'react-redux'
import { GlobalState } from '@/modules'
import Auth from '@/screens/Auth/Auth'
import SetProfile from '@/screens/profile/SetProfile'
import { useUserState } from '@/modules/auth/hooks'

export default function Navigation() {
  const theme = useTheme()
  return (
    <NavigationContainer
      // linking={LinkingConfiguration}
      theme={isLight(theme) ? NavDefaultTheme : DarkTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  )
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
export type RootStackParamList = {
  Root: undefined
  NotFound: undefined
  Auth: undefined
  SetProfile: undefined
}

const Stack = createStackNavigator<RootStackParamList>()

function RootNavigator() {
  const { profile } = useUserState();

  return profile?.nickname.indexOf('__init__') === -1 ?
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Root" component={BottomTabNavigator} />
        <Stack.Screen
          name="NotFound"
          component={NotFoundScreen}
          options={{ title: 'Oops!' }}
        />
      </Stack.Navigator>
    : (
      <Stack.Navigator>
          { !profile ?
          <Stack.Screen 
            name="Auth" 
            component={Auth} 
            options={{ headerShown: false }}
          />
          :
          <Stack.Screen 
            name="SetProfile"
            component={SetProfile} 
            options={{ headerTitle: '프로필 설정' }}
            />
          }
      </Stack.Navigator>
  )
}