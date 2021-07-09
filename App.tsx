import React from 'react'
import { Provider } from 'react-redux'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { PersistGate } from 'redux-persist/integration/react'
import Navigation from '@/navigation'
import { persistor, store } from '@/modules'
import AppLoading from 'expo-app-loading'

export default function App() {
  return (
    <Provider store={store}>
        <PersistGate loading={<AppLoading />} persistor={persistor}>
          <SafeAreaProvider>
            <Navigation />
          </SafeAreaProvider>
      </PersistGate>
    </Provider>
  )
}
