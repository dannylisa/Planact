import { applyMiddleware, combineReducers, createStore } from 'redux'
import theme from './theme'
import userSchedulesState from './userSchedule'
import storage from 'redux-persist/lib/storage'
import authState from './auth'
import userDailyListState from './userDailyList'

import { persistReducer, persistStore } from 'redux-persist'
import { composeWithDevTools } from 'redux-devtools-extension'
import logger from 'redux-logger'
import ReduxThunk from 'redux-thunk'

// 전체 Global State
const rootReducer = combineReducers({
  theme,
  authState,
  userSchedulesState,
  userDailyListState
})


//로컬 스토리지 설정
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['authState']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export let store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(ReduxThunk, logger))
)

export let persistor = persistStore(store)
export type GlobalState = ReturnType<typeof rootReducer>
