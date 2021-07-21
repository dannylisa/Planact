import React, { useEffect, useState } from 'react'
import { Provider } from 'react-redux'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { PersistGate } from 'redux-persist/integration/react'
import Navigation from '@/navigation'
import { persistor, store } from '@/modules'
import AppLoading from 'expo-app-loading'
import { StatusBar } from 'react-native'
import useTheme, { isLight } from '@/modules/theme/hooks'
import Splash from '@/screens/Loading/Splash'

export default function App() {
  return (
    <Provider store={store}>
        <PersistGate loading={<AppLoading />} persistor={persistor}>
          <SafeAreaProvider>
            <SafeAreaProv />
          </SafeAreaProvider>
      </PersistGate>
    </Provider>
  )
}

const SafeAreaProv = () => {
  const theme=useTheme()
  const [loading, setLoading] = useState<boolean>(true)
  useEffect(() => {
    setTimeout(() => setLoading(false),1500);
  }, [])
  return loading ? (
    <Splash />
  ):(
    <SafeAreaProvider>
      <StatusBar barStyle={isLight(theme) ? "dark-content" : "light-content"} />
      <Navigation />
    </SafeAreaProvider>
  )
}