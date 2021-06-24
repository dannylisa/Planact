
// Each tab has its own navigation stack, you can read more about this pattern here:
import React from "react";
import Market from '@/screens/market/Market';
import { createStackNavigator } from '@react-navigation/stack';

// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
type MarketParamList = {
    Market:undefined
}

const MarketStack = createStackNavigator<MarketParamList>();
  
function MarketNavigator() {
    return (
        <MarketStack.Navigator>
        <MarketStack.Screen
            name="Market"
            component={Market}
            options={{ headerTitle: 'Market' }}
        />
        </MarketStack.Navigator>
    );
}
export default MarketNavigator;
