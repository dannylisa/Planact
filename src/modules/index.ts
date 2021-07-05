import { useSelector } from 'react-redux'
import { applyMiddleware, combineReducers, createStore } from 'redux'
import theme from './theme'
import userAuth from './userAuth'
import userSchedules from './userSchedules'
import { composeWithDevTools } from 'redux-devtools-extension'
import logger from 'redux-logger'
import ReduxThunk from 'redux-thunk'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

//로컬 스토리지 설정
const persistConfig = {
  key: 'root',
  storage,
}

// 전체 Global State
const rootReducer = combineReducers({
  theme,
  userSchedules,
  userAuth,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export type GlobalState = ReturnType<typeof rootReducer>

export let store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(ReduxThunk, logger))
)
export let persistor = persistStore(store)
