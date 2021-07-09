// Each tab has its own navigation stack, you can read more about this pattern here:
import React from 'react'
import MarketMain from '@/screens/market/main'
import { createStackNavigator } from '@react-navigation/stack'
import MarketCategory from '@/screens/market/category/MarketCategory'
import MarketScheduleDetails from '@/screens/market/details'

// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
type MarketParamList = {
  "Market/Main": undefined
  "Market/Category": undefined
  "Market/Schedule/Details": undefined
}


const MarketStack = createStackNavigator<MarketParamList>()

function MarketNavigator() {
  return (
    <MarketStack.Navigator>
      <MarketStack.Screen
        name="Market/Main"
        component={MarketMain}
        options={{ headerTitle: 'Market' }}
      />
      <MarketStack.Screen
        name="Market/Category"
        component={MarketCategory}
        options={{ headerTitle: 'Market' }}
      />
      <MarketStack.Screen
        name="Market/Schedule/Details"
        component={MarketScheduleDetails}
        options={{ headerTitle: 'Market' }}
      />
    </MarketStack.Navigator>
  )
}
export default MarketNavigator
