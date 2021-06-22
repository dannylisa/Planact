import React from 'react';
import { Provider } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import theme from '@/stores/theme';
import { combineReducers, createStore } from 'redux';
import Navigation from '@/navigation';

const rootReducer = combineReducers({
  theme,
});
export type GlobalState = ReturnType<typeof rootReducer>;
const store = createStore(rootReducer);

export default function App() {
  
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <Navigation />
      </SafeAreaProvider>
    </Provider>
  );
}