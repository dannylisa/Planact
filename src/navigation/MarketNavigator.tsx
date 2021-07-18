// Each tab has its own navigation stack, you can read more about this pattern here:
import React from 'react'
import MarketMain from '@/screens/market/main'
import { createStackNavigator } from '@react-navigation/stack'
import MarketScheduleDetails from '@/screens/market/details'
import MarketScheduleDownload from '@/screens/market/download'
import {Alias, Freq, StartAt, ColorSelect} from '@/screens/market/download/steps'

// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
type MarketParamList = {
  "Market/Main": undefined
  "Market/Schedule/Details": undefined
  "Market/Schedule/Download": undefined
  "Market/Schedule/Download/alias": undefined
  "Market/Schedule/Download/freq": undefined
  "Market/Schedule/Download/startat": undefined
  "Market/Schedule/Download/color": undefined

}
// "Market/Category": undefined


const MarketStack = createStackNavigator<MarketParamList>()

function MarketNavigator() {
  return (
    <MarketStack.Navigator>
      <MarketStack.Screen
        name="Market/Main"
        component={MarketMain}
        options={{ 
          headerShown: false,
          headerTitle: "마켓"
        }}
      />
      {/* <MarketStack.Screen
        name="Market/Category"
        component={MarketCategory}
        options={{ headerTitle: 'Market' }}
      /> */}
      <MarketStack.Screen
        name="Market/Schedule/Details"
        component={MarketScheduleDetails}
        options={{ headerTitle: '플랜 상세보기' }}
      />
      {/* <MarketStack.Screen
        name="Market/Schedule/Download"
        component={MarketScheduleDownload}
        options={{ headerTitle: '플랜 다운로드' }}
      /> */}
      <MarketStack.Screen
        name="Market/Schedule/Download/alias"
        component={Alias}
        options={{ headerTitle: '', headerShown:false}}
      />
      <MarketStack.Screen
        name="Market/Schedule/Download/freq"
        component={Freq}
        options={{ headerTitle: '', headerShown:false}}
      />
      <MarketStack.Screen
        name="Market/Schedule/Download/startat"
        component={StartAt}
        options={{ headerTitle: '', headerShown:false}}
      />
      <MarketStack.Screen
        name="Market/Schedule/Download/color"
        component={ColorSelect}
        options={{ headerTitle: '', headerShown:false}}
      />
    </MarketStack.Navigator>
  )
}
export default MarketNavigator
